import { getItemDepthSelector, rootItemDepthLevel } from '../index';
import { getIsRTL } from '../getIsRTL';
import { scrollTo } from './scrollTo';

export const rootLevelMenuItemSelector =
  getItemDepthSelector(rootItemDepthLevel);
export const scrollPageButtonSelector = '[data-menu-scroll-action="page"]';

type Bounds = [number, number];

const getMenuItemNodes = (menuNode: HTMLElement): Array<HTMLElement> => {
  const menuItems = Array.from(
    menuNode?.querySelectorAll<HTMLElement>(rootLevelMenuItemSelector) || [],
  ).map(({ firstChild }) => firstChild as HTMLElement);

  return getIsRTL(menuNode.firstChild as HTMLElement)
    ? [...menuItems].reverse()
    : menuItems;
};

const getScrollButtonWidth = (menuNode: HTMLElement): number =>
  menuNode.querySelector(scrollPageButtonSelector)?.getBoundingClientRect()
    .width || 0;

const getBounds = (node: HTMLElement): Bounds => {
  const { left, width } = node.getBoundingClientRect();
  return [left, width + left];
};

const getInnerBounds = (node: HTMLElement): Bounds => {
  const [left, right] = getBounds(node);
  const style = getComputedStyle(node);
  const [paddingLeft, paddingRight, borderLeftWidth, borderRightWidth] = [
    style.paddingLeft,
    style.paddingRight,
    style.borderLeftWidth,
    style.borderRightWidth,
  ].map(n => parseFloat(n));
  return [
    left + paddingLeft + borderLeftWidth,
    right - paddingRight - borderRightWidth,
  ];
};

const getLastFullyVisibleItemIndex = (
  menuItemsBounds: Array<Bounds>,
  menuRight: number,
): number => {
  const index = [...menuItemsBounds]
    .reverse()
    .findIndex(([, right]) => right < menuRight);
  return index === -1 ? 0 : menuItemsBounds.length - 1 - index;
};

export const MINIMAL_IMPORTANT_SCROLL_DISTANCE = 2;

export const scrollMenuRight = (menuNode: HTMLElement) => {
  const [menuLeft, menuRight] = getInnerBounds(menuNode);
  const menuItemsBounds = getMenuItemNodes(menuNode).map(getBounds);
  const realLeft = menuLeft + getScrollButtonWidth(menuNode);

  const getNextX = (i: number): number => {
    if (i >= menuItemsBounds.length) {
      return menuNode.scrollWidth;
    }
    const [itemLeft] = menuItemsBounds[i];
    const alreadyOnThisScrollPosition =
      itemLeft <= realLeft + MINIMAL_IMPORTANT_SCROLL_DISTANCE;
    if (alreadyOnThisScrollPosition) {
      return getNextX(i + 1); // scroll one more
    }
    return menuNode.scrollLeft + itemLeft - realLeft;
  };

  const lastFullyVisibleItemIndex = getLastFullyVisibleItemIndex(
    menuItemsBounds,
    menuRight,
  );

  const moveTo = getNextX(lastFullyVisibleItemIndex + 1);
  scrollTo(menuNode, moveTo);
};

const getFirstFullyVisibleItemIndex = (
  menuItemsBounds: Array<Bounds>,
  menuLeft: number,
): number => {
  const index = menuItemsBounds.findIndex(([left]) => left >= menuLeft);
  return index === -1 ? 0 : index;
};

export const scrollMenuLeft = (menuNode: HTMLElement) => {
  const [menuLeft, menuRight] = getInnerBounds(menuNode);
  const menuItemsBounds = getMenuItemNodes(menuNode).map(getBounds);
  const realRight = menuRight - getScrollButtonWidth(menuNode);

  const getNextX = (i: number): number => {
    if (i <= 0) {
      return 0;
    }
    const [, itemRight] = menuItemsBounds[i];
    const alreadyOnThisScrollPosition =
      itemRight >= realRight - MINIMAL_IMPORTANT_SCROLL_DISTANCE;
    if (alreadyOnThisScrollPosition) {
      return getNextX(i - 1); // scroll one more
    }

    return menuNode.scrollLeft + itemRight - realRight;
  };

  const firstFullyVisibleItemIndex = getFirstFullyVisibleItemIndex(
    menuItemsBounds,
    menuLeft,
  );

  const moveTo = getNextX(firstFullyVisibleItemIndex - 1);
  scrollTo(menuNode, moveTo);
};

export const scrollToMenuItem = (
  menuNode: HTMLElement,
  menuItem: HTMLElement,
) => {
  const [menuLeft, menuRight] = getInnerBounds(menuNode);
  const [itemLeft, itemRight] = getBounds(menuItem);
  if (itemLeft >= menuLeft && itemRight <= menuRight) {
    return;
  }
  const realLeft = menuLeft + getScrollButtonWidth(menuNode);
  scrollTo(menuNode, menuNode.scrollLeft + itemLeft - realLeft);
};
