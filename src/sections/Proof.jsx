import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import { ArrowUpRight } from '../components/Icons.jsx'
import { PROJECTS, TESTIMONIALS } from '../data/content.js'

/**
 * Credibility, not decoration: every project listed here is a live website the
 * visitor can open. Verified testimonials appear automatically once added to
 * TESTIMONIALS in data/content.js — none are invented.
 */
export default function Proof() {
  return (
    <section id="proof" className="relative py-16 md:py-28 lg:py-[clamp(72px,5.5vw,96px)]" aria-labelledby="proof-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end md:gap-6">
          <SectionHeading id="proof-title" index="04" label="Proof" lines={['Real businesses.', 'Real websites.']} />
          <Reveal as="p" className="max-w-sm text-[15px] leading-relaxed text-mist/70">
            Every project shown above was created for a real business, with a design tailored to its brand and goals.
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-8 md:mt-12">
            <ul className="ring-gradient grid overflow-hidden rounded-[24px] bg-white/[.03] lg:grid-cols-3">
              {PROJECTS.map((p, i) => (
                <li key={p.id} className={i > 0 ? 'border-t border-white/[.07] lg:border-l lg:border-t-0' : ''}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-[64px] items-center gap-4 px-5 py-4 transition-colors duration-500 hover:bg-white/[.04] md:px-7 md:py-5"
                  >
                    <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-[#28c840]/60 [animation:pulse-ring_2.4s_ease-out_infinite]" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#28c840]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-extrabold uppercase tracking-[0.04em] text-white md:text-[15px]">{p.name}</span>
                      <span className="mt-0.5 block truncate text-[12.5px] text-mist/60">{p.category}</span>
                    </span>
                    <span className="hidden text-[12.5px] text-mist/60 sm:block lg:hidden">{p.domain}</span>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 text-white transition-all duration-500 group-hover:border-cyan group-hover:bg-cyan group-hover:text-navy">
                      <ArrowUpRight width="16" height="16" />
                    </span>
                    <span className="sr-only"> — visit {p.domain} (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 flex items-center gap-2 px-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-mist/60">
              <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" aria-hidden="true" />
              Live websites — visit them yourself
            </p>
        </Reveal>

        {TESTIMONIALS.length > 0 && (
          <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal as="figure" key={t.name} delay={i * 0.08} className="rounded-[24px] border border-white/[.07] bg-white/[.025] p-6 md:p-8">
                <blockquote className="text-[15px] leading-relaxed text-mist/85">“{t.quote}”</blockquote>
                <figcaption className="mt-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-cyan">
                  {t.name}
                  {t.role && <span className="ml-2 font-medium normal-case tracking-normal text-mist/60">{t.role}</span>}
                </figcaption>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
