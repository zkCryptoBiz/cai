import { createContext, useContext } from 'react';
import type { MenuItemProps } from '@wix/editor-elements-definitions';

export type MenuItemContextValue = {
  item: MenuItemProps;
  currentItem?: MenuItemProps;
  onEscKeyDown?: () => void;
};

const emptyItem: MenuItemProps = {
  label: '',
  link: {},
};

export const MenuItemContext = createContext<MenuItemContextValue>({
  item: emptyItem,
});

export const useMenuItemContext = () => useContext(MenuItemContext);
