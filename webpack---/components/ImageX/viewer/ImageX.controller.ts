import type { IPlatformData } from '@wix/editor-elements-integrations';
import { withCompController } from '@wix/editor-elements-integrations';
import {
  AnalyticsClicksGroups,
  tryReportAnalyticsClicksBi,
} from '@wix/editor-elements-common-utils';
import type {
  IImageXControllerProps,
  IImageXMapperProps,
  IImageXProps,
  IImageXStateValues,
} from '../ImageX.types';

const useComponentProps = ({
  mapperProps,
  stateValues,
}: IPlatformData<
  IImageXMapperProps,
  IImageXControllerProps,
  IImageXStateValues
>): IImageXProps => {
  const {
    compId,
    language,
    mainPageId,
    fullNameCompType,
    trackClicksAnalytics,
    ...restMapperProps
  } = mapperProps;

  const reportBiOnClick: IImageXControllerProps['reportBiOnClick'] = event => {
    const { reportBi } = stateValues;
    const { imageInfo, link } = restMapperProps;

    tryReportAnalyticsClicksBi(reportBi, {
      link,
      language,
      trackClicksAnalytics,
      elementType: fullNameCompType,
      pagesMetadata: { mainPageId },
      elementTitle: imageInfo.imageData.name,
      elementGroup: AnalyticsClicksGroups.Image,
      details: { uri: imageInfo.imageData.uri },
      element_id: compId ?? event.currentTarget.id,
    });
  };

  return {
    ...restMapperProps,
    reportBiOnClick,
  };
};

export default withCompController(useComponentProps);
