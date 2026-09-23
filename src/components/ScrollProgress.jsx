import { m, useScroll, useSpring } from 'motion/react'

/** The "motion line": a hairline that fills as the visitor moves through the story. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-electric via-cyan to-white shadow-[0_0_12px_rgba(0,209,255,.7)]"
      style={{ scaleX }}
    />
  )
}
