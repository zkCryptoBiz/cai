import classNames from 'clsx';
import type { ComponentType } from 'react';
import React from 'react';
import type { IMenuToggleProps } from '../../MenuToggle.types';
import styles from './inlinePopupToggleSkin6.scss';

type InlinePopupProps = Pick<IMenuToggleProps, 'isOpen'>;

const InlinePopupToggleSkin6: ComponentType<InlinePopupProps> = ({
  isOpen,
}) => {
  return (
    <div className={classNames(styles.menu, isOpen && styles.toggleOpen)}>
      <div className={classNames(styles.pix)} />
      <div className={classNames(styles.pix)} />
      <div className={classNames(styles.pix)} />
      <div className={classNames(styles.pix)} />
      <div className={classNames(styles.pix)} />
      <div className={classNames(styles.pix)} />
      <div className={classNames(styles.pix)} />
      <div className={classNames(styles.pix)} />
      <div className={classNames(styles.pix)} />
    </div>
  );
};

export default InlinePopupToggleSkin6;
