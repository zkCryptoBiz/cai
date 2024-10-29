import classNames from 'clsx';
import type { ComponentType } from 'react';
import React from 'react';
import type { IMenuToggleProps } from '../../MenuToggle.types';
import styles from './inlinePopupToggleSkin7.scss';

type InlinePopupProps = Pick<IMenuToggleProps, 'isOpen'>;

const InlinePopupToggleSkin7: ComponentType<InlinePopupProps> = ({
  isOpen,
}) => {
  return (
    <div className={classNames(styles.hamburger, isOpen && styles.toggleOpen)}>
      <span />
      <span />
      <span />
    </div>
  );
};

export default InlinePopupToggleSkin7;
