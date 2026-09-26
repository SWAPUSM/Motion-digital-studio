import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import WebsiteRedesignPage from './WebsiteRedesignPage.jsx'

/** Static HTML for /website-redesign/, injected into the built page by scripts/prerender.mjs. */
export function render() {
  return renderToString(
    <StrictMode>
      <WebsiteRedesignPage />
    </StrictMode>,
  )
}
