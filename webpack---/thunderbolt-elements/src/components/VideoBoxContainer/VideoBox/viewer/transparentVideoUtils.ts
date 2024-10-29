import * as React from 'react';
import wixKampos from '@wix/wix-kampos/src';
import * as utils from '@wix/thunderbolt-commons/dist/deprecatedBrowserUtils';
import { isBrowser } from '@wix/editor-elements-common-utils';
import { VideoBoxCommonProps } from '../VideoBox.types';

const { Kampos, effects } = wixKampos;

Kampos.prototype.getRequestFrame = function getRequestFrame() {
  return 'requestVideoFrameCallback' in HTMLVideoElement.prototype
    ? (fn: () => void) => this.media.requestVideoFrameCallback(fn)
    : window.requestAnimationFrame;
};

/*
 * Override Kampos' `play()` to optimize for looping while video playback doesn't change.
 */
Kampos.prototype.play = function play() {
  if (!this.animationFrameId) {
    const requestFrame = this.getRequestFrame();

    const loop = () => {
      const video = this.media;
      this.animationFrameId = requestFrame(loop);

      if (
        video &&
        video.readyState >= video.HAVE_CURRENT_DATA &&
        (!(video.paused || video.ended) || this._needsRedraw)
      ) {
        this._needsRedraw = false;
        this.draw();
      }
    };

    this.animationFrameId = requestFrame(loop);
  }
};

const getVglSource = (media: HTMLVideoElement) => ({
  width: (media && media.videoWidth) || 0,
  height: (media && media.videoHeight / 2) || 0,
  media,
});

function hexToVec4(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
        1,
      ]
    : hex;
}

const getKamposEffects = (
  prop: Partial<VideoBoxCommonProps['filterEffect']> = {},
) => {
  const result = [effects.transparentVideo()];
  const hasBrightness = 'brightness' in prop;
  const hasContrast = 'contrast' in prop;
  if (hasBrightness || hasContrast) {
    const bc = effects.brightnessContrast();

    if (hasBrightness) {
      bc.brightness = prop.brightness;
    }
    if (hasContrast) {
      bc.contrast = prop.contrast;
    }

    result.push(bc);
  }

  if (prop.duotoneDark && prop.duotoneLight) {
    const dt = effects.duotone();

    dt.dark = hexToVec4(prop.duotoneDark);
    dt.light = hexToVec4(prop.duotoneLight);

    result.push(dt);
  }

  const hasHue = 'hue' in prop;
  const hasSaturation = 'saturation' in prop;
  if (hasHue || hasSaturation) {
    const hs = effects.hueSaturation();

    if (hasHue) {
      hs.hue = prop.hue;
    }
    if (hasSaturation) {
      hs.saturation = prop.saturation;
    }

    result.push(hs);
  }

  return result;
};

const isVideoReady = (video: HTMLVideoElement) =>
  video.readyState >= video.HAVE_CURRENT_DATA;

const MAX_CONTEXTS = 8;

const COUNTER = {
  count: 0,
  set: new Set(),
  add(ref: React.RefObject<unknown>) {
    if (COUNTER.set.has(ref)) {
      return true;
    }

    if (COUNTER.set.size < MAX_CONTEXTS) {
      COUNTER.set.add(ref);
      COUNTER.count = COUNTER.set.size;
      return true;
    }

    return false;
  },
  remove(ref: React.RefObject<unknown>) {
    COUNTER.set.delete(ref);
    COUNTER.count = COUNTER.set.size;
  },
};

const isIEAgent = () => isBrowser() && utils.isIE(window);

function tvControllerFactory({
  filterEffect,
  playerRef,
  videoRef,
  canvasRef,
  contextRef,
  kampos,
  setCanPlayTV,
}: {
  filterEffect: VideoBoxCommonProps['filterEffect'];
  playerRef: React.RefObject<HTMLDivElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  contextRef: React.RefObject<unknown>;
  kampos: React.MutableRefObject<typeof Kampos>;
  setCanPlayTV: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  let inView = false;
  let posterRemoved = false;

  function handleSeeked() {
    if (!(videoRef.current && playerRef.current)) {
      return;
    }

    videoRef.current.removeEventListener('seeked', handleSeeked);
    playerRef.current.dataset.showCanvas = '';
    posterRemoved = true;
  }

  const controller = {
    initKampos() {
      try {
        kampos.current = new Kampos({
          target: canvasRef.current,
          effects: getKamposEffects(filterEffect || {}),
          onContextLost: () => {
            const video =
              kampos.current._source && kampos.current._source.media;

            if (video && (video.ended || video.paused)) {
              kampos.current._needsRedraw = true;
            }

            this.stopKampos();

            if (inView) {
              this.playKampos();
            }
          },
        });
        kampos.current.hasContext = true;
      } catch (e) {
        COUNTER.remove(contextRef);
        setCanPlayTV(false);

        if (posterRemoved) {
          controller.showPoster();
        }
        return;
      }

      if (!videoRef.current) {
        return;
      }

      const mediaReadyHandler = () => {
        if (!videoRef.current) {
          return;
        }

        kampos.current.setSource(
          getVglSource(videoRef.current as HTMLVideoElement),
        );

        controller.playKampos();

        // only once, clean up
        videoRef.current.removeEventListener(
          'loadeddata',
          mediaReadyHandler,
          false,
        );
      };

      if (isVideoReady(videoRef.current)) {
        mediaReadyHandler();
      } else {
        videoRef.current.addEventListener(
          'loadeddata',
          mediaReadyHandler,
          false,
        );
      }
    },
    playKampos() {
      if (!playerRef.current || !canvasRef.current) {
        return;
      }

      let hasContext;

      if (kampos.current) {
        hasContext = kampos.current.hasContext || COUNTER.add(contextRef);
      } else {
        hasContext = Kampos.preventContextCreation
          ? false
          : COUNTER.add(contextRef);
      }

      if (!hasContext) {
        if (posterRemoved) {
          controller.showPoster();
        }

        // no context available!
        return;
      }

      if (!kampos.current || !kampos.current.config) {
        controller.initKampos();
      } else {
        if (kampos.current.lostContext) {
          kampos.current.restoreContext();
        }
        kampos.current.hasContext = true;
        kampos.current.play();

        if (
          !posterRemoved &&
          kampos.current.media &&
          isVideoReady(kampos.current.media) &&
          'playing' in playerRef.current.dataset
        ) {
          controller.removePoster();
        }
      }
    },
    stopKampos() {
      COUNTER.remove(contextRef);
      kampos.current.hasContext = false;
      kampos.current.stop();
    },
    killKampos() {
      if (kampos.current) {
        controller.stopKampos();
        kampos.current.destroy();
      }

      videoRef.current?.removeEventListener('seeked', handleSeeked);
    },
    removePoster() {
      const video = videoRef.current;
      const player = playerRef.current;
      if (posterRemoved || !(player && video && kampos.current)) {
        return;
      }

      if (video.paused || video.ended || kampos.current._needsRedraw) {
        kampos.current._needsRedraw = false;
        kampos.current.draw();
      }
      // sync poster removal with first frame
      video.addEventListener('seeked', handleSeeked);
      video.currentTime = 0;
    },
    showPoster() {
      if (playerRef.current && videoRef.current) {
        delete playerRef.current.dataset.showCanvas;
        posterRemoved = false;
      }
    },
    onViewEnter() {
      inView = true;
      controller.playKampos();
    },
    onViewLeave() {
      inView = false;
      if (kampos.current && kampos.current.hasContext) {
        controller.stopKampos();
      }
    },
  };

  return controller;
}

export { Kampos, tvControllerFactory, isIEAgent };
