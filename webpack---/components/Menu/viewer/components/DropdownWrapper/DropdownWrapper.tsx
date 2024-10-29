import type { PropsWithChildren } from 'react';
import cn from 'clsx';
import React from 'react';
import { useMenuItemContext } from '../../../../../common/menu/MenuItemContext';
import { dataSelectors } from '../MenuItem/showDropdown';
import classes from '../MenuItem/style/MenuItem.scss';
import { testIds } from '../../constants';
import { formatClassNames } from '@wix/editor-elements-common-utils';
import dropdownSemanticClassNames from '../../../../Submenu/Submenu.semanticClassNames';
import type { MenuOrientationType } from '../../../Menu.types';

type DropdownWrapperProps = PropsWithChildren<{
  id: string;
  menuOrientation?: MenuOrientationType;
  className?: string;
  dataAttributes?: any;
}>;

export const DropdownWrapper: React.FC<DropdownWrapperProps> = ({
  id,
  className,
  dataAttributes,
  children,
  menuOrientation = 'horizontal',
}) => {
  const { item } = useMenuItemContext();
  const dropdownRootClasses = cn(
    className,
    menuOrientation === 'horizontal'
      ? classes.horizontalDropdown
      : classes.verticalDropdown,
    formatClassNames(dropdownSemanticClassNames.root),
  );

  return (
    <div
      id={id}
      {...dataAttributes}
      className={dropdownRootClasses}
      role="group"
      aria-label={item.label}
      data-testid={testIds.childrenWrapper}
      {...{ [dataSelectors.dropdown]: true }}
    >
      {children}
    </div>
  );
};
