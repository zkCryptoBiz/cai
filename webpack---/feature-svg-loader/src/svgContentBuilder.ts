import { named, withDependencies } from '@wix/thunderbolt-ioc'
import { Fetch, IFetchApi, LoggerSymbol, PageFeatureConfigSymbol } from '@wix/thunderbolt-symbols'
import type { ISvgContentBuilder, SvgLoaderPageConfig } from './types'
import { vectorImage } from '@wix/thunderbolt-commons'
import { name } from './symbols'
import type { ILogger } from '@wix/thunderbolt-types/logger'

export const SvgContentBuilder = withDependencies(
	[named(PageFeatureConfigSymbol, name), Fetch, LoggerSymbol],
	(pageFeatureConfig: SvgLoaderPageConfig, fetchAPI: IFetchApi, logger: ILogger): ISvgContentBuilder => {
		const { buildSvgUrl } = vectorImage.buildSvgUrlFactory()

		return async ({ svgId, transformationOptions, isResponsive, compId }) => {
			const url = buildSvgUrl(pageFeatureConfig.mediaRootUrl, svgId)
			const handleError = (error: any) => {
				logger.captureError(error, {
					tags: { feature: 'svgContentBuilder', compId },
				})
				return null
			}
			try {
				const svgStringRes = await fetchAPI.envFetch(url)

				if (!svgStringRes.ok) {
					return handleError(await svgStringRes.text())
				}
				const svgString = await svgStringRes.text()

				const svgData = vectorImage.parseSvgString(svgString)
				const options = {
					...transformationOptions,
					svgId,
					compId,
					svgInfo: svgData.info,
					isResponsive,
					colorsMap: pageFeatureConfig.colorsMap,
				}

				return vectorImage.transformVectorImage(svgString, options)
			} catch (e) {
				return handleError(e)
			}
		}
	}
)
