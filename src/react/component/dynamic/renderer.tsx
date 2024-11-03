import React, { memo, Suspense } from 'react'
import ComponentLoader from './loader'

interface RendererProps {
  componentName?: string | undefined;
}

const Renderer: React.FC<RendererProps> = memo(({ componentName }) => {
    const Component = ComponentLoader.load(componentName)

    return (
      <Suspense fallback={null}>
        {Component ? <Component /> : null}
      </Suspense>
    )
  }
)

export default Renderer
