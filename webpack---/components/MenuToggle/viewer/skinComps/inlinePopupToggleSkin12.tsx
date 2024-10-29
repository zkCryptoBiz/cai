import classNames from 'clsx';
import type { ComponentType } from 'react';
import React from 'react';
import type { IMenuToggleProps } from '../../MenuToggle.types';
import styles from './inlinePopupToggleSkin12.scss';

type InlinePopupProps = Pick<IMenuToggleProps, 'isOpen'>;

const InlinePopupToggleSkin12: ComponentType<InlinePopupProps> = ({
  isOpen,
}) => {
  return (
    <div className={classNames(styles.menuButton, isOpen && styles.toggleOpen)}>
      <div className={classNames(styles.menuButtonLine)} />
      <div className={classNames(styles.menuButtonLine)} />
      <div className={classNames(styles.menuButtonLine)} />
    </div>
  );
};

export default InlinePopupToggleSkin12;
