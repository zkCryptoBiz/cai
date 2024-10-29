import classNamesFn from 'clsx';
import React from 'react';
import type { ResponsiveContainerProps } from '@wix/thunderbolt-components';
import ResponsiveContainer from '@wix/thunderbolt-elements/src/thunderbolt-core-components/ResponsiveContainer/viewer/ResponsiveContainer';
import type { inlinePopupSkinProps } from '../../MenuContainer.types';
import styles from './ResponsiveInlinePopupWithColorBG.scss';

const ResponsiveInlinePopupWithColorBG: React.ForwardRefRenderFunction<
  HTMLDivElement,
  inlinePopupSkinProps & {
    containerProps: ResponsiveContainerProps;
    cssEditingClasses: string;
    ariaLabel?: string;
  }
> = (
  {
    classNames,
    cssEditingClasses,
    layerIds,
    containerProps,
    ariaLabel,
    children,
  },
  ref,
) => {
  return (
    <React.Fragment>
      <div
        id={layerIds.overlay}
        className={classNamesFn(styles.overlay, {
          [styles.horizontallyDocked]:
            classNames.includes('horizontallyDocked'),
        })}
      />
      <div
        id={layerIds.container}
        className={classNamesFn(styles.container)}
        data-block-level-container="MenuContainer"
      >
        <div className={`${styles.background}`} />
        <div
          id={layerIds.inlineContentParent}
          className={styles.inlineContentParent}
        >
          <ResponsiveContainer
            {...containerProps}
            extraRootClass={classNamesFn(
              styles.inlineContentParent,
              cssEditingClasses,
            )}
            role="dialog"
            label={ariaLabel}
            ref={ref}
            tabIndex={-1}
          >
            {children}
          </ResponsiveContainer>
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.forwardRef(ResponsiveInlinePopupWithColorBG);
