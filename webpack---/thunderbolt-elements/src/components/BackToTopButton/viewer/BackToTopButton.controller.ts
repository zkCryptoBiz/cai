import { withCompController } from '@wix/editor-elements-integrations';
import type {
  IBackToTopButtonMapperProps,
  IBackToTopButtonControllerProps,
  IBackToTopButtonProps,
} from '../BackToTopButton.types';

export default withCompController<
  IBackToTopButtonMapperProps,
  IBackToTopButtonControllerProps,
  IBackToTopButtonProps
>(({ mapperProps, controllerUtils }) => {
  return {
    ...mapperProps,
    onShow: () => {
      controllerUtils.updateProps({
        isVisible: true,
      });
    },
    onHide: () => {
      controllerUtils.updateProps({
        isVisible: false,
      });
    },
  };
});
