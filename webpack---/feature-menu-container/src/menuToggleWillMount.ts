import { named, withDependencies } from '@wix/thunderbolt-ioc'
import type { MenuContainerComponent, MenuToggleComponent, MenuToggleWillMountFactory } from './types'
import { name } from './symbols'
import { ComponentsStoreSymbol } from 'feature-components'
import { PageFeatureConfigSymbol, BrowserWindowSymbol, StructureAPI } from '@wix/thunderbolt-symbols'

const runAsync = (func: Function) => setTimeout(func, 0)

const menuToggleWillMount: MenuToggleWillMountFactory = (
	{ menuTogglesConfig },
	componentsStore,
	browserWindow,
	structureApi
) => {
	const getMenuContainer = (toggleButton: MenuToggleComponent): MenuContainerComponent | null => {
		const { menuContainerId } = menuTogglesConfig[toggleButton.id]
		const comp = componentsStore.get<MenuContainerComponent>(menuContainerId)
		return comp?.componentType === 'MenuContainer' ? comp : null
	}

	const toggleMenu = (toggleButton: MenuToggleComponent, isVectorImage: boolean) => {
		const menuContainer = getMenuContainer(toggleButton)
		if (menuContainer) {
			menuContainer.toggle(false, isVectorImage)

			if (isVectorImage) {
				const cleanup = menuContainer.onToggle((isOpen) => {
					if (!isOpen) {
						browserWindow.document.getElementById(toggleButton.id)?.focus()
					}
					cleanup()
				})
			}
		}
	}

	const isMenuToggle = (componentType: string) => componentType === 'MenuToggle'
	// menu toggle with VectorImage outdated, add `|| componentType === 'SvgImage'` if still bug found after new SvgImage component migration
	const isVectorImage = (componentType: string) => componentType === 'VectorImage'

	return {
		componentTypes: ['MenuToggle', 'VectorImage'],
		componentWillMount: (toggleButton) => {
			if (!menuTogglesConfig[toggleButton.id]) {
				return
			}

			const isVectorImageType = isVectorImage(toggleButton.componentType)

			toggleButton.onClick(() => {
				toggleMenu(toggleButton, isVectorImageType)
			})

			if (isMenuToggle(toggleButton.componentType)) {
				toggleButton.onKeyDown((keyboardEvent) => {
					if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
						toggleMenu(toggleButton, false)
					}
				})
			}

			if (isMenuToggle(toggleButton.componentType)) {
				return getMenuContainer(toggleButton)?.onToggle((isOpen) =>
					runAsync(() => toggleButton.updateProps({ isOpen }))
				)
			} else if (isVectorImageType) {
				return getMenuContainer(toggleButton)?.onToggle((isOpen) => {
					/* When we navigate from HamburgerMenu in responsive site, the menu is re-rendered.
					 * Both the navigation handler & onClick callback are called asynchronously (yieldToMain), leading to race condition.
					 * So we need to update the props only in case the comp is still in structure to prevent 'missing from structure' error
					 */
					runAsync(() => {
						if (structureApi.get(toggleButton.id)) {
							toggleButton.updateProps({
								ariaExpanded: isOpen,
							})
						}
					})
				})
			}
		},
	}
}

export const MenuToggleWillMount = withDependencies(
	[named(PageFeatureConfigSymbol, name), ComponentsStoreSymbol, BrowserWindowSymbol, StructureAPI],
	menuToggleWillMount
)
