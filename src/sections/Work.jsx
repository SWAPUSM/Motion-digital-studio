import { useRef } from 'react'
import { m, useScroll, useTransform } from 'motion/react'
import SectionHeading from '../components/SectionHeading.jsx'
import { BrowserFrame, PhoneFrame } from '../components/Devices.jsx'
import { ArrowUpRight } from '../components/Icons.jsx'
import { PROJECTS } from '../data/content.js'
import PLACEHOLDERS from '../data/placeholders.json'
import { useFinePointer } from '../hooks/useMediaQuery.js'
import { useAfterLoad } from '../hooks/useAfterLoad.js'

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
  // Scroll-linked scale/dim only on desktop pointers. On iPhone the panels simply
  // stack (pure CSS sticky), which Safari scrolls smoothly without JS per frame.
  const depth = useFinePointer()

  return (
    <div className="sticky top-0 flex min-h-[100svh] items-start pb-6 pt-[76px] md:items-center md:py-24">
      <m.article
        style={depth ? { scale, top: index * 14 } : { top: index * 14 }}
        className="container-x relative origin-top"
        aria-labelledby={`proj-${project.id}`}
      >
        <div className="ring-gradient relative overflow-hidden rounded-[28px] bg-gradient-to-br from-navy-soft to-navy-deep p-4 shadow-[0_-20px_40px_-28px_rgba(0,0,0,.9)] sm:p-6 lg:shadow-[0_-30px_80px_-40px_rgba(0,0,0,.9)] md:rounded-[36px] md:p-10">
          {/* ambient glow in the project's own accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] opacity-30"
            style={{ background: `radial-gradient(closest-side, ${project.accent}, transparent)` }}
          />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-[10%] h-96 w-[90%] bg-[radial-gradient(closest-side,rgba(0,123,255,.2),transparent)]" />

          <div className="relative grid items-center gap-6 md:gap-10 lg:grid-cols-[1.55fr_1fr]">
            {/* Device stage */}
            {project.desktop ? <BrowserStage project={project} /> : <PhoneStage project={project} />}

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
              {/* on short phone screens the description gives way so the whole panel stays in view */}
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-mist/70 md:mt-4 md:text-[15px] max-lg:[@media(max-height:700px)]:hidden">{project.description}</p>
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

          {depth && <m.div aria-hidden="true" style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-navy-deep" />}
        </div>
      </m.article>
    </div>
  )
}

/**
 * A portfolio screenshot: AVIF with WebP fallback at two widths, chosen by `sizes`.
 * Fetched as soon as the page has loaded (not when scrolled to), so it's ready long
 * before it comes into view; until then a 20px blurred preview + brand colour shows.
 */
const SHOT = { desktop: { widths: [900, 1600], w: 1600, h: 913 }, mobile: { widths: [390, 780], w: 780, h: 1691 } }

function Shot({ slug, kind, alt, sizes }) {
  const loaded = useAfterLoad()
  const { widths, w, h } = SHOT[kind]
  const set = (ext) => widths.map((x) => `/work/${slug}-${kind}-${x}.${ext} ${x}w`).join(', ')
  const preview = { backgroundImage: `url(${PLACEHOLDERS[`${slug}-${kind}`]})` }
  if (!loaded) return <div role="img" aria-label={alt} className="absolute inset-0 bg-navy-soft bg-cover bg-top" style={preview} />
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <img
        src={`/work/${slug}-${kind}-${widths[1]}.webp`}
        srcSet={set('webp')}
        sizes={sizes}
        alt={alt}
        width={w}
        height={h}
        loading="eager"
        fetchPriority="low"
        decoding="async"
        className="absolute inset-0 block h-full w-full bg-navy-soft bg-cover bg-top object-cover object-top"
        style={preview}
      />
    </picture>
  )
}

/** Desktop capture in a browser frame, with the phone capture beside it. */
function BrowserStage({ project }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={-1}
      aria-hidden="true"
      className="group relative block pb-5 md:pb-8"
    >
      <div className="transition-transform duration-700 ease-[var(--ease-expo)] lg:group-hover:-translate-y-1">
        <BrowserFrame domain={project.domain} tone={project.tone} aspect="aspect-[7/4]">
          <Shot slug={project.slug} kind="desktop" alt={`${project.name} website on desktop`} sizes="(min-width: 1024px) 58vw, 92vw" />
        </BrowserFrame>
      </div>
      <div className="absolute bottom-0 right-3 w-[22%] max-w-[180px] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-1.5 sm:right-6 md:w-[18%]">
        <PhoneFrame>
          <Shot slug={project.slug} kind="mobile" alt={`${project.name} website on a phone`} sizes="(min-width: 1024px) 11vw, 22vw" />
        </PhoneFrame>
      </div>
    </a>
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
        className="absolute left-1/2 top-1/2 aspect-square w-full max-w-[640px] -translate-x-1/2 -translate-y-1/2 opacity-35"
        style={{ background: `radial-gradient(closest-side, ${project.accent}, transparent)` }}
      />
      <div className="absolute left-1/2 top-1/2 aspect-square w-[88%] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[.06]" />

      {/* sized by height as well as width, so the whole panel fits short phone screens */}
      <div className="relative w-[min(40%,150px,17svh)] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-1.5 sm:w-[40%] sm:max-w-[210px] lg:w-[250px] lg:max-w-none">
        <PhoneFrame>
          <Shot slug={project.slug} kind="mobile" alt={`${project.name} website on a phone`} sizes="(min-width: 1024px) 250px, 40vw" />
        </PhoneFrame>
      </div>
    </a>
  )
}
