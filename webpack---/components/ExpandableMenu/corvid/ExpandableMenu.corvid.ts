import {
  composeSDKFactories,
  changePropsSDKFactory,
  menuItemsPropsSDKFactory,
  createElementPropsSDKFactory,
} from '@wix/editor-elements-corvid-utils';
import { createComponentSDKModel } from '@wix/editor-elements-integrations';

const elementPropsSDKFactory = createElementPropsSDKFactory();

const sdk = composeSDKFactories([
  elementPropsSDKFactory,
  changePropsSDKFactory,
  menuItemsPropsSDKFactory,
]);

export default createComponentSDKModel(sdk);
