import * as React from 'react';
import { formatClassNames } from '@wix/editor-elements-common-utils';
import ResponsiveContainer from '@wix/thunderbolt-elements/components/ResponsiveContainer';
import classNames from 'clsx';
import { HamburgerMenuContextProvider } from '../../HamburgerMenuContext';
import type { IHamburgerMenuRootProps } from '../HamburgerMenuRoot.props';
import classes from './style/HamburgerMenuRoot.scss';

const HamburgerMenuRoot: React.FC<IHamburgerMenuRootProps> = props => {
  const {
    id,
    customClassNames = [],
    children,
    compPreviewState,
    containerProps,
    containerRootClassName,
    hasResponsiveLayout,
    shouldFocus,
    isMenuOpen,
    updateComponentPropsInViewer,
  } = props;

  const { shouldOmitWrapperLayers } = containerProps ?? {};

  const childrenToRender =
    typeof children === 'function' ? children : () => children;

  const setIsMenuOpen = React.useCallback(
    (isOpen: boolean) => {
      if (isMenuOpen !== isOpen) {
        updateComponentPropsInViewer({ isMenuOpen: isOpen });
      }
    },
    [isMenuOpen, updateComponentPropsInViewer],
  );

  return (
    <div
      id={id}
      className={classNames(
        // Semantic classes are applied in HamburgerOpenButton
        formatClassNames(null, ...customClassNames),
        containerRootClassName,
        shouldOmitWrapperLayers && classes.root,
      )}
    >
      <HamburgerMenuContextProvider
        compPreviewState={compPreviewState}
        shouldFocus={shouldFocus}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      >
        {hasResponsiveLayout ? (
          <ResponsiveContainer
            {...containerProps!}
            extraRootClass={classes.root}
          >
            {childrenToRender}
          </ResponsiveContainer>
        ) : (
          childrenToRender()
        )}
      </HamburgerMenuContextProvider>
    </div>
  );
};

export default HamburgerMenuRoot;
