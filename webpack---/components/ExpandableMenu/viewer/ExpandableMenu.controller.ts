import { withCompController } from '@wix/editor-elements-integrations';
import {
  AnalyticsClicksGroups,
  tryReportAnalyticsClicksBi,
} from '@wix/editor-elements-common-utils';
import type {
  ExpandableMenuProps,
  ExpandableMenuStateRefs,
  ExpandableMenuMapperProps,
  ExpandableMenuControllerProps,
} from '../ExpandableMenu.types';

const compController = withCompController<
  ExpandableMenuMapperProps,
  ExpandableMenuControllerProps,
  ExpandableMenuStateRefs,
  ExpandableMenuProps
>(({ stateValues, mapperProps }) => {
  const { currentUrl, reportBi } = stateValues;
  const {
    compId,
    language,
    mainPageId,
    fullNameCompType,
    trackClicksAnalytics,
    ...restMapperProps
  } = mapperProps;

  const reportBiOnMenuItemClick: ExpandableMenuControllerProps['reportBiOnMenuItemClick'] =
    (event, item) => {
      const { label, link } = item ?? {};

      tryReportAnalyticsClicksBi(reportBi, {
        link,
        language,
        trackClicksAnalytics,
        elementTitle: label,
        elementType: fullNameCompType,
        pagesMetadata: { mainPageId },
        elementGroup: AnalyticsClicksGroups.Menu,
        element_id: compId ?? event?.currentTarget.id,
      });
    };

  return {
    ...restMapperProps,
    currentUrl,
    reportBiOnMenuItemClick,
  };
});

export default compController;
