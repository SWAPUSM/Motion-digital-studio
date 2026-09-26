import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '../index.css'
import WebsiteRedesignPage from './WebsiteRedesignPage.jsx'

// Pre-rendered to static HTML at build time (scripts/prerender.mjs); hydrated here.
const root = document.getElementById('root')
const app = (
  <StrictMode>
    <WebsiteRedesignPage />
  </StrictMode>
)
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
