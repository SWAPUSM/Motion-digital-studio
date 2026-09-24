import { useRef, useState } from 'react'
import { m, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import { STEPS, TERMS } from '../data/content.js'

export default function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const [active, setActive] = useState(-1)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(v < 0.02 ? -1 : Math.min(STEPS.length - 1, Math.floor(v * STEPS.length)))
  })

  return (
    <section id="process" className="relative py-16 md:py-36" aria-labelledby="process-title">
      <div aria-hidden="true" className="grid-bg absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_50%,#000,transparent)]" />
      <div className="container-x">
        <SectionHeading id="process-title" index="06" label="Process" lines={['From idea', 'to launch.']} />

        <div ref={ref} className="relative mt-10 md:mt-24">
          {/* track */}
          <div aria-hidden="true" className="absolute bottom-0 left-[23px] top-0 w-px bg-white/10 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[23px] lg:h-px lg:w-auto">
            <m.div style={{ scaleY: fill }} className="absolute inset-0 origin-top bg-gradient-to-b from-electric to-cyan shadow-[0_0_12px_#00D1FF] lg:hidden" />
            <m.div style={{ scaleX: fill }} className="absolute inset-0 hidden origin-left bg-gradient-to-r from-electric to-cyan shadow-[0_0_12px_#00D1FF] lg:block" />
          </div>

          <ol className="relative grid gap-8 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((s, i) => {
              const on = i <= active
              return (
                <li key={s.n} className="relative pl-[4.25rem] lg:pl-0 lg:pt-24">
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
                    className={`pt-1.5 text-[clamp(1.5rem,5.5vw,2.3rem)] font-extrabold lg:pt-0 uppercase tracking-[-0.01em] transition-colors duration-700 ${
                      on ? 'text-white' : 'text-white/45'
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p className={`mt-2 max-w-xs text-[14px] lg:mt-3 leading-relaxed transition-colors duration-700 ${on ? 'text-mist/70' : 'text-mist/60'}`}>
                    {s.text}
                  </p>
                </li>
              )
            })}
          </ol>
        </div>

        {/* commercial reassurance: how working together works */}
        <Reveal className="mt-12 md:mt-20">
          <dl className="ring-gradient grid overflow-hidden rounded-[24px] bg-white/[.03] sm:grid-cols-3">
            {TERMS.map((t, i) => (
              <div
                key={t.label}
                className={`flex items-baseline justify-between gap-4 px-5 py-4 sm:block sm:px-7 sm:py-7 ${
                  i > 0 ? 'border-t border-white/[.07] sm:border-l sm:border-t-0' : ''
                }`}
              >
                <dt className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan/85">{t.label}</dt>
                <dd className="text-right sm:mt-3 sm:text-left">
                  <span className="block text-[15px] font-extrabold uppercase tracking-[0.02em] text-white sm:text-[19px]">{t.value}</span>
                  <span className="mt-0.5 block text-[12.5px] text-mist/60 sm:mt-1 sm:text-[13px]">{t.detail}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
