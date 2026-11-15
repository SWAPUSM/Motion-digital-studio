import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// The homepage is pre-rendered to static HTML at build time (scripts/prerender.mjs),
// so crawlers get the full content without running JavaScript; here it is hydrated.
const root = document.getElementById('root')
const prerendered = root.hasChildNodes()
const app = (
  <StrictMode>
    <App prerendered={prerendered} />
  </StrictMode>
)
if (prerendered) hydrateRoot(root, app)
else createRoot(root).render(app)
