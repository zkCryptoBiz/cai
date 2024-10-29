import { AnimationData, AnimatorManager } from 'feature-animations'
import type { MenuContainerData, AnimationHandlerFactory, MenuAnimationsInstances } from './types'

const DEFAULT_ANIMATIONS: { [propertyName: string]: AnimationData } = {
	containerOut: {
		targetId: '',
		name: 'FadeOut',
	},
	baseClear: {
		targetId: '',
		name: 'BaseClear',
		params: {
			props: 'clip,clipPath,webkitClipPath,opacity,transform,transformOrigin',
			immediateRender: false,
		},
		delay: 0,
		duration: 0,
	},
	overlayIn: {
		targetId: '',
		name: 'FadeIn',
	},
	overlayOut: {
		targetId: '',
		name: 'FadeOut',
	},
}

export const AnimationHandler: AnimationHandlerFactory = (animations) => {
	const animationsInstances: { [menuContainerId: string]: MenuAnimationsInstances } = {}

	const getContainerAnimationToExecute = (
		menuContainerId: string,
		menuContainerAnimations: MenuContainerData['animations'],
		shouldOpen: boolean,
		onCompleteCb: (reversed: boolean) => void
	) => {
		const inBehavior = menuContainerAnimations.inBehavior
		const outBehavior = menuContainerAnimations.outBehavior || DEFAULT_ANIMATIONS.containerOut

		const animationData = shouldOpen ? inBehavior : { ...inBehavior, name: outBehavior.name }
		animationData.targetId = `container-${menuContainerId}`

		animationData.params = {
			...animationData.params,
			callbacks: {
				onComplete: onCompleteCb.bind(null, false),
				onReverseComplete: onCompleteCb.bind(null, true),
			},
		}

		return animationData as AnimationData
	}

	const getOverlayAnimationToExecute = (
		menuContainerId: string,
		shouldOpen: boolean,
		baseClear: boolean,
		containerAnimationData?: AnimationData
	) => {
		const inOutAnimation = shouldOpen ? { ...DEFAULT_ANIMATIONS.overlayIn } : { ...DEFAULT_ANIMATIONS.overlayOut }
		const animationData = baseClear ? { ...DEFAULT_ANIMATIONS.baseClear } : inOutAnimation

		animationData.targetId = `overlay-${menuContainerId}`
		if (containerAnimationData) {
			animationData.duration = containerAnimationData.duration
			animationData.delay = containerAnimationData.delay
		}

		const cb = () => {
			delete animationsInstances[menuContainerId].overlayAnimation
		}
		animationData.params = {
			...animationData.params,
			callbacks: {
				onComplete: cb,
				onReverseComplete: cb,
			},
		}

		return animationData
	}

	const animateElement = (
		animatorManager: AnimatorManager,
		animationInstance: MenuAnimationsInstances['containerAnimation' | 'overlayAnimation'],
		animationData: AnimationData
	) => {
		if (animationData.duration && animationData.duration > 0 && animationInstance) {
			animatorManager.reverse(animationInstance)
			return animationInstance
		} else {
			return animatorManager.runAnimation(animationData)
		}
	}

	const onCompleteAnimation = (animatorManager: AnimatorManager, menuContainerId: string, shouldOpen: boolean) => {
		const containerAnimationData = { ...DEFAULT_ANIMATIONS.baseClear, targetId: `container-${menuContainerId}` }
		const overlayAnimationData = getOverlayAnimationToExecute(menuContainerId, shouldOpen, !shouldOpen)

		const cb = () => {
			delete animationsInstances[menuContainerId].containerAnimation
		}
		containerAnimationData.params = {
			...containerAnimationData.params,
			callbacks: {
				onComplete: cb,
				onReverseComplete: cb,
			},
		}
		animationsInstances[menuContainerId] = animationsInstances[menuContainerId] || {}
		handleAnimations(animatorManager, menuContainerId, containerAnimationData, overlayAnimationData)
	}

	const handleAnimations = (
		animatorManager: AnimatorManager,
		menuContainerId: string,
		containerAnimationData: AnimationData,
		overlayAnimationData: AnimationData
	) => {
		const menuAnimationsInstances = animationsInstances[menuContainerId]
		menuAnimationsInstances.containerAnimation = animateElement(
			animatorManager,
			menuAnimationsInstances.containerAnimation,
			containerAnimationData
		)
		menuAnimationsInstances.overlayAnimation = animateElement(
			animatorManager,
			menuAnimationsInstances.overlayAnimation,
			overlayAnimationData
		)
	}

	return {
		async animate(menuContainerId, menuContainerAnimations, shouldOpen, onComplete) {
			const animatorManager = await animations.getInstance()

			const onCompleteCb = (reversed: boolean) => {
				animationsInstances[menuContainerId] && delete animationsInstances[menuContainerId].containerAnimation
				onComplete(reversed)
				onCompleteAnimation(animatorManager, menuContainerId, shouldOpen)
			}

			if (menuContainerAnimations.inBehavior) {
				const containerAnimationData = getContainerAnimationToExecute(
					menuContainerId,
					menuContainerAnimations,
					shouldOpen,
					onCompleteCb
				)
				const overlayAnimationData = getOverlayAnimationToExecute(
					menuContainerId,
					shouldOpen,
					false,
					containerAnimationData
				)

				animationsInstances[menuContainerId] = animationsInstances[menuContainerId] || {}
				handleAnimations(animatorManager, menuContainerId, containerAnimationData, overlayAnimationData)
			} else {
				onCompleteCb(false)
			}
		},
	}
}
