import { withCompController } from '@wix/editor-elements-integrations';
import type {
  IMenuToggleMapperProps,
  IMenuToggleControllerProps,
  IMenuToggleProps,
  IMenuToggleStateRefs,
} from '../MenuToggle.types';

const compController = withCompController<
  IMenuToggleMapperProps,
  IMenuToggleControllerProps,
  IMenuToggleProps,
  IMenuToggleStateRefs
>(({ stateValues, mapperProps }) => ({
  ...mapperProps,
  isOpen: stateValues.isOpen ?? mapperProps.isOpen,
  onClick: () => stateValues.toggle?.(false),
  onKeyDown: keyboardEvent => {
    if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
      void stateValues.toggle?.(false);
    }
  },
}));

export default compController;
