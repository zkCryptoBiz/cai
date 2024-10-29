import * as React from 'react';
import {
  VideoBoxActions,
  VideoBoxResponsiveProps,
} from '../../../VideoBox.types';
import ResponsiveContainer from '../../../../../../thunderbolt-core-components/ResponsiveContainer/viewer/ResponsiveContainer';
import VideoBoxCommon from '../../VideoBoxCommon';
import styles from '../../style/VideoBox.scss';

const VideoBoxResponsive: React.ForwardRefRenderFunction<
  VideoBoxActions,
  VideoBoxResponsiveProps
> = (props: VideoBoxResponsiveProps, compRef) => {
  const mediaControlsContainer = (
    <ResponsiveContainer
      {...props.responsiveContainerProps}
      extraRootClass={styles.mediaControlsContainer}
    >
      {props.children}
    </ResponsiveContainer>
  );

  return (
    <VideoBoxCommon
      {...props}
      compRef={compRef}
      mediaControls={mediaControlsContainer}
    />
  );
};

export default React.forwardRef(VideoBoxResponsive);
