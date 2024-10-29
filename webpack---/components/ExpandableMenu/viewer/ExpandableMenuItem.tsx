import * as React from 'react';
import classnames from 'clsx';
import { formatClassNames } from '@wix/editor-elements-common-utils';
import Link from '@wix/thunderbolt-elements/src/components/Link/viewer/Link';
import type { ExpandableMenuItemCompProps } from '../ExpandableMenu.types';
import { TestIds } from '../constants';
import semanticClassNames from '../ExpandableMenu.semanticClassNames';
import style from './style/ExpandableMenuItem.scss';

type ItemAriaProps = {
  'aria-current'?: 'page';
};

type ToggleAriaProps = {
  'aria-expanded'?: boolean;
  'aria-haspopup'?: 'false' | 'true';
};

type LinkWrapperProps = {
  label: ExpandableMenuItemCompProps['label'];
  link: ExpandableMenuItemCompProps['link'];
  onClick?: (event: React.MouseEvent) => void;
  onDoubleClick?: (event: React.MouseEvent) => void;
};

const LinkWrapper: React.FC<LinkWrapperProps> = ({
  label,
  link,
  onClick,
  onDoubleClick,
}) => {
  return (
    <span data-testid={TestIds.linkWrapper} className={style.labelWrapper}>
      <Link
        {...link}
        className={classnames(
          style.label,
          formatClassNames(semanticClassNames.menuItemLabel),
        )}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      >
        {label}
      </Link>
    </span>
  );
};

const getItemAriaProps = (isCurrent: boolean): ItemAriaProps =>
  isCurrent
    ? {
        'aria-current': 'page',
      }
    : {};

const SingleItem: React.FC<ExpandableMenuItemCompProps> = ({
  id,
  label,
  link,
  skin,
  isSelected,
  isCurrent,
  idPrefix,
  onItemClick,
  onItemDblClick,
  onItemMouseIn,
  onItemMouseOut,
}) => {
  const handleOnItemMouseIn = onItemMouseIn
    ? (event: React.MouseEvent) => {
        onItemMouseIn?.(event, {
          id,
          label,
          link,
          items: [],
          selected: isSelected,
        });
      }
    : undefined;

  const handleOnItemMouseOut = onItemMouseOut
    ? (event: React.MouseEvent) => {
        onItemMouseOut?.(event, {
          id,
          label,
          link,
          items: [],
          selected: isSelected,
        });
      }
    : undefined;

  const handleOnItemClick = onItemClick
    ? (event: React.MouseEvent) => {
        onItemClick?.(event, {
          id,
          label,
          link,
          items: [],
          selected: isSelected,
        });
      }
    : undefined;

  const handleOnItemDblClick = onItemDblClick
    ? (event: React.MouseEvent) => {
        onItemDblClick?.(event, {
          id,
          label,
          link,
          items: [],
          selected: isSelected,
        });
      }
    : undefined;

  return (
    <li
      data-testid={idPrefix}
      {...getItemAriaProps(isCurrent)}
      className={classnames(
        style[skin],
        style.item,
        formatClassNames(semanticClassNames.menuItem),
        {
          [style.selected]: isSelected,
        },
      )}
      onMouseEnter={handleOnItemMouseIn}
      onMouseLeave={handleOnItemMouseOut}
    >
      <div data-testid={TestIds.itemWrapper} className={style.itemWrapper}>
        <LinkWrapper
          onClick={handleOnItemClick}
          onDoubleClick={handleOnItemDblClick}
          label={label}
          link={link}
        />
      </div>
    </li>
  );
};

const SubMenuItem: React.FC<ExpandableMenuItemCompProps> = ({
  id,
  label,
  link,
  items = [],
  skin,
  isSelected,
  isCurrent,
  idPrefix,
  onItemClick,
  onItemDblClick,
  onItemMouseIn,
  onItemMouseOut,
  isForceOpened = false,
}) => {
  const selectedSubItemIndex = items.findIndex(item => item.isSelected);

  const initialIsOpen = selectedSubItemIndex !== -1;
  const [showSubMenu, setShowSubMenu] = React.useState(initialIsOpen);

  React.useEffect(() => {
    const isOpen = selectedSubItemIndex !== -1 || isForceOpened;
    setShowSubMenu(isOpen);
  }, [selectedSubItemIndex, isForceOpened]);

  const handleOnItemMouseIn = onItemMouseIn
    ? (event: React.MouseEvent) => {
        onItemMouseIn?.(event, {
          id,
          label,
          link,
          items,
          selected: isSelected,
        });
      }
    : undefined;

  const handleOnItemMouseOut = onItemMouseOut
    ? (event: React.MouseEvent) => {
        onItemMouseOut?.(event, {
          id,
          label,
          link,
          items,
          selected: isSelected,
        });
      }
    : undefined;

  const handleOnItemClick = onItemClick
    ? (event: React.MouseEvent) => {
        onItemClick?.(event, {
          id,
          label,
          link,
          items,
          selected: isSelected,
        });
      }
    : undefined;

  const handleOnItemDblClick = onItemDblClick
    ? (event: React.MouseEvent) => {
        onItemDblClick?.(event, {
          id,
          label,
          link,
          items,
          selected: isSelected,
        });
      }
    : undefined;

  const toggleSubMenu = (event: React.MouseEvent) => {
    handleOnItemClick?.(event);
    setShowSubMenu(!showSubMenu);
  };

  const toggleAriaProps: ToggleAriaProps = {
    'aria-expanded': showSubMenu,
    'aria-haspopup': 'true',
  };

  return (
    <li
      data-testid={idPrefix}
      {...getItemAriaProps(isCurrent)}
      className={classnames(
        style[skin],
        style.item,
        style.hasSubList,
        formatClassNames(semanticClassNames.menuItem),
        {
          [style.selected]: isSelected,
          [style.subMenuOpen]: showSubMenu,
        },
      )}
      onMouseEnter={handleOnItemMouseIn}
      onMouseLeave={handleOnItemMouseOut}
    >
      <div data-testid={TestIds.itemWrapper} className={style.itemWrapper}>
        <LinkWrapper
          label={label}
          link={link}
          onClick={toggleSubMenu}
          onDoubleClick={handleOnItemDblClick}
        />
        <button
          {...toggleAriaProps}
          aria-label={label}
          className={style.arrowWrapper}
          data-testid={TestIds.toggle}
          onClick={toggleSubMenu}
          onDoubleClick={handleOnItemDblClick}
        >
          <div
            className={classnames(
              style.arrow,
              formatClassNames(semanticClassNames.arrow),
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 9.2828 4.89817"
            >
              <path d="M4.64116,4.89817a.5001.5001,0,0,1-.34277-.13574L.15727.86448A.50018.50018,0,0,1,.84282.136L4.64116,3.71165,8.44.136a.50018.50018,0,0,1,.68555.72852L4.98393,4.76243A.5001.5001,0,0,1,4.64116,4.89817Z" />
            </svg>
          </div>
        </button>
      </div>
      <ul
        className={classnames(
          style.subMenu,
          formatClassNames(semanticClassNames.subMenu),
        )}
      >
        {items.map((item, i) => (
          <ExpandableMenuItem
            key={i}
            {...item}
            onItemClick={onItemClick}
            onItemDblClick={onItemDblClick}
            onItemMouseIn={onItemMouseIn}
            onItemMouseOut={onItemMouseOut}
            idPrefix={`${idPrefix}-${i}`}
            skin={skin}
          />
        ))}
      </ul>
    </li>
  );
};

const ExpandableMenuItem: React.FC<ExpandableMenuItemCompProps> = props =>
  props.items.length ? SubMenuItem(props) : SingleItem(props);

export default ExpandableMenuItem;
