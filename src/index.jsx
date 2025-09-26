import { components as CoreComponents, renderers as CoreRenderers, UIReact, useUI, UIProvider, UIContextValue, tokens, Element, Theme } from '@nan0web/ui-react'
import BootstrapComponents from './components/index.jsx'
// import * as BootstrapRenderers from './renderers/index.jsx'
import BootstrapTheme from './theme/BootstrapTheme.js'

// Extend core components with Bootstrap
const components = new Map([...CoreComponents, ...BootstrapComponents])

// Extend renderers for Bootstrap-specific rendering
const renderers = new Map([...CoreRenderers])

// Register Bootstrap theme
const getUserTheme = (themeNameOrConfig) => {
  if (themeNameOrConfig === 'bootstrap') return BootstrapTheme
  return CoreComponents.getUserTheme(themeNameOrConfig)
}

export {
  components,
  renderers,
  UIReact,
  useUI,
  UIProvider,
  UIContextValue,
  tokens,
  Element,
  Theme,
  getUserTheme,
  BootstrapTheme,
}

export default { components, renderers, UIReact }
