import _ from 'lodash'
import { withDependencies, optional, named } from '@wix/thunderbolt-ioc'
import {
	ViewModeSym,
	BrowserWindowSymbol,
	PageFeatureConfigSymbol,
	ViewMode,
	BrowserWindow,
	ICyclicTabbing,
	IStructureAPI,
	StructureAPI,
} from '@wix/thunderbolt-symbols'
import { isSSR } from '@wix/thunderbolt-commons'
import { Animations, IAnimations } from 'feature-animations'
import { CyclicTabbingSymbol } from 'feature-cyclic-tabbing'
import { ISiteScrollBlocker, SiteScrollBlockerSymbol } from 'feature-site-scroll-blocker'
import { AnimationHandler } from './AnimationHandler'
import { MenuContainerHooksSymbol, name } from './symbols'
import { ComponentDriverFactory } from 'feature-components'
import { MenuContainerComponent, MenuContainerPageConfig } from './types'
import type { AnimationData, MenuContainerDriver, IMenuContainerHooks } from './types'

const menuContainerDriverFactory = (
	{ menuContainerConfig, menuTogglesConfig }: MenuContainerPageConfig,
	viewMode: ViewMode,
	window: BrowserWindow,
	cyclicTabbing: ICyclicTabbing,
	structureApi: IStructureAPI,
	siteScrollBlocker?: ISiteScrollBlocker,
	animations?: IAnimations,
	menuContainerHooks?: IMenuContainerHooks
): ComponentDriverFactory<MenuContainerComponent> => {
	const animationHandler = animations && AnimationHandler(animations)

	const getMenuTransitionChildren = (menuContainerId: string) => {
		const menuContainerElement = window?.document.getElementById(menuContainerId)

		if (window && menuContainerElement) {
			const children = Array.from(menuContainerElement.querySelectorAll('*'))

			return children.filter((child) => {
				const { transitionProperty, transitionDuration, transitionDelay } = window.getComputedStyle(child)

				return (
					(transitionProperty === 'all' || transitionProperty === 'visibility') &&
					(transitionDelay !== '0s' || transitionDuration !== '0s')
				)
			}) as Array<HTMLElement>
		}

		return []
	}

	return {
		componentType: 'MenuContainer',
		getComponentDriver: (viewerComponent) => {
			const onToggleCallbacks: Record<string, (isOpen: boolean) => void> = {}
			const allIds = [viewerComponent.id]
			Object.keys(menuTogglesConfig).forEach((toggleId) => {
				if (menuTogglesConfig[toggleId].menuContainerId === viewerComponent.id) {
					allIds.push(toggleId)
				}
			})

			const animateIn = (animation: AnimationData) =>
				new Promise<void>((resolve) => {
					animationHandler!.animate(
						viewerComponent.id,
						{
							inBehavior: animation,
							outBehavior: { name: 'outBehavior' },
						},
						true,
						() => {
							resolve()
						}
					)
				})

			const toggle = (immediate: boolean = false, focusMenu: boolean = false) =>
				new Promise<void>((resolve) => {
					const shouldOpen = !viewerComponent.getProps().isOpen
					const shouldAnimate = !immediate && animationHandler
					const shouldUpdateVisibility = shouldOpen || !shouldAnimate
					const isMobile = viewMode === 'mobile'
					const focusMenuContainer = () => {
						if (!isSSR(window)) {
							viewerComponent.getCompRef().then((ref: any) => {
								ref?.focus()
							})
						}
					}

					if (shouldOpen) {
						cyclicTabbing.enableCyclicTabbing(allIds)
					} else {
						cyclicTabbing.disableCyclicTabbing(allIds)
					}

					siteScrollBlocker && siteScrollBlocker.setSiteScrollingBlocked(shouldOpen, viewerComponent.id)
					if (shouldAnimate) {
						const menuTransitionChildren = getMenuTransitionChildren(viewerComponent.id)

						menuContainerHooks?.onAnimationStart()
						shouldOpen &&
							menuTransitionChildren.forEach((child) => {
								child.style.display = ''
							})

						animationHandler!.animate(
							viewerComponent.id,
							menuContainerConfig[viewerComponent.id].animations,
							shouldOpen,
							(reversed: boolean) => {
								menuContainerHooks?.onAnimationEnd()
								const shouldClose = reversed ? shouldOpen : !shouldOpen
								if (shouldClose) {
									viewerComponent.updateProps({
										isVisible: false,
									})
									menuTransitionChildren.forEach((child) => {
										child.style.display = 'none'
									})
								}
								resolve()
								focusMenu && focusMenuContainer()
							}
						)
					}

					Object.values(onToggleCallbacks).forEach((c) => c(shouldOpen))
					/* When we navigate from HamburgerMenu in responsive site, the menu is re-rendered.
					 * Both the navigation handler & onClick callback are called asynchronously (yieldToMain), leading to race condition.
					 * So we need to update the props only in case the comp is still in structure to prevent 'missing from structure' error
					 */
					setTimeout(() => {
						if (structureApi.get(viewerComponent.id)) {
							viewerComponent.updateProps({
								isOpen: shouldOpen,
								...(shouldUpdateVisibility && { isVisible: shouldOpen }),
							})
						}
					}, 0)
					if (shouldOpen) {
						const menuHeight =
							!isSSR(window) && isMobile
								? `calc(${window.getComputedStyle(document.body).height}/var(--zoom-factor, 1))`
								: '100vh'
						viewerComponent.updateStyle({
							'--menu-height': menuHeight,
						})
					}
					if (!shouldAnimate) {
						resolve()
						focusMenu && focusMenuContainer()
					}
				})

			const toggleIfNeeded = async (openMenu: boolean, immediate?: boolean) => {
				const isMenuOpen = viewerComponent.getProps().isOpen

				if (openMenu !== isMenuOpen) {
					await toggle(immediate)
				}
			}

			const api: MenuContainerDriver = {
				open: (immediate) => toggleIfNeeded(true, immediate),
				toggle,
				onToggle: (callback) => {
					const callbackId = _.uniqueId('callback')
					onToggleCallbacks[callbackId] = callback
					return () => delete onToggleCallbacks[callbackId]
				},
				close: (immediate) => toggleIfNeeded(false, immediate),
				animateIn,
				unblockScroll: () =>
					siteScrollBlocker && siteScrollBlocker.setSiteScrollingBlocked(false, viewerComponent.id),
			}

			return api as any
		},
	}
}

export const MenuContainerDriverFactory = withDependencies(
	[
		named(PageFeatureConfigSymbol, name),
		ViewModeSym,
		BrowserWindowSymbol,
		CyclicTabbingSymbol,
		StructureAPI,
		optional(SiteScrollBlockerSymbol),
		optional(Animations),
		optional(MenuContainerHooksSymbol),
	],
	menuContainerDriverFactory
)
