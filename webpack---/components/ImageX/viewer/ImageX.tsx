import * as React from 'react';
import classNames from 'clsx';
import {
  formatClassNames,
  getDataAttributes,
  getTabIndexAttribute,
  useAnalyticsReportClicks,
} from '@wix/editor-elements-common-utils';
import Link from '@wix/thunderbolt-elements/components/Link';
import type { IImageXProps } from '../ImageX.types';
import { TestIds } from '../constants';

import semanticClassNames from '../ImageX.semanticClassNames';
import { ImageLayer } from './ImageX.imageLayer';

import style from './style/ImageX.scss';
import { getDisplayModeStyle } from './ImageX.utils';

const ImageX: React.FC<IImageXProps> = (props: IImageXProps) => {
  const {
    id,
    pageId,
    skin,
    className,
    customClassNames = [],
    link,
    showLink,
    imageInfo,
    aspectRatio,
    useNativeAspectRatio,
    hasScrollEffects,
    scrollEffectStyles,
    onClick,
    onDblClick,
    onMouseEnter,
    onMouseLeave,
    reportBiOnClick,
    shouldUseResponsiveImages,
    sources,
    defaultSrc,
    getPlaceholder,
    isInFirstFold,
    objectFit,
    a11y,
  } = props;
  const dataAttributes = getDataAttributes(props);

  const imageLayerProps = {
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
    imageLayerClass: style.imageLayer,
  };

  const displayModeStyles = getDisplayModeStyle(
    id,
    imageInfo.imageData.displayMode,
    aspectRatio,
    useNativeAspectRatio,
  );

  const _onClick = useAnalyticsReportClicks({
    onClick,
    reportBiOnClick,
  });

  const hasLink = link && showLink;

  return (
    <div
      id={id}
      {...dataAttributes}
      {...getTabIndexAttribute(a11y)}
      data-testid={TestIds.root}
      className={classNames(
        style[useNativeAspectRatio ? skin : `${skin}Legacy`],
        className,
        shouldUseResponsiveImages && style.responsiveImg,
        formatClassNames(semanticClassNames.root, ...customClassNames),
      )}
      onClick={onClick || hasLink ? _onClick : undefined}
      onDoubleClick={onDblClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-motion-part="BG_LAYER"
    >
      {displayModeStyles ? (
        <style data-testid={TestIds.displayModeStyle}>
          {displayModeStyles}
        </style>
      ) : null}
      {hasLink ? (
        <Link
          {...link}
          className={classNames(
            style.imageStyling,
            !useNativeAspectRatio ? 'has-custom-focus' : '',
          )}
        >
          <ImageLayer {...imageLayerProps} className={style.linkedImage} />
        </Link>
      ) : (
        <ImageLayer {...imageLayerProps} className={style.imageStyling} />
      )}
    </div>
  );
};

export default ImageX;
