import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

/** Static HTML for the homepage, injected into the built page by scripts/prerender.mjs. */
export function render() {
  return renderToString(
    <StrictMode>
      <App prerendered />
    </StrictMode>,
  )
}
