import classNames from 'clsx';
import type { ComponentType } from 'react';
import React from 'react';
import type { IMenuToggleProps } from '../../MenuToggle.types';
import styles from './inlinePopupToggleSkin2.scss';

type InlinePopupProps = Pick<IMenuToggleProps, 'isOpen'>;

const InlinePopupToggleSkin2: ComponentType<InlinePopupProps> = ({
  isOpen,
}) => {
  return (
    <div
      className={classNames(styles.wrapperMenu, isOpen && styles.toggleOpen)}
    >
      <div className={classNames(styles.lineMenu, styles.half, styles.start)} />
      <div className={classNames(styles.lineMenu, styles.mid)} />
      <div className={classNames(styles.lineMenu, styles.half, styles.end)} />
    </div>
  );
};

export default InlinePopupToggleSkin2;
