import type { Translations } from '../Menu.types';

/**
 * The viewer will duplicate the styles of the menu component onto an id with this prefix
 * used to pass CSS variables from top-level menu to MenuContent inside of HamburgerOverlay portal
 */
export const MENU_CONTENT_ID_PREFIX = 'portal-';

export const testIds = {
  menuItem: 'menu-item',
  childrenWrapper: 'children-wrapper',
  itemLabel: 'item-label',
  scrollPageToTheLeft: 'scroll-page-to-the-left',
  scrollPageToTheRight: 'scroll-page-to-the-right',
};

export const defaultTranslations: Translations['translations'] = {
  dropdownButtonAriaLabel: 'Button to toggle menu',
};
