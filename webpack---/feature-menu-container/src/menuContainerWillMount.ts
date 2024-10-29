import { named, withDependencies } from '@wix/thunderbolt-ioc'
import type { MenuContainerWillMountFactory } from './types'
import { name } from './symbols'
import { ExperimentsSymbol, PageFeatureConfigSymbol } from '@wix/thunderbolt-symbols'

const isAnchor = (element: HTMLElement | null) => element?.tagName?.toLowerCase() === 'a'

const hasDataAnchor = (element: HTMLElement | null) => element?.dataset.anchor !== undefined

const isOverlay = (element: HTMLElement | null, id: string) => element?.id === `overlay-${id}`

const hasMatchingAncestor = (element: HTMLElement | null, id: string, disabledMenuHiding: boolean): boolean => {
	if (!element) {
		return false
	}

	if (isAnchor(element)) {
		if (!disabledMenuHiding) {
			return true
		}

		return hasDataAnchor(element)
	}

	if (isOverlay(element, id)) {
		return true
	}

	return hasMatchingAncestor(element.parentElement, id, disabledMenuHiding)
}

const menuContainerWillMount: MenuContainerWillMountFactory = ({ menuContainerConfig }, experiments) => {
	const disabledMenuHiding = !!experiments['specs.thunderbolt.disableMenuContainerHiding']

	return {
		componentTypes: ['MenuContainer'],
		componentWillMount: (menuContainerComp) => {
			if (!menuContainerConfig[menuContainerComp.id]) {
				return
			}

			menuContainerComp.onClick((e) => {
				const target = e.target as HTMLElement | null

				if (hasMatchingAncestor(target, menuContainerComp.id, disabledMenuHiding)) {
					menuContainerComp.toggle(true)
				}
			})

			return () => menuContainerComp.unblockScroll()
		},
	}
}

export const MenuContainerWillMount = withDependencies(
	[named(PageFeatureConfigSymbol, name), ExperimentsSymbol],
	menuContainerWillMount
)
