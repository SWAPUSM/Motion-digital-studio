import { LazyMotion, MotionConfig, domAnimation, m } from 'motion/react'
import Nav from './Nav.jsx'
import ScrollProgress from './ScrollProgress.jsx'
import FloatingCta from './FloatingCta.jsx'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import MagneticButton from './MagneticButton.jsx'
import Ribbon from './Ribbon.jsx'
import { BrowserFrame, PhoneFrame } from './Devices.jsx'
import { ArrowRight, ArrowUpRight, Check, WhatsApp } from './Icons.jsx'
import Footer from '../sections/Footer.jsx'
import { PROJECTS } from '../data/content.js'
import PLACEHOLDERS from '../data/placeholders.json'
import { whatsappLink } from '../config.js'

// Shared building blocks for the service / location landing pages
// (/web-design-koh-samui/, /website-redesign/), in the site's own visual language.

const ease = [0.16, 1, 0.3, 1]
const RIBBON = 'M-80 640 C 180 660, 300 250, 560 300 S 820 700, 1040 460 S 1300 90, 1540 170'

export const card = 'rounded-[20px] border border-white/[.07] bg-white/[.025] sm:rounded-[24px]'
export const section = 'relative py-16 md:py-28 lg:py-[clamp(88px,7vw,120px)]'
export const lead = 'max-w-2xl text-[15px] leading-relaxed text-mist/70 md:text-[17px]'
export const textLink =
  'inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-cyan transition-colors hover:text-white'

/** Header, footer, skip link and progress line around a landing page's sections. */
export function PageShell({ children }) {
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
        <Nav ready base="/" />
        <main id="main">{children}</main>
        <Footer base="/" />
        <FloatingCta />
      </MotionConfig>
    </LazyMotion>
  )
}

/**
 * Landing-page hero: eyebrow, two-line H1 (second line in the gradient), intro,
 * WhatsApp + "See our work" buttons and a row of short facts.
 */
export function LandingHero({ eyebrow, lines, intro, waMessage, facts }) {
  return (
    <section id="top" className="relative isolate overflow-hidden pb-16 pt-32 md:pb-24 md:pt-44" aria-labelledby="page-title">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_75%_30%,rgba(0,123,255,.28),transparent_60%),radial-gradient(60%_50%_at_10%_90%,rgba(0,209,255,.12),transparent_60%)]" />
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(70%_60%_at_60%_40%,#000,transparent)]" />
        <Ribbon d={RIBBON} className="absolute inset-0 h-full w-full opacity-70" animateIn={false} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-navy" />
      </div>

      <div className="container-x">
        <p className="eyebrow flex items-center gap-3 max-[380px]:tracking-[0.2em]">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute -inset-1 rounded-full bg-cyan/25" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
          </span>
          {eyebrow}
        </p>

        <h1
          id="page-title"
          className="mt-6 max-w-5xl text-[clamp(2.1rem,10vw,3.9rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.025em] text-white lg:text-[clamp(3.2rem,5.6vw,5.6rem)]"
        >
          {lines.map((line, i) => (
            <span key={line} className="block pb-[0.07em]">
              <m.span
                className={`block ${i === 1 ? 'text-gradient' : ''}`}
                initial={{ opacity: 0.45, y: '0.28em' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: i * 0.07 }}
              >
                {line}
                {i === 0 && ' '}
              </m.span>
            </span>
          ))}
        </h1>

        <m.p
          className="mt-6 max-w-2xl text-[15px] leading-relaxed text-mist/75 md:text-[18px]"
          initial={{ opacity: 0.55, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
        >
          {intro}
        </m.p>

        <m.div
          className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
          initial={{ opacity: 0.6, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
        >
          <MagneticButton href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer">
            <WhatsApp /> Start your project
          </MagneticButton>
          <MagneticButton href="#work" variant="ghost">
            See our work <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
          </MagneticButton>
        </m.div>

        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-mist/70 md:mt-14">
          {facts.map((fact) => (
            <li key={fact} className="flex items-center gap-2.5">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-cyan/10 text-cyan" aria-hidden="true">
                <Check width="12" height="12" />
              </span>
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Portfolio section: the real projects as cards, with a page-specific note under each name. */
export function ProjectCards({ index, intro, note }) {
  return (
    <section id="work" className={section} aria-labelledby="work-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end md:gap-6">
          <SectionHeading id="work-title" index={index} label="Portfolio" lines={['Our', 'work.']} />
          <Reveal as="p" className="max-w-sm text-[15px] leading-relaxed text-mist/65">
            {intro}
          </Reveal>
        </div>

        <div className="mt-9 grid gap-4 md:mt-14 lg:grid-cols-3 lg:gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal as="article" key={p.id} delay={i * 0.08} aria-labelledby={`ks-proj-${p.id}`}>
              <div className="ring-gradient relative h-full overflow-hidden rounded-[28px] bg-gradient-to-br from-navy-soft to-navy-deep p-4 sm:p-6">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 opacity-30"
                  style={{ background: `radial-gradient(closest-side, ${p.accent}, transparent)` }}
                />
                <ProjectStage project={p} />
                <div className="relative px-1 pb-1 pt-5">
                  <p className="eyebrow">{p.category}</p>
                  <h3 id={`ks-proj-${p.id}`} className="mt-3 text-[22px] font-extrabold uppercase leading-[1.05] tracking-[-0.01em] text-white md:text-[24px]">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-mist/70">{note(p)}</p>
                  <p className="mt-3 text-[11px] font-semibold uppercase leading-relaxed tracking-[0.16em] text-mist/75">
                    <span className="sr-only">Services: </span>
                    {p.services.join(' • ')}
                  </p>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:text-cyan"
                  >
                    View project <ArrowUpRight />
                    <span className="sr-only"> — {p.domain} (opens in a new tab)</span>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <a href="/#work" className={textLink}>
            See the full portfolio <ArrowRight />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

/** Browser + phone captures of a project (same image set as the homepage portfolio). */
function ProjectStage({ project: p }) {
  const set = (kind, widths, ext) => widths.map((w) => `/work/${p.slug}-${kind}-${w}.${ext} ${w}w`).join(', ')
  const shot = (kind, widths, sizes, w, h, alt) => (
    <picture>
      <source type="image/avif" srcSet={set(kind, widths, 'avif')} sizes={sizes} />
      <img
        src={`/work/${p.slug}-${kind}-${widths[widths.length - 1]}.webp`}
        srcSet={set(kind, widths, 'webp')}
        sizes={sizes}
        alt={alt}
        width={w}
        height={h}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 block h-full w-full bg-navy-soft bg-cover bg-top object-cover object-top"
        style={{ backgroundImage: `url(${PLACEHOLDERS[`${p.slug}-${kind}`]})` }}
      />
    </picture>
  )
  return (
    <div className="relative pb-5">
      <BrowserFrame domain={p.domain} tone={p.tone} aspect="aspect-[7/4]">
        {shot('desktop', [900, 1600], '(min-width: 1280px) 360px, (min-width: 1024px) 30vw, 90vw', 1600, 913, `${p.name} website on desktop`)}
      </BrowserFrame>
      <div className="absolute bottom-0 right-3 w-[22%] max-w-[120px] sm:right-6">
        <PhoneFrame>
          {shot('mobile', [200, 390, 780], '(min-width: 1280px) 80px, (min-width: 1024px) 7vw, 20vw', 780, 1691, `${p.name} website on a phone`)}
        </PhoneFrame>
      </div>
    </div>
  )
}

