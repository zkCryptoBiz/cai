import _ from 'lodash'
import { withDependencies, named, multi, optional } from '@wix/thunderbolt-ioc'
import {
	PageFeatureConfigSymbol,
	IPageWillMountHandler,
	IPageWillUnmountHandler,
	SdkHandlersProvider,
	IPropsStore,
	Props,
	CompActionsSym,
	ICompActionsStore,
	StoresProviderSymbol,
	StoresSdkHandlers,
	StylesStoreSymbol,
} from '@wix/thunderbolt-symbols'
import { getDisplayedId, getFullId } from '@wix/thunderbolt-commons'
import {
	ComponentsStore,
	ComponentsStoreSymbol,
	ViewerComponent,
	ComponentWillMount,
	ComponentWillMountReturnType,
	ComponentWillMountSymbol,
	groupByMultipleComponentTypes,
	ViewerComponentProvider,
	ComponentDriverProviderSymbol,
} from 'feature-components'
import type { RepeatersPageConfig, RepeatersSdkHandlers } from './types'
import { name } from './symbols'

export const Repeaters = withDependencies(
	[
		named(PageFeatureConfigSymbol, name),
		ComponentsStoreSymbol,
		multi(ComponentWillMountSymbol),
		ComponentDriverProviderSymbol,
		Props,
		CompActionsSym,
		StylesStoreSymbol,
		optional(StoresProviderSymbol),
	],
	(
		pageFeatureConfig: RepeatersPageConfig,
		componentsStore: ComponentsStore,
		componentWillMountArray: Array<ComponentWillMount<ViewerComponent>>,
		viewerComponentProvider: ViewerComponentProvider,
		propsStore: IPropsStore,
		compActionsStore: ICompActionsStore,
		styleStores: IPropsStore,
		storesSdkHandlers?: StoresSdkHandlers
	): IPageWillMountHandler & IPageWillUnmountHandler & SdkHandlersProvider<RepeatersSdkHandlers> => {
		const componentWillUnmountByCompId: {
			[compId: string]: ComponentWillMountReturnType | Promise<ComponentWillMountReturnType>
		} = {}
		const componentWillMountByCompType = groupByMultipleComponentTypes(componentWillMountArray)

		const invokeComponentWillMount = (
			repeaterDisplayIds: { [templateId: string]: Array<string> },
			repeaterId: string
		) => {
			_.forEach(repeaterDisplayIds, (displayIds, templateId) => {
				const componentType = pageFeatureConfig.repeatersData[repeaterId].childComponents[templateId]
				if (!componentWillMountByCompType[componentType]) {
					return
				}
				const uiType = componentsStore.get<ViewerComponent>(templateId).uiType
				displayIds.forEach((id) => {
					const component = viewerComponentProvider.createComponent(id, componentType, uiType)
					componentWillMountByCompType[componentType].map(
						({ componentWillMount }) => (componentWillUnmountByCompId[id] = componentWillMount(component))
					)
				})
			})
		}

		const getTemplateIdToDisplayedIds = (itemIds: Array<string>, repeaterId: string) =>
			_.chain(pageFeatureConfig.repeatersData[repeaterId]?.childComponents)
				.mapValues((childCompType, childCompId) => itemIds.map((itemId) => getDisplayedId(childCompId, itemId)))
				.value()

		const getRemovedDisplayedIds = (removedItemsIds: Array<string>, repeaterId: string) =>
			_.chain(getTemplateIdToDisplayedIds(removedItemsIds, repeaterId)).values().flatten().value()

		const handleRepeaterDataUpdate: RepeatersSdkHandlers['repeaters']['handleRepeaterDataUpdate'] = (
			removedItemsIds,
			itemsIds,
			repeaterId,
			{ isRepeaterTemplate, repeaterDisplayIds }
		) => {
			storesSdkHandlers?.stores.updateProps({
				[repeaterId]: {
					items: itemsIds,
				},
			})
			const removedDisplayedIds = getRemovedDisplayedIds(removedItemsIds, getFullId(repeaterId))

			if (removedDisplayedIds.length) {
				const updateRemovedItemsBatch: Record<string, any> = Object.fromEntries(
					removedDisplayedIds.map((id) => [id, {}])
				)
				propsStore.set(updateRemovedItemsBatch)
				compActionsStore.set(updateRemovedItemsBatch)
				styleStores.set(updateRemovedItemsBatch)
			}
			if (isRepeaterTemplate && repeaterDisplayIds?.length) {
				repeaterDisplayIds.forEach((repeaterDisplayedId) => {
					// Maybe need to calculate isRepeaterTemplate, repeaterDisplayIds in here, and not in the platform.
					// Currently only implemented 2 levels deep (repeater in repeater)
					handleRepeaterDataUpdate(removedItemsIds, itemsIds, repeaterDisplayedId, {})
				})
			}
		}

		return {
			name: 'repeaters',
			getSdkHandlers: () => ({
				[name]: {
					handleAddedItems: (addedItemsIds, repeaterId) => {
						const templateIdToDisplayedIds = getTemplateIdToDisplayedIds(addedItemsIds, repeaterId)
						invokeComponentWillMount(templateIdToDisplayedIds, repeaterId)
					},
					handleRemovedItems: (removedItemsIds, repeaterId) => {
						const removedDisplayedIds = getRemovedDisplayedIds(removedItemsIds, repeaterId)
						_.forEach(removedDisplayedIds, async (displayedId) => {
							if (componentWillUnmountByCompId[displayedId]) {
								const compWillUnMount = await componentWillUnmountByCompId[displayedId]
								compWillUnMount?.()
								delete componentWillUnmountByCompId[displayedId]
							}
						})
						return removedDisplayedIds
					},
					handleRepeaterDataUpdate,
				},
			}),
			pageWillMount() {
				_.forEach(pageFeatureConfig.repeatersData, ({ items }, repeaterId) => {
					invokeComponentWillMount(getTemplateIdToDisplayedIds(items, repeaterId), repeaterId)
				})
			},
			pageWillUnmount: () => {
				_.values(componentWillUnmountByCompId).forEach(async (componentWillUnmount) =>
					(await componentWillUnmount)?.()
				)
			},
		}
	}
)
