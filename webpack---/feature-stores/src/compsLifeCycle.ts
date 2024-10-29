import { REPEATER_DELIMITER } from '@wix/thunderbolt-commons'
import { withDependencies } from '@wix/thunderbolt-ioc'
import { ICompsLifeCycle } from '@wix/thunderbolt-symbols'
import _ from 'lodash'

type CompCallbacks = { [compId: string]: { callbacks: { [callbackName: string]: Function } } }
type UnregisterFromCompLifeCycle = (compIds: Array<string>, callbackName: string) => void
const omitSingle = (key: string, { [key]: __, ...obj }) => obj
const getAllTargets = (compId: string) =>
	document.querySelectorAll(`#${compId}, [id^="${compId}${REPEATER_DELIMITER}"]`) // supporting repeaters

export const CompsLifeCycle = withDependencies(
	[],
	(): ICompsLifeCycle => {
		const onCompRenderedCallbacks: CompCallbacks = {}
		const mountedComponents: Record<string, boolean> = {}
		const registerToCompLifeCycle: ICompsLifeCycle['registerToCompLifeCycle'] = (
			compIds,
			callbackName,
			callback
		) => {
			compIds.forEach((compId) => {
				onCompRenderedCallbacks[compId] = onCompRenderedCallbacks[compId] || {}
				if (!onCompRenderedCallbacks[compId].callbacks) {
					onCompRenderedCallbacks[compId].callbacks = { [callbackName]: callback }
				} else {
					onCompRenderedCallbacks[compId].callbacks[callbackName] = callback
				}
			})
			return () => unregisterFromCompLifeCycle(compIds, callbackName)
		}

		const notifyCompDidMount: ICompsLifeCycle['notifyCompDidMount'] = (compId, displayedId) => {
			mountedComponents[compId] = true
			mountedComponents[displayedId] = true
			const triggerCallbacks = (callbacksObject: Record<string, Function>) =>
				Object.values(callbacksObject).forEach((cb) => {
					cb(compId, displayedId, document.getElementById(displayedId))
				})

			if (onCompRenderedCallbacks[compId]) {
				triggerCallbacks(onCompRenderedCallbacks[compId].callbacks)
			}

			if (compId !== displayedId && onCompRenderedCallbacks[displayedId]) {
				// The call to waitForComponentToRender or registerToCompLifeCycle were called using a displayedId
				triggerCallbacks(onCompRenderedCallbacks[displayedId].callbacks)
			}
		}

		const unregisterFromCompLifeCycle: UnregisterFromCompLifeCycle = (compIds, callbackName) => {
			compIds.forEach((compId) => {
				onCompRenderedCallbacks[compId].callbacks = omitSingle(
					callbackName,
					onCompRenderedCallbacks[compId].callbacks
				)
			})
		}

		const waitForComponentToRender: ICompsLifeCycle['waitForComponentToRender'] = (compId) => {
			const callbackName = _.uniqueId('waitForComponentToRender_')
			if (mountedComponents[compId]) {
				const domElement = document.getElementById(compId)
				if (!domElement) {
					const elements = getAllTargets(compId)
					if (!elements.length) {
						console.warn(`Component with id ${compId} was mounted but not found in the DOM`)
						return Promise.resolve([])
					}
					return Promise.resolve(Array.from(elements) as Array<HTMLElement>)
				}
				return Promise.resolve([domElement])
			}

			return new Promise((resolve) => {
				registerToCompLifeCycle([compId], callbackName, (__, ___, htmlElement) => {
					unregisterFromCompLifeCycle([compId], callbackName)
					resolve([htmlElement])
				})
			})
		}

		const componentDidUnmount: ICompsLifeCycle['componentDidUnmount'] = (compId, _displayedId) => {
			mountedComponents[compId] = false
		}

		return {
			registerToCompLifeCycle,
			notifyCompDidMount,
			waitForComponentToRender,
			componentDidUnmount,
		}
	}
)
