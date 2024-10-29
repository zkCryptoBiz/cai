import type { PropsWithChildren } from 'react';
import React, { createContext, useContext, useMemo } from 'react';
import type { IMenuProps, MenuItemWithChildren } from '../Menu.types';
import { defaultTranslations } from './constants';

const EMPTY_ANCHOR_URL = '#';

export type MenuContextValue = Pick<
  IMenuProps,
  'partToPreviewStateMap' | 'currentUrl' | 'activeAnchor' | 'translations'
> & {
  items: Array<MenuItemWithChildren>;
  menuStyleId: string; // id that css variables are applied on
};

export const MenuContext = createContext<MenuContextValue>({
  items: [],
  currentUrl: EMPTY_ANCHOR_URL,
  translations: defaultTranslations,
  menuStyleId: '',
});

export const useMenuContext = () => useContext(MenuContext);

export const MenuContextProvider: React.FC<
  PropsWithChildren<MenuContextValue>
> = ({
  children,
  items,
  partToPreviewStateMap,
  currentUrl,
  activeAnchor,
  translations,
  menuStyleId,
}) => {
  const contextValue = useMemo<MenuContextValue>(
    () => ({
      items,
      partToPreviewStateMap,
      currentUrl,
      activeAnchor,
      translations,
      menuStyleId,
    }),
    [
      items,
      partToPreviewStateMap,
      currentUrl,
      activeAnchor,
      translations,
      menuStyleId,
    ],
  );

  return (
    <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
  );
};
