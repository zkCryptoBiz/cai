import React, { ComponentType, ReactNode } from 'react'

interface BuilderPathsContainerProps {
	id: string
	Comp: React.JSX.Element
	compPaths: string
	shouldTriggerRender: boolean
	children: (scopeData?: { parentType: string; scopeId: string }) => ReactNode
}

interface StyleCompProps {
	compId: string
	compPaths: string
}

const CompPathsStyleComp: ComponentType<StyleCompProps> = (props) => {
	const { compId, compPaths } = props
	return (
		<style
			id={compId}
			dangerouslySetInnerHTML={{
				__html: `#${compId} ${compPaths}`,
			}}
		/>
	)
}

const BuilderPathsContainer: ComponentType<BuilderPathsContainerProps> = (props) => {
	const { id, children, compPaths } = props

	return (
		<>
			<CompPathsStyleComp compId={id} compPaths={compPaths} />
			{children()}
		</>
	)
}

export default BuilderPathsContainer
