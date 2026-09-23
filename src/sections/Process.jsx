import { useRef, useState } from 'react'
import { m, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import SectionHeading from '../components/SectionHeading.jsx'
import { STEPS } from '../data/content.js'

export default function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const [active, setActive] = useState(-1)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(v < 0.02 ? -1 : Math.min(STEPS.length - 1, Math.floor(v * STEPS.length)))
  })

  return (
    <section id="process" className="relative py-24 md:py-36" aria-labelledby="process-title">
      <div aria-hidden="true" className="grid-bg absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_50%,#000,transparent)]" />
      <div className="container-x">
        <SectionHeading id="process-title" index="05" label="Process" lines={['From idea', 'to launch.']} />

        <div ref={ref} className="relative mt-16 md:mt-24">
          {/* track */}
          <div aria-hidden="true" className="absolute bottom-0 left-[23px] top-0 w-px bg-white/10 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[23px] lg:h-px lg:w-auto">
            <m.div style={{ scaleY: fill }} className="absolute inset-0 origin-top bg-gradient-to-b from-electric to-cyan shadow-[0_0_12px_#00D1FF] lg:hidden" />
            <m.div style={{ scaleX: fill }} className="absolute inset-0 hidden origin-left bg-gradient-to-r from-electric to-cyan shadow-[0_0_12px_#00D1FF] lg:block" />
          </div>

          <ol className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((s, i) => {
              const on = i <= active
              return (
                <li key={s.n} className="relative pl-20 lg:pl-0 lg:pt-24">
                  <span
                    className={`absolute left-0 top-0 grid h-12 w-12 place-items-center rounded-full border text-[12px] font-bold transition-all duration-700 ${
                      on
                        ? 'border-cyan bg-gradient-to-br from-electric to-cyan text-white shadow-[0_0_30px_rgba(0,209,255,.55)]'
                        : 'border-white/15 bg-navy text-mist/60'
                    }`}
                  >
                    {s.n}
                  </span>
                  <h3
                    className={`text-[clamp(1.6rem,5.5vw,2.3rem)] font-extrabold uppercase tracking-[-0.01em] transition-colors duration-700 ${
                      on ? 'text-white' : 'text-white/45'
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p className={`mt-3 max-w-xs text-[14px] leading-relaxed transition-colors duration-700 ${on ? 'text-mist/70' : 'text-mist/60'}`}>
                    {s.text}
                  </p>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
