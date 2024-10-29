import { RefObject, MutableRefObject, MouseEvent, KeyboardEvent } from 'react';
import { keys, Key, isBrowser } from '@wix/editor-elements-common-utils';
import { ExrtaMediaHandlers } from '../VideoBox.types';

const HIDE_AUDIO_DELAY = 2000;
const SECOND_TOUCH_DELAY = 1400;
const AUDIO_FADE_INTERVAL = 200;

export function getVideoEvents({
  playerRef,
  videoRef,
  playButtonRef,
  audioRef,
  isMobileView,
  autoplay,
  hasAudio,
  hasClick,
  hasRollIn,
  hasAudioRollIn,
  canClickPause,
  canRollPause,
  canReplay,
  extraMediaHandlers = {},
  updateState = () => {},
  onStop,
}: {
  playerRef: RefObject<HTMLDivElement>;
  videoRef: RefObject<HTMLVideoElement>;
  playButtonRef: MutableRefObject<HTMLDivElement | null>;
  audioRef: MutableRefObject<HTMLDivElement | null>;
  isMobileView: boolean;
  autoplay: boolean;
  hasAudio: boolean;
  hasClick: boolean;
  hasRollIn: boolean;
  hasAudioRollIn: boolean;
  canClickPause: boolean;
  canRollPause: boolean;
  canReplay: boolean;
  extraMediaHandlers?: ExrtaMediaHandlers;
  updateState?: Function;
  onStop?: () => void;
}) {
  // using audio context for handling autoplay policy(unmute)
  let audioCtx: AudioContext | null;

  let volume = +(playerRef.current?.dataset.volume || 1);

  function setAudioContext(): void {
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    if (isBrowser() && AudioContext && videoRef.current) {
      audioCtx = new AudioContext();
    }
  }

  function toggleMute(forceState?: boolean) {
    if (!(playerRef.current && videoRef.current)) {
      return;
    }

    const toggledMuted =
      typeof forceState === 'boolean' ? forceState : !videoRef.current.muted;

    shouldAudioPlay = !toggledMuted;

    if (toggledMuted) {
      videoAPI.mute();
    } else {
      videoAPI.unmute();
    }
  }

  /*
   * Video API
   */
  const videoAPI = {
    setVolume(value: number) {
      volume = value;

      if (videoRef.current) {
        videoRef.current.volume = volume;
      }

      if (playerRef.current) {
        playerRef.current.dataset.volume = volume.toString();
      }
    },
    play(persist?: boolean) {
      if (!(playerRef.current && videoRef.current)) {
        return;
      }

      if (persist) {
        playerRef.current.dataset.playing = '';
        updateState({ shouldPlay: true });
      }

      if (playButtonRef.current) {
        playButtonRef.current.setAttribute('aria-pressed', 'true');
      }

      void videoRef.current.play();
      didInitialPlay = true;
    },
    pause() {
      if (!(playerRef.current && videoRef.current)) {
        return;
      }

      delete playerRef.current.dataset.playing;

      if (playButtonRef.current) {
        playButtonRef.current.setAttribute('aria-pressed', 'false');
      }

      videoRef.current.pause();
      updateState({ shouldPlay: false });
    },
    load: () => videoRef.current?.load(),
    stop() {
      if (!(playerRef.current && videoRef.current)) {
        return;
      }

      delete playerRef.current.dataset.playing;

      if (playButtonRef.current) {
        playButtonRef.current.setAttribute('aria-pressed', 'false');
      }

      if (onStop) {
        onStop();
      }

      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      updateState({ shouldPlay: false });
    },
    togglePlay() {
      if (!videoRef.current) {
        return;
      }

      if (videoRef.current.paused) {
        videoAPI.play(true);
      } else {
        videoAPI.pause();
      }
    },
    mute() {
      if (!(playerRef.current && videoRef.current)) {
        return;
      }

      videoRef.current.muted = true;
      playerRef.current.dataset.audio = 'off';

      if (audioRef.current) {
        audioRef.current.setAttribute('aria-pressed', 'true');
      }

      updateState({ isMuted: true });
    },
    unmute(fadeIn?: boolean) {
      if (!(playerRef.current && videoRef.current)) {
        return;
      }

      const playerEl = playerRef.current;
      const videoEl = videoRef.current;

      if (fadeIn) {
        audioFadeIn(videoEl);
      } else {
        videoEl.muted = false;
      }

      playerEl.dataset.audio = 'on';

      if (audioRef.current) {
        audioRef.current.setAttribute('aria-pressed', 'false');
      }

      updateState({ isMuted: false });
    },
  };

  /*
   * Event handler's state
   */
  // whether video playback has ended and is not allowed to replay
  let ended = false;
  // whether audio playback should be playing according to UoU intent
  let shouldAudioPlay = hasAudio;
  // whether player is set to autoplay or has played once
  let didInitialPlay = autoplay || !hasClick;

  let audioVolumeFadeInterval: number;
  let showAudioTimeout: number;
  let mobileTouchTimeout: number;

  const mediaHandler = {
    handleEvent(e: Event) {
      const type = e.type;
      const player = playerRef.current;

      if (type === 'loadeddata' && player) {
        player.dataset.canPlay = '';
      }

      if (type === 'ended' && player) {
        if (!canReplay) {
          ended = true;
          player.dataset.stop = '';
        }
        delete player.dataset.playing;
      }

      if (extraMediaHandlers[type] && extraMediaHandlers[type].length) {
        extraMediaHandlers[type].forEach(handler => handler(e));
        return;
      }
    },
  };

  const clickHandler = (e: MouseEvent) => {
    // we have a user interaction! -  we can allow un-muting on hover
    if (audioCtx) {
      void audioCtx.resume();
    }

    const playerEl = playerRef.current;
    const videoEl = videoRef.current;
    const audioEl = audioRef.current;

    if (!playerEl || !videoEl || ended) {
      return;
    }

    /*
     * Handle audio mute/unmute
     */
    if (hasAudio && audioEl) {
      // show the audio icon
      showAudio(playerEl);

      if (audioEl.contains(e.target as Node)) {
        toggleMute();
        return;
      }
    }

    /*
     * Handle simple play/pause
     * We update player.dataset.playing here so to not confuse state change via viewport/visibility handlers
     */
    if (videoEl.paused) {
      videoAPI.play(true);
    } else if (canClickPause) {
      videoAPI.pause();
    }
  };

  const keyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (![...keys.space, ...keys.enter].includes(e.key as Key)) {
      return;
    }

    e.preventDefault();

    const playerEl = playerRef.current;
    const videoEl = videoRef.current;
    const audioEl = audioRef.current;

    if (!playerEl || !videoEl || ended) {
      return;
    }

    if (audioEl && audioEl.contains(e.target as Node)) {
      toggleMute();
    } else {
      videoAPI.togglePlay();
    }
  };

  /*
   * Handle play and/or unmute for hover interactions
   */
  const mouseEnterHandler = () => {
    const playerEl = playerRef.current;
    const videoEl = videoRef.current;
    if (!playerEl || !videoEl || ended) {
      return;
    }

    if (hasRollIn) {
      // handle video playback playing on roll-in
      videoAPI.play();
    } else if (hasClick) {
      // handle  visual changes (Play)
      playerEl.dataset.rollIn = '';
    }

    // show audio control if it has audio started playing at least once
    if (hasAudio && didInitialPlay) {
      showAudio(playerEl);
      const unmutePolicyAllowed =
        !audioCtx || ['running', 'interrupted'].includes(audioCtx.state);
      // unmute on hover if needed and allowed
      if (
        shouldAudioPlay &&
        unmutePolicyAllowed &&
        (hasAudioRollIn || hasRollIn) &&
        videoEl.muted
      ) {
        videoAPI.unmute(true);
      }
    }
  };

  /*
   * Handle pause and/or mute for hover interactions
   */
  const mouseLeaveHandler = () => {
    const playerEl = playerRef.current;
    const videoEl = videoRef.current;

    if (!playerEl || !videoEl) {
      return;
    }

    if (canRollPause) {
      // handle video playback pause on roll-out
      videoEl.pause();
    } else if (hasClick) {
      // handle  visual changes (Play)
      delete playerEl.dataset.rollIn;
    }

    // hide audio control
    if (hasAudio) {
      hideAudio(playerEl);
      // mute on roll-out
      if (hasAudioRollIn && !videoEl.muted) {
        audioFadeOut(videoEl);
      }
    }
  };

  /*
   * handle mobile touch events - initial play and actions on 'second touch'
   */
  const touchEndHandler = (e: MouseEvent) => {
    // we have a user interaction! -  we can allow un-muting on hover
    if (audioCtx) {
      void audioCtx.resume();
    }
    const playerEl = playerRef.current;
    const videoEl = videoRef.current;
    const audioEl = audioRef.current;

    if (!playerEl || !videoEl || ended) {
      return;
    }

    const isInitialPlay = !autoplay && !playerEl.dataset.touched;
    const isSecondTouch = playerEl.dataset.touched === 'on';

    if (hasAudio) {
      showAudio(playerEl);

      /*
       * Handle audio mute/unmute
       */
      if (audioEl && audioEl.contains(e.target as Node)) {
        toggleMute();
        return;
      }
    }

    if (isInitialPlay || isSecondTouch) {
      /*
       * Handle simple play/pause
       * We update player.dataset.playing here so to not confuse state change via viewport/visibility handlers
       */
      if (videoEl.paused) {
        videoAPI.play(true);
      } else if (canClickPause || canRollPause) {
        videoAPI.pause();
      }
    }

    if (hasClick || hasRollIn) {
      clearTimeout(mobileTouchTimeout);
      playerEl.dataset.touched = 'on';
      mobileTouchTimeout = window.setTimeout(
        () => (playerEl.dataset.touched = 'off'),
        SECOND_TOUCH_DELAY,
      );
    }
  };

  /*
   * handle mouse move - show the audio control
   */
  const mouseMoveHandler = () => {
    const playerEl = playerRef.current;
    if (playerEl && hasAudio && didInitialPlay) {
      showAudio(playerEl);
    }
  };

  /*
   * show the audio control for interval
   */
  const showAudio = (playerEl: HTMLDivElement) => {
    playerEl.dataset.showAudio = '';
    clearTimeout(showAudioTimeout);
    showAudioTimeout = window.setTimeout(() => {
      delete playerEl.dataset.showAudio;
    }, HIDE_AUDIO_DELAY);
  };

  const hideAudio = (playerEl: HTMLDivElement) => {
    clearTimeout(showAudioTimeout);
    delete playerEl.dataset.showAudio;
  };

  const audioFadeIn = (videoEl: HTMLMediaElement) => {
    videoEl.volume = 0;
    videoEl.muted = false;
    let vol = 0;

    window.clearInterval(audioVolumeFadeInterval);

    audioVolumeFadeInterval = window.setInterval(() => {
      vol += 0.2;

      if (vol >= volume) {
        videoEl.volume = volume;
        window.clearInterval(audioVolumeFadeInterval);
      } else {
        videoEl.volume = vol;
      }
    }, AUDIO_FADE_INTERVAL);
  };

  const audioFadeOut = (videoEl: HTMLMediaElement) => {
    videoEl.volume = volume;
    let vol = 1;
    window.clearInterval(audioVolumeFadeInterval);
    audioVolumeFadeInterval = window.setInterval(() => {
      vol -= 0.2;
      if (vol <= 0) {
        videoEl.volume = 0;
        videoEl.muted = true;
        window.clearInterval(audioVolumeFadeInterval);
      } else {
        videoEl.volume = vol;
      }
    }, AUDIO_FADE_INTERVAL);
  };

  const hasMobileEvents = isBrowser() && 'ontouchend' in window && isMobileView;

  const onKeyDown = isMobileView ? undefined : keyDownHandler;
  let onClick;
  if (hasMobileEvents) {
    if (hasAudio || hasClick || hasRollIn) {
      onClick = touchEndHandler;
    }
  } else if (hasAudio || hasClick) {
    onClick = clickHandler;
  }
  const onMouseEnter =
    !hasMobileEvents && (hasAudio || hasRollIn || hasClick)
      ? mouseEnterHandler
      : undefined;
  const onMouseLeave =
    !hasMobileEvents && (hasAudio || canRollPause || hasClick)
      ? mouseLeaveHandler
      : undefined;
  const onMouseMove =
    !hasMobileEvents && hasAudio ? mouseMoveHandler : undefined;

  return {
    videoAPI,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onKeyDown,
    mediaHandler,
    setAudioContext,
    MEDIA_EVENTS: new Set([
      ...Object.keys(extraMediaHandlers),
      ...['loadeddata', 'ended'],
    ]),
  };
}

export function getVisibilityHandlers({
  playerRef,
  videoRef,
  onViewEnter,
  onViewLeave,
}: {
  playerRef: RefObject<HTMLDivElement>;
  videoRef: RefObject<HTMLVideoElement>;
  onViewEnter?: () => void;
  onViewLeave?: () => void;
}) {
  if (!isBrowser()) {
    return;
  }

  const visibleState = {
    visible: !window.document.hidden,
    intersecting: false,
  };

  const visibilityChangeHandler = () => {
    if (
      videoRef.current &&
      playerRef.current &&
      'playing' in playerRef.current.dataset // indication of intent to play
    ) {
      visibleState.visible = !window.document.hidden;

      if (visibleState.visible && visibleState.intersecting) {
        void videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };
  window.document.addEventListener('visibilitychange', visibilityChangeHandler);

  let playingObserver: IntersectionObserver | null = null;

  if (playerRef.current && typeof window.IntersectionObserver === 'function') {
    playingObserver = new window.IntersectionObserver(intersections => {
      const player = playerRef.current;
      const video = videoRef.current;

      if (video && player) {
        intersections.forEach(intersection => {
          if (video && intersection.target === player) {
            visibleState.intersecting = intersection.isIntersecting;

            if (visibleState.visible && visibleState.intersecting) {
              onViewEnter?.();
              // whether we have intent to play and have src
              // (sometimes in platform we get here no src change with video.src empty)
              if ('playing' in player.dataset && video.src) {
                void video.play();
              }
            } else {
              onViewLeave?.();
              video.pause();
            }
          }
        });
      }
    });
    playingObserver.observe(playerRef.current);
  }

  function cleanup() {
    window.document.removeEventListener(
      'visibilitychange',
      visibilityChangeHandler,
    );

    if (playingObserver) {
      playingObserver.disconnect();
      playingObserver = null;
    }
  }

  return cleanup;
}
