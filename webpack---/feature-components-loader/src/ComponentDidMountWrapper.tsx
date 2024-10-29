import { withDependencies } from '@wix/thunderbolt-ioc'
import { CompsLifeCycleSym, ICompsLifeCycle } from '@wix/thunderbolt-symbols'
import { IWrapComponent } from './types'
import React, { ComponentType, useEffect } from 'react'
import { isForwardRef } from 'react-is'

export const ComponentDidMountWrapper = withDependencies(
	[CompsLifeCycleSym],
	(compsLifeCycle: ICompsLifeCycle): IWrapComponent => {
		return {
			// @ts-ignore
			wrapComponent: <T extends { id: string; compId?: string }>(Component: ComponentType<T>) => {
				const Wrapper = (props: T, ref: any) => {
					const { compId, id } = props
					useEffect(() => {
						compsLifeCycle.notifyCompDidMount(compId ?? id, id) // we call it when the id\displayed id changes although it's not mount
						return () => {
							compsLifeCycle.componentDidUnmount(compId ?? id, id)
						}
					}, [compId, id])
					const compWithProps = <Component {...props} />
					return (
						<Component
							{...props}
							ref={isForwardRef(compWithProps) && ref && typeof ref === 'function' ? ref : null}
						/>
					)
				}
				return React.forwardRef(Wrapper)
			},
		}
	}
)
