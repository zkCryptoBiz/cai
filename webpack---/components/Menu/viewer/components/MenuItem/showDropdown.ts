import type { LogicalAlignment } from '@wix/editor-elements-common-utils';
import type { DropdownAnchorType } from '../../../Menu.types';

export const getWixBannerHeight = (): number => {
  const cssVarHeight = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--wix-ads-height');

  return Number.parseInt(cssVarHeight, 10) || 0;
};

export const dataSelectors = {
  dropdown: 'data-dropdown',
  nav: 'data-nav',
  selected: 'data-selected',
};

type GetLeftProps = {
  itemEl: HTMLElement;
  dropdownEl: HTMLElement;
  menuEl: HTMLElement;
  anchor: DropdownAnchorType;
  align: LogicalAlignment;
};

const getLeftForItemAnchor = ({ align, itemEl, dropdownEl }: GetLeftProps) => {
  switch (align) {
    case 'start':
      return itemEl.offsetLeft;
    case 'center':
      return (
        itemEl.offsetLeft + (itemEl.offsetWidth - dropdownEl.offsetWidth) / 2
      );
    case 'end':
      return itemEl.offsetLeft + itemEl.offsetWidth - dropdownEl.offsetWidth;
  }
};

const getLeftForMenuCustomWidth = ({
  align,
  menuEl,
  dropdownEl,
}: GetLeftProps) => {
  switch (align) {
    case 'start':
      return 0;
    case 'center':
      return (menuEl.offsetWidth - dropdownEl.offsetWidth) / 2;
    case 'end':
      return menuEl.offsetWidth - dropdownEl.offsetWidth;
  }
};

const getLeft = (props: GetLeftProps): number => {
  switch (props.anchor) {
    case 'screen':
      return -(props.menuEl.getBoundingClientRect().left ?? 0);
    case 'menuStretched':
      return 0;
    case 'menuCustomWidth':
      return getLeftForMenuCustomWidth(props);
    case 'menuItem':
      return getLeftForItemAnchor(props);
  }
};

const getMarginLeft = (anchor: DropdownAnchorType): string => {
  switch (anchor) {
    case 'screen':
      return 'var(--computed-horizontal-margin)';
    case 'menuStretched':
    case 'menuCustomWidth':
      return '0';
    case 'menuItem':
      return 'var(--scrolled-left)';
  }
};

const widthMap: Record<DropdownAnchorType, string | null> = {
  screen: 'calc(100vw - 2 * var(--computed-horizontal-margin))',
  menuStretched: '100%',
  menuCustomWidth: null,
  menuItem: 'max-content',
};

const setHorizontalDimensions = (
  itemEl: HTMLElement,
  dropdownEl: HTMLElement,
  menuEl: HTMLElement,
) => {
  const dropdownComputedStyle = window.getComputedStyle(dropdownEl);

  const anchor = dropdownComputedStyle.getPropertyValue(
    '--computed-anchor',
  ) as DropdownAnchorType;
  const align = dropdownComputedStyle.getPropertyValue(
    '--computed-align',
  ) as LogicalAlignment;

  dropdownEl.style.setProperty('width', widthMap[anchor]);
  if (anchor === 'menuItem') {
    dropdownEl.style.setProperty('min-width', `${itemEl.offsetWidth}px`);
  }
  // left should be calculated after widthg
  const left = getLeft({ itemEl, dropdownEl, menuEl, anchor, align });
  dropdownEl.style.setProperty('left', `${left}px`);
  dropdownEl.style.setProperty('margin-left', getMarginLeft(anchor));
};

const toggleToTopIfNeeded = (itemEl: HTMLElement, dropdownEl: HTMLElement) => {
  const itemElRect = itemEl.getBoundingClientRect();
  const spaceAbove = window
    .getComputedStyle(dropdownEl)
    .getPropertyValue('--computed-space-above');
  const dropdownHeight =
    dropdownEl.offsetHeight + Number.parseInt(spaceAbove, 10);

  const availableSpaceBelow = window.innerHeight - itemElRect.bottom;
  const enoughSpaceBelow = availableSpaceBelow >= dropdownHeight;
  const availableSpaceAbove = itemElRect.top - getWixBannerHeight();
  const enoughSpaceAbove = availableSpaceAbove >= dropdownHeight;
  if (enoughSpaceBelow || !enoughSpaceAbove) {
    return;
  }

  dropdownEl.style.setProperty(
    'margin-top',
    `-${dropdownHeight + itemElRect.height}px`,
    'important',
  );
  dropdownEl.style.setProperty('--before-el-top', '100%');
};

export const showDropdown = (itemEl: HTMLElement, wasHiddenBefore = true) => {
  const dropdownEl = itemEl.querySelector(
    `[${dataSelectors.dropdown}]`,
  ) as HTMLElement | null;
  const menuEl = itemEl.closest(`[${dataSelectors.nav}]`) as HTMLElement | null;

  if (!dropdownEl || !menuEl) {
    return;
  }

  if (wasHiddenBefore) {
    itemEl.setAttribute(dataSelectors.selected, 'calculating');
  }

  setHorizontalDimensions(itemEl, dropdownEl, menuEl);
  toggleToTopIfNeeded(itemEl, dropdownEl);

  itemEl.setAttribute(dataSelectors.selected, 'true');

  return () => {
    dropdownEl.removeAttribute('style');
    itemEl.removeAttribute(dataSelectors.selected);
  };
};
