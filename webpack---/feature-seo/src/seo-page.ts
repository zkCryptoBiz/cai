import { withDependencies, named } from '@wix/thunderbolt-ioc'
import {
	IPageWillMountHandler,
	FeatureStateSymbol,
	CurrentRouteInfoSymbol,
	PageFeatureConfigSymbol,
	IPageDidMountHandler,
	IPageWillUnmountHandler,
} from '@wix/thunderbolt-symbols'
import type { ISeoSiteApi, SeoFeatureState, SeoPageConfig } from './types'
import { name, SeoSiteSymbol } from './symbols'
import { IFeatureState } from 'thunderbolt-feature-state'
import {
	ICurrentRouteInfo,
	IUrlHistoryManager,
	UrlHistoryManagerSymbol,
	IPageNumber,
	PageNumberSymbol,
} from 'feature-router'

declare global {
	interface Window {
		clientSideRender: boolean
	}
}

export const SeoPageWillMount = withDependencies(
	[named(PageFeatureConfigSymbol, name), SeoSiteSymbol, CurrentRouteInfoSymbol, UrlHistoryManagerSymbol],
	(
		pageLevelSeoData: SeoPageConfig,
		seoApi: ISeoSiteApi,
		routeApi: ICurrentRouteInfo,
		urlHistoryManager: IUrlHistoryManager
	): IPageWillMountHandler => {
		return {
			name: 'seo-page',
			pageWillMount: async (pageId) => {
				const url = urlHistoryManager.getParsedUrl()
				seoApi.setPageHref(url.href)
				seoApi.setPageId(pageId)
				seoApi.setPageData(pageLevelSeoData)
				seoApi.resetTpaAndVeloData()
				const routeInfo = routeApi.getCurrentRouteInfo()
				routeInfo?.dynamicRouteData && (await seoApi.setDynamicRouteOverrides(routeInfo.dynamicRouteData))
				const isInSSR = !process.env.browser
				if (!isInSSR) {
					return
				}
				await seoApi.renderSEO()
			},
		}
	}
)

export const SeoPageDidMount = withDependencies(
	[named(FeatureStateSymbol, name), SeoSiteSymbol, PageNumberSymbol],
	(
		featureState: IFeatureState<SeoFeatureState>,
		seoApi: ISeoSiteApi,
		pageNumberApi: IPageNumber
	): IPageDidMountHandler => {
		return {
			pageDidMount: async () => {
				featureState.update((currentState) => ({
					...currentState,
					isPageMounted: true,
				}))
				if (pageNumberApi.getPageNumber() > 1) {
					featureState.update((currentState) => ({
						...currentState,
						isAfterNavigation: true,
					}))
					await seoApi.renderSEODom()
				} else {
					await seoApi.renderSEODom()
					featureState.update((currentState) => ({
						...currentState,
						isAfterNavigation: true,
					}))
				}
			},
		}
	}
)
export const SeoPageWillUnmount = withDependencies(
	[named(FeatureStateSymbol, name)],
	(featureState: IFeatureState<SeoFeatureState>): IPageWillUnmountHandler => {
		return {
			pageWillUnmount: async () => {
				featureState.update((currentState) => ({ ...currentState, isPageMounted: false }))
			},
		}
	}
)
