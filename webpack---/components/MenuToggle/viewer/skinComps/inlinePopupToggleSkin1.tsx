import classNames from 'clsx';
import type { ComponentType } from 'react';
import React from 'react';
import type { IMenuToggleProps } from '../../MenuToggle.types';
import styles from './inlinePopupToggleSkin1.scss';

type InlinePopupProps = Pick<IMenuToggleProps, 'isOpen'>;

const InlinePopupToggleSkin1: ComponentType<InlinePopupProps> = ({
  isOpen,
}) => {
  return (
    <span
      className={classNames(styles.toggleButton, isOpen && styles.toggleOpen)}
    />
  );
};

export default InlinePopupToggleSkin1;
