import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '../index.css'
import './case-study.css'
import CaseStudyPage from './CaseStudyPage.jsx'
import { TEDDY_BIKE_SAMUI } from '../data/caseStudies.js'

// Pre-rendered to static HTML at build time (scripts/prerender.mjs); hydrated here.
const root = document.getElementById('root')
const app = (
  <StrictMode>
    <CaseStudyPage study={TEDDY_BIKE_SAMUI} />
  </StrictMode>
)
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
