import type { ImageAttributesData } from '@wix/image';
import React from 'react';
import type { IImageXProps } from '../ImageX.types';

const getPictureSource = (
  sourceSets: IImageXProps['imageInfo']['sourceSets'],
  sourceSetPlaceholders?: Array<ImageAttributesData>,
) =>
  sourceSets.map((srcSet: (typeof sourceSets)[number], i: number) => {
    const src = sourceSetPlaceholders?.[i]?.uri || undefined;
    return (
      <source
        key={i}
        media={srcSet.mediaQuery}
        srcSet={srcSet.src || src}
        suppressHydrationWarning
      />
    );
  });

const ImageWithPlaceholder: React.FC<{
  id: IImageXProps['id'];
  imageInfo: IImageXProps['imageInfo'];
  defaultSrc: IImageXProps['defaultSrc'];
  hasSsrSrc: string;
  defaultPlaceholder?: ImageAttributesData;
  sourceSetPlaceholders?: Array<ImageAttributesData>;
  className?: string;
  isInFirstFold?: boolean;
}> = ({
  id,
  imageInfo,
  defaultSrc,
  hasSsrSrc,
  defaultPlaceholder,
  sourceSetPlaceholders,
  className,
  isInFirstFold,
}) => {
  const src = defaultPlaceholder?.uri || undefined;
  const placeholderStyle = defaultPlaceholder?.css?.img || {};
  // height is already handled - the fixed pixel size we get is messing up layout
  delete placeholderStyle.height;
  delete placeholderStyle.width;
  const isResponsive = 'true';

  return (
    <wow-image
      id={`img-${id}`}
      data-is-responsive={isResponsive}
      data-image-info={JSON.stringify({ ...imageInfo, containerId: id })}
      data-has-ssr-src={hasSsrSrc}
      data-motion-part="BG_IMG"
      class={className}
    >
      <picture>
        {imageInfo.sourceSets &&
          getPictureSource(imageInfo.sourceSets, sourceSetPlaceholders)}
        <img
          loading={isInFirstFold === false ? 'lazy' : undefined}
          // @ts-expect-error fetchpriority type should work in react > 18.3 https://github.com/facebook/react/pull/25927
          fetchpriority={isInFirstFold === true ? 'high' : undefined}
          src={src || defaultSrc}
          alt={imageInfo.imageData.alt}
          style={placeholderStyle}
          // The src attribute triggers a mismatch warning because wow-image updates its src outside of the React lifecycle. This causes React to retain the old value in the virtual DOM, which could potentially lead to a bug where the old value is re-rendered during updates. However, we’re confident that this issue is not reproducing in current (16-18) React versions
          suppressHydrationWarning
        />
      </picture>
    </wow-image>
  );
};

export const PixelPerfectImage: React.FC<{
  id: IImageXProps['id'];
  imageInfo: IImageXProps['imageInfo'];
  defaultSrc: IImageXProps['defaultSrc'];
  getPlaceholder?: IImageXProps['getPlaceholder'];
  className?: string;
  imageLayerClass?: string;
  isInFirstFold?: boolean;
}> = ({
  id,
  imageInfo,
  defaultSrc,
  getPlaceholder,
  className,
  imageLayerClass,
  isInFirstFold,
}) => {
  let hasSsrSrc = '';
  const imagePlaceholderData = React.useRef<{
    defaultSrc: ImageAttributesData;
    sourceSet: Array<ImageAttributesData>;
  } | null>(null);

  if (!imagePlaceholderData.current) {
    if (getPlaceholder) {
      hasSsrSrc = 'true';

      imagePlaceholderData.current = {
        defaultSrc: getPlaceholder({
          fittingType: imageInfo.imageData.displayMode || 'fill',
          src: {
            id: imageInfo.imageData.uri,
            width: imageInfo.imageData.width,
            height: imageInfo.imageData.height,
            crop: imageInfo.imageData.crop,
            name: imageInfo.imageData.name,
            focalPoint: imageInfo.imageData.focalPoint,
          },
          target: {
            alignment: imageInfo.alignType,
            htmlTag: 'img',
          },
          options: {
            hasAnimation: imageInfo?.hasAnimation,
          },
        }),
        sourceSet: imageInfo.sourceSets?.map((imageData: any) =>
          getPlaceholder({
            fittingType: imageData.displayMode,
            src: {
              id: imageInfo.imageData.uri,
              width: imageInfo.imageData.width,
              height: imageInfo.imageData.height,
              crop: imageData.crop,
              name: imageInfo.imageData.name,
              focalPoint: imageData.focalPoint,
            },
            target: {
              alignment: imageInfo.alignType,
              htmlTag: 'img',
            },
          }),
        ),
      };
    } else {
      // to keep an empty placeholder data
      imagePlaceholderData.current = {
        defaultSrc: {
          uri: '',
          css: { img: {}, container: {} },
          attr: { img: {}, container: {} },
          transformed: false,
        },
        sourceSet: [],
      };
    }
  }
  const defaultPlaceholder = imagePlaceholderData.current?.defaultSrc;
  const sourceSetPlaceholders = imagePlaceholderData.current?.sourceSet;

  return (
    <div className={className} data-motion-part="BG_MEDIA">
      <ImageWithPlaceholder
        {...{
          id,
          imageInfo,
          defaultSrc,
          hasSsrSrc,
          defaultPlaceholder,
          sourceSetPlaceholders,
          className: imageLayerClass,
          isInFirstFold,
        }}
      />
    </div>
  );
};
