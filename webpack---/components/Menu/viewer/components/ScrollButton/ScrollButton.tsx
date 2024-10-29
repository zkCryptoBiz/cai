import classNames from 'clsx';
import React from 'react';
import type { ScrollButtonProps } from '../../../Menu.types';
import classes from './ScrollButton.scss';
import semanticClassNames from '../../../Menu.semanticClassNames';
import { formatClassNames } from '@wix/editor-elements-common-utils';

const iconClasses = classNames(
  classes.icon,
  formatClassNames(semanticClassNames.scrollButtonIcon),
);

const ScrollButton: React.FC<ScrollButtonProps> = props => {
  const {
    className: propClassName,
    onClick,
    side,
    isHidden,
    dataTestId,
    previewState,
  } = props;

  const rootClassName = classNames(
    classes.root,
    propClassName,
    isHidden ? classes.hidden : classes.visible,
    side === 'left' && classes.flipHorizontal,
    formatClassNames(semanticClassNames.scrollButton),
  );

  return (
    <div
      onClick={onClick}
      aria-hidden="true"
      aria-label="scroll"
      className={rootClassName}
      data-menu-scroll-action="page"
      data-testid={dataTestId}
      data-hidden={isHidden}
      data-preview={previewState}
    >
      <span className={iconClasses}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 12">
          <path d="M6 6L.8 0 0 .7 4.7 6 0 11.3l.8.7z" />
        </svg>
      </span>
    </div>
  );
};

export default ScrollButton;
