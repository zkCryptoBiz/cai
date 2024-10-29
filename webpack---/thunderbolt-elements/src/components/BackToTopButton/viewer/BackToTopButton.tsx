import React from 'react';
import classNamesFn from 'clsx';
import {
  debounce,
  getDataAttributes,
  replaceCompIdPlaceholder,
} from '@wix/editor-elements-common-utils';

import { useScrollPosition } from '../../../providers/useScrollPosition';
import { IBackToTopButtonProps } from '../BackToTopButton.types';
import { TestIds } from '../constants';
import style from './style/BackToTopButton.scss';

const BACK_TO_TOP_HIDE_DELAY = 3000;

const scrollToTop = () => {
  window.scroll({ top: 0, left: 0, behavior: 'smooth' });
};

const BackToTopButton: React.FC<IBackToTopButtonProps> = props => {
  const {
    id,
    svgContent,
    isVisible,
    onHide,
    onShow,
    scrollBreakpoint,
    className,
  } = props;
  const hide = debounce(() => {
    onHide();
  }, BACK_TO_TOP_HIDE_DELAY);

  const onScroll = (pageYOffset: number) => {
    const isZoomed = false; // FIXME - how are we gonna handle runtime/client-only props? https://github.com/wix-private/santa/blob/3ec15fea98aaad88b399d62447deb7a18b0ee03a/packages/warmupUtils/src/main/siteData/MobileDeviceAnalyzer.js#L319
    if (!isVisible && pageYOffset > scrollBreakpoint && isZoomed === false) {
      onShow();
      hide();
    }
  };

  useScrollPosition(
    ({ currPos }) => onScroll(Math.abs(currPos.y)),
    [isVisible],
  );
  const classes = classNamesFn(style.root, className, {
    [style.visible]: isVisible,
  });
  return (
    <div
      id={id}
      {...getDataAttributes(props)}
      className={classes}
      onClick={scrollToTop}
      data-testid={TestIds.BackToTopButtonRoot}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: svgContent && replaceCompIdPlaceholder(svgContent, id),
        }}
        className={style.content}
        data-testid={TestIds.BackToTopButtonSvg}
      />
    </div>
  );
};

export default BackToTopButton;
