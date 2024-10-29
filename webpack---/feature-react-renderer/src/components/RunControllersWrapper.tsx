import React, { ComponentType } from 'react'
import { withDependencies } from '@wix/thunderbolt-ioc'
import { CompProps, Experiments, ExperimentsSymbol } from '@wix/thunderbolt-symbols'

const isCsr = !!process.env.browser

let useControllerHook: (
	displayedId: string,
	compType: string,
	_compProps: CompProps,
	compId: string
) => {
	[x: string]: any
}
;(async () => {
	isCsr && (await window.externalsRegistry.react.loaded)
	useControllerHook = require('./hooks').useControllerHook
})()
export const RunControllersWrapper = withDependencies([ExperimentsSymbol], (experiments: Experiments) => {
	return {
		wrapComponent: (Component: ComponentType<any>) => {
			const Wrapper = ({
				compProps: storeProps,
				...restProps
			}: {
				compProps: any
				compId: string
				compClassType: string
				id: string
			}) => {
				const { id: displayedId, compId, compClassType } = restProps
				const shouldReplacePropsOrder = experiments['specs.thunderbolt.fixClassNameOverride']
				const compProps = useControllerHook(displayedId, compClassType, storeProps, compId)

				return (
					<Component
						{...(shouldReplacePropsOrder ? { ...compProps } : {})}
						className={compProps?.className ? `${compProps.className} ${compId}` : compId}
						{...(shouldReplacePropsOrder ? {} : { ...compProps })}
						{...restProps}
					/>
				)
			}
			return Wrapper
		},
	}
})
