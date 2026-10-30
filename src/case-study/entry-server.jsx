import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import CaseStudyPage from './CaseStudyPage.jsx'
import { TEDDY_BIKE_SAMUI } from '../data/caseStudies.js'

/** Static HTML for /projects/teddy-bike-samui/, injected into the built page by scripts/prerender.mjs. */
export function render() {
  return renderToString(
    <StrictMode>
      <CaseStudyPage study={TEDDY_BIKE_SAMUI} />
    </StrictMode>,
  )
}
