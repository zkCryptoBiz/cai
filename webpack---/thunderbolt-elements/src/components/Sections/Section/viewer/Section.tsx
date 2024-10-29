import * as React from 'react';
import classnames from 'clsx';
import {
  formatClassNames,
  useVideoAPI,
  getDataAttributes,
  getTabIndexAttribute,
} from '@wix/editor-elements-common-utils';
import type { MediaContainerVideoAPI } from '@wix/editor-elements-types/components';
import type { ISectionProps } from '../Section.types';
import { TestIds } from '../constants';
import BackgroundX from '../../../BackgroundX/viewer/BackgroundX';
import ShapeDividers from '../../../MediaContainers/ShapeDividers/viewer/shapeDividers';
import sectionSemanticClassNames from '../Section.semanticClassNames';
import style from './styles/Section.scss';

const Section: React.ForwardRefRenderFunction<
  MediaContainerVideoAPI,
  ISectionProps
> = (props, compRef) => {
  const {
    id,
    skin = 'RectangleArea',
    className,
    containerRootClassName = '',
    customClassNames = [],
    containerProps,
    children,
    fillLayers = props.fillLayers || props.background,
    tagName,
    getPlaceholder,
    dividers,
    semanticClassNames,
    onStop,
    onClick,
    onDblClick,
    onMouseEnter,
    onMouseLeave,
  } = props;
  const TagName = tagName || ('section' as keyof JSX.IntrinsicElements);
  const { shouldOmitWrapperLayers } = containerProps;
  const classNames = classnames(
    style[skin],
    containerRootClassName,
    className,
    semanticClassNames
      ? formatClassNames(semanticClassNames.root, ...customClassNames)
      : formatClassNames(sectionSemanticClassNames.root, ...customClassNames),
    {
      [style.shouldOmitWrapperLayers]: shouldOmitWrapperLayers,
    },
  );
  const hasVideo = !!fillLayers?.video;
  const videoRef = useVideoAPI(compRef, hasVideo, onStop);
  return (
    <TagName
      id={id}
      {...getDataAttributes(props)}
      {...getTabIndexAttribute(props.a11y || { tabIndex: -1 })}
      data-block-level-container="Section"
      className={classNames}
      data-testid={TestIds.section}
      onClick={onClick}
      onDoubleClick={onDblClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {fillLayers && (
        <BackgroundX
          {...fillLayers}
          videoRef={videoRef}
          getPlaceholder={getPlaceholder}
        />
      )}
      {dividers && <ShapeDividers {...dividers} />}
      {
        children() // contains: (1) ResponsiveContainer with relative children, (2) DynamicStructureContainer with pinned children
      }
    </TagName>
  );
};

export default React.forwardRef(Section);
