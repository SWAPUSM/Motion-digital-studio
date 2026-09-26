import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '../index.css'
import KohSamuiPage from './KohSamuiPage.jsx'

// The page is pre-rendered to static HTML at build time (scripts/prerender.mjs),
// so crawlers get the full content without running JavaScript; here it is hydrated.
const root = document.getElementById('root')
const app = (
  <StrictMode>
    <KohSamuiPage />
  </StrictMode>
)
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
