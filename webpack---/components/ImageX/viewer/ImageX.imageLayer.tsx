import React from 'react';
import type { ImageLayerProps } from '../ImageX.types';
import { PixelPerfectImage } from './ImageX.pixelPerfectImage';
import { ResponsiveImage } from './ImageX.responsiveImage';
import { ScrollEffectLayer } from './ImageX.scrollEffectLayer';

export const ImageLayer: React.FC<ImageLayerProps> = ({
  className,
  id,
  pageId,
  imageInfo,
  defaultSrc,
  getPlaceholder,
  hasScrollEffects,
  scrollEffectStyles,
  sources,
  isInFirstFold,
  objectFit,
  shouldUseResponsiveImages,
  imageLayerClass,
}) => {
  if (shouldUseResponsiveImages && sources?.length > 0) {
    return (
      <ResponsiveImage
        {...{
          sources,
          isInFirstFold,
          imageInfo,
          objectFit,
          className,
        }}
      />
    );
  } else if (hasScrollEffects) {
    return (
      <ScrollEffectLayer
        containerId={id}
        pageId={pageId}
        scrollEffectStyles={scrollEffectStyles}
        id={id}
        className={className}
      >
        <PixelPerfectImage
          {...{
            id,
            imageInfo,
            defaultSrc,
            getPlaceholder,
            isInFirstFold,
          }}
        />
      </ScrollEffectLayer>
    );
  } else {
    return (
      <PixelPerfectImage
        {...{
          id,
          imageInfo,
          defaultSrc,
          getPlaceholder,
          className,
          isInFirstFold,
          imageLayerClass,
        }}
      />
    );
  }
};
