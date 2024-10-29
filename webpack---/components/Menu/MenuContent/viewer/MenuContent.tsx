import React, { useCallback, useEffect, useMemo } from 'react';
import classNames from 'clsx';
import { formatClassNames, debounce } from '@wix/editor-elements-common-utils';
import type { IMenuContentProps } from '../../Menu.types';
import { MenuItem } from '../../viewer/components/MenuItem/MenuItem';
import classes from './style/MenuContent.scss';
import { getCurrentMenuItem } from '../../../../common/menu/getCurrentMenuItem';
import { ScrollControls } from '../../viewer/components/ScrollControls/ScrollControls';
import {
  scrollMenuRight,
  scrollMenuLeft,
  scrollToMenuItem,
  rootLevelMenuItemSelector,
  MINIMAL_IMPORTANT_SCROLL_DISTANCE,
} from '../../../../common/menu/Scroll/utils';
import { useResizeObserver } from '@wix/thunderbolt-elements/providers/useResizeObserver';
import menuSemanticClassNames from '../../Menu.semanticClassNames';
import shmSemanticClassNames from '../../../StylableHorizontalMenu/StylableHorizontalMenu.semanticClassNames';
import { useMenuContext } from '../../viewer/MenuContext';
import { dataSelectors } from '../../viewer/components/MenuItem/showDropdown';

const DEBOUNCE_DURATION = 100;

const containerClassName = classNames(
  classes.container,
  formatClassNames(shmSemanticClassNames.root),
  formatClassNames(menuSemanticClassNames.container),
);

const MenuContent: React.FC<IMenuContentProps> = props => {
  const {
    id,
    className,
    onItemMouseIn,
    onItemMouseOut,
    onItemClick,
    onItemDblClick,
  } = props;

  const {
    items,
    partToPreviewStateMap,
    currentUrl,
    activeAnchor,
    translations,
    menuStyleId,
  } = useMenuContext();

  const menuContainerRef = React.useRef<HTMLElement>(null); // for DOM measurements
  const [isScrollable, setIsScrollable] = React.useState(false); // clientWidth < scrollWidth
  const [isScrollLeftButtonVisible, setIsScrollLeftButtonVisible] =
    React.useState(false); // has hidden menu item(s) in the left side
  const [isScrollRightButtonVisible, setIsScrollRightButtonVisible] =
    React.useState(false); // has hidden menu item(s) in the right side

  const currentItem = useMemo(
    () => getCurrentMenuItem(items, activeAnchor, currentUrl),
    [items, activeAnchor, currentUrl],
  );

  const handleScrollPageToTheLeft = useCallback((): void => {
    if (menuContainerRef.current && isScrollable) {
      scrollMenuLeft(menuContainerRef.current);
    }
  }, [isScrollable]);

  const handleScrollPageToTheRight = useCallback((): void => {
    if (menuContainerRef.current && isScrollable) {
      scrollMenuRight(menuContainerRef.current);
    }
  }, [isScrollable]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateScrollState = useCallback(
    debounce(() => {
      const { current: nav } = menuContainerRef;
      if (!nav) {
        return;
      }
      const { scrollLeft, scrollWidth, clientWidth } = nav;
      const isMenuScrollable = clientWidth < scrollWidth;
      setIsScrollable(isMenuScrollable);
      setIsScrollLeftButtonVisible(
        isMenuScrollable && scrollLeft > MINIMAL_IMPORTANT_SCROLL_DISTANCE,
      );
      setIsScrollRightButtonVisible(
        isMenuScrollable &&
          scrollLeft <
            scrollWidth - clientWidth - MINIMAL_IMPORTANT_SCROLL_DISTANCE,
      );
    }, DEBOUNCE_DURATION),
    [],
  );

  const updateScrolledLeftCSSVar = useCallback(() => {
    const { current: nav } = menuContainerRef;
    if (!nav) {
      return;
    }

    nav.style.setProperty('--scrolled-left', `-${nav.scrollLeft}px`);
  }, []);

  const handleOnScroll = useCallback(() => {
    updateScrollState();
    updateScrolledLeftCSSVar();
  }, [updateScrollState, updateScrolledLeftCSSVar]);

  const handleOnFocus = useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      const targetMenuItem = event.target;
      const { current: menuContainer } = menuContainerRef;

      if (!isScrollable || !targetMenuItem || !menuContainer) {
        return;
      }
      const rootMenuItem = menuContainer.closest<HTMLElement>(
        rootLevelMenuItemSelector,
      );
      if (rootMenuItem && rootMenuItem !== targetMenuItem) {
        scrollToMenuItem(menuContainer, rootMenuItem);
      } else {
        scrollToMenuItem(menuContainer, targetMenuItem);
      }
    },
    [isScrollable],
  );

  useResizeObserver({
    ref: menuContainerRef,
    callback: updateScrollState,
  });
  useEffect(updateScrollState, [items, updateScrollState]);

  return (
    <div id={id} className={className}>
      <nav
        id={menuStyleId}
        className={classes.root}
        ref={menuContainerRef}
        {...(isScrollable && {
          onScroll: handleOnScroll,
          onFocus: handleOnFocus,
        })}
        {...{ [dataSelectors.nav]: true }}
      >
        <ul className={containerClassName}>
          {items.map(item => (
            <MenuItem
              translations={translations}
              currentItem={currentItem}
              item={item}
              key={item.id}
              previewState={partToPreviewStateMap?.item}
              onItemClick={onItemClick}
              onItemMouseIn={onItemMouseIn}
              onItemMouseOut={onItemMouseOut}
              onItemDblClick={onItemDblClick}
            />
          ))}
        </ul>
        <ScrollControls
          scrollPageToTheRight={handleScrollPageToTheRight}
          scrollPageToTheLeft={handleScrollPageToTheLeft}
          isScrollLeftButtonShown={isScrollLeftButtonVisible}
          isScrollRightButtonShown={isScrollRightButtonVisible}
          previewState={partToPreviewStateMap?.['scroll-button']}
        />
      </nav>
    </div>
  );
};

export default MenuContent;
