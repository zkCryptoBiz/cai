import * as React from 'react';
import classNames from 'clsx';
import {
  formatClassNames,
  getDataAttributes,
  isCSSMaskSupported,
} from '@wix/editor-elements-common-utils';
import {
  VideoBoxCommonProps,
  TVController,
  ExrtaMediaHandlers,
} from '../VideoBox.types';
import FillLayers from '../../../FillLayers/viewer/FillLayers';
import { useIsomorphicLayoutEffect } from '../../../../providers/useIsomorphicLayoutEffect';
import semanticClassNames from '../VideoBox.semanticClassNames';
import styles from './style/VideoBox.scss';
import { getVideoEvents, getVisibilityHandlers } from './eventHandlers';
import * as transparentUtils from './transparentVideoUtils';

const noMaskSupport = !isCSSMaskSupported();
const isIE = transparentUtils.isIEAgent();

const VideoBoxCommon: React.FC<VideoBoxCommonProps> = props => {
  const {
    id,
    className,
    customClassNames = [],
    translations,
    mediaControls,
    containerRootClassName,
    compRef,
    fillLayers,
    reducedMotion: initialReducedMotion = false,
    isMobileView,
    audioEnabled,
    hasAudio,
    hasAudioRollIn,
    muted,
    autoplay,
    canReplay,
    hasMask,
    animatePoster,
    filterEffect,
    isTransparent = false,
    alt,
    updateState,
    onPlay,
    onPause,
    onEnded,
    onProgress,
    getPlaceholder,
    shouldShowTransparentVideoPosterOnStop,
  } = props;
  const playerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const playButtonRef = React.useRef<HTMLDivElement>(null);
  const audioRef = React.useRef<HTMLDivElement>(
    null,
  ) as React.MutableRefObject<HTMLDivElement | null>;
  const kampos = React.useRef<typeof transparentUtils.Kampos>(null);
  const contextRef = React.createRef();

  const [reducedMotion, setReducedMotion] =
    React.useState(initialReducedMotion);

  React.useEffect(() => {
    setReducedMotion(initialReducedMotion);
  }, [initialReducedMotion]);

  const accessibleAutoplay = autoplay && !reducedMotion;
  const hasClick = reducedMotion || props.hasClick;
  const canClickPause = reducedMotion || props.canClickPause;
  const hasRollIn = !reducedMotion && props.hasRollIn;
  const canRollPause = !reducedMotion && props.canRollPause;

  const initCorvidState = React.useCallback(
    (video: HTMLVideoElement | null) => {
      if (!updateState) {
        return;
      }

      // get comp state after src set via code
      const isMuted = playerRef.current?.dataset.audio !== 'on';
      const volume = +(playerRef.current?.dataset.volume || 1);

      const videoEl = video || {
        paused: true,
        currentTime: 0,
        duration: 0,
        volume,
        muted: isMuted,
      };

      // init Corvid state
      updateState({
        isPlaying: !videoEl.paused,
        currentTime: videoEl.currentTime || 0,
        duration: videoEl.duration || 0,
        volume: volume * 100,
        isMuted,
        shouldPlay: autoplay,
      });

      if (video) {
        // sync volume DOM property with comp state, basically after src was set via code
        video.volume = volume;
      }
    },
    [autoplay, updateState],
  );

  const [canPlayTV, setCanPlayTV] = React.useState(
    isTransparent ? !isIE : true,
  );
  // set the flag on state for render-related stuff
  const [isPosterOnly, setIsPosterOnly] = React.useState(
    isTransparent ? !canPlayTV : false,
  );
  // calculate local value for side-effects
  const currentIsPosterOnly = !!(hasMask && noMaskSupport);
  const isInteractive = React.useMemo(
    () => canPlayTV && !isPosterOnly,
    [canPlayTV, isPosterOnly],
  );

  const tvControllerRef = React.useRef<TVController>(
    null,
  ) as React.MutableRefObject<TVController | null>;

  if (isTransparent && canPlayTV && !tvControllerRef.current) {
    tvControllerRef.current = transparentUtils.tvControllerFactory({
      filterEffect,
      playerRef,
      videoRef,
      canvasRef,
      contextRef,
      kampos,
      setCanPlayTV,
    });
  }

  const extraMediaHandlers = React.useRef<ExrtaMediaHandlers>(
    null,
  ) as React.MutableRefObject<ExrtaMediaHandlers | null>;

  function getExtraMediaHandlers() {
    const handlers: ExrtaMediaHandlers = {
      play: [],
      pause: [],
      ended: [],
      timeupdate: [],
    };

    // if we have platform we add state update handlers
    if (updateState) {
      const updateIsPlaying = (e: Event) =>
        updateState({
          // @ts-expect-error
          isPlaying: !e.target.paused,
          // @ts-expect-error
          duration: e.target.duration,
        });

      const updateCurrentTime = (e: Event) =>
        // @ts-expect-error
        updateState({ currentTime: e.target.currentTime });

      handlers.loadeddata = [
        (e: Event) => {
          initCorvidState(e.target as HTMLVideoElement);
        },
      ];

      handlers.play.push(updateIsPlaying);
      handlers.pause.push(updateIsPlaying);
      handlers.ended.push(updateIsPlaying);
      handlers.timeupdate.push(updateCurrentTime);
    }

    // if it's a Transparent Video we handle poster removal
    if (isTransparent && tvControllerRef.current) {
      handlers.play.push(tvControllerRef.current.removePoster);
    }

    // Corvid event handlers
    if (onPlay) {
      handlers.play.push(() => onPlay({ type: 'onPlay' }));
    }
    if (onPause) {
      handlers.pause.push(() => onPause({ type: 'onPause' }));
    }
    if (onEnded) {
      handlers.ended.push(() => onEnded({ type: 'onEnded' }));
    }
    if (onProgress) {
      handlers.timeupdate.push(() => onProgress({ type: 'onProgress' }));
    }

    return handlers;
  }

  let isMounting = false;

  if (!extraMediaHandlers.current) {
    extraMediaHandlers.current = getExtraMediaHandlers();
    isMounting = true;
  }

  React.useEffect(
    () => {
      // skip creation of handlers on mounting
      if (!isMounting) {
        extraMediaHandlers.current = getExtraMediaHandlers();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      onPlay,
      onPause,
      onEnded,
      onProgress,
      isTransparent,
      initCorvidState,
      updateState,
    ],
  );

  const shouldAudioPlay = audioEnabled && hasAudio;

  const onStop = React.useCallback(() => {
    if (shouldShowTransparentVideoPosterOnStop) {
      tvControllerRef.current?.showPoster();
    }
  }, [shouldShowTransparentVideoPosterOnStop]);

  const {
    videoAPI,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onKeyDown,
    mediaHandler,
    setAudioContext,
    MEDIA_EVENTS,
  } = React.useMemo(
    () =>
      getVideoEvents({
        playerRef,
        videoRef,
        playButtonRef,
        audioRef,
        isMobileView,
        autoplay: accessibleAutoplay,
        hasAudio: shouldAudioPlay,
        hasClick,
        hasRollIn,
        hasAudioRollIn,
        canClickPause,
        canRollPause,
        canReplay,
        extraMediaHandlers: extraMediaHandlers.current || {},
        updateState,
        onStop,
      }),
    [
      isMobileView,
      accessibleAutoplay,
      hasClick,
      hasRollIn,
      hasAudioRollIn,
      canClickPause,
      canRollPause,
      canReplay,
      updateState,
      shouldAudioPlay,
      onStop,
    ],
  );

  /*
   * Set DOM references for controls
   *
   * Visibility event handlers.
   *
   * Will also trigger TV controller's init and play, and destroy on cleanup.
   */
  useIsomorphicLayoutEffect(() => {
    if (isInteractive && playerRef.current) {
      // init Audio
      if (!audioRef.current) {
        audioRef.current = playerRef.current.querySelector('[data-audio-mute]');
      }
    }

    // update state with local value
    setIsPosterOnly(currentIsPosterOnly);

    // when getting partial data reset DOM state
    if (!fillLayers?.video?.videoInfo?.isVideoDataExists && playerRef.current) {
      // Transparent video poster reset
      delete playerRef.current.dataset.showCanvas;
    }

    if (currentIsPosterOnly || (isTransparent && !canPlayTV)) {
      return;
    }

    if (isTransparent || shouldAudioPlay || hasClick) {
      const handlersCleanup = getVisibilityHandlers({
        playerRef,
        videoRef,
        onViewEnter: tvControllerRef.current?.onViewEnter,
        onViewLeave: tvControllerRef.current?.onViewLeave,
      });

      return function cleanup() {
        handlersCleanup?.();
        tvControllerRef.current?.killKampos();
      };
    }
    return;
  }, [isTransparent, canPlayTV, tvControllerRef.current, shouldAudioPlay]);

  /*
   * Video media event handlers
   *
   * Init Corvid state
   */
  React.useEffect(() => {
    if (isTransparent && !canPlayTV) {
      return;
    }

    const videoEl = videoRef.current;
    /*
     * Merge MEDIA_EVENTS with calculated extra handlers
     */
    const activeMediaEvents = new Set(
      Array.from(MEDIA_EVENTS).concat(
        Object.keys(extraMediaHandlers.current || {}).filter(eventType => {
          return (
            extraMediaHandlers.current &&
            extraMediaHandlers.current[eventType] &&
            extraMediaHandlers.current[eventType].length
          );
        }),
      ),
    );

    activeMediaEvents.forEach(eventType => {
      if (!videoEl || currentIsPosterOnly) {
        return;
      }

      if (
        eventType === 'loadeddata' &&
        videoEl.readyState >= videoEl.HAVE_CURRENT_DATA
      ) {
        mediaHandler.handleEvent({ type: eventType } as Event);
        // updateState from corvid is arriving synchronize,
        // exit callstack and wait for video element status to update.
        // we need more than AnimationFrame so using timeout
        window.setTimeout(() => initCorvidState(videoRef.current), 200);
      } else {
        videoEl.addEventListener(eventType, mediaHandler);
      }
    });

    if (setAudioContext && !currentIsPosterOnly) {
      setAudioContext();
    }

    return () => {
      activeMediaEvents.forEach(eventType => {
        if (!videoEl) {
          return;
        }

        videoEl.removeEventListener(eventType, mediaHandler);
      });
    };
  }, [
    isTransparent,
    canPlayTV,
    setAudioContext,
    mediaHandler,
    MEDIA_EVENTS,
    currentIsPosterOnly,
    updateState,
    initCorvidState,
    fillLayers?.video?.videoInfo?.isVideoDataExists,
  ]);

  React.useImperativeHandle(compRef, () => {
    return videoAPI;
  });

  React.useEffect(() => {
    const playerEl = playerRef.current;
    if (!accessibleAutoplay && playerEl) {
      playerEl.removeAttribute('data-playing');
    }
  }, [accessibleAutoplay]);

  return (
    <div
      id={id}
      {...getDataAttributes(props)}
      ref={playerRef}
      className={classNames(
        styles.videobox,
        containerRootClassName,
        className,
        formatClassNames(semanticClassNames.root, ...customClassNames),
      )}
      onClick={isInteractive ? onClick : undefined}
      onMouseEnter={isInteractive ? onMouseEnter : undefined}
      onMouseLeave={isInteractive ? onMouseLeave : undefined}
      onMouseMove={isInteractive ? onMouseMove : undefined}
      onKeyDown={isInteractive ? onKeyDown : undefined}
      data-audio={muted ? 'off' : 'on'}
      data-has-play={isInteractive && (hasClick || hasRollIn) ? '' : undefined}
      data-no-audio={isInteractive && shouldAudioPlay ? undefined : ''}
      data-playing={isInteractive && accessibleAutoplay ? '' : undefined}
      data-stop={isInteractive ? undefined : ''}
      data-animate-poster={isTransparent ? animatePoster : undefined}
      data-has-alpha={isTransparent ? 'true' : undefined}
    >
      <div
        ref={playButtonRef}
        className={classNames(styles.videoboxContainer, {
          [styles.hasCanvas]: isTransparent,
        })}
        tabIndex={0}
        role="button"
        aria-label={`${alt} ${translations.ariaLabel}`}
        aria-pressed={accessibleAutoplay ? 'true' : 'false'}
      >
        <FillLayers
          {...fillLayers}
          getPlaceholder={getPlaceholder}
          reducedMotion={reducedMotion}
          videoRef={videoRef}
          canvasRef={isTransparent ? canvasRef : undefined}
          extraClass={styles.videoboxFill}
        />
      </div>
      {isInteractive ? mediaControls : null}
    </div>
  );
};

export default VideoBoxCommon;
