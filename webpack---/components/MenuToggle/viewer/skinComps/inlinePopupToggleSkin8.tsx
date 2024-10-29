import classNames from 'clsx';
import type { ComponentType } from 'react';
import React from 'react';
import type { IMenuToggleProps } from '../../MenuToggle.types';
import styles from './inlinePopupToggleSkin8.scss';

type InlinePopupProps = Pick<IMenuToggleProps, 'isOpen'>;

const InlinePopupToggleSkin8: ComponentType<InlinePopupProps> = ({
  isOpen,
}) => {
  return (
    <div className={classNames(styles.menuBtn, isOpen && styles.toggleOpen)}>
      <span />
    </div>
  );
};

export default InlinePopupToggleSkin8;
