import * as React from 'react';
import ResponsiveBox from '../../../../ResponsiveBox/viewer/ResponsiveBox';
import type {
  IResponsiveBoxProps,
  IContainerImperativeActions,
} from '../../../Container.types';
import containerSemanticClassNames from '../../../Container.semanticClassNames';

// This container is used in responsive site
const ResponsiveBoxSkin: React.ForwardRefRenderFunction<
  IContainerImperativeActions,
  IResponsiveBoxProps
> = (props, ref) => (
  <ResponsiveBox
    {...props}
    ref={ref}
    semanticClassNames={containerSemanticClassNames}
  />
);

export default React.forwardRef(ResponsiveBoxSkin);
