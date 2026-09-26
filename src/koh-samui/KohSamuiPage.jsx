import { LazyMotion, MotionConfig, domAnimation, m } from 'motion/react'
import Nav from '../components/Nav.jsx'
import ScrollProgress from '../components/ScrollProgress.jsx'
import FloatingCta from '../components/FloatingCta.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import MagneticButton from '../components/MagneticButton.jsx'
import Ribbon from '../components/Ribbon.jsx'
import { BrowserFrame, PhoneFrame } from '../components/Devices.jsx'
import { ArrowRight, ArrowUpRight, Check, WhatsApp } from '../components/Icons.jsx'
import { PricingPlans } from '../sections/Services.jsx'
import Faq from '../sections/Faq.jsx'
import FinalCta from '../sections/FinalCta.jsx'
import Footer from '../sections/Footer.jsx'
import { PROJECTS } from '../data/content.js'
import { KS_BUSINESSES, KS_FAQS, KS_PROJECT_NOTES, KS_REASONS, KS_SERVICES } from '../data/kohSamui.js'
import PLACEHOLDERS from '../data/placeholders.json'
import { whatsappLink } from '../config.js'

const ease = [0.16, 1, 0.3, 1]
const RIBBON = 'M-80 640 C 180 660, 300 250, 560 300 S 820 700, 1040 460 S 1300 90, 1540 170'
const WA_MESSAGE = "Hi Motion Digital Studio! I'd like a website for my business in Koh Samui."

const card = 'rounded-[20px] border border-white/[.07] bg-white/[.025] sm:rounded-[24px]'
const section = 'relative py-16 md:py-28 lg:py-[clamp(88px,7vw,120px)]'
const lead = 'max-w-2xl text-[15px] leading-relaxed text-mist/70 md:text-[17px]'
const textLink =
  'inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-cyan transition-colors hover:text-white'

/** /web-design-koh-samui/ — the Koh Samui web design page, in the site's own visual language. */
export default function KohSamuiPage() {
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
        <main id="main">
          <Hero />
          <Businesses />
          <Services />
          <Reasons />
          <Work />
          <Pricing />
          <Faq items={KS_FAQS} index="06" />
          <FinalCta />
        </main>
        <Footer base="/" />
        <FloatingCta />
      </MotionConfig>
    </LazyMotion>
  )
}

function Hero() {
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
          Koh Samui, Thailand
        </p>

        <h1
          id="page-title"
          className="mt-6 max-w-5xl text-[clamp(2.1rem,10vw,3.9rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.025em] text-white lg:text-[clamp(3.2rem,5.6vw,5.6rem)]"
        >
          {['Web design', 'in Koh Samui'].map((line, i) => (
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
          Motion Digital Studio creates modern, high-performance websites for businesses in Koh Samui. We are based on the
          island, so we can work directly with local businesses — from villas and restaurants to tours and real estate.
        </m.p>

        <m.div
          className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
          initial={{ opacity: 0.6, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
        >
          <MagneticButton href={whatsappLink(WA_MESSAGE)} target="_blank" rel="noopener noreferrer">
            <WhatsApp /> Start your project
          </MagneticButton>
          <MagneticButton href="#work" variant="ghost">
            See our work <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
          </MagneticButton>
        </m.div>

        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-mist/70 md:mt-14">
          {['Based in Koh Samui', 'Mobile-first design', 'From 8,000 THB'].map((fact) => (
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

function Businesses() {
  return (
    <section id="businesses" className={section} aria-labelledby="businesses-title">
      <div className="container-x">
        <SectionHeading id="businesses-title" index="01" label="Koh Samui" lines={['Websites built for', 'businesses in Koh Samui.']} />
        <Reveal as="p" className={`mt-6 md:mt-8 ${lead}`}>
          On an island where so many businesses depend on visitors, your website is often the first impression — and the place
          where people decide whether to message you or keep scrolling. A professional website presents your business clearly,
          works on every phone and makes it easy to get in touch.
        </Reveal>

        <ul className="mt-9 grid gap-3 sm:grid-cols-2 sm:gap-4 md:mt-14 lg:grid-cols-4 lg:gap-5">
          {KS_BUSINESSES.map((b, i) => (
            <Reveal as="li" key={b.title} delay={(i % 4) * 0.06} className={`${card} p-5 sm:p-6`}>
              <h3 className="text-[15px] font-extrabold uppercase tracking-[0.02em] text-white sm:text-[16px]">{b.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-mist/65">{b.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className={section} aria-labelledby="services-title">
      <div aria-hidden="true" className="absolute inset-x-0 top-1/3 -z-10 h-[60%] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,123,255,.12),transparent)]" />
      <div className="container-x">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end md:gap-6">
          <SectionHeading id="services-title" index="02" label="Services" lines={['What we', 'build.']} />
          <Reveal as="p" className="max-w-sm text-[15px] leading-relaxed text-mist/65">
            Custom-designed websites — never a template — built to load fast and look right on every screen.
          </Reveal>
        </div>

        <ul className="mt-9 grid gap-3 sm:grid-cols-2 sm:gap-4 md:mt-14 lg:grid-cols-4 lg:gap-5">
          {KS_SERVICES.map((s, i) => (
            <Reveal as="li" key={s.title} delay={(i % 4) * 0.06} className={`${card} flex gap-4 p-5 sm:p-6`}>
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cyan/10 text-cyan" aria-hidden="true">
                <Check width="13" height="13" />
              </span>
              <div>
                <h3 className="text-[15px] font-extrabold uppercase tracking-[0.02em] text-white sm:text-[16px]">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-mist/65">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-8">
          <a href="#pricing" className={textLink}>
            Compare the packages <ArrowRight />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

function Reasons() {
  return (
    <section id="why" className={section} aria-labelledby="why-title">
      <div className="container-x">
        <SectionHeading id="why-title" index="03" label="Why local" lines={['Why work with a web', 'designer in Koh Samui?']} />

        <ol className="mt-9 grid gap-3 sm:grid-cols-2 sm:gap-4 md:mt-14 lg:grid-cols-3 lg:gap-5">
          {KS_REASONS.map((r, i) => (
            <Reveal as="li" key={r.title} delay={(i % 3) * 0.06} className={`${card} p-5 sm:p-7`}>
              <span className="text-[11px] font-semibold tracking-[0.25em] text-cyan" aria-hidden="true">
                0{i + 1}
              </span>
              <h3 className="mt-4 text-[15px] font-extrabold uppercase tracking-[0.02em] text-white sm:text-[17px]">{r.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-mist/65">{r.text}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal as="p" className="mt-8 text-[14px] leading-relaxed text-mist/60">
          Curious how a project runs?{' '}
          <a href="/#process" className="font-semibold text-cyan underline-offset-4 transition-colors hover:text-white hover:underline">
            See our process from idea to launch
          </a>
          .
        </Reveal>
      </div>
    </section>
  )
}

function Work() {
  return (
    <section id="work" className={section} aria-labelledby="work-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end md:gap-6">
          <SectionHeading id="work-title" index="04" label="Portfolio" lines={['Our', 'work.']} />
          <Reveal as="p" className="max-w-sm text-[15px] leading-relaxed text-mist/65">
            Real websites for real businesses — two of them here in Koh Samui.
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
                  <p className="mt-3 text-[14px] leading-relaxed text-mist/70">{KS_PROJECT_NOTES[p.id]}</p>
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

function Pricing() {
  return (
    <section id="pricing" className={section} aria-labelledby="pricing-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end md:gap-6">
          <SectionHeading id="pricing-title" index="05" label="Pricing" lines={['Transparent', 'pricing.']} />
          <Reveal as="p" className="max-w-sm text-[15px] leading-relaxed text-mist/65">
            The same packages for every client, on the island or abroad. Prices in Thai baht.
          </Reveal>
        </div>
        <PricingPlans />
      </div>
    </section>
  )
}
