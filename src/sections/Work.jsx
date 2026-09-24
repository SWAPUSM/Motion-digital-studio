import { useRef, useState } from 'react'
import { m, useScroll, useTransform } from 'motion/react'
import SectionHeading from '../components/SectionHeading.jsx'
import { BrowserFrame, PhoneFrame } from '../components/Devices.jsx'
import { ArrowUpRight } from '../components/Icons.jsx'
import { PROJECTS } from '../data/content.js'

export default function Work() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section id="work" className="relative pt-16 md:pt-36" aria-labelledby="work-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end md:gap-6">
          <SectionHeading id="work-title" index="03" label="Portfolio" lines={['Selected', 'work']} />
          <p className="max-w-sm text-[15px] leading-relaxed text-mist/65">
            Real businesses, real momentum — designed and built by Motion.
          </p>
        </div>
      </div>

      {/* Stacked, sticky project stage — each project slides over the last */}
      <div ref={ref} className="relative mt-2 md:mt-16">
        {PROJECTS.map((p, i) => (
          <ProjectPanel key={p.id} project={p} index={i} total={PROJECTS.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}

function ProjectPanel({ project, index, total, progress }) {
  const isLast = index === total - 1
  // As later panels arrive, earlier ones recede into depth.
  const seg = 1 / Math.max(1, total - 1)
  const start = Math.min(index * seg, 1)
  const scale = useTransform(progress, [start, 1], [1, isLast ? 1 : 1 - (total - 1 - index) * 0.05])
  const dim = useTransform(progress, [start, Math.min(1, start + seg)], [0, isLast ? 0 : 0.6])

  return (
    <div className="sticky top-0 flex min-h-[100svh] items-start pb-6 pt-[76px] md:items-center md:py-24">
      <m.article
        style={{ scale, top: index * 14 }}
        className="container-x relative origin-top"
        aria-labelledby={`proj-${project.id}`}
      >
        <div className="ring-gradient relative overflow-hidden rounded-[28px] bg-gradient-to-br from-navy-soft to-navy-deep p-4 shadow-[0_-30px_80px_-40px_rgba(0,0,0,.9)] sm:p-6 md:rounded-[36px] md:p-10">
          {/* ambient glow in the project's own accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-25 blur-3xl"
            style={{ background: project.accent }}
          />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-2/3 rounded-full bg-electric/20 blur-3xl" />

          <div className="relative grid items-center gap-6 md:gap-10 lg:grid-cols-[1.55fr_1fr]">
            {/* Device stage */}
            {project.image ? <BrowserStage project={project} /> : <PhoneStage project={project} />}

            {/* Info */}
            <div className="relative px-1 pb-2 pt-4 md:px-0 lg:pt-0">
              <div className="flex items-center gap-4 text-[11px] font-semibold tracking-[0.25em] text-white/55">
                <span className="text-cyan">0{index + 1}</span>
                <span className="h-px flex-1 bg-white/10" />
                <span>0{total}</span>
              </div>
              <p className="eyebrow mt-4 md:mt-8">{project.category}</p>
              <h3
                id={`proj-${project.id}`}
                className="mt-3 text-[clamp(1.7rem,6.5vw,3rem)] font-extrabold uppercase leading-[1] tracking-[-0.02em] text-white"
              >
                {project.name}
              </h3>
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-mist/70 md:mt-4 md:text-[15px]">{project.description}</p>
              <p className="mt-4 text-[11px] font-semibold uppercase leading-relaxed tracking-[0.16em] text-mist/75 md:mt-5 md:text-[12px]">
                <span className="sr-only">Services: </span>
                {project.services.join(' • ')}
              </p>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link mt-5 inline-flex md:mt-8 items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-white"
              >
                <span className="relative">
                  View project
                  <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left bg-gradient-to-r from-cyan to-electric transition-transform duration-500 group-hover/link:scale-x-0" />
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover/link:border-cyan group-hover/link:bg-cyan group-hover/link:text-navy">
                  <ArrowUpRight />
                </span>
                <span className="sr-only">— {project.domain} (opens in a new tab)</span>
              </a>
              <p className="mt-4 hidden text-[12px] text-mist/55 sm:block">{project.domain}</p>
            </div>
          </div>

          <m.div aria-hidden="true" style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-navy-deep" />
        </div>
      </m.article>
    </div>
  )
}

/** Desktop capture in a browser frame, mobile capture in a phone; hover/tap scrolls both. */
function BrowserStage({ project }) {
  const [open, setOpen] = useState(false)
  return (
    <button
      type="button"
      data-open={open}
      onClick={() => setOpen((o) => !o)}
      aria-pressed={open}
      className="mock-trigger group relative block w-full cursor-pointer text-left"
    >
      <div aria-hidden="true" className="transition-transform duration-700 ease-[var(--ease-expo)] lg:group-hover:-translate-y-1">
        <BrowserFrame domain={project.domain} tone={project.tone}>
          <img src={project.image} alt="" loading="lazy" decoding="async" className="mock-page absolute inset-x-0 top-0 block w-full" />
        </BrowserFrame>
      </div>
      {project.mobileImage && (
        <PhoneFrame aria-hidden="true" className="absolute -bottom-4 right-3 w-[24%] rotate-[4deg] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:rotate-0 sm:right-6 md:-bottom-6 md:w-[20%]">
          <img src={project.mobileImage} alt="" loading="lazy" decoding="async" className="mock-page absolute inset-x-0 top-0 block w-full" />
        </PhoneFrame>
      )}
      <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-navy/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white opacity-90 backdrop-blur transition-opacity duration-500 group-hover:opacity-0 group-data-[open=true]:opacity-0 md:bottom-5 md:left-5">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
        <span className="lg:hidden">Tap to explore</span>
        <span className="hidden lg:inline">Hover to explore</span>
        <span className="sr-only"> the {project.name} website preview</span>
      </span>
    </button>
  )
}

/** Only a mobile capture: the phone takes centre stage, lit in the project's accent. */
function PhoneStage({ project }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={-1}
      aria-hidden="true"
      className="group relative flex items-center justify-center py-3 sm:min-h-[440px] sm:py-8 lg:min-h-[600px]"
    >
      {/* stage lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_45%,rgba(0,123,255,.22),transparent_70%)]" />
      <div
        className="absolute left-1/2 top-1/2 aspect-square w-[80%] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: project.accent }}
      />
      <div className="absolute left-1/2 top-1/2 aspect-square w-[88%] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[.06]" />
      <div className="absolute left-1/2 top-1/2 aspect-square w-[64%] max-w-[410px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/10" />
      <div className="grid-bg absolute inset-0 opacity-50 [mask-image:radial-gradient(55%_55%_at_50%_50%,#000,transparent)]" />

      {/* floor shadow */}
      <div className="absolute bottom-[6%] left-1/2 h-8 w-[38%] max-w-[240px] -translate-x-1/2 rounded-full bg-black/60 blur-2xl" />

      {/* sized by height as well as width, so the whole panel fits short phone screens */}
      <div className="relative w-[min(40%,150px,17svh)] sm:w-[40%] sm:max-w-[210px] lg:w-[250px] lg:max-w-none">
        <div className="animate-float-a">
          <PhoneFrame className="rotate-[-3deg] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:rotate-0 group-hover:scale-[1.03]">
            <img src={project.mobileImage} alt={`${project.name} website on a phone`} width="780" height="1691" loading="lazy" decoding="async" className="absolute inset-0 block h-full w-full object-cover object-top" />
          </PhoneFrame>
        </div>
      </div>
    </a>
  )
}
