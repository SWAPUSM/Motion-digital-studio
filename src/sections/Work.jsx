import SectionHeading from '../components/SectionHeading.jsx'
import { useEffect, useRef } from 'react'
import Reveal from '../components/Reveal.jsx'
import { TabletFrame, PhoneFrame } from '../components/Devices.jsx'
import WorkShot, { WORK_SHOT } from '../components/WorkShot.jsx'
import { ArrowRight, ArrowUpRight } from '../components/Icons.jsx'
import { PROJECTS } from '../data/content.js'

/**
 * Selected work — the only place the three projects appear on the homepage. Each one is
 * staged in its own website's colours (project.theme), with its own composition:
 *  showroom (Teddy Bike Samui) · cinema (Samui Property 360) · atelier (Valérie d'Art Don).
 *
 * The reel (CSS in index.css, "Selected work"): each project sticks and the next one slides
 * over it while the previous recedes; inside each card the tablet unfolds and the phone rises.
 * All of it runs on the browser's scroll timelines — no scroll listeners. Without support the
 * cards still stack; with reduced motion they simply follow one another.
 *
 * The cards only become sticky while the reel is on screen (.is-live): iOS Safari tints its bars
 * from sticky/fixed elements at the screen edges, so outside the reel they play no part (see the
 * card's background-color below). Switching sticky on before a card reaches its sticking point
 * changes nothing on screen.
 */
export default function Work() {
  const reel = useRef(null)
  useEffect(() => {
    const el = reel.current
    const io = new IntersectionObserver(([e]) => el.classList.toggle('is-live', e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <section id="work" className="relative pb-10 pt-12 md:pb-14 md:pt-28 lg:pb-16 lg:pt-[clamp(88px,7vw,120px)]" aria-labelledby="work-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end md:gap-6">
          <SectionHeading id="work-title" index="01" label="Portfolio" lines={['Selected', 'work.']} />
          <Reveal as="p" className="max-w-sm text-[15px] leading-relaxed text-mist/70">
            Websites designed and developed from the ground up for real businesses — each one with its own identity.
          </Reveal>
        </div>
        <ol ref={reel} className="work-reel mt-10 md:mt-16">
          {PROJECTS.map((p, i) => (
            <Project key={p.id} project={p} index={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}

function Project({ project: p, index }) {
  const t = p.theme
  const reverse = t.layout === 'cinema'
  // the slot's height, measured on load/resize only, sets where it sticks (see .work-slot)
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const measure = () => el.style.setProperty('--h', `${el.offsetHeight + index * 12}px`)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [index])
  return (
    <li ref={ref} className="work-slot pb-6 md:pb-10" data-i={index}>
      <article
        aria-labelledby={`proj-${p.id}`}
        className="work-card group relative isolate overflow-clip rounded-[28px] shadow-[0_-24px_60px_-40px_rgba(0,0,0,.9)] md:rounded-[40px]"
        // iOS Safari 26 colours its bottom toolbar from the sticky element at the bottom edge of the screen:
        // that element's background-color or, without one, its painted pixels (the light cards turned the
        // toolbar cream). So the card colour is painted as a one-colour gradient, and the background-color
        // underneath is the page navy, almost transparent and fully hidden by the gradient: Safari blends it
        // over the page background and the toolbar stays navy.
        style={{ backgroundColor: 'rgb(6 20 36 / 0.01)', backgroundImage: `linear-gradient(${t.bg}, ${t.bg})`, color: t.ink }}
      >
        <Backdrop project={p} />
        <div className="relative grid items-center gap-8 p-5 pb-8 sm:p-8 md:gap-10 md:p-12 lg:grid-cols-12 lg:gap-12 lg:p-16">
          <div className={`lg:col-span-7 ${reverse ? 'lg:order-2' : ''}`}>
            <Stage project={p} />
          </div>
          <div className={`lg:col-span-5 ${reverse ? 'lg:order-1' : ''}`}>
            <Info project={p} index={index} />
          </div>
        </div>
      </article>
    </li>
  )
}

/** Quiet, project-specific light: no blur filters, just gradients and one shape. */
function Backdrop({ project: { theme: t } }) {
  if (t.layout === 'showroom')
    return (
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-y-0 left-0 w-full lg:w-[62%]" style={{ background: `linear-gradient(160deg, #F2F5F1 0%, ${t.panel} 60%, #C6D0C8 130%)` }} />
      </div>
    )
  if (t.layout === 'cinema')
    return (
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: `radial-gradient(70% 80% at 75% 40%, ${t.panel} 0%, ${t.bg} 70%)` }} />
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${t.accent}66, transparent)` }} />
      </div>
    )
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      {/* the arch of the redesign's portrait, as a quiet shape behind the devices */}
      <div className="absolute left-[33%] top-[9%] hidden aspect-[3/4] w-[22%] rounded-t-full lg:block" style={{ backgroundImage: `linear-gradient(${t.panel}, ${t.panel})` }} />
      <div className="absolute left-[31.5%] top-[6%] hidden aspect-[3/4] w-[25%] rounded-t-full border lg:block" style={{ borderColor: `${t.accent}33` }} />
      <div className="absolute inset-x-0 bottom-0 h-1/3 lg:hidden" style={{ background: `linear-gradient(180deg, transparent, ${t.panel}66)` }} />
    </div>
  )
}

/** Tablet + phone captures of the live site, arranged per project. Hover lifts them a little on mouse devices. */
function Stage({ project: p }) {
  const t = p.theme
  const link = p.caseStudy ? { href: p.caseStudy } : { href: p.url, target: '_blank', rel: 'noopener noreferrer' }
  const phoneW = t.layout === 'atelier' ? 'w-[27%] max-w-[190px]' : 'w-[23%] max-w-[170px]'
  return (
    <figure>
      <a {...link} tabIndex={-1} aria-hidden="true" className="work-stage relative block pb-10 pr-[9%] md:pb-14">
        <div className="work-tablet"><div className="work-lift">
          <TabletFrame screen={WORK_SHOT.tablet.screen}>
            <WorkShot slug={p.slug} kind="tablet" alt="" sizes="(min-width: 1280px) 620px, (min-width: 1024px) 50vw, 84vw" />
          </TabletFrame>
        </div></div>
        <div className={`work-phone absolute bottom-0 right-0 ${phoneW}`}><div className="work-lift-more">
          <PhoneFrame screen={WORK_SHOT.mobile.screen}>
            <WorkShot slug={p.slug} kind="mobile" alt="" sizes="(min-width: 1024px) 180px, 25vw" />
          </PhoneFrame>
        </div></div>
      </a>
      <figcaption className="mt-4 text-[10.5px] font-semibold uppercase tracking-[0.2em]" style={{ color: t.ink, opacity: 0.6 }}>
        {p.domain} <span aria-hidden="true">·</span> live site on tablet and phone
      </figcaption>
    </figure>
  )
}

function Info({ project: p, index }) {
  const t = p.theme
  const muted = { color: t.ink, opacity: 0.72 }
  return (
    <div>
      <div className="flex items-center gap-4 text-[11px] font-semibold tracking-[0.25em]" style={{ color: t.accent }}>
        <span>0{index + 1}</span>
        <span className="h-px flex-1" style={{ background: `${t.ink}26` }} />
        <span className="uppercase" style={{ color: t.ink, opacity: 0.6 }}>{p.category}</span>
      </div>
      <h3 id={`proj-${p.id}`} className="mt-5 text-[clamp(2rem,7vw,3.6rem)] leading-[0.95] tracking-[-0.03em] md:mt-7">
        <span className="block font-light uppercase">{p.name.split(' ').slice(0, t.split).join(' ')}</span>
        <span className="block font-extrabold uppercase">{p.name.split(' ').slice(t.split).join(' ')}</span>
      </h3>
      {p.caseStudy && (
        <p className="mt-4 inline-flex rounded-full border px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.2em]" style={{ borderColor: `${t.ink}40` }}>
          Case study
        </p>
      )}
      <p className="mt-5 max-w-md text-[15px] leading-relaxed md:text-[16px]" style={muted}>
        {p.description}
      </p>
      <p className="mt-4 text-[11px] font-semibold uppercase leading-relaxed tracking-[0.16em]" style={{ color: t.ink, opacity: 0.75 }}>
        <span className="sr-only">Services: </span>
        {p.services.join(' · ')}
      </p>
      <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 md:mt-9">
        {p.caseStudy && (
          <a
            href={p.caseStudy}
            className="inline-flex min-h-[48px] items-center gap-3 rounded-full px-6 text-[12px] font-semibold uppercase tracking-[0.2em] transition-transform duration-500 ease-[var(--ease-expo)] hover:-translate-y-0.5"
            style={{ background: t.ink, color: t.bg }}
          >
            View case study <ArrowRight />
            <span className="sr-only"> — {p.name}</span>
          </a>
        )}
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group/live inline-flex min-h-[48px] items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.2em] ${p.caseStudy ? '' : 'rounded-full border px-6'}`}
          style={p.caseStudy ? { color: t.ink } : { color: t.ink, borderColor: `${t.ink}55` }}
        >
          Visit website <ArrowUpRight className="transition-transform duration-500 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5" />
          <span className="sr-only"> — {p.domain} (opens in a new tab)</span>
        </a>
      </div>
    </div>
  )
}
