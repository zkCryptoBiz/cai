import { withDependencies } from '@wix/thunderbolt-ioc'
import type { IPageWillMountHandler, IPropsStore } from '@wix/thunderbolt-symbols'
import type { IClassNameApi, IReactionsStateApi, ReactionsClassMapState } from './types'
import { Props } from '@wix/thunderbolt-symbols'
import { ClassNameApiSymbol } from './symbols'
import { IRoutingBlockerManager, RoutingBlockerManagerSymbol } from 'feature-router'

export const ReactionsStateApi = withDependencies(
	[Props, ClassNameApiSymbol, RoutingBlockerManagerSymbol],
	(
		props: IPropsStore,
		{ addClassName, removeClassName }: IClassNameApi,
		routingBlockerManager: IRoutingBlockerManager
	): IReactionsStateApi & IPageWillMountHandler => {
		const registerComponentToNavBlocker = (componentId: string) => {
			const resolver = routingBlockerManager.register()
			const element = document.getElementById(componentId)
			element?.addEventListener('transitionstart', () => {
				resolver?.()
			})
		}

		let reactionsClassMap: ReactionsClassMapState = {}
		let activeEffectsChangeListener: (componentId: string, effects: Array<string>) => void = () => {}

		const notifyComponentActiveStatesChange = (componentId: string) => {
			activeEffectsChangeListener(componentId, reactionsClassMap[componentId])
			registerComponentToNavBlocker(componentId)
		}

		const addState: IReactionsStateApi['addState'] = (className, componentId) => {
			if (!className) {
				return
			}

			addClassName(componentId, className)

			if (!reactionsClassMap[componentId]) {
				reactionsClassMap[componentId] = []
			}

			reactionsClassMap[componentId].push(className)
			notifyComponentActiveStatesChange(componentId)
		}

		const removeState: IReactionsStateApi['removeState'] = (className, componentId) => {
			if (!className) {
				return
			}

			removeClassName(componentId, className)

			if (!reactionsClassMap[componentId]) {
				return
			}

			reactionsClassMap[componentId] = reactionsClassMap[componentId].filter(
				(_className: string) => _className !== className
			)
			notifyComponentActiveStatesChange(componentId)
		}

		const toggleState: IReactionsStateApi['toggleState'] = (className, componentId) => {
			if (!className) {
				return
			}

			!reactionsClassMap[componentId] || reactionsClassMap[componentId].indexOf(className) < 0
				? addState(className, componentId)
				: removeState(className, componentId)
		}

		const removeAllStates: IReactionsStateApi['removeAllStates'] = (componentId) => {
			reactionsClassMap[componentId] &&
				reactionsClassMap[componentId].forEach((className: string) => {
					removeClassName(componentId, className)
				})

			reactionsClassMap[componentId] = []
			notifyComponentActiveStatesChange(componentId)
		}

		const registerToActiveEffectsChange: IReactionsStateApi['registerToActiveEffectsChange'] = (callback) => {
			activeEffectsChangeListener = callback
		}

		return {
			name: 'reactionsStateApi',
			pageWillMount() {
				reactionsClassMap = {}
				activeEffectsChangeListener = () => {}
			},
			addState,
			removeState,
			toggleState,
			removeAllStates,
			registerToActiveEffectsChange,
		}
	}
)
