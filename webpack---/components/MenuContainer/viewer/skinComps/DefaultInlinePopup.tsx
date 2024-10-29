import classNamesFn from 'clsx';
import type { ComponentType } from 'react';
import React from 'react';
import type { MeshContainerProps } from '@wix/thunderbolt-components-native';
import FillLayers from '@wix/thunderbolt-elements/src/components/FillLayers/viewer/FillLayers';
import MeshContainer from '@wix/thunderbolt-elements/src/thunderbolt-core-components/MeshContainer/viewer/MeshContainer';
import type {
  inlinePopupSkinProps,
  IMenuContainerProps,
} from '../../MenuContainer.types';
import styles from './DefaultInlinePopup.scss';

const DefaultInlinePopup: ComponentType<
  inlinePopupSkinProps & {
    fillLayers: IMenuContainerProps['fillLayers'];
    meshProps?: MeshContainerProps;
  }
> = ({ classNames, layerIds, children, fillLayers, meshProps, id }) => {
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
        className={styles.container}
        data-block-level-container="MenuContainer"
      >
        <FillLayers {...fillLayers} />
        <div
          id={layerIds.inlineContentParent}
          className={classNamesFn(styles.inlineContentParent, {
            [styles.verticallyDocked]: classNames.includes('verticallyDocked'),
          })}
        >
          <MeshContainer id={id} {...meshProps} aria-label="navigation dialog">
            {children}
          </MeshContainer>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DefaultInlinePopup;
