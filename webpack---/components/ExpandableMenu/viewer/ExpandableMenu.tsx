import * as React from 'react';
import type { LinkProps } from '@wix/editor-elements-definitions';
import classNames from 'clsx';
import {
  formatClassNames,
  getDataAttributes,
  isEmptyObject,
} from '@wix/editor-elements-common-utils';
import type {
  ExpandableMenuItemWithIsSelected,
  ExpandableMenuProps,
  ExpandableMenuItem as ExpandableMenuItemType,
  IMenuItemsPropsSDKActions,
} from '../ExpandableMenu.types';
import semanticClassNames from '../ExpandableMenu.semanticClassNames';
import style from './style/ExpandableMenu.scss';
import ExpandableMenuItem from './ExpandableMenuItem';

const isAnchorLink = (link: LinkProps) =>
  !!link.anchorDataId || !!link.anchorCompId;

const getIsActiveItem = (item: ExpandableMenuItemType, href: string) =>
  !!item.link && !isAnchorLink(item.link) && item.link.href === href;

const isFolder = (link: LinkProps | undefined) => isEmptyObject(link);

const getItemsWithIsSelected = (
  items: Array<ExpandableMenuItemType>,
  href = '',
): Array<ExpandableMenuItemWithIsSelected> => {
  return items.map(item => {
    const isActiveItem =
      item.selected === false
        ? false
        : item.selected || getIsActiveItem(item, href);
    const subItems = item.items || [];
    const subItemsWithIsSelected = getItemsWithIsSelected(subItems, href);
    const isActiveSubMenu = subItemsWithIsSelected.some(
      child => child.isSelected,
    );
    const isSelected =
      item.selected === false
        ? false
        : isActiveItem || (isActiveSubMenu && !isFolder(item.link));

    return {
      ...item,
      isSelected,
      items: subItemsWithIsSelected,
      isCurrent: isActiveItem,
    };
  });
};

const ExpandableMenu: React.FC<ExpandableMenuProps> = props => {
  const {
    id,
    className,
    customClassNames = [],
    items,
    currentUrl,
    translations,
    onItemClick,
    onItemDblClick,
    onItemMouseIn,
    onItemMouseOut,
    onMouseEnter,
    onMouseLeave,
    reportBiOnMenuItemClick,
    skin = 'ExpandableMenuSkin',
  } = props;
  const itemsWithIsSelected = React.useMemo(
    () => getItemsWithIsSelected(items, currentUrl),
    [items, currentUrl],
  );

  const onMenuItemClick: IMenuItemsPropsSDKActions['onItemClick'] = (
    ...args
  ) => {
    reportBiOnMenuItemClick?.(...args);
    onItemClick?.(...args);
  };

  return (
    <nav
      id={id}
      {...getDataAttributes(props)}
      aria-label={translations.ariaLabel}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={classNames(
        style[skin],
        className,
        formatClassNames(semanticClassNames.root, ...customClassNames),
      )}
    >
      <ul className={style.menuContainer}>
        {itemsWithIsSelected.map((item, index) => (
          <ExpandableMenuItem
            key={index}
            {...item}
            onItemClick={onMenuItemClick}
            onItemDblClick={onItemDblClick}
            onItemMouseIn={onItemMouseIn}
            onItemMouseOut={onItemMouseOut}
            idPrefix={`${id}-${index}`}
            skin={skin}
          />
        ))}
      </ul>
    </nav>
  );
};

export default ExpandableMenu;
