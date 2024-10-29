import { Experiments, SiteAssetsExperimentMetadata } from '@wix/thunderbolt-symbols'
import { siteAssetsModules } from './siteAssetsModules'

const createExperiments = <T extends Record<string, SiteAssetsExperimentMetadata>>(obj: T) => obj

export const beckySpecs = createExperiments({
	'specs.thunderbolt.fixRatingsInputLeftShift': {
		modules: ['thunderbolt-features', 'thunderbolt-css', 'thunderbolt-css-mappers', 'thunderbolt-platform'],
	},
	'specs.thunderbolt.supportPositionDesignVar': { modules: ['thunderbolt-css'] },
	dm_changeCSMKeys: {
		modules: ['thunderbolt-features', 'thunderbolt-platform', 'thunderbolt-site-map'],
	},
	'specs.thunderbolt.deprecateAppId': {
		modules: ['thunderbolt-features', 'thunderbolt-platform', 'thunderbolt-site-map'],
	},
	'specs.thunderbolt.breakingBekyCache': { modules: siteAssetsModules }, // closed by default. used only for urgent cases which require breaking tb modules cache
	'specs.thunderbolt.DatePickerPortal': { modules: siteAssetsModules },
	'specs.thunderbolt.LinkBarPlaceholderImages': {
		modules: ['thunderbolt-features', 'thunderbolt-platform'],
	},
	'specs.thunderbolt.presenceApi': { modules: siteAssetsModules },
	'specs.thunderbolt.presenceWithoutChat': { modules: siteAssetsModules },
	'specs.thunderbolt.repeater_keyboard_navigation': { modules: ['thunderbolt-features', 'thunderbolt-platform'] },
	'specs.thunderbolt.WRichTextResponsiveTagsInBlocksWidget': { modules: siteAssetsModules },
	'specs.thunderbolt.dropdownOptionStyle': { modules: ['thunderbolt-features', 'thunderbolt-platform'] },
	'specs.thunderbolt.oneDocStrictMode': {
		modules: ['thunderbolt-features', 'thunderbolt-css', 'thunderbolt-css-mappers', 'thunderbolt-platform'],
	},
	'specs.thunderbolt.prefetchPageResourcesVeloApi': { modules: ['thunderbolt-features'] },
	'specs.thunderbolt.shouldUseViewTransition': { modules: ['thunderbolt-features'] },
	'specs.thunderbolt.native_css_mappers_video': { modules: ['thunderbolt-css', 'thunderbolt-css-mappers'] },
	'specs.thunderbolt.edixIsInFirstFold': {
		modules: ['thunderbolt-features', 'thunderbolt-platform', 'thunderbolt-site-map'],
	},
	'specs.thunderbolt.shouldUseResponsiveImages': { modules: ['thunderbolt-features'] },
	'specs.thunderbolt.useResponsiveImgClassicFixed': { modules: ['thunderbolt-features'] },
	'specs.thunderbolt.DDMenuMigrateCssCarmiMapper': { modules: ['thunderbolt-css', 'thunderbolt-css-mappers'] },
	'specs.thunderbolt.supportSpxInEEMappers': { modules: ['thunderbolt-css', 'thunderbolt-css-mappers'] },
	'specs.thunderbolt.designableListForMobileDropdown': {
		modules: ['thunderbolt-features', 'thunderbolt-platform'],
	},
	'specs.thunderbolt.fiveGridLineStudioSkins': {
		modules: ['thunderbolt-features', 'thunderbolt-platform'],
	},
	'specs.thunderbolt.keepTextInputHeight': { modules: ['thunderbolt-features', 'thunderbolt-platform'] },
	'specs.thunderbolt.fetchBlocksDevCenterWidgetIds': {
		modules: [
			'thunderbolt-features',
			'thunderbolt-css',
			'thunderbolt-css-mappers',
			'thunderbolt-platform',
			'thunderbolt-site-map',
		],
	},
	'specs.thunderbolt.migrateStylableComponentsInBlocksWidgets': { modules: siteAssetsModules }, // Internal Use
	'specs.thunderbolt.WRichTextPropsMapper': { modules: ['thunderbolt-features', 'thunderbolt-platform'] },
	'specs.thunderbolt.doNotInflateSharedParts': {
		modules: [
			'thunderbolt-features',
			'thunderbolt-css',
			'thunderbolt-css-mappers',
			'thunderbolt-platform',
			'thunderbolt-site-map',
		],
	},
	'specs.thunderbolt.BuilderComponent': {
		modules: [
			'thunderbolt-features',
			'thunderbolt-css',
			'thunderbolt-css-mappers',
			'thunderbolt-platform',
			'thunderbolt-site-map',
		],
	},
	'specs.thunderbolt.renderPlatformBuilderComponent': {
		modules: [
			'thunderbolt-features',
			'thunderbolt-css',
			'thunderbolt-css-mappers',
			'thunderbolt-platform',
			'thunderbolt-site-map',
		],
	},
	'specs.thunderbolt.ooiCssModelNotInCarmi': {
		modules: ['thunderbolt-css', 'thunderbolt-css-mappers'],
	},
	'specs.thunderbolt.TextInputAutoFillFix': { modules: ['thunderbolt-features', 'thunderbolt-platform'] },
	'specs.thunderbolt.removeHeaderFooterWrappers': {
		modules: ['thunderbolt-features', 'thunderbolt-css', 'thunderbolt-css-mappers'],
	},
	'specs.thunderbolt.fontsFromExternal': { modules: ['thunderbolt-css', 'thunderbolt-css-mappers'] },
	'specs.thunderbolt.buttonUdp': { modules: ['thunderbolt-features', 'thunderbolt-platform'] },
	'specs.thunderbolt.allowCustomElementForAll': { modules: ['thunderbolt-features', 'thunderbolt-platform'] },
	'specs.thunderbolt.fixDisabledLinkButtonStyles': { modules: ['thunderbolt-features', 'thunderbolt-platform'] },
	'specs.thunderbolt.enableOneDoc': {
		modules: ['thunderbolt-features', 'thunderbolt-css', 'thunderbolt-css-mappers', 'thunderbolt-platform'],
	},
	'specs.thunderbolt.PayPalButtonRedirectFlow': { modules: ['thunderbolt-features', 'thunderbolt-platform'] },
	'specs.thunderbolt.A11yWPhotoPopupSemanticsAndKeyboardOperability': {
		modules: ['thunderbolt-features', 'thunderbolt-platform'],
	},
	'specs.thunderbolt.magnifyKeyboardOperability': { modules: siteAssetsModules },
	'specs.thunderbolt.useInternalBlocksRefType': {
		modules: [
			'thunderbolt-features',
			'thunderbolt-css',
			'thunderbolt-css-mappers',
			'thunderbolt-platform',
			'thunderbolt-site-map',
		],
	},
	'specs.thunderbolt.compCssMappers_catharsis': { modules: ['thunderbolt-css', 'thunderbolt-css-mappers'] },
	'specs.thunderbolt.one_cell_grid_display_flex': { modules: ['thunderbolt-css', 'thunderbolt-css-mappers'] },
	'specs.thunderbolt.one_cell_grid_display_block': { modules: ['thunderbolt-css', 'thunderbolt-css-mappers'] },
	'specs.thunderbolt.comp_designCss_selectorToCss_Mappers_catharsis': {
		modules: ['thunderbolt-css', 'thunderbolt-css-mappers'],
	},
	'specs.thunderbolt.ooiCssAsLinkTag': { modules: ['thunderbolt-css', 'thunderbolt-css-mappers'] },
	'specs.thunderbolt.motionFeature': {
		modules: ['thunderbolt-features', 'thunderbolt-css', 'thunderbolt-css-mappers'],
	},
	'specs.thunderbolt.motionBgScrub': {
		modules: ['thunderbolt-features', 'thunderbolt-css', 'thunderbolt-css-mappers'],
	},
	'specs.thunderbolt.motionScrollMoveIgnoreOffsets': { modules: ['thunderbolt-features'] },
	'specs.thunderbolt.sandboxForCustomElement': {
		modules: ['thunderbolt-features', 'thunderbolt-platform'],
	},
	'specs.thunderbolt.fixCustomElementInWidgetInRepeater': { modules: ['thunderbolt-features'] },
	'specs.thunderbolt.forceStudio': { modules: siteAssetsModules }, // internal experiment, not for public use
	'specs.thunderbolt.minMaxInCheckboxGroup': { modules: ['thunderbolt-features', 'thunderbolt-platform'] },
	'specs.thunderbolt.newVhCalc': { modules: ['thunderbolt-css', 'thunderbolt-css-mappers'] },
	'specs.thunderbolt.noHeightOnTextMask': { modules: ['thunderbolt-css', 'thunderbolt-css-mappers'] },
	'specs.thunderbolt.WRichTextVerticalTextNowidth': { modules: siteAssetsModules },
	'specs.thunderbolt.useSvgLoaderFeature': { modules: ['thunderbolt-features'] },
	'specs.thunderbolt.WixFreeSiteBannerDesktop': {
		modules: ['thunderbolt-features', 'thunderbolt-css', 'thunderbolt-css-mappers', 'thunderbolt-platform'],
	},
	'specs.thunderbolt.WixFreeSiteBannerMobile': {
		modules: ['thunderbolt-features', 'thunderbolt-css', 'thunderbolt-css-mappers', 'thunderbolt-platform'],
	},
	'specs.thunderbolt.skipCarmiCalculationForNonCssMappersRequest': {
		modules: ['thunderbolt-css'],
	},
	'specs.thunderbolt.dataBindingInMasterResponsive': {
		modules: [
			'thunderbolt-features',
			'thunderbolt-css',
			'thunderbolt-css-mappers',
			'thunderbolt-platform',
			'thunderbolt-site-map',
		],
	},
	'specs.thunderbolt.responsiveTextInStretched': {
		modules: ['thunderbolt-css-mappers'],
	},
	'specs.thunderbolt.defaultDisplayBlock': { modules: ['thunderbolt-css'] },
})

/*
 * This list contains experiments names that are relevant to code running in site-assets (A.K.A Becky)
 * They are available via envApi.getExperiments() for carmi code and compInfo['experiments'] for components mappers
 * If the code that uses the experiment runs in feature - you don't need to add it here
 * See becky experiment guidelines here: https://wix.slack.com/canvas/C4D8A09PZ
 * */
export type beckyWhitelistSpecType = keyof typeof beckySpecs
export const beckyWhitelist = Object.keys(beckySpecs) as Array<beckyWhitelistSpecType>

/*
 * This list contains experiments names that are relevant to data-fixer code running in site-assets
 * They are passed to becky (site-assets modules) so that it can get fixed JSONs as input
 * Add only data-fixers experiments relevant to TB (they will be sent only if the experiment is open in thunderbolt-viewer scope)
 * */
export const dataFixersSpecsWhitelist = [
	'sv_migrateTpaToSemiNative',
	'bv_migrateAbsoluteLayoutToDataMaps',
	'bv_scrollEffectsFixer',
	'bv_migrate',
	'bv_migrateResponsiveLayoutToSingleLayoutData',
	'dm_removeMissingResponsiveRefs',
	'bv_removeMenuDataFromPageJson',
	'dm_fixMobileSplitInVariantNs',
	'dm_fixMobileSplitDesign',
	'dm_keepChildlessAppWidget',
	'dm_removeResponsiveDataFromClassicEditorFixer',
	'dm_enableDefaultA11ySettings',
	'dm_linkRelDefaults',
	'specs.thunderbolt.use_data_fixed_pages_upstream',
	'dm_meshLayout',
]

/*
 * This list contains experiments names that are relevant to data-fixer code running in site-assets
 * They are passed to becky (site-assets modules) so that it can get fixed JSONs as input
 * These experiments are always sent, regardless of conduction in thunderbolt-viewer scope.
 * */
export const hardCodedListOfDataFixersExperiments: Experiments = {}
