import type { WixCodeApiFactoryArgs } from '@wix/thunderbolt-symbols';

function namespacesSdkFactory() {
  return {
    'echo-backend': (context: WixCodeApiFactoryArgs) =>
      wixEchoBackendLoader(context),

    'online-programs-backend': (context: WixCodeApiFactoryArgs) =>
      wixOnlineProgramsBackendLoader(context),

    'ecom-backend': (context: WixCodeApiFactoryArgs) =>
      wixEcomBackendLoader(context),

    'blog-backend': (context: WixCodeApiFactoryArgs) =>
      wixBlogBackendLoader(context),

    'core-services-dev': (context: WixCodeApiFactoryArgs) =>
      wixCoreServicesDevLoader(context),

    'data-backend-public-sdk-poc': (context: WixCodeApiFactoryArgs) =>
      wixDataBackendPublicSdkPocLoader(context),

    'portfolio-backend': (context: WixCodeApiFactoryArgs) =>
      wixPortfolioBackendLoader(context),

    'metro-backend': (context: WixCodeApiFactoryArgs) =>
      wixMetroBackendLoader(context),

    'ratings-backend': (context: WixCodeApiFactoryArgs) =>
      wixRatingsBackendLoader(context),

    'forms-backend': (context: WixCodeApiFactoryArgs) =>
      wixFormsBackendLoader(context),

    'pro-gallery-backend': (context: WixCodeApiFactoryArgs) =>
      wixProGalleryBackendLoader(context),

    'loyalty-backend': (context: WixCodeApiFactoryArgs) =>
      wixLoyaltyBackendLoader(context),

    'table-reservations-backend': (context: WixCodeApiFactoryArgs) =>
      wixTableReservationsBackendLoader(context),

    'motion-backend.v2': (context: WixCodeApiFactoryArgs) =>
      wixMotionBackendV2Loader(context),

    'stores-backend.v2': (context: WixCodeApiFactoryArgs) =>
      wixStoresBackendV2Loader(context),

    'members-followers-backend.v3': (context: WixCodeApiFactoryArgs) =>
      wixMembersFollowersBackendV3Loader(context),

    'alert-enricher-backend': (context: WixCodeApiFactoryArgs) =>
      wixAlertEnricherBackendLoader(context),

    'reviews-backend': (context: WixCodeApiFactoryArgs) =>
      wixReviewsBackendLoader(context),

    'recruitment-agencies-positions-backend': (
      context: WixCodeApiFactoryArgs,
    ) => wixRecruitmentAgenciesPositionsBackendLoader(context),

    'recruitment-agencies-applications-backend': (
      context: WixCodeApiFactoryArgs,
    ) => wixRecruitmentAgenciesApplicationsBackendLoader(context),

    'recruitment-agencies-info-backend': (context: WixCodeApiFactoryArgs) =>
      wixRecruitmentAgenciesInfoBackendLoader(context),

    'restaurants-backend': (context: WixCodeApiFactoryArgs) =>
      wixRestaurantsBackendLoader(context),

    'activity-counters-backend': (context: WixCodeApiFactoryArgs) =>
      wixActivityCountersBackendLoader(context),

    'sender-details-backend': (context: WixCodeApiFactoryArgs) =>
      wixSenderDetailsBackendLoader(context),

    'comments-backend': (context: WixCodeApiFactoryArgs) =>
      wixCommentsBackendLoader(context),

    'marketing-tags-backend': (context: WixCodeApiFactoryArgs) =>
      wixMarketingTagsBackendLoader(context),

    'app-market-backend': (context: WixCodeApiFactoryArgs) =>
      wixAppMarketBackendLoader(context),

    'events-backend.v2': (context: WixCodeApiFactoryArgs) =>
      wixEventsBackendV2Loader(context),

    'inbox-conversations.backend.v1': (context: WixCodeApiFactoryArgs) =>
      wixInboxConversationsBackendV1Loader(context),

    'groups-backend.v2': (context: WixCodeApiFactoryArgs) =>
      wixGroupsBackendV2Loader(context),

    'identity-backend': (context: WixCodeApiFactoryArgs) =>
      wixIdentityBackendLoader(context),

    'forum-backend': (context: WixCodeApiFactoryArgs) =>
      wixForumBackendLoader(context),

    'events-backend.v1': (context: WixCodeApiFactoryArgs) =>
      wixEventsBackendV1Loader(context),

    'data-index-service-v2': (context: WixCodeApiFactoryArgs) =>
      wixDataIndexServiceV2Loader(context),

    'category-backend': (context: WixCodeApiFactoryArgs) =>
      wixCategoryBackendLoader(context),

    'badges-backend.v3': (context: WixCodeApiFactoryArgs) =>
      wixBadgesBackendV3Loader(context),

    'badges-backend.v1': (context: WixCodeApiFactoryArgs) =>
      wixBadgesBackendV1Loader(context),

    'badges-backend.v2': (context: WixCodeApiFactoryArgs) =>
      wixBadgesBackendV2Loader(context),

    'notifications-backend': (context: WixCodeApiFactoryArgs) =>
      wixNotificationsBackendLoader(context),

    'atlas-backend': (context: WixCodeApiFactoryArgs) =>
      wixAtlasBackendLoader(context),

    'groups-backend.v3': (context: WixCodeApiFactoryArgs) =>
      wixGroupsBackendV3Loader(context),

    'marketing-backend.v2': (context: WixCodeApiFactoryArgs) =>
      wixMarketingBackendV2Loader(context),

    'data-collection-service-v2': (context: WixCodeApiFactoryArgs) =>
      wixDataCollectionServiceV2Loader(context),

    'bookings.v2': (context: WixCodeApiFactoryArgs) =>
      wixBookingsV2Loader(context),

    'os-backend': (context: WixCodeApiFactoryArgs) =>
      wixOsBackendLoader(context),

    'inbox.v2': (context: WixCodeApiFactoryArgs) => wixInboxV2Loader(context),

    'email-marketing.v2': (context: WixCodeApiFactoryArgs) =>
      wixEmailMarketingV2Loader(context),

    'forum.v2': (context: WixCodeApiFactoryArgs) => wixForumV2Loader(context),

    'loyalty.v2': (context: WixCodeApiFactoryArgs) =>
      wixLoyaltyV2Loader(context),

    'activity-counters.v2': (context: WixCodeApiFactoryArgs) =>
      wixActivityCountersV2Loader(context),

    'business-tools.v2': (context: WixCodeApiFactoryArgs) =>
      wixBusinessToolsV2Loader(context),

    'stores.v2': (context: WixCodeApiFactoryArgs) => wixStoresV2Loader(context),

    'marketing-tags.v2': (context: WixCodeApiFactoryArgs) =>
      wixMarketingTagsV2Loader(context),

    'redirects-api.v1': (context: WixCodeApiFactoryArgs) =>
      wixRedirectsApiV1Loader(context),

    'ads-txt.v1': (context: WixCodeApiFactoryArgs) =>
      wixAdsTxtV1Loader(context),

    'sender-details.v2': (context: WixCodeApiFactoryArgs) =>
      wixSenderDetailsV2Loader(context),

    'media.v2': (context: WixCodeApiFactoryArgs) => wixMediaV2Loader(context),

    'pricing-plans-backend.v2': (context: WixCodeApiFactoryArgs) =>
      wixPricingPlansBackendV2Loader(context),

    'multilingual-localization': (context: WixCodeApiFactoryArgs) =>
      wixMultilingualLocalizationLoader(context),

    'multilingual-localization-public': (context: WixCodeApiFactoryArgs) =>
      wixMultilingualLocalizationPublicLoader(context),

    'pricing-plans.v2': (context: WixCodeApiFactoryArgs) =>
      wixPricingPlansV2Loader(context),

    'members.v2': (context: WixCodeApiFactoryArgs) =>
      wixMembersV2Loader(context),

    'groups.v2': (context: WixCodeApiFactoryArgs) => wixGroupsV2Loader(context),

    'data-backup-service-v2': (context: WixCodeApiFactoryArgs) =>
      wixDataBackupServiceV2Loader(context),

    'marketing.v2': (context: WixCodeApiFactoryArgs) =>
      wixMarketingV2Loader(context),

    'authentication-management.v2': (context: WixCodeApiFactoryArgs) =>
      wixAuthenticationManagementV2Loader(context),

    'currencies.v2': (context: WixCodeApiFactoryArgs) =>
      wixCurrenciesV2Loader(context),

    'members-about-backend.v1': (context: WixCodeApiFactoryArgs) =>
      wixMembersAboutBackendV1Loader(context),

    'members-followers-backend.v2': (context: WixCodeApiFactoryArgs) =>
      wixMembersFollowersBackendV2Loader(context),

    'multilingual-localization-schema': (context: WixCodeApiFactoryArgs) =>
      wixMultilingualLocalizationSchemaLoader(context),

    'autocms-folders-service-v1': (context: WixCodeApiFactoryArgs) =>
      wixAutocmsFoldersServiceV1Loader(context),

    'autocms-collection-rules-service-v1': (context: WixCodeApiFactoryArgs) =>
      wixAutocmsCollectionRulesServiceV1Loader(context),

    'autocms-tasks-service-v1': (context: WixCodeApiFactoryArgs) =>
      wixAutocmsTasksServiceV1Loader(context),

    'auth-management.v2': (context: WixCodeApiFactoryArgs) =>
      wixAuthManagementV2Loader(context),

    'redirects.v1': (context: WixCodeApiFactoryArgs) =>
      wixRedirectsV1Loader(context),

    'data-indexes': (context: WixCodeApiFactoryArgs) =>
      wixDataIndexesLoader(context),

    'data-items': (context: WixCodeApiFactoryArgs) =>
      wixDataItemsLoader(context),

    'data-resourceusage-service-v1': (context: WixCodeApiFactoryArgs) =>
      wixDataResourceusageServiceV1Loader(context),

    'data-external-database-connections': (context: WixCodeApiFactoryArgs) =>
      wixDataExternalDatabaseConnectionsLoader(context),

    'ecom.v2': (context: WixCodeApiFactoryArgs) => wixEcomV2Loader(context),

    'data-collections': (context: WixCodeApiFactoryArgs) =>
      wixDataCollectionsLoader(context),

    'data.v2': (context: WixCodeApiFactoryArgs) => wixDataV2Loader(context),

    'sender-emails-backend': (context: WixCodeApiFactoryArgs) =>
      wixSenderEmailsBackendLoader(context),

    'crm.v2': (context: WixCodeApiFactoryArgs) => wixCrmV2Loader(context),

    'notifications.v2': (context: WixCodeApiFactoryArgs) =>
      wixNotificationsV2Loader(context),

    'stores-v3': (context: WixCodeApiFactoryArgs) => wixStoresV3Loader(context),

    'workflows.v2': (context: WixCodeApiFactoryArgs) =>
      wixWorkflowsV2Loader(context),

    'secrets.backend.v2': (context: WixCodeApiFactoryArgs) =>
      wixSecretsBackendV2Loader(context),

    risewallet: (context: WixCodeApiFactoryArgs) =>
      wixRisewalletLoader(context),

    riseevent: (context: WixCodeApiFactoryArgs) => wixRiseeventLoader(context),

    'captcha.v2': (context: WixCodeApiFactoryArgs) =>
      wixCaptchaV2Loader(context),

    'table-reservations.v2': (context: WixCodeApiFactoryArgs) =>
      wixTableReservationsV2Loader(context),

    'categories.v2': (context: WixCodeApiFactoryArgs) =>
      wixCategoriesV2Loader(context),

    'reviews.v2': (context: WixCodeApiFactoryArgs) =>
      wixReviewsV2Loader(context),

    'notifications.v3': (context: WixCodeApiFactoryArgs) =>
      wixNotificationsV3Loader(context),

    'comments.v2': (context: WixCodeApiFactoryArgs) =>
      wixCommentsV2Loader(context),

    'rise.v2': (context: WixCodeApiFactoryArgs) => wixRiseV2Loader(context),

    'members-followers-backend.v1': (context: WixCodeApiFactoryArgs) =>
      wixMembersFollowersBackendV1Loader(context),

    'livevideo-backend': (context: WixCodeApiFactoryArgs) =>
      wixLivevideoBackendLoader(context),

    'bookings.v1': (context: WixCodeApiFactoryArgs) =>
      wixBookingsV1Loader(context),

    'search.v2': (context: WixCodeApiFactoryArgs) => wixSearchV2Loader(context),

    'members-about.v1': (context: WixCodeApiFactoryArgs) =>
      wixMembersAboutV1Loader(context),

    'forms.v2': (context: WixCodeApiFactoryArgs) => wixFormsV2Loader(context),

    'restaurants.v2': (context: WixCodeApiFactoryArgs) =>
      wixRestaurantsV2Loader(context),

    'members.v3': (context: WixCodeApiFactoryArgs) =>
      wixMembersV3Loader(context),

    'benefit-programs-backend.v1': (context: WixCodeApiFactoryArgs) =>
      wixBenefitProgramsBackendV1Loader(context),

    'online-programs': (context: WixCodeApiFactoryArgs) =>
      wixOnlineProgramsLoader(context),

    'custom-fields-schema.v2': (context: WixCodeApiFactoryArgs) =>
      wixCustomFieldsSchemaV2Loader(context),

    'export-async-job.v1': (context: WixCodeApiFactoryArgs) =>
      wixExportAsyncJobV1Loader(context),

    'fqdn-definitions-backend': (context: WixCodeApiFactoryArgs) =>
      wixFqdnDefinitionsBackendLoader(context),

    'settings.v2': (context: WixCodeApiFactoryArgs) =>
      wixSettingsV2Loader(context),

    'multilingual.v2': (context: WixCodeApiFactoryArgs) =>
      wixMultilingualV2Loader(context),

    restaurants: (context: WixCodeApiFactoryArgs) =>
      wixRestaurantsLoader(context),

    'app-settings.v2': (context: WixCodeApiFactoryArgs) =>
      wixAppSettingsV2Loader(context),

    'calendar.v3': (context: WixCodeApiFactoryArgs) =>
      wixCalendarV3Loader(context),

    'generate-example': (context: WixCodeApiFactoryArgs) =>
      wixGenerateExampleLoader(context),

    'billing-tax': (context: WixCodeApiFactoryArgs) =>
      wixBillingTaxLoader(context),

    'billing.v2': (context: WixCodeApiFactoryArgs) =>
      wixBillingV2Loader(context),

    'payments.v2': (context: WixCodeApiFactoryArgs) =>
      wixPaymentsV2Loader(context),

    'ep-plugins.v1': (context: WixCodeApiFactoryArgs) =>
      wixEpPluginsV1Loader(context),

    'events.v2': (context: WixCodeApiFactoryArgs) => wixEventsV2Loader(context),

    'urls.v2': (context: WixCodeApiFactoryArgs) => wixUrlsV2Loader(context),

    'app-plugins-site-plugins.v1': (context: WixCodeApiFactoryArgs) =>
      wixAppPluginsSitePluginsV1Loader(context),

    'search.v3': (context: WixCodeApiFactoryArgs) =>
      wixSearchV3Loader(context),

    'ssr-cache-invalidation-backend.v1': (context: WixCodeApiFactoryArgs) =>
      wixSsrCacheInvalidationBackendV1Loader(context),

    'app-management.v2': (context: WixCodeApiFactoryArgs) =>
      wixAppManagementV2Loader(context),

    'cache-backend': (context: WixCodeApiFactoryArgs) =>
      wixCacheBackendLoader(context),

    'analytics': (context: WixCodeApiFactoryArgs) =>
      wixAnalyticsLoader(context),

    'seatings-backend': (context: WixCodeApiFactoryArgs) =>
      wixSeatingsBackendLoader(context),

    'dashboard-management-backend': (context: WixCodeApiFactoryArgs) =>
      wixDashboardManagementBackendLoader(context),

    'papyrus-templates-backend': (context: WixCodeApiFactoryArgs) =>
      wixPapyrusTemplatesBackendLoader(context),

    'sending-domains-backend': (context: WixCodeApiFactoryArgs) =>
      wixSendingDomainsBackendLoader(context),

    'site-plugins.v1': (context: WixCodeApiFactoryArgs) =>
      wixSitePluginsV1Loader(context),

    'dashboard-management.v2': (context: WixCodeApiFactoryArgs) =>
      wixDashboardManagementV2Loader(context),

    'editor-deployments.v1': (context: WixCodeApiFactoryArgs) =>
      wixEditorDeploymentsV1Loader(context),

    'infra-backend': (context: WixCodeApiFactoryArgs) =>
      wixInfraBackendLoader(context),

    'tags.v1': (context: WixCodeApiFactoryArgs) =>
      wixTagsV1Loader(context),

    'packages.v1': (context: WixCodeApiFactoryArgs) =>
      wixPackagesV1Loader(context),

    'domains.v1': (context: WixCodeApiFactoryArgs) =>
      wixDomainsV1Loader(context),

    'moderation-rules.v1': (context: WixCodeApiFactoryArgs) =>
      wixModerationRulesV1Loader(context),

    'automations.v2': (context: WixCodeApiFactoryArgs) =>
      wixAutomationsV2Loader(context),

    'referral.v1': (context: WixCodeApiFactoryArgs) =>
      wixReferralV1Loader(context),

    'custom-fields.v1': (context: WixCodeApiFactoryArgs) =>
      wixCustomFieldsV1Loader(context),

    'members.v1': (context: WixCodeApiFactoryArgs) =>
      wixMembersV1Loader(context),

    'subscription.v1': (context: WixCodeApiFactoryArgs) =>
      wixSubscriptionV1Loader(context),

    'review-request.v1': (context: WixCodeApiFactoryArgs) =>
      wixReviewRequestV1Loader(context),

    'site-actions.v2': (context: WixCodeApiFactoryArgs) =>
      wixSiteActionsV2Loader(context),

    'members-area.v1': (context: WixCodeApiFactoryArgs) =>
      wixMembersAreaV1Loader(context),

    'analytics-session.v1': (context: WixCodeApiFactoryArgs) =>
      wixAnalyticsSessionV1Loader(context),

    'gift-cards-backend': (context: WixCodeApiFactoryArgs) =>
      wixGiftCardsBackendLoader(context),

    'marketing-consent-service-backend': (context: WixCodeApiFactoryArgs) =>
      wixMarketingConsentServiceBackendLoader(context),

    'analytics-data.v2': (context: WixCodeApiFactoryArgs) =>
      wixAnalyticsDataV2Loader(context),

    'apps-installer.v1': (context: WixCodeApiFactoryArgs) =>
      wixAppsInstallerV1Loader(context),

    'async-jobs.v2': (context: WixCodeApiFactoryArgs) =>
      wixAsyncJobsV2Loader(context),

    'chat-widget.v1': (context: WixCodeApiFactoryArgs) =>
      chatWidgetV1Loader(context),

    'migration-triggers.v1': (context: WixCodeApiFactoryArgs) =>
      migrationTriggersV1Loader(context),

    'trigger-catalog.v1': (context: WixCodeApiFactoryArgs) =>
      triggerCatalogV1Loader(context),

    'automations.v1': (context: WixCodeApiFactoryArgs) =>
      wixAutomationsV1Loader(context),

    'assistant-widget.v1': (context: WixCodeApiFactoryArgs) =>
      wixAssistantWidgetV1Loader(context),

    'editor-site-embeds.v1': (context: WixCodeApiFactoryArgs) =>
      wixEditorSiteEmbedsV1Loader(context),

    'automations-actioncatalog.v1': (context: WixCodeApiFactoryArgs) =>
      wixAutomationsActioncatalogV1Loader(context),

    'automations-activation-log.v1': (context: WixCodeApiFactoryArgs) =>
      wixAutomationsActivationLogV1Loader(context),

    'assistant-playground.v1': (context: WixCodeApiFactoryArgs) =>
      wixAssistantPlaygroundV1Loader(context),
  };
}

const wixAssistantPlaygroundV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-assistant-playground.v1" */
    '@wix/wix-assistant-playground.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixAutomationsActivationLogV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-automations-activation-log.v1" */
    '@wix/wix-automations-activation-log.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixAutomationsActioncatalogV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-automations-actioncatalog.v1" */
    '@wix/wix-automations-actioncatalog.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixEditorSiteEmbedsV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-editor-site-embeds.v1" */
    '@wix/wix-editor-site-embeds.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixAssistantWidgetV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-assistant-widget.v1" */
    '@wix/wix-assistant-widget.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixAutomationsV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-automations.v1" */
    '@wix/wix-automations.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const triggerCatalogV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "trigger-catalog.v1" */
    '@wix/trigger-catalog.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const migrationTriggersV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "migration-triggers.v1" */
    '@wix/migration-triggers.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const chatWidgetV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "chat-widget.v1" */
    '@wix/chat-widget.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixAsyncJobsV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-async-jobs.v2" */
    '@wix/wix-async-jobs.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixAppsInstallerV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-apps-installer.v1" */
    '@wix/wix-apps-installer.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixAnalyticsDataV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-analytics-data.v2" */
    '@wix/wix-analytics-data.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixMarketingConsentServiceBackendLoader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-marketing-consent-service-backend" */
    '@wix/wix-marketing-consent-service-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixGiftCardsBackendLoader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-gift-cards-backend" */
    '@wix/wix-gift-cards-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixAnalyticsSessionV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-analytics-session.v1" */
    '@wix/wix-analytics-session.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixMembersAreaV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-members-area.v1" */
    '@wix/wix-members-area.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixSiteActionsV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-site-actions.v2" */
    '@wix/wix-site-actions.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixReviewRequestV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-review-request.v1" */
    '@wix/wix-review-request.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixSubscriptionV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-subscription.v1" */
    '@wix/wix-subscription.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixMembersV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-members.v1" */
    '@wix/wix-members.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixCustomFieldsV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-custom-fields.v1" */
    '@wix/wix-custom-fields.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixReferralV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-referral.v1" */
    '@wix/wix-referral.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixAutomationsV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-automations.v2" */
    '@wix/wix-automations.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixModerationRulesV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-moderation-rules.v1" */
    '@wix/wix-moderation-rules.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixDomainsV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-domains.v1" */
    '@wix/wix-domains.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixPackagesV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-packages.v1" */
    '@wix/wix-packages.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixTagsV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-tags.v1" */
    '@wix/wix-tags.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixInfraBackendLoader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-infra-backend" */
    '@wix/wix-infra-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixEditorDeploymentsV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-editor-deployments.v1" */
    '@wix/wix-editor-deployments.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixDashboardManagementV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-dashboard-management.v2" */
    '@wix/wix-dashboard-management.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixSitePluginsV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-site-plugins.v1" */
    '@wix/wix-site-plugins.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixSendingDomainsBackendLoader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-sending-domains-backend" */
    '@wix/wix-sending-domains-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixPapyrusTemplatesBackendLoader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-papyrus-templates-backend" */
    '@wix/wix-papyrus-templates-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixDashboardManagementBackendLoader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-dashboard-management-backend" */
    '@wix/wix-dashboard-management-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixSeatingsBackendLoader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-seatings-backend" */
    '@wix/wix-seatings-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixAnalyticsLoader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-analytics" */
    '@wix/wix-analytics/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixCacheBackendLoader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-cache-backend" */
    '@wix/wix-cache-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixAppManagementV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-app-management.v2" */
    '@wix/wix-app-management.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixSsrCacheInvalidationBackendV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-ssr-cache-invalidation-backend.v1" */
    '@wix/wix-ssr-cache-invalidation-backend.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixSearchV3Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-search.v3" */
    '@wix/wix-search.v3/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixAppPluginsSitePluginsV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-app-plugins-site-plugins.v1" */
    '@wix/wix-app-plugins-site-plugins.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));


const wixUrlsV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-urls.v2" */
    '@wix/wix-urls.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixEventsV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-events.v2" */
    '@wix/wix-events.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixEpPluginsV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-ep-plugins.v1" */
    '@wix/wix-ep-plugins.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixPaymentsV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-payments.v2" */
    '@wix/wix-payments.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixBillingV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-billing.v2" */
    '@wix/wix-billing.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixBillingTaxLoader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-billing-tax" */
    '@wix/wix-billing-tax/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixGenerateExampleLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-generate-example" */
    '@wix/wix-generate-example/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixCalendarV3Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-calendar.v3" */
    '@wix/wix-calendar.v3/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixAppSettingsV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-app-settings.v2" */
    '@wix/wix-app-settings.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixRestaurantsLoader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-restaurants" */
    '@wix/wix-restaurants/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixMultilingualV2Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-multilingual.v2" */
    '@wix/wix-multilingual.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixSettingsV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-settings.v2" */
    '@wix/wix-settings.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixFqdnDefinitionsBackendLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-fqdn-definitions-backend" */
    '@wix/wix-fqdn-definitions-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixExportAsyncJobV1Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-export-async-job.v1" */
    '@wix/wix-export-async-job.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixCustomFieldsSchemaV2Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-custom-fields-schema.v2" */
    '@wix/wix-custom-fields-schema.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixOnlineProgramsLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-online-programs" */
    '@wix/wix-online-programs/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixBenefitProgramsBackendV1Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-benefit-programs-backend.v1" */
    '@wix/wix-benefit-programs-backend.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixMembersV3Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-members.v3" */
    '@wix/wix-members.v3/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixRestaurantsV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-restaurants.v2" */
    '@wix/wix-restaurants.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixFormsV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-forms.v2" */
    '@wix/wix-forms.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixMembersAboutV1Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-members-about.v1" */
    '@wix/wix-members-about.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixSearchV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-search.v2" */
    '@wix/wix-search.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixBookingsV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-bookings.v1" */
    '@wix/wix-bookings.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixLivevideoBackendLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-livevideo-backend" */
    '@wix/wix-livevideo-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixMembersFollowersBackendV1Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-members-followers-backend.v1" */
    '@wix/wix-members-followers-backend.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixRiseV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-rise.v2" */
    '@wix/wix-rise.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixCommentsV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-comments.v2" */
    '@wix/wix-comments.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixNotificationsV3Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-notifications.v3" */
    '@wix/wix-notifications.v3/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixReviewsV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-reviews.v2" */
    '@wix/wix-reviews.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixCategoriesV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-categories.v2" */
    '@wix/wix-categories.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixTableReservationsV2Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-table-reservations.v2" */
    '@wix/wix-table-reservations.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixCaptchaV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-captcha.v2" */
    '@wix/wix-captcha.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixRiseeventLoader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-riseevent" */
    '@wix/wix-riseevent/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixRisewalletLoader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-risewallet" */
    '@wix/wix-risewallet/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixSecretsBackendV2Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-secrets.backend.v2" */
    '@wix/wix-secrets.backend.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixWorkflowsV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-workflows.v2" */
    '@wix/wix-workflows.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixStoresV3Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-stores-v3" */
    '@wix/wix-stores-v3/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixNotificationsV2Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-notifications.v2" */
    '@wix/wix-notifications.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixCrmV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-crm.v2" */
    '@wix/wix-crm.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixSenderEmailsBackendLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-sender-emails-backend" */
    '@wix/wix-sender-emails-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixDataV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-data.v2" */
    '@wix/wix-data.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixDataCollectionsLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-data-collections" */
    '@wix/wix-data-collections/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixEcomV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-ecom.v2" */
    '@wix/wix-ecom.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixDataExternalDatabaseConnectionsLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-data-external-database-connections" */
    '@wix/wix-data-external-database-connections/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixDataResourceusageServiceV1Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-data-resourceusage-service-v1" */
    '@wix/wix-data-resourceusage-service-v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixDataItemsLoader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-data-items" */
    '@wix/wix-data-items/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixDataIndexesLoader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-data-indexes" */
    '@wix/wix-data-indexes/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixRedirectsV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-redirects.v1" */
    '@wix/wix-redirects.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixAuthManagementV2Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-auth-management.v2" */
    '@wix/wix-auth-management.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixAutocmsTasksServiceV1Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-autocms-tasks-service-v1" */
    '@wix/wix-autocms-tasks-service-v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixAutocmsCollectionRulesServiceV1Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-autocms-collection-rules-service-v1" */
    '@wix/wix-autocms-collection-rules-service-v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixAutocmsFoldersServiceV1Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-autocms-folders-service-v1" */
    '@wix/wix-autocms-folders-service-v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixMultilingualLocalizationSchemaLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-multilingual-localization-schema" */
    '@wix/wix-multilingual-localization-schema/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixMembersFollowersBackendV2Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-members-followers-backend.v2" */
    '@wix/wix-members-followers-backend.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixMembersAboutBackendV1Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-members-about-backend.v1" */
    '@wix/wix-members-about-backend.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixCurrenciesV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-currencies.v2" */
    '@wix/wix-currencies.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixAuthenticationManagementV2Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-authentication-management.v2" */
    '@wix/wix-authentication-management.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixMarketingV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-marketing.v2" */
    '@wix/wix-marketing.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixDataBackupServiceV2Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-data-backup-service-v2" */
    '@wix/wix-data-backup-service-v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixGroupsV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-groups.v2" */
    '@wix/wix-groups.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixMembersV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-members.v2" */
    '@wix/wix-members.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixPricingPlansV2Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-pricing-plans.v2" */
    '@wix/wix-pricing-plans.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixMultilingualLocalizationPublicLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-multilingual-localization-public" */
    '@wix/wix-multilingual-localization-public/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixMultilingualLocalizationLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-multilingual-localization" */
    '@wix/wix-multilingual-localization/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixPricingPlansBackendV2Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-pricing-plans-backend.v2" */
    '@wix/wix-pricing-plans-backend.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixMediaV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-media.v2" */
    '@wix/wix-media.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixSenderDetailsV2Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-sender-details.v2" */
    '@wix/wix-sender-details.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixAdsTxtV1Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-ads-txt.v1" */
    '@wix/wix-ads-txt.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixRedirectsApiV1Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-redirects-api.v1" */
    '@wix/wix-redirects-api.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixMarketingTagsV2Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-marketing-tags.v2" */
    '@wix/wix-marketing-tags.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixStoresV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-stores.v2" */
    '@wix/wix-stores.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixBusinessToolsV2Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-business-tools.v2" */
    '@wix/wix-business-tools.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixActivityCountersV2Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-activity-counters.v2" */
    '@wix/wix-activity-counters.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixLoyaltyV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-loyalty.v2" */
    '@wix/wix-loyalty.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixForumV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-forum.v2" */
    '@wix/wix-forum.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixEmailMarketingV2Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-email-marketing.v2" */
    '@wix/wix-email-marketing.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixInboxV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-inbox.v2" */
    '@wix/wix-inbox.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixOsBackendLoader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-os-backend" */
    '@wix/wix-os-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixBookingsV2Loader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-bookings.v2" */
    '@wix/wix-bookings.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixDataCollectionServiceV2Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-data-collection-service-v2" */
    '@wix/wix-data-collection-service-v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixMarketingBackendV2Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-marketing-backend.v2" */
    '@wix/wix-marketing-backend.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixGroupsBackendV3Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-groups-backend.v3" */
    '@wix/wix-groups-backend.v3/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixAtlasBackendLoader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-atlas-backend" */
    '@wix/wix-atlas-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixNotificationsBackendLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-notifications-backend" */
    '@wix/wix-notifications-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixBadgesBackendV2Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-badges-backend.v2" */
    '@wix/wix-badges-backend.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixBadgesBackendV1Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-badges-backend.v1" */
    '@wix/wix-badges-backend.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixBadgesBackendV3Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-badges-backend.v3" */
    '@wix/wix-badges-backend.v3/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixCategoryBackendLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-category-backend" */
    '@wix/wix-category-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixDataIndexServiceV2Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-data-index-service-v2" */
    '@wix/wix-data-index-service-v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixEventsBackendV1Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-events-backend.v1" */
    '@wix/wix-events-backend.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixForumBackendLoader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-forum-backend" */
    '@wix/wix-forum-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixIdentityBackendLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-identity-backend" */
    '@wix/wix-identity-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixGroupsBackendV2Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-groups-backend.v2" */
    '@wix/wix-groups-backend.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixInboxConversationsBackendV1Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-inbox-conversations.backend.v1" */
    '@wix/wix-inbox-conversations.backend.v1/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixEventsBackendV2Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-events-backend.v2" */
    '@wix/wix-events-backend.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixAppMarketBackendLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-app-market-backend" */
    '@wix/wix-app-market-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixMarketingTagsBackendLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-marketing-tags-backend" */
    '@wix/wix-marketing-tags-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixCommentsBackendLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-comments-backend" */
    '@wix/wix-comments-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixSenderDetailsBackendLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-sender-details-backend" */
    '@wix/wix-sender-details-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixActivityCountersBackendLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-activity-counters-backend" */
    '@wix/wix-activity-counters-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixRestaurantsBackendLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-restaurants-backend" */
    '@wix/wix-restaurants-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixRecruitmentAgenciesInfoBackendLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-recruitment-agencies-info-backend" */
    '@wix/wix-recruitment-agencies-info-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixRecruitmentAgenciesApplicationsBackendLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-recruitment-agencies-applications-backend" */
    '@wix/wix-recruitment-agencies-applications-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixRecruitmentAgenciesPositionsBackendLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-recruitment-agencies-positions-backend" */
    '@wix/wix-recruitment-agencies-positions-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixReviewsBackendLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-reviews-backend" */
    '@wix/wix-reviews-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixAlertEnricherBackendLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-alert-enricher-backend" */
    '@wix/wix-alert-enricher-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixMembersFollowersBackendV3Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-members-followers-backend.v3" */
    '@wix/wix-members-followers-backend.v3/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixStoresBackendV2Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-stores-backend.v2" */
    '@wix/wix-stores-backend.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixMotionBackendV2Loader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-motion-backend.v2" */
    '@wix/wix-motion-backend.v2/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixTableReservationsBackendLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-table-reservations-backend" */
    '@wix/wix-table-reservations-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixLoyaltyBackendLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-loyalty-backend" */
    '@wix/wix-loyalty-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixProGalleryBackendLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-pro-gallery-backend" */
    '@wix/wix-pro-gallery-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixFormsBackendLoader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-forms-backend" */
    '@wix/wix-forms-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixRatingsBackendLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-ratings-backend" */
    '@wix/wix-ratings-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixMetroBackendLoader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-metro-backend" */
    '@wix/wix-metro-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixPortfolioBackendLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-portfolio-backend" */
    '@wix/wix-portfolio-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixDataBackendPublicSdkPocLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-data-backend-public-sdk-poc" */
    '@wix/wix-data-backend-public-sdk-poc/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixCoreServicesDevLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-core-services-dev" */
    '@wix/wix-core-services-dev/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixBlogBackendLoader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-blog-backend" */
    '@wix/wix-blog-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixEcomBackendLoader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-ecom-backend" */
    '@wix/wix-ecom-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixOnlineProgramsBackendLoader = (
  context: WixCodeApiFactoryArgs,
): Promise<any> =>
  import(
    /* webpackChunkName: "wix-online-programs-backend" */
    '@wix/wix-online-programs-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

const wixEchoBackendLoader = (context: WixCodeApiFactoryArgs): Promise<any> =>
  import(
    /* webpackChunkName: "wix-echo-backend" */
    '@wix/wix-echo-backend/frontend'
  ).then(({ sdkFactory }) => sdkFactory(context));

export { namespacesSdkFactory };
