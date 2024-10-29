import { createPromise } from '@wix/thunderbolt-commons'
import { withDependencies } from '@wix/thunderbolt-ioc'
import { ILogger, LoggerSymbol, Experiments, ExperimentsSymbol, IRendererPropsExtender } from '@wix/thunderbolt-symbols'
import { IRoutingBlockerManager } from './types'

const interactionName = 'navigation_blocker_manager'
const msTimeout = 2000

const routingBlockerManager = (
	logger: ILogger,
	experiments: Experiments
): IRoutingBlockerManager & IRendererPropsExtender => {
	const listeners = new Set<Promise<any>>()
	const listenersWithIds: Record<
		string,
		{ promise: Promise<any>; resolver: (resolvedData: void | PromiseLike<void>) => void }
	> = {}
	function timeoutPromise(timeout: number): Promise<never> {
		return new Promise((_, reject) => {
			setTimeout(() => {
				logger.meter(interactionName, {
					paramsOverrides: {
						evid: '26',
						errorInfo: `Reslove promise all taking too long`,
						errorType: 'navigation_blocker_manager_timedout',
						eventString: 'error',
					},
				})
				reject(new Error('waitForAllListenersToResolve: Operation timed out'))
			}, timeout)
		})
	}

	function resolveAllWithTimeout<T>(promises: Array<Promise<T>>, timeout: number): Promise<Array<T>> {
		return Promise.race([Promise.all(promises), timeoutPromise(timeout)])
	}

	const isExperiemntOpen = experiments['specs.thunderbolt.allowRoutingBlockerManager']

	const registerWithId = (id: string) => {
		const { promise, resolver } = createPromise()
		listenersWithIds[id] = { promise, resolver }
		return resolver
	}
	const resolveById = async (id: string) => {
		const listener = listenersWithIds[id]
		if (listener) {
			listener.resolver()
			delete listenersWithIds[id]
		}
	}
	return {
		async waitForAllListenersToResolve() {
			if (!isExperiemntOpen) {
				return
			}
			logger.interactionStarted(interactionName)
			try {
				await resolveAllWithTimeout(
					[...listeners, ...Object.values(listenersWithIds).map(({ promise }) => promise)],
					msTimeout
				)
				logger.interactionEnded(interactionName)
			} catch (error) {
				console.error('Error:', error.message)
			}
			listeners.clear()
		},
		register: () => {
			if (!isExperiemntOpen) {
				return
			}
			const { promise, resolver } = createPromise()
			listeners.add(promise)
			return resolver
		},
		registerWithId,
		resolveById,
		extendRendererProps: async () => {
			return {
				registerRoutingBlocker: registerWithId,
				resolveRoutingBlocker: resolveById,
			}
		},
	}
}

export const RoutingBlockerManager = withDependencies([LoggerSymbol, ExperimentsSymbol], routingBlockerManager)
