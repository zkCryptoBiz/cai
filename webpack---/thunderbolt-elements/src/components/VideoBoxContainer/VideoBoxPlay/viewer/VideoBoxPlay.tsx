import * as React from 'react';
import { replaceCompIdPlaceholderInSvgContent } from '@wix/editor-elements-common-utils';
import VectorImage from '@wix/editor-elements-library/src/components/VectorImage/viewer/VectorImage';
import { VideoBoxPlayProps } from '../../VideoBox/VideoBox.types';
import styles from '../../VideoBox/viewer/style/VideoBox.scss';

const VideoBoxPlay: React.FC<VideoBoxPlayProps> = ({
  id,
  vectorImageProps,
  shouldRender,
  reducedMotion = false,
}) => {
  replaceCompIdPlaceholderInSvgContent(vectorImageProps, id);

  return (
    <div id={id}>
      {(shouldRender || reducedMotion) && (
        <VectorImage
          id={`play-${id}`}
          className={styles.videoboxPlay}
          {...vectorImageProps}
        />
      )}
    </div>
  );
};

export default VideoBoxPlay;
