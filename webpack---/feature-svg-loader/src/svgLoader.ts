import { withDependencies, named } from '@wix/thunderbolt-ioc'
import {
	PageFeatureConfigSymbol,
	IPageWillMountHandler,
	Props,
	IPropsStore,
	ILogger,
	LoggerSymbol,
	NavigationManagerSymbol,
	INavigationManager,
} from '@wix/thunderbolt-symbols'
import type { SvgLoaderPageConfig, ISvgContentBuilder } from './types'
import { SvgContentBuilderSymbol, name } from './symbols'
import _ from 'lodash'

export const SvgLoader = withDependencies(
	[named(PageFeatureConfigSymbol, name), SvgContentBuilderSymbol, Props, LoggerSymbol, NavigationManagerSymbol],
	(
		pageFeatureConfig: SvgLoaderPageConfig,
		svgContentBuilder: ISvgContentBuilder,
		propsStore: IPropsStore,
		logger: ILogger,
		navigationManager: INavigationManager
	): IPageWillMountHandler => {
		return {
			name: 'svgLoader',
			async pageWillMount() {
				const isClient = !!process.env.browser

				await logger.runAsyncAndReport(
					() =>
						Promise.all(
							_.map(pageFeatureConfig.compIdToSvgDataMap, async (svgData, compId) => {
								if (isClient) {
									const svgContent = getSvgContentFromDom(compId)
									if (svgContent) {
										updateSvgContentProp(propsStore, compId, svgContent)
										return
									}
								}

								const svgContent = await svgContentBuilder({ ...svgData, compId })

								if (svgContent) {
									updateSvgContentProp(propsStore, compId, svgContent)
								} else {
									logger.captureError(new Error(`Failed to load svg content for compId: ${compId}`), {
										tags: { feature: name, compId },
									})
								}
							})
						),
					name,
					`loadSvgContent:${
						isClient ? (navigationManager.isFirstNavigation() ? 'client-first-page' : 'navigation') : 'ssr'
					}`
				)
			},
		}
	}
)

const updateSvgContentProp = (propsStore: IPropsStore, compId: string, svgContent: string) => {
	propsStore.update({
		[compId]: {
			svgContent,
		},
	})
}

const getSvgContentFromDom = (compId: string) => {
	const compElement = window?.document?.getElementById(compId)
	if (!compElement) {
		return null
	}
	const svgElement = compElement.querySelector('svg')

	if (svgElement) {
		return svgElement?.parentElement?.innerHTML
	} else {
		return null
	}
}
