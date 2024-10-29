import React from 'react';

import ScrollButton from '../ScrollButton/ScrollButton';
import type { ScrollControlsProps } from '../../../Menu.types';
import { testIds } from '../../constants';
import classes from './ScrollControls.scss';

export const ScrollControls: React.FC<ScrollControlsProps> = props => {
  const {
    isScrollLeftButtonShown,
    isScrollRightButtonShown,
    scrollPageToTheRight: scrollNextPage,
    scrollPageToTheLeft: scrollPrevPage,
    previewState,
  } = props;

  return (
    <div className={classes.root}>
      <ScrollButton
        side="left"
        onClick={scrollPrevPage}
        isHidden={!isScrollLeftButtonShown}
        dataTestId={testIds.scrollPageToTheLeft}
        previewState={previewState}
      />
      <ScrollButton
        side="right"
        onClick={scrollNextPage}
        isHidden={!isScrollRightButtonShown}
        dataTestId={testIds.scrollPageToTheRight}
        previewState={previewState}
      />
    </div>
  );
};
