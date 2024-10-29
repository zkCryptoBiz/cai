import { withCompController } from '@wix/editor-elements-integrations';
import type {
  IResponsiveRepeaterProps,
  IResponsiveRepeaterControllerProps,
  IResponsiveRepeaterStateRefValues,
} from '../ResponsiveRepeater.types';

export default withCompController<
  IResponsiveRepeaterProps,
  IResponsiveRepeaterControllerProps,
  IResponsiveRepeaterProps,
  IResponsiveRepeaterStateRefValues
>(({ mapperProps, stateValues }) => {
  return {
    ...mapperProps,
    observeChildListChange: mapperProps.isMasterPage
      ? stateValues.observeChildListChangeMaster
      : stateValues.observeChildListChange,
  };
});
