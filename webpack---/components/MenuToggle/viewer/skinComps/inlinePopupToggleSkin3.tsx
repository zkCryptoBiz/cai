import classNames from 'clsx';
import type { ComponentType } from 'react';
import React from 'react';
import type { IMenuToggleProps } from '../../MenuToggle.types';
import styles from './inlinePopupToggleSkin3.scss';

type InlinePopupProps = Pick<IMenuToggleProps, 'isOpen'>;

const InlinePopupToggleSkin3: ComponentType<InlinePopupProps> = ({
  isOpen,
}) => {
  return (
    <div
      className={classNames(styles.menuButton3, isOpen && styles.toggleOpen)}
    >
      <div className={classNames(styles.top3, styles.bar, styles.left3)} />
      <div className={classNames(styles.top3, styles.bar, styles.right3)} />
      <div className={classNames(styles.middle3, styles.bar)} />
      <div className={classNames(styles.middle4, styles.bar)} />
      <div className={classNames(styles.bottom3, styles.bar, styles.left3)} />
      <div className={classNames(styles.bottom3, styles.bar, styles.right3)} />
    </div>
  );
};

export default InlinePopupToggleSkin3;
