import React, { useMemo } from 'react';
import type { IMenuProps } from '../Menu.types';
import { MenuContextProvider } from './MenuContext';
import MenuContent from '../MenuContent/viewer/MenuContent';
import classes from './style/Menu.scss';
import ResponsiveContainer from '@wix/thunderbolt-elements/components/ResponsiveContainer';
import { MENU_CONTENT_ID_PREFIX } from './constants';

const Menu: React.FC<IMenuProps> = props => {
  const {
    id,
    containerRootClassName,
    containerProps,
    children,
    slots,
    items,
    partToPreviewStateMap,
    currentUrl,
    activeAnchor,
    onItemMouseIn,
    onItemMouseOut,
    onItemClick,
    onItemDblClick,
    translations,
  } = props;

  const itemsWithChildren = useMemo(
    () =>
      slots
        ? items.map(item => ({
            ...item,
            children: item.slot && slots[item.slot],
          }))
        : items,
    [items, slots],
  );

  return (
    <div id={id} className={containerRootClassName}>
      <MenuContextProvider
        items={itemsWithChildren}
        partToPreviewStateMap={partToPreviewStateMap}
        currentUrl={currentUrl}
        activeAnchor={activeAnchor}
        translations={translations}
        menuStyleId={`${MENU_CONTENT_ID_PREFIX}${id}`}
      >
        <ResponsiveContainer {...containerProps}>
          {(...args: Parameters<typeof children>) => (
            <>
              <MenuContent
                id={`${id}-menu-content`}
                className={classes.navbar}
                onItemMouseIn={onItemMouseIn}
                onItemMouseOut={onItemMouseOut}
                onItemClick={onItemClick}
                onItemDblClick={onItemDblClick}
              />
              {children(...args)}
            </>
          )}
        </ResponsiveContainer>
      </MenuContextProvider>
    </div>
  );
};

export default Menu;
