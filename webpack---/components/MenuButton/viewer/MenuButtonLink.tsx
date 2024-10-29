import type { ReactNode } from 'react';
import React from 'react';
import Link from '@wix/thunderbolt-elements/src/components/Link/viewer/Link';
import type { LinkProps } from '@wix/thunderbolt-elements/src/components/Link/Link.types';

export type MenuButtonLinkProps = {
  wrapperProps: {
    positionInList?: string;
    ariaHasPopup?: 'false' | 'true';
    ariaDescribedBy?: string;
    isMoreButton?: boolean;
  };
  className?: string;
  compClassName?: string;
  children: ReactNode;
  link?: LinkProps;
  tabIndex?: number;
};

const MenuButtonLink: React.FC<MenuButtonLinkProps> = ({
  wrapperProps: { ariaHasPopup, isMoreButton, ariaDescribedBy },
  className,
  children,
  link,
  tabIndex,
}) => {
  const _getTabIndex = () => {
    return tabIndex || (isMoreButton || !link || !link.href ? 0 : undefined);
  };

  return (
    <Link
      {...link}
      aria-haspopup={ariaHasPopup}
      aria-describedby={ariaDescribedBy}
      tabIndex={_getTabIndex()}
      className={className}
    >
      {children}
    </Link>
  );
};

export default MenuButtonLink;
