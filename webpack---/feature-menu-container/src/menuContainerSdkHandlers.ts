import { withDependencies } from '@wix/thunderbolt-ioc'
import type { MenuContainerComponent, MenuContainerSdkFactory } from './types'
import { ComponentsStoreSymbol } from 'feature-components'

const menuContainerSdkHandlers: MenuContainerSdkFactory = (componentsStore) => {
	return {
		getSdkHandlers: () => ({
			// TODO before wrapping in a namespace, update editor-elements
			// https://github.com/wix-private/editor-elements/blob/b10ee2ef7b7d5913f389cd69314025e8732e8484/packages/thunderbolt-elements/src/components/MenuContainer/corvid/MenuContainer.corvid.ts#L8
			openMenuContainer: (menuContainerId) => {
				componentsStore.get<MenuContainerComponent>(menuContainerId).open()
			},
			// https://github.com/wix-private/editor-elements/blob/b10ee2ef7b7d5913f389cd69314025e8732e8484/packages/thunderbolt-elements/src/components/MenuContainer/corvid/MenuContainer.corvid.ts#L11
			closeMenuContainer: (menuContainerId) => {
				componentsStore.get<MenuContainerComponent>(menuContainerId).close()
			},
		}),
	}
}

export const MenuContainerSdkHandlers = withDependencies([ComponentsStoreSymbol], menuContainerSdkHandlers)
