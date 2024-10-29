import React from 'react';
import type { MenuItemProps } from '@wix/editor-elements-definitions';
import Submenu from '../../../../Submenu/viewer/Submenu';
import DropdownMMCI from '../../../../MegaMenuContainerItem/viewer/skinComps/Dropdown/Dropdown.skin';
import classes from './Dropdown.scss';
import { dropdownMenuSkinParams } from '../../../skinParams/dropdownMenuSkinParams';
import type { MenuOrientationType } from '../../../Menu.types';

type VirtualDropdownProps = {
  item: MenuItemProps;
  menuOrientation: MenuOrientationType;
  className?: string;
  children?: React.ReactNode;
};

const attachedDropdownMenuCssVariables = Object.fromEntries(
  Object.keys(dropdownMenuSkinParams).map(param => [`--${param}`, 'initial']),
);

export const Dropdown = ({
  item,
  menuOrientation,
  className,
  children,
}: VirtualDropdownProps) => {
  return (
    <div style={attachedDropdownMenuCssVariables} className={className}>
      {children ?? (
        <DropdownMMCI
          id={`${item.id}-dropdown`}
          containerRootClassName={classes.dropdown}
          menuOrientation={menuOrientation}
          parentType="wixui.Menu"
          parentStylableClassName=""
          containerProps={{
            containerLayoutClassName: `${item.id}-container`,
            hasOverflow: false,
            overlowWrapperClassName: `${item.id}-overflow-wrapper`,
          }}
        >
          {() => {
            return <Submenu id={`${item.id}-submenu`} />;
          }}
        </DropdownMMCI>
      )}
    </div>
  );
};
