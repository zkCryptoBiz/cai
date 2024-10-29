import * as React from 'react';
import classNamesFn from 'clsx';
import {
  formatClassNames,
  getDataAttributes,
} from '@wix/editor-elements-common-utils';
import type {
  IMenuContainerImperativeActions,
  IMenuContainerProps,
} from '../MenuContainer.types';
import expandableMenuStyles from '../../ExpandableMenu/viewer/style/ExpandableMenuItem.scss';
import semanticClassNames from '../MenuContainer.semanticClassNames';
import styles from './styles/ClassicInlinePopup.scss';
import DefaultInlinePopup from './skinComps/DefaultInlinePopup';

const MenuContainer: React.ForwardRefRenderFunction<
  IMenuContainerImperativeActions,
  IMenuContainerProps
> = (props, ref) => {
  const {
    id,
    customClassNames = [],
    isOpen,
    fillLayers,
    children,
    classNames,
    meshProps,
    className,
    onClick,
    onMouseEnter,
    onMouseLeave,
    open,
    close,
    animate,
  } = props;
  let { isVisible } = props;

  if (isOpen && !isVisible) {
    isVisible = true;
  }

  const layerIds = {
    overlay: `overlay-${id}`,
    container: `container-${id}`,
    inlineContentParent: `inlineContentParent-${id}`,
  };

  React.useImperativeHandle(ref, () => ({ open, close, animate }));

  // A11y - On popup open, focus needs to shift from MenuToggle to first menu item
  React.useEffect(() => {
    if (isOpen) {
      const firstMenuItem = document.querySelector<HTMLElement>(
        `#${layerIds.inlineContentParent} .${expandableMenuStyles.label}`,
      );
      firstMenuItem?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div
      id={id}
      {...getDataAttributes(props)}
      tabIndex={0}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-undisplayed={!isVisible}
      className={classNamesFn(
        styles.menuContainer,
        className,
        formatClassNames(semanticClassNames.root, ...customClassNames),
        classNames.map(name => styles[name]),
        { [styles.visible]: isVisible, [styles.open]: isOpen },
      )}
      data-block-level-container="MenuContainer"
    >
      <DefaultInlinePopup
        id={id}
        layerIds={layerIds}
        fillLayers={fillLayers}
        classNames={classNames}
        meshProps={meshProps}
      >
        {children}
      </DefaultInlinePopup>
    </div>
  );
};

export default React.forwardRef(MenuContainer);
