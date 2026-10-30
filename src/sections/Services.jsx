import { Fragment } from 'react'
import { m } from 'motion/react'
import Reveal from '../components/Reveal.jsx'
import { ArrowRight, Check } from '../components/Icons.jsx'
import { PILLARS } from '../data/content.js'
import { KS_SERVICES } from '../data/kohSamui.js'

// What we build: website creation first (Website Care is listed with the prices).
const BUILD = KS_SERVICES.filter((s) => s.title !== 'Website Care')

const HEADLINE = [
  ['More', 'than', 'a', 'website.'],
  ['A', 'digital', 'experience.'],
]

const STATEMENT =
  'Motion Digital Studio creates modern websites engineered around three objectives. Every pixel, animation and line of code exists to move your business forward.'

/** Services: the studio's approach (design → performance → results) and what we build. */
export default function Services() {
  let idx = 0

  return (
    <section id="services" className="relative isolate overflow-clip py-16 md:py-28 lg:py-[clamp(88px,7vw,120px)]" aria-labelledby="services-title">
      {/* atmosphere: a low aurora behind the statement */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -right-[20%] top-[-10%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgba(0,123,255,.16),transparent)]" />
        <div className="absolute -left-[25%] top-[35%] h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(closest-side,rgba(0,209,255,.08),transparent)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
      </div>
      <div className="container-x">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-white/70">02</span>
          <span className="h-px w-8 bg-gradient-to-r from-cyan to-transparent" aria-hidden="true" />
          Services
        </p>

        <m.h2
          id="services-title"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-12% 0px' }}
          className="mt-5 max-w-5xl text-[clamp(1.9rem,7.6vw,5rem)] uppercase leading-[0.98] tracking-[-0.035em] text-white md:mt-7"
        >
          {/* real spaces between words and lines keep the heading readable as words
              for screen readers and search engines */}
          {HEADLINE.map((line, li) => (
            <span key={li} className={`block ${li === HEADLINE.length - 1 ? 'font-extrabold' : 'font-light text-white/90'}`}>
              {line.map((w) => {
                const i = idx++
                return (
                  <Fragment key={w + i}>
                    <Word index={i} accent={li === 1}>
                      {w}
                    </Word>{' '}
                  </Fragment>
                )
              })}
            </span>
          ))}
        </m.h2>

        {/* the studio's statement, lit word by word by the scroll position (CSS scroll timeline;
            fully lit without support or with reduced motion) */}
        <p className="scroll-lit mt-9 max-w-4xl text-[clamp(1.3rem,4.6vw,2.5rem)] font-medium leading-[1.25] tracking-[-0.015em] text-white md:mt-14">
          {STATEMENT.split(' ').map((w, i) => (
            <Fragment key={i}>
              <span className="scroll-lit-word" style={{ '--i': i }}>
                {w}
              </span>{' '}
            </Fragment>
          ))}
        </p>

        <Pillars />
        <Build />
      </div>
    </section>
  )
}

// Words brighten into place one after another once the heading is in view (a
// one-off entrance, nothing computed per scroll frame). They start at 40% — dim
// enough to read as "in motion", bright enough to stay legible (≥ 3:1 for large text).
function Word({ children, index, accent }) {
  return (
    <m.span
      variants={{
        hidden: { opacity: 0.4, y: 6 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={`inline-block ${accent ? 'text-gradient-soft' : ''}`}>
      {children}
    </m.span>
  )
}

/** DESIGN → PERFORMANCE → RESULTS, joined by a line of momentum. */
function Pillars() {
  // the line draws once as the pillars come into view
  const draw = { duration: 1.6, ease: [0.65, 0, 0.35, 1] }
  const inView = { once: true, margin: '-15% 0px' }

  return (
    <div className="relative mt-11 md:mt-16">
      {/* connecting line: vertical on mobile, horizontal on desktop */}
      <div aria-hidden="true" className="absolute bottom-8 left-[19px] top-8 w-px bg-white/10 md:bottom-auto md:left-0 md:right-0 md:top-[19px] md:h-px md:w-auto">
        <m.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={inView} transition={draw} className="absolute inset-0 origin-top bg-gradient-to-b from-electric to-cyan md:hidden" />
        <m.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={inView} transition={draw} className="absolute inset-0 hidden origin-left bg-gradient-to-r from-electric via-cyan to-white md:block" />
      </div>

      <ol className="relative grid gap-7 md:grid-cols-3 md:gap-8">
        {PILLARS.map((p, i) => (
          <Reveal as="li" key={p.key} delay={i * 0.12} className="group relative pl-14 md:pl-0 md:pt-16">
            <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border border-cyan/40 bg-navy text-[11px] font-semibold text-cyan shadow-[0_0_24px_rgba(0,209,255,.25)] transition-[transform,box-shadow] duration-500 ease-[var(--ease-expo)] group-hover:scale-110 group-hover:shadow-[0_0_34px_rgba(0,209,255,.55)]">
              0{i + 1}
            </span>
            <h3 className="text-[clamp(1.5rem,5vw,2.4rem)] font-extrabold uppercase tracking-[-0.01em] text-white md:text-[clamp(1.5rem,calc((100vw_-_144px)/26),2.4rem)]">{p.title}</h3>
            <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-mist/65 md:mt-3">{p.text}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  )
}

/** What we build — the studio's main service is new websites; redesign is offered too. */
function Build() {
  return (
    <div className="surface-light surface-panel mt-14 rounded-[28px] p-6 sm:p-8 md:mt-20 md:rounded-[36px] md:p-12">
      <ul className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-9">
        {BUILD.map((s, i) => (
          <Reveal as="li" key={s.title} delay={(i % 3) * 0.06} className="group flex gap-4">
            <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cyan/10 text-cyan transition-[background-color,color,transform] duration-500 ease-[var(--ease-expo)] group-hover:scale-110 group-hover:bg-cyan group-hover:text-[#fff]" aria-hidden="true">
              <Check width="13" height="13" />
            </span>
            <div>
              <h3 className="text-[15px] font-extrabold uppercase tracking-[0.02em] text-white md:text-[16px]">{s.title}</h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-mist/65">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </ul>
      <Reveal className="mt-9 flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-10 md:mt-12 md:pt-8">
        <a href="#pricing" className="inline-flex min-h-[44px] items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-cyan transition-colors hover:text-white">
          Compare the packages <ArrowRight />
        </a>
        <a href="/website-redesign/" className="inline-flex min-h-[44px] items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-mist/70 transition-colors hover:text-white">
          Already have a website? Website redesign <ArrowRight />
        </a>
      </Reveal>
    </div>
  )
}
