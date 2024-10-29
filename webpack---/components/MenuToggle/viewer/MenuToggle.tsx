import classNames from 'clsx';
import * as React from 'react';
import {
  formatClassNames,
  getDataAttributes,
} from '@wix/editor-elements-common-utils';
import type { IMenuToggleProps } from '../MenuToggle.types';
import semanticClassNames from '../WIP_MenuToggle.semanticClassNames';
import styles from './skinComps/inlinePopupToggleCommon.scss';
import { MenuToggleSkinMap } from './skinMap';

const MenuToggle: React.FC<IMenuToggleProps> = props => {
  const {
    id,
    customClassNames = [],
    skin = 'inlinePopupToggleSkin1',
    isOpen = false,
    className,
    onClick,
    onKeyDown,
    onMouseEnter,
    onMouseLeave,
    translations,
  } = props;

  const menuToggleRef = React.useRef<HTMLDivElement>(null);

  if (!isOpen) {
    menuToggleRef.current?.focus();
  }

  const ariaLabels = {
    openMenu: translations.ariaLabelOpen || 'Open navigation menu',
    closeMenu: translations.ariaLabelClose || 'Close',
  };

  const MenuToggleContent = MenuToggleSkinMap[skin];
  return (
    <div
      id={id}
      {...getDataAttributes(props)}
      className={classNames(
        styles.menuToggle,
        isOpen && styles.toggleOpen,
        className,
        formatClassNames(semanticClassNames.root, ...customClassNames),
      )}
      ref={menuToggleRef}
      role="button"
      aria-haspopup="dialog"
      aria-label={`${isOpen ? ariaLabels.closeMenu : ariaLabels.openMenu}`}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={classNames(
          styles.buttonContainer,
          isOpen && styles.toggleOpen,
        )}
      >
        <MenuToggleContent isOpen={isOpen} />
      </div>
    </div>
  );
};

export default MenuToggle;
