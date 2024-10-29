import * as React from 'react';
import { Image as PixelPerfectImage } from '@wix/image';
import type { ImageProps } from '@wix/image';
import styles from './style/Image.scss';
import classNames from 'clsx';

export type ResponsiveImageProps = {
  srcset?: string;
  css?: {
    img?: Record<string, number | string>;
    container?: Record<string, number | string>;
  };
};

const Image: React.FC<
  ImageProps & {
    responsiveImageProps?: ResponsiveImageProps;
    zoomedImageResponsiveOverride?: ResponsiveImageProps;
  }
> = props => {
  const {
    id,
    uri,
    alt,
    role,
    className,
    imageStyles = {},
    targetWidth,
    targetHeight,
    onLoad,
    onError,
    containerWidth,
    containerHeight,
    isInFirstFold,
    socialAttrs,
    skipMeasure,
    responsiveImageProps,
    zoomedImageResponsiveOverride,
  } = props;

  const effectiveWidth = targetWidth || containerWidth;
  const effectiveHeight = targetHeight || containerHeight;
  const sizeAttribute = `${effectiveWidth}px`;

  if (!(responsiveImageProps?.css && responsiveImageProps?.srcset)) {
    return <PixelPerfectImage {...props} />;
  }

  return (
    <img
      // @ts-expect-error fetchpriority type should work in react > 18.3 https://github.com/facebook/react/pull/25927
      fetchpriority={isInFirstFold ? 'high' : undefined}
      loading={isInFirstFold === false ? 'lazy' : undefined}
      sizes={sizeAttribute}
      srcSet={
        skipMeasure
          ? zoomedImageResponsiveOverride?.srcset
          : responsiveImageProps?.srcset
      }
      id={id}
      src={uri}
      alt={alt || ''}
      role={role}
      style={{
        ...imageStyles,
        ...(skipMeasure
          ? { ...zoomedImageResponsiveOverride?.css?.img }
          : { ...responsiveImageProps?.css?.img }),
      }}
      onLoad={onLoad}
      onError={onError}
      className={classNames(className, styles.image)}
      width={effectiveWidth}
      height={effectiveHeight}
      {...socialAttrs}
    />
  );
};

export default Image;
