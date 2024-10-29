import React from 'react';
import { TestIds } from '../constants';
import type { IImageXProps, ResponsiveImageStyle } from '../ImageX.types';
import { getMediaUrlByContext } from './ImageX.utils';

export const ResponsiveImage: React.FC<{
  isInFirstFold: IImageXProps['isInFirstFold'];
  sources: IImageXProps['sources'];
  imageInfo: IImageXProps['imageInfo'];
  objectFit?: IImageXProps['objectFit'];
  className?: string;
}> = ({
  sources,
  isInFirstFold,
  imageInfo,
  objectFit = 'cover',
  className,
}) => {
  const defaultHeightAttribute = sources[sources.length - 1].heightAttribute;
  const defaultWidthAttribute = sources[sources.length - 1].widthAttribute;
  const { uri, alt } = imageInfo.imageData;
  const defaultSrc = getMediaUrlByContext(uri);

  return (
    <picture data-testId={TestIds.pictureElement} className={className}>
      {sources!.map(
        ({ srcset, media, sizes, heightAttribute, widthAttribute }) => (
          <source
            sizes={sizes}
            srcSet={srcset}
            media={media}
            height={heightAttribute}
            width={widthAttribute}
            suppressHydrationWarning
          />
        ),
      )}

      <img
        {...(isInFirstFold ? { fetchpriority: 'high' } : { loading: 'lazy' })}
        src={defaultSrc}
        alt={alt}
        height={defaultHeightAttribute}
        width={defaultWidthAttribute}
        style={
          { '--responsive-img-object-fit': objectFit } as ResponsiveImageStyle
        }
      />
    </picture>
  );
};
