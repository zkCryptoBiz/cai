import classNames from 'clsx';
import type { ComponentType } from 'react';
import React from 'react';
import type { IMenuToggleProps } from '../../MenuToggle.types';
import styles from './inlinePopupToggleSkin16.scss';

type InlinePopupProps = Pick<IMenuToggleProps, 'isOpen'>;

const InlinePopupToggleSkin16: ComponentType<InlinePopupProps> = ({
  isOpen,
}) => {
  return (
    <div
      className={classNames(styles.menuButton2, isOpen && styles.toggleOpen)}
    >
      <div className={classNames(styles.top2, styles.bar)} />
      <div className={classNames(styles.middle2, styles.bar)} />
      <div className={classNames(styles.bottom2, styles.bar)} />
    </div>
  );
};

export default InlinePopupToggleSkin16;
