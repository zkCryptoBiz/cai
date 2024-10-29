import type { IMenuItemSDKAction } from '@wix/editor-elements-corvid-utils';
import type { IMenuItemProps, MenuOrientationType } from '../../../Menu.types';

export const createSDKAction = (
  item: IMenuItemProps['item'],
  selected: boolean,
  sdkAction?: IMenuItemSDKAction,
) =>
  sdkAction &&
  ((e: React.MouseEvent) => {
    sdkAction?.(e, {
      ...item,
      selected,
    });
  });

export const hasHorizontalOrientation = (
  itemRef: React.RefObject<HTMLDivElement>,
) => {
  if (!itemRef?.current) {
    return;
  }

  const orientation = getComputedStyle(itemRef.current).getPropertyValue(
    '--orientation',
  ) as MenuOrientationType;

  return orientation === 'horizontal';
};

export const createEventListeners = (
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>,
  itemRef: React.RefObject<HTMLDivElement>,
) => {
  const showDropdownMenu = () => setIsHovered(true);
  const hideDropdownMenu = () => setIsHovered(false);

  return {
    onMouseEnter: () => {
      hasHorizontalOrientation(itemRef) && showDropdownMenu();
    },
    onMouseLeave: () => {
      hasHorizontalOrientation(itemRef) && hideDropdownMenu();
    },
  };
};
