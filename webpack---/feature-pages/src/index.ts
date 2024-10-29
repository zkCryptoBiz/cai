import { ContainerModuleLoader, withDependencies } from '@wix/thunderbolt-ioc'
import {
	CurrentRouteInfoSymbol,
	DynamicFeatureLoader,
	FeatureName,
	IPageFeatureLoader,
	LifeCycle,
	PageFeatureLoaderSym,
	PageInfo,
} from '@wix/thunderbolt-symbols'
import {
	LogicalReflectorSymbol,
	LogicalReflectorStateSymbol,
	PageProviderSymbol,
	PageStructureJsonSymbol,
	PagePropsJsonSymbol,
	PageInitializerSymbol,
} from './symbols'
import type {
	IPageProvider,
	IPageReflector,
	IPageReflectorStateApi,
	IPageInitializer,
	IPageFeatureLoaderProvider,
} from './types'
import { PageProvider } from './PageReflector'
import { LogicalReflector } from './logicalReflector'
import { LogicalReflectorState } from './logicalReflectorState'
import PageBiReporting from './pageBiReporting'
import PageCompTypeMapWarmupData from './pageCompTypeMapWarmupData'
import { PageInitializer } from './pageInitializer'
import type { ICurrentRouteInfo } from '@wix/thunderbolt-symbols'
import { WarmupDataEnricherSymbol } from 'feature-warmup-data'

const dynamicFeatureLoader = withDependencies(
	[LogicalReflectorSymbol, CurrentRouteInfoSymbol],
	(pageReflector: IPageProvider, currentRouteInfo: ICurrentRouteInfo): IPageFeatureLoader => {
		return {
			loadFeature: async <T>(featureName: FeatureName, symbol: symbol, pageInfo?: PageInfo) => {
				const pageInfoToLoad = pageInfo || currentRouteInfo.getCurrentRouteInfo()
				if (pageInfoToLoad) {
					const currentPageReflector = await pageReflector(pageInfoToLoad.contextId, pageInfoToLoad.pageId)
					const [
						pageDynamicLoader,
					] = currentPageReflector.getAllImplementersOnPageOf<IPageFeatureLoaderProvider>(
						PageFeatureLoaderSym
					)
					return pageDynamicLoader().loadFeature<T>(featureName, symbol)
				}
				// TODO: validate what todo here
				throw new Error('No pageId found in currentRouteInfo')
			},
		}
	}
)

export const site: ContainerModuleLoader = (bind) => {
	bind<IPageProvider>(PageProviderSymbol).toProvider<IPageReflector>(PageProvider)
	bind(LogicalReflectorSymbol).toProvider<IPageReflector>(LogicalReflector)
	bind(LogicalReflectorStateSymbol).to(LogicalReflectorState)
	bind(LifeCycle.AppDidMountHandler, LifeCycle.AppDidLoadPageHandler).to(PageBiReporting)
	bind(DynamicFeatureLoader).to(dynamicFeatureLoader)
	bind(PageInitializerSymbol).to(PageInitializer)

	if (!process.env.browser) {
		bind(WarmupDataEnricherSymbol).to(PageCompTypeMapWarmupData)
	}
}

export {
	PageProviderSymbol,
	LogicalReflectorSymbol,
	LogicalReflectorStateSymbol,
	PageStructureJsonSymbol,
	PagePropsJsonSymbol,
	IPageProvider,
	IPageReflector,
	IPageReflectorStateApi,
	IPageInitializer,
	PageInitializerSymbol,
}
