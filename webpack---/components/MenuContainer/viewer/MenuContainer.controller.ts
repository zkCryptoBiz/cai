import { withCompController } from '@wix/editor-elements-integrations';
import { isBrowser } from '@wix/editor-elements-common-utils';
import type {
  IMenuContainerMapperProps,
  IMenuContainerControllerProps,
  IMenuContainerProps,
  IMenuContainerStateRefs,
} from '../MenuContainer.types';

const filterStateValues = (values: Omit<IMenuContainerStateRefs, 'toggle'>) =>
  Object.entries(values).reduce(
    (obj, [k, v]) => (v === undefined ? obj : { ...obj, [k]: v }),
    {},
  );

const compController = withCompController<
  IMenuContainerMapperProps,
  IMenuContainerControllerProps,
  IMenuContainerProps,
  IMenuContainerStateRefs
>(({ mapperProps, stateValues, controllerUtils: { updateStyles } }) => {
  const { isMobileView, compId, ...restProps } = mapperProps;
  const { toggle, ...restValues } = stateValues;

  if (stateValues.isOpen === true) {
    updateStyles({
      '--menu-height':
        isBrowser() && isMobileView
          ? window.getComputedStyle(document.body).height
          : '100vh',
    });
  }

  return {
    ...restProps,
    /*  filter values, because stateValues currently are undefined,
        because feature-menu-container/src/menuContainer.ts, where those values are exported,
        is not added to life cycle, yet */
    ...filterStateValues(restValues),
    onClick: e => {
      const target = e.target as HTMLElement;
      if (target.closest(`a , #overlay-${compId}`) && toggle) {
        void toggle?.(true);
      }
    },
  };
});

export default compController;
