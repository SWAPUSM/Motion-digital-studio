import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import KohSamuiPage from './KohSamuiPage.jsx'

/** Static HTML for /web-design-koh-samui/, injected into the built page by scripts/prerender.mjs. */
export function render() {
  return renderToString(
    <StrictMode>
      <KohSamuiPage />
    </StrictMode>,
  )
}
