import * as React from 'react';
import { replaceCompIdPlaceholderInSvgContent } from '@wix/editor-elements-common-utils';
import VectorImage from '@wix/editor-elements-library/src/components/VectorImage/viewer/VectorImage';
import { VideoBoxAudioProps } from '../../VideoBox/VideoBox.types';
import { TestIds } from '../../VideoBox/viewer/constants';
import styles from '../../VideoBox/viewer/style/VideoBox.scss';

const VideoBoxAudio: React.FC<VideoBoxAudioProps> = ({
  id,
  translations,
  audioOnIcon,
  audioOffIcon,
  audioEnabled,
  autoplay,
  reducedMotion = false,
}) => {
  const accessibleAutoplay = autoplay && !reducedMotion;

  replaceCompIdPlaceholderInSvgContent(audioOnIcon, id);
  replaceCompIdPlaceholderInSvgContent(audioOffIcon, id);

  return audioEnabled ? (
    <div
      id={id}
      className={styles.videoboxAudio}
      tabIndex={0}
      role="button"
      aria-label={translations.ariaLabel}
      aria-pressed={accessibleAutoplay ? 'true' : 'false'}
      data-testid={TestIds.audio}
      data-audio-mute=""
    >
      <VectorImage
        id={`audioOn-${id}`}
        containerClass={styles.videoboxAudioIcon}
        className={styles.videoboxAudioOn}
        {...audioOnIcon}
      />
      <VectorImage
        id={`audioOff-${id}`}
        containerClass={styles.videoboxAudioIcon}
        className={styles.videoboxAudioOff}
        {...audioOffIcon}
      />
    </div>
  ) : (
    <div id={id} />
  );
};

export default VideoBoxAudio;
