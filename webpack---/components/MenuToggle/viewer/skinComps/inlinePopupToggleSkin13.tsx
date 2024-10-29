import classNames from 'clsx';
import type { ComponentType } from 'react';
import React from 'react';
import type { IMenuToggleProps } from '../../MenuToggle.types';
import styles from './inlinePopupToggleSkin13.scss';

type InlinePopupProps = Pick<IMenuToggleProps, 'isOpen'>;

const InlinePopupToggleSkin13: ComponentType<InlinePopupProps> = ({
  isOpen,
}) => {
  return (
    <div className={classNames(styles.btn, isOpen && styles.toggleOpen)}>
      <div className={classNames(styles.line, styles.tp)} />
      <div className={classNames(styles.line, styles.ct)} />
      <div className={classNames(styles.line, styles.bt)} />
    </div>
  );
};

export default InlinePopupToggleSkin13;
