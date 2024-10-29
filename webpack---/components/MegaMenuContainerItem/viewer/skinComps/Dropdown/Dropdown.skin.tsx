import * as React from 'react';
import { getDataAttributes } from '@wix/editor-elements-common-utils';
import ResponsiveContainer from '@wix/thunderbolt-elements/components/ResponsiveContainer';
import type { IMegaMenuContainerDropdownProps } from '../../../MegaMenuContainerItem.types';
import { DropdownWrapper } from '../../../../Menu/viewer/components/DropdownWrapper/DropdownWrapper';
import styles from './Dropdown.scss';
import cn from 'clsx';

const MegaMenuContainerItem: React.FC<
  IMegaMenuContainerDropdownProps
> = props => {
  const { id, children, containerRootClassName, menuOrientation } = props;
  const childrenToRender =
    typeof children === 'function' ? children : () => children;
  const className = cn(styles.root, containerRootClassName);

  return (
    <DropdownWrapper
      id={id}
      dataAttributes={getDataAttributes(props)}
      className={className}
      menuOrientation={menuOrientation}
    >
      <ResponsiveContainer {...props.containerProps}>
        {childrenToRender}
      </ResponsiveContainer>
    </DropdownWrapper>
  );
};

export default MegaMenuContainerItem;
