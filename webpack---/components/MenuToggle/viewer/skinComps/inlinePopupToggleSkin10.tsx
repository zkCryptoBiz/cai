import classNames from 'clsx';
import type { ComponentType } from 'react';
import React from 'react';
import type { IMenuToggleProps } from '../../MenuToggle.types';
import styles from './inlinePopupToggleSkin10.scss';

type InlinePopupProps = Pick<IMenuToggleProps, 'isOpen'>;

const InlinePopupToggleSkin10: ComponentType<InlinePopupProps> = ({
  isOpen,
}) => {
  return (
    <div
      className={classNames(
        styles.icon,
        styles.menu6,
        isOpen && styles.toggleOpen,
      )}
    >
      <span />
      <span />
    </div>
  );
};

export default InlinePopupToggleSkin10;
