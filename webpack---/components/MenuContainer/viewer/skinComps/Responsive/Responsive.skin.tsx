import * as React from 'react';
import classNamesFn from 'clsx';
import {
  formatClassNames,
  getDataAttributes,
} from '@wix/editor-elements-common-utils';
import type {
  IMenuContainerImperativeActions,
  IResponsiveMenuContainerProps,
} from '../../../MenuContainer.types';
import styles from '../../styles/ResponsiveInlinePopup.scss';
import ResponsiveInlinePopupWithColorBG from '../ResponsiveInlinePopupWithColorBG';
import semanticClassNames from '../../../MenuContainer.semanticClassNames';

const MenuContainer: React.ForwardRefRenderFunction<
  IMenuContainerImperativeActions,
  IResponsiveMenuContainerProps
> = (props, ref) => {
  const {
    id,
    customClassNames = [],
    isOpen,
    children,
    classNames,
    containerProps,
    onClick,
    onMouseEnter,
    onMouseLeave,
    open,
    close,
    animate,
    translations: { containerAriaLabel },
    onKeyUp,
  } = props;
  let { isVisible } = props;
  if (isOpen && !isVisible) {
    isVisible = true;
  }

  const responsiveContainerRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => ({
    open,
    close,
    animate,
    focus: () => {
      responsiveContainerRef.current?.focus();
    },
  }));

  const layerIds = {
    overlay: `overlay-${id}`,
    container: `container-${id}`,
    inlineContentParent: `inlineContentParent-${id}`,
  };

  return (
    <div
      id={id}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyUp={onKeyUp}
      className={classNamesFn(
        styles.menuContainer,
        classNames.map(name => styles[name]),
        { [styles.visible]: isVisible, [styles.open]: isOpen },
      )}
      {...getDataAttributes(props)}
    >
      <ResponsiveInlinePopupWithColorBG
        containerProps={containerProps}
        ref={responsiveContainerRef}
        id={id}
        layerIds={layerIds}
        ariaLabel={containerAriaLabel}
        classNames={classNames}
        {...getDataAttributes(props)}
        cssEditingClasses={formatClassNames(
          semanticClassNames.root,
          ...customClassNames,
        )}
      >
        {children}
      </ResponsiveInlinePopupWithColorBG>
    </div>
  );
};

export default React.forwardRef(MenuContainer);
