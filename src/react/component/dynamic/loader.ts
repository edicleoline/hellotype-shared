import React, { ComponentType, lazy, memo } from 'react'

type ComponentMap = Record<string, () => Promise<{ default: ComponentType<any> }>>;

class Loader {
  private componentMap: ComponentMap = {}

  register(name: string, importFunc: () => Promise<{ default: ComponentType<any> }>) {
    this.componentMap[name] = async () => {
      const module = await importFunc()
      return { default: memo(module.default) }
    }
  }

  load(name: string): React.LazyExoticComponent<ComponentType<any>> {
    if (!name) return null
    
    const importFunc = this.componentMap[name]
    if (!importFunc) {
      throw new Error(`Component not found: ${name}`)
    }
    return lazy(importFunc)
  }
}

const ComponentLoader = new Loader()

export default ComponentLoader
