import React from 'react';
import classNames from 'clsx';
import Link from '@wix/thunderbolt-elements/components/Link';
import { formatClassNames } from '@wix/editor-elements-common-utils';
import type { IMenuItemProps } from '../../../Menu.types';
import { createSDKAction } from './utils';
import classes from './style/MenuItem.scss';
import { testIds } from '../../constants';
import { isCurrentItem } from '../../../../../common/menu/getCurrentMenuItem';
import menuSemanticClassNames from '../../../Menu.semanticClassNames';
import shmSemanticClassNames from '../../../../StylableHorizontalMenu/StylableHorizontalMenu.semanticClassNames';
import DropdownIcon from '../../assets/dropdownIcon.svg';

const itemLabelClassName = classNames(
  classes.label,
  formatClassNames(shmSemanticClassNames.menuItemLabel),
  formatClassNames(menuSemanticClassNames.itemLabel),
);

export const MenuItemLabel: React.FC<
  IMenuItemProps & {
    hasDropdownMenu: boolean;
    chevronButtonRef: any;
    setIsHovered: (cb: (prevIsHovered: boolean) => boolean) => void;
    isHovered: boolean;
  }
> = props => {
  const {
    item,
    currentItem,
    hasDropdownMenu,
    onItemClick,
    onItemDblClick,
    onItemMouseIn,
    onItemMouseOut,
    previewState,
    translations,
    chevronButtonRef,
    setIsHovered,
    isHovered,
  } = props;

  const isCurrentPage = isCurrentItem(item, currentItem);
  const hasSubItems = !!item.items?.length;
  const { label, link } = item;

  return (
    <div
      className={classNames(
        classes.labelContainer,
        isCurrentPage ? classes.selected : '',
        formatClassNames(menuSemanticClassNames.item),
      )}
      data-preview={previewState}
      data-testid={testIds.itemLabel}
    >
      <Link
        {...link}
        className={itemLabelClassName}
        activateByKey="Enter"
        onClick={createSDKAction(item, isCurrentPage, onItemClick)}
        onMouseEnter={createSDKAction(item, isCurrentPage, onItemMouseIn)}
        onMouseLeave={createSDKAction(item, isCurrentPage, onItemMouseOut)}
        onDoubleClick={createSDKAction(item, isCurrentPage, onItemDblClick)}
        {...(isCurrentPage && {
          ariaCurrent: 'page',
        })}
      >
        {label}
      </Link>

      {hasDropdownMenu && (
        <button
          aria-label={translations.dropdownButtonAriaLabel}
          ref={chevronButtonRef}
          className={classNames(
            classes.dropdownToggleButton,
            !hasSubItems && classes.noDropdownItems,
          )}
          onClick={() => setIsHovered(currentHovered => !currentHovered)}
          aria-expanded={isHovered}
          aria-haspopup={true}
        >
          <DropdownIcon
            className={classNames(
              isHovered && classes.expandedDropdownIcon,
              formatClassNames(menuSemanticClassNames.itemIcon),
            )}
          />
        </button>
      )}
    </div>
  );
};
