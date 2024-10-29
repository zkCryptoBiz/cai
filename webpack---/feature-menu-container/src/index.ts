import type { ContainerModuleLoader } from '@wix/thunderbolt-ioc'
import { WixCodeSdkHandlersProviderSym } from '@wix/thunderbolt-symbols'
import { ComponentWillMountSymbol, ComponentDriverSymbol } from 'feature-components'
import { MenuContainerDriverFactory } from './menuContainerDriverFactory'
import { MenuContainerSdkHandlers } from './menuContainerSdkHandlers'
import { MenuContainerWillMount } from './menuContainerWillMount'
import { MenuToggleWillMount } from './menuToggleWillMount'

export const page: ContainerModuleLoader = (bind) => {
	bind(WixCodeSdkHandlersProviderSym).to(MenuContainerSdkHandlers)
	bind(ComponentDriverSymbol).to(MenuContainerDriverFactory)
	bind(ComponentWillMountSymbol).to(MenuContainerWillMount)
	bind(ComponentWillMountSymbol).to(MenuToggleWillMount)
}

export type { MenuContainerComponent } from './types'
