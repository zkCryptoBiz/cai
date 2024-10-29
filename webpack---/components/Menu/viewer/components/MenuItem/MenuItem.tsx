import React, { useEffect, useRef, useState, useMemo } from 'react';
import classNames from 'clsx';
import { formatClassNames } from '@wix/editor-elements-common-utils';
import type { IMenuItemProps } from '../../../Menu.types';
import { MenuItemContext } from '../../../../../common/menu/MenuItemContext';
import { createEventListeners } from './utils';
import { showDropdown } from './showDropdown';
import classes from './style/MenuItem.scss';
import { testIds } from '../../constants';
import shmSemanticClassNames from '../../../../StylableHorizontalMenu/StylableHorizontalMenu.semanticClassNames';
import { Dropdown } from '../Dropdown';
import type { MenuItemProps } from '@wix/editor-elements-definitions';
import { MenuItemLabel } from './MenuItemLabel';

const itemWrapperClassName = classNames(
  classes.itemWrapper,
  formatClassNames(shmSemanticClassNames.menuItemWrapper),
);

function HorizontalDropdown(props: {
  onEscKeyDown: () => void;
  item: MenuItemProps;
  children?: React.ReactNode | undefined;
}) {
  return (
    <MenuItemContext.Provider
      value={{ onEscKeyDown: props.onEscKeyDown, item: props.item }}
    >
      <Dropdown
        className={classes.horizontalDropdownDisplayWrapper}
        children={props.children}
        item={props.item}
        menuOrientation="horizontal"
      />
    </MenuItemContext.Provider>
  );
}

function VerticalDropdown(props: {
  hovered: boolean;
  onEscKeyDown: () => void;
  item: MenuItemProps & { forceHovered?: boolean } & {
    children?: React.ReactNode | undefined;
  };
}) {
  return (
    <MenuItemContext.Provider
      value={{ onEscKeyDown: props.onEscKeyDown, item: props.item }}
    >
      <Dropdown
        item={props.item}
        menuOrientation="vertical"
        className={classNames(
          classes.verticalDropdownDisplayWrapper,
          props.hovered && classes.expandedDropdown,
        )}
      />
    </MenuItemContext.Provider>
  );
}

export const MenuItem: React.FC<IMenuItemProps> = props => {
  const { item } = props;
  const { children, forceHovered = false } = item;
  const [isHovered, setIsHovered] = useState(forceHovered);
  const hasSubItems = !!item.items?.length;
  const hasMegaMenuContainer = !!children;
  const hasDropdownMenu = hasMegaMenuContainer || hasSubItems;
  const chevronButtonRef = useRef<HTMLButtonElement>(null);

  const itemRef = useRef<HTMLDivElement>(null);
  const eventListeners = useMemo(
    () => createEventListeners(setIsHovered, itemRef),
    [],
  );

  useEffect(() => {
    if (!isHovered || !itemRef.current) {
      return;
    }

    return showDropdown(itemRef.current);
  }, [isHovered]);

  useEffect(() => {
    setIsHovered(!!forceHovered);
  }, [forceHovered]);

  const handleEscKeyDown = () => {
    chevronButtonRef.current?.focus();

    setIsHovered(false);
  };

  return (
    <li
      className={classes.listItem}
      data-testid={testIds.menuItem}
      data-item-depth="0" // For scrolling, to know how much items on depth=0
    >
      <div className={itemWrapperClassName} {...eventListeners} ref={itemRef}>
        <MenuItemLabel
          {...props}
          hasDropdownMenu={hasDropdownMenu}
          chevronButtonRef={chevronButtonRef}
          setIsHovered={setIsHovered}
          isHovered={isHovered}
        />
        {hasDropdownMenu && (
          <HorizontalDropdown
            onEscKeyDown={handleEscKeyDown}
            item={item}
            children={children}
          />
        )}
      </div>
      {hasSubItems && (
        <VerticalDropdown
          hovered={isHovered}
          onEscKeyDown={handleEscKeyDown}
          item={item}
        />
      )}
      <span className={classes.divider}></span>
    </li>
  );
};
