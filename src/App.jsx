import { startTransition, useEffect, useMemo, useState } from 'react'
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import Nav from './components/Nav.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import FloatingCta from './components/FloatingCta.jsx'
import Hero from './sections/Hero.jsx'
import Services from './sections/Services.jsx'
import Pricing from './sections/Pricing.jsx'
import Work from './sections/Work.jsx'
import Why from './sections/Why.jsx'
import Process from './sections/Process.jsx'
import Faq from './sections/Faq.jsx'
import FinalCta from './sections/FinalCta.jsx'
import Footer from './sections/Footer.jsx'

export default function App() {
  // The opening intro lives in index.html (painted before this bundle loads).
  // Tell it the app is mounted; it exits after its short reveal and signals back,
  // which starts the hero entrance while the intro fades — one continuous move.
  const [ready, setReady] = useState(() => window.__mdsIntro === 'done')
  const [rest, setRest] = useState(false)

  useEffect(() => {
    if (ready) return
    const go = () => setReady(true)
    window.addEventListener('mds:intro-exit', go)
    if (typeof window.__mdsAppReady === 'function') window.__mdsAppReady()
    else go() // no intro on the page
    if (window.__mdsIntro === 'done') go()
    return () => window.removeEventListener('mds:intro-exit', go)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Paint the hero first, then render the rest of the page as an interruptible
  // transition so the main thread never blocks on one long task.
  useEffect(() => {
    startTransition(() => setRest(true))
  }, [])

  // Deep links (e.g. /#work) can only resolve once those sections exist
  useEffect(() => {
    if (rest && location.hash.length > 1) document.getElementById(location.hash.slice(1))?.scrollIntoView()
  }, [rest])

  // Everything below the hero is static: build it once so the intro hand-off
  // (ready → true) only re-renders the hero and nav.
  const sections = useMemo(
    () => (
      <>
        {/* Hero · 01 Selected work · 02 Services · 03 Pricing · 04 Why Motion ·
            05 Process · 06 FAQ · Contact. The Teddy Bike Samui before/after lives in its case study. */}
        <Work />
        <Services />
        <Pricing />
        {/* a light chapter between the dark ones (see .surface-light) */}
        <div className="surface-light relative isolate mx-2 overflow-clip rounded-[32px] md:mx-4 md:rounded-[56px]">
          <div aria-hidden="true" className="surface-light-glow pointer-events-none absolute inset-0 -z-10" />
          <Why />
          <Process />
        </div>
        <Faq index="06" />
        <FinalCta />
      </>
    ),
    [],
  )
  const footer = useMemo(
    () => (
      <>
        <Footer />
        <FloatingCta />
      </>
    ),
    [],
  )

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-navy"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Nav ready={ready} />
        <main id="main">
          <Hero ready={ready} />
          {rest && sections}
        </main>
        {rest && footer}
      </MotionConfig>
    </LazyMotion>
  )
}
