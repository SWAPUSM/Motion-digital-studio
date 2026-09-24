import { Fragment, useRef } from 'react'
import { m, useScroll, useTransform } from 'motion/react'
import Reveal from '../components/Reveal.jsx'
import { PILLARS } from '../data/content.js'

const HEADLINE = [
  ['More', 'than', 'a', 'website.'],
  ['A', 'digital', 'experience.'],
]

export default function Intro() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%', 'start 45%'] })
  const words = HEADLINE.flat()
  let idx = 0

  return (
    <section id="intro" className="relative py-16 md:py-40" aria-labelledby="intro-title">
      <div className="container-x">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-white/55">01</span>
          <span className="h-px w-8 bg-gradient-to-r from-cyan to-transparent" aria-hidden="true" />
          The studio
        </p>

        <h2
          ref={ref}
          id="intro-title"
          className="mt-5 max-w-5xl text-[clamp(1.9rem,7.6vw,5rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-white"
        >
          {/* real spaces between words and lines keep the heading readable as words
              for screen readers and search engines */}
          {HEADLINE.map((line, li) => (
            <span key={li} className="block">
              {line.map((w) => {
                const i = idx++
                return (
                  <Fragment key={w + i}>
                    <Word progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} accent={li === 1}>
                      {w}
                    </Word>{' '}
                  </Fragment>
                )
              })}
            </span>
          ))}
        </h2>

        <Reveal as="p" className="mt-7 max-w-md text-[15px] leading-relaxed text-mist/70 md:mt-14 md:text-[17px]">
          Motion Digital Studio creates modern websites engineered around three objectives. Every pixel, animation and line of code
          exists to move your business forward.
        </Reveal>

        <Pillars />
      </div>
    </section>
  )
}

// Words brighten as they scroll into place. They start at 40% — dim enough to
// read as "in motion", bright enough to stay legible (≥ 3:1 for large text).
function Word({ children, progress, range, accent }) {
  const opacity = useTransform(progress, range, [0.4, 1])
  const y = useTransform(progress, range, [6, 0])
  return (
    <m.span style={{ opacity, y }} className={`inline-block ${accent ? 'text-gradient-soft' : ''}`}>
      {children}
    </m.span>
  )
}

/** DESIGN → PERFORMANCE → RESULTS, joined by a line of momentum. */
function Pillars() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={ref} className="relative mt-11 md:mt-24">
      {/* connecting line: vertical on mobile, horizontal on desktop */}
      <div aria-hidden="true" className="absolute bottom-8 left-[19px] top-8 w-px bg-white/10 md:bottom-auto md:left-0 md:right-0 md:top-[19px] md:h-px md:w-auto">
        <m.div style={{ scaleY: fill }} className="absolute inset-0 origin-top bg-gradient-to-b from-electric to-cyan md:hidden" />
        <m.div style={{ scaleX: fill }} className="absolute inset-0 hidden origin-left bg-gradient-to-r from-electric via-cyan to-white md:block" />
      </div>

      <ol className="relative grid gap-7 md:grid-cols-3 md:gap-8">
        {PILLARS.map((p, i) => (
          <Reveal as="li" key={p.key} delay={i * 0.12} className="relative pl-14 md:pl-0 md:pt-16">
            <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border border-cyan/40 bg-navy text-[11px] font-semibold text-cyan shadow-[0_0_24px_rgba(0,209,255,.25)]">
              0{i + 1}
            </span>
            <h3 className="text-[clamp(1.5rem,5vw,2.4rem)] font-extrabold uppercase tracking-[-0.01em] text-white">{p.title}</h3>
            <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-mist/65 md:mt-3">{p.text}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  )
}
