import type { CompControllerUtils } from '@wix/thunderbolt-components-loader'
import Context from './AppContext'
import React, { useCallback, useContext, useEffect, useRef, useState, startTransition } from 'react'
import { CompEventSymbol, CompProps, PropsMap, StateRefsValuesMap, Store, ActionProps } from '@wix/thunderbolt-symbols'
import { yieldToMain } from '@wix/thunderbolt-commons'
import _ from 'lodash'

const isVisibilityHidden = (compId: string): boolean => {
	const elem = document.getElementById(compId)
	return elem ? window.getComputedStyle(elem).visibility === 'hidden' : false
}

const YIELD_TO_MAIN_COMPONENTS_BLACK_LIST = ['HoverBox']
const isEditor = process.env.PACKAGE_NAME === 'thunderbolt-ds'

const getFunctionWithEventProps = (
	fnName: string,
	fn: Function & { [CompEventSymbol]?: boolean },
	displayedId: string
) => (...args: Array<any>) => {
	// overcome react bug where onMouseLeave is emitted if element becomes hidden while hovered
	// https://github.com/facebook/react/issues/22883
	if (fnName === 'onMouseLeave' && isVisibilityHidden(displayedId)) {
		return
	}

	return fn[CompEventSymbol] ? fn({ args, compId: displayedId }) : fn(...args)
}

const useFunctionProps = (
	displayedId: string,
	compProps: CompProps,
	propsFromController: CompProps,
	shouldYieldToMain: boolean = false
) => {
	const { current: functionPropsWeakMap } = useRef<WeakMap<Function, Function>>(new WeakMap<Function, Function>())

	const updateFunctionPropsWeakMap = useCallback(
		(
			propName: string,
			prop: Function,
			_propsFromController: CompProps,
			_functionPropsWeakMap: WeakMap<Function, Function>
		) => {
			const _shouldYieldToMain = shouldYieldToMain && propName.startsWith('on')
			const functionWithEventProps = getFunctionWithEventProps(propName, prop, displayedId)
			const propFunctionIsOverridden =
				_propsFromController?.[propName] && _propsFromController?.[propName] !== prop
			const asyncFunctionWithEventProps = async (...args: Array<any>) => {
				const [event, ...rest] = args
				const _event = _.clone(event)
				await yieldToMain()
				return functionWithEventProps(_event, ...rest)
			}
			const functionProp = propFunctionIsOverridden
				? (...args: Array<any>) => {
						_propsFromController?.[propName]?.(...args)
						return _shouldYieldToMain
							? asyncFunctionWithEventProps(...args)
							: functionWithEventProps(...args)
				  }
				: _shouldYieldToMain
				? asyncFunctionWithEventProps
				: functionWithEventProps
			_functionPropsWeakMap.set(prop, functionProp)
		},
		[displayedId, shouldYieldToMain]
	)

	// update function props weak map on component props change (e.g. onClick)
	return Object.entries(compProps)
		.filter(([, prop]) => typeof prop === 'function')
		.reduce((acc, [propName, prop]) => {
			if (!functionPropsWeakMap.has(prop)) {
				updateFunctionPropsWeakMap(propName, prop, propsFromController, functionPropsWeakMap)
			}
			acc[propName] = functionPropsWeakMap.get(prop) as Function
			return acc
		}, {} as ActionProps)
}

export const useControllerHook = (displayedId: string, compType: string, _compProps: CompProps, compId: string) => {
	const { getCompBoundedUpdateProps, getCompBoundedUpdateStyles, compControllers, stateRefs } = useContext(Context)
	const isRepeatedComp = displayedId !== compId
	const stateValues = getProps(stateRefs, isRepeatedComp, compId, displayedId)

	const compController = compControllers[compType]

	const compControllerUtilsRef = useRef<CompControllerUtils | undefined>(undefined)
	if (!compControllerUtilsRef.current && compController) {
		compControllerUtilsRef.current = {
			updateProps: getCompBoundedUpdateProps(displayedId),
			updateStyles: getCompBoundedUpdateStyles(displayedId),
		}
	}

	const propsFromCompController = compController?.useComponentProps(
		_compProps,
		stateValues,
		compControllerUtilsRef.current!
	)
	const compProps = propsFromCompController ?? _compProps
	const shouldYieldToMain = !isEditor && !YIELD_TO_MAIN_COMPONENTS_BLACK_LIST.includes(compType)
	const functionProps = useFunctionProps(displayedId, _compProps, propsFromCompController, shouldYieldToMain)

	return { ...compProps, ...functionProps }
}

const getProps = (
	store: Store<PropsMap> | Store<StateRefsValuesMap>,
	isRepeatedComp: boolean,
	compId: string,
	displayedId: string
) => (isRepeatedComp ? { ...store.get(compId), ...store.get(displayedId) } : store.get(compId) ?? {})

export const useProps = (displayedId: string, compId: string): CompProps => {
	const { props: propsStore } = useContext(Context)
	const isRepeatedComp = displayedId !== compId
	return getProps(propsStore, isRepeatedComp, compId, displayedId)
}

export const useStoresObserver = (id: string, displayedId: string): void => {
	const {
		structure: structureStore,
		props: propsStore,
		stateRefs: stateRefsStore,
		getIsWaitingSuspense,
		registerRoutingBlocker,
	} = useContext(Context)

	const [, setTick] = useState(0)
	const forceUpdate = useCallback(() => {
		if (React.version?.startsWith('18') && getIsWaitingSuspense(displayedId)) {
			startTransition(() => setTick((tick) => tick + 1))
		} else {
			registerRoutingBlocker(displayedId)
			setTick((tick) => tick + 1)
		}
	}, [getIsWaitingSuspense, displayedId, registerRoutingBlocker])

	const subscribeToStores = () => {
		const stores = [propsStore, structureStore, stateRefsStore]
		const unSubscribers: Array<() => void> = []
		stores.forEach((store) => {
			const { unsubscribe, wasUpdatedBeforeSubscribe } = store.subscribeById(displayedId, forceUpdate)
			unSubscribers.push(unsubscribe)

			if (wasUpdatedBeforeSubscribe || displayedId !== id) {
				forceUpdate()
			}
			if (displayedId !== id) {
				const { unsubscribe: repeaterItemUnsubscribe } = store.subscribeById(id, forceUpdate)
				unSubscribers.push(repeaterItemUnsubscribe)
			}
		})

		return () => {
			unSubscribers.forEach((cb) => cb())
		}
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(subscribeToStores, [id, displayedId])
}
