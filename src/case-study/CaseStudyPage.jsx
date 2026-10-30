import { PageShell } from '../components/Landing.jsx'
import { BrowserFrame, PhoneFrame } from '../components/Devices.jsx'
import MagneticButton from '../components/MagneticButton.jsx'
import Ribbon from '../components/Ribbon.jsx'
import { ArrowRight, ArrowUpRight, WhatsApp } from '../components/Icons.jsx'
import { whatsappLink } from '../config.js'
import BeforeAfter from './BeforeAfter.jsx'
import Shot from './Shot.jsx'

const RIBBON = 'M-80 700 C 200 720, 320 300, 600 340 S 900 760, 1120 520 S 1340 140, 1560 220'

// Light "paper" sections: the client's own warm white, with Motion's deep navy text.
const paper = 'relative bg-[#f3f2ed] text-[#0b1a2c]'
const dark = 'relative'
const pad = 'py-20 md:py-28 lg:py-[clamp(110px,9vw,150px)]'

/**
 * /projects/<slug>/ — one case study in eight chapters. Chapters 01–06 present the website
 * Motion designed and built; 07 is the only before/after chapter (its later evolution).
 */
export default function CaseStudyPage({ study }) {
  return (
    <PageShell>
      <Hero study={study} />
      <Vision study={study} />
      <Design study={study} />
      <Experience study={study} />
      <Mobile study={study} />
      <Booking study={study} />
      <Evolution study={study} />
      <Explore study={study} />
    </PageShell>
  )
}

/** Chapter opener: index + label, then a two-weight editorial headline. */
function Chapter({ id, index, label, light, bold, intro, onPaper = false, stacked = false }) {
  return (
    <div className={`grid gap-6 ${stacked ? '' : 'lg:grid-cols-12 lg:gap-10'}`}>
      <p
        className={`flex items-center gap-3 self-start text-[11px] font-semibold uppercase tracking-[0.32em] ${stacked ? '' : 'lg:col-span-3 lg:pt-5'} ${
          onPaper ? 'text-[#0057b8]' : 'text-cyan'
        }`}
      >
        <span className={onPaper ? 'text-[#0b1a2c]/70' : 'text-white/60'}>{index}</span>
        <span className={`h-px w-8 ${onPaper ? 'bg-[#0b1a2c]/25' : 'bg-gradient-to-r from-cyan to-transparent'}`} aria-hidden="true" />
        {label}
      </p>
      <div className={stacked ? '' : 'lg:col-span-9'}>
        <h2
          id={id}
          className={`${stacked ? 'text-[clamp(2.1rem,7.6vw,4.2rem)]' : 'text-[clamp(2.1rem,7.6vw,5.4rem)]'} uppercase leading-[0.96] tracking-[-0.035em] ${onPaper ? 'text-[#0b1a2c]' : 'text-white'}`}
        >
          <span className="block font-light">{light}</span>
          <span className={`block font-extrabold ${onPaper ? '' : 'text-gradient'}`}>{bold}</span>
        </h2>
        {intro && (
          <p className={`mt-6 max-w-2xl text-[16px] leading-relaxed md:mt-8 md:text-[18px] ${onPaper ? 'text-[#0b1a2c]/72' : 'text-mist/72'}`}>{intro}</p>
        )}
      </div>
    </div>
  )
}

/** Numbered editorial list: hairline above each item, no cards. */
function Notes({ items, onPaper = false, cols = 'md:grid-cols-3', dense = false, titlesOnPhones = false }) {
  return (
    <ol className={`grid ${dense ? 'grid-cols-2 gap-x-5 gap-y-7' : 'gap-x-8 gap-y-8 sm:grid-cols-2'} lg:gap-x-10 ${cols}`}>
      {items.map((it, i) => (
        <li key={it.title} className={`cs-reveal border-t pt-5 ${onPaper ? 'border-[#0b1a2c]/15' : 'border-white/12'}`}>
          <span className={`text-[11px] font-semibold tracking-[0.25em] ${onPaper ? 'text-[#0057b8]' : 'text-cyan'}`} aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className={`mt-3 text-[15px] font-extrabold uppercase tracking-[0.02em] md:text-[16px] ${onPaper ? 'text-[#0b1a2c]' : 'text-white'}`}>{it.title}</h3>
          <p className={`mt-2 text-[14.5px] leading-relaxed ${titlesOnPhones ? 'max-md:hidden' : ''} ${onPaper ? 'text-[#0b1a2c]/70' : 'text-mist/65'}`}>{it.text}</p>
        </li>
      ))}
    </ol>
  )
}

function Label({ tag, children, onPaper = false }) {
  return (
    <p className={`mb-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[11px] font-semibold uppercase leading-snug tracking-[0.16em] md:tracking-[0.2em] ${onPaper ? 'text-[#0b1a2c]/70' : 'text-mist/65'}`}>
      <span className={onPaper ? 'text-[#0057b8]' : 'text-cyan'}>{tag}</span> {children}
    </p>
  )
}

// Screenshot card for phone captures on light chapters.
const screen = 'overflow-hidden rounded-[12px] border border-[#0b1a2c]/10 bg-white shadow-[0_30px_60px_-34px_rgba(11,26,44,.5)]'

/** Light panel that holds an authentic interface crop at its natural size. */
function Detail({ image, slug, alt, className = '' }) {
  return (
    <div className={`flex items-center justify-center rounded-[18px] bg-[#FAFAF7] p-4 sm:p-7 ${className}`}>
      <div className="min-w-0" style={{ width: image.w / 2, maxWidth: '100%' }}>
        <Shot slug={slug} image={image} fill={false} sizes={`${Math.round(image.w / 2)}px`} alt={alt} className="bg-transparent" />
      </div>
    </div>
  )
}

/* ── 01 · The project ──────────────────────────────────────── */
function Hero({ study: s }) {
  const img = s.images
  return (
    <section id="top" className="relative isolate overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36 lg:pt-40" aria-labelledby="page-title">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80%_55%_at_78%_58%,rgba(0,123,255,.30),transparent_62%),radial-gradient(55%_45%_at_8%_8%,rgba(0,209,255,.10),transparent_60%)]" />
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(70%_60%_at_60%_45%,#000,transparent)]" />
        <Ribbon d={RIBBON} className="absolute inset-0 h-full w-full opacity-50" animateIn={false} />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-navy" />
      </div>

      <div className="container-x">
        <nav aria-label="Breadcrumb" className="cs-in text-[11px] font-medium uppercase tracking-[0.2em] text-mist/65">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <a href="/" className="transition-colors hover:text-white">
                Home
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <a href="/#work" className="transition-colors hover:text-white">
                Work
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-mist/85">
              {s.name}
            </li>
          </ol>
        </nav>

        <p className="cs-in mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan max-[389px]:tracking-[0.18em] md:mt-14" style={{ '--d': '.05s' }}>
          <span>Case study</span>
          <span className="h-px w-8 bg-gradient-to-r from-cyan to-transparent" aria-hidden="true" />
          <span className="text-white/80">{s.category}</span>
          <span className="hidden text-mist/40 sm:inline" aria-hidden="true">
            •
          </span>
          <span className="basis-full text-mist/65 sm:basis-auto">{s.location}</span>
        </p>

        <h1 id="page-title" className="mt-6 text-white">
          <span className="cs-in block text-[clamp(2.9rem,13.2vw,10.5rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.045em]" style={{ '--d': '.1s' }}>
            Teddy Bike{' '}
            <br />
            Samui<span className="text-cyan">.</span>
          </span>
          <span
            className="cs-in text-gradient mt-5 block max-w-4xl text-[clamp(1.45rem,4.6vw,3.6rem)] font-light leading-[1.08] tracking-[-0.02em] md:mt-7"
            style={{ '--d': '.2s' }}
          >
            A complete digital experience, built from the ground up.
          </span>
        </h1>

        <div className="mt-12 grid items-end gap-10 md:mt-16 lg:grid-cols-12 lg:gap-12">
          <div className="cs-in lg:col-span-4" style={{ '--d': '.3s' }}>
            <p className="max-w-md text-[16px] leading-relaxed text-mist/75 md:text-[17px]">
              We designed and developed the Teddy Bike Samui website from the ground up — a bilingual site for a scooter and car
              rental business, with a showroom of the fleet, clear prices and deposits, and booking that opens in WhatsApp.
            </p>
            <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-6">
              {s.facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mist/60">{f.label}</dt>
                  <dd className="mt-1.5 text-[14.5px] font-semibold leading-snug text-white">{f.value}</dd>
                </div>
              ))}
            </dl>
            <a
              href="#vision"
              className="group mt-10 inline-flex min-h-[44px] items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:text-cyan"
            >
              <span className="relative h-10 w-px overflow-hidden bg-white/15" aria-hidden="true">
                <span className="animate-scroll-cue absolute inset-x-0 top-0 h-1/2 bg-cyan" />
              </span>
              Explore the case study
            </a>
          </div>

          {/* stage: the website, desktop + phone */}
          <figure className="cs-stage-in relative pb-10 max-lg:order-first sm:pb-14 lg:col-span-8 lg:pb-16">
            <BrowserFrame domain={s.domain} tone="light" aspect="aspect-[16/10]">
              <Shot
                slug={s.slug}
                image={img.afterDesktopHero}
                priority
                sizes="(min-width: 1280px) 800px, (min-width: 1024px) 62vw, 92vw"
                alt="The Teddy Bike Samui homepage on desktop: the name and a Yamaha Xmax 300 side by side, with a Book on WhatsApp button and the Google rating."
              />
            </BrowserFrame>
            <div className="absolute -bottom-2 right-3 w-[27%] max-w-[210px] sm:right-6 lg:-left-6 lg:right-auto lg:w-[24%]">
              <PhoneFrame>
                <Shot
                  slug={s.slug}
                  image={img.afterMobileHero}
                  priority
                  sizes="(min-width: 1024px) 200px, 27vw"
                  alt="The Teddy Bike Samui homepage on a phone, with the Xmax 300 above a full-width Book on WhatsApp button."
                />
              </PhoneFrame>
            </div>
            <figcaption className="sr-only">Captured from the website’s October 2026 production files.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

/* ── 02 · The vision ──────────────────────────────────────── */
function Vision({ study: s }) {
  return (
    <section id="vision" className={`${paper} ${pad}`} aria-labelledby="vision-title">
      <div className="container-x">
        <Chapter
          id="vision-title"
          index="02"
          label="The vision"
          light="Built around"
          bold="the rental."
          intro="Teddy Bike Samui rents scooters and cars in Koh Samui. The website was designed to answer a visitor’s questions in the order they come — and to make reaching the business effortless."
          onPaper
        />

        <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-10">
          <figure className="cs-reveal lg:col-span-5">
            <blockquote className="text-[clamp(1.35rem,3.4vw,2.1rem)] font-light leading-[1.25] tracking-[-0.015em] text-[#0b1a2c]">
              <span className="text-[#0057b8]">“</span>
              {s.promise}
              <span className="text-[#0057b8]">”</span>
            </blockquote>
            <figcaption className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0b1a2c]/65">
              The website’s opening line
            </figcaption>
          </figure>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0b1a2c]/65">Designed to help visitors</p>
            <Notes items={s.vision} onPaper dense cols="md:grid-cols-2" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── 03 · Design & identity ───────────────────────────────── */
function Design({ study: s }) {
  const img = s.images
  return (
    <section id="design" className={`${dark} ${pad} overflow-hidden`} aria-labelledby="design-title">
      <div aria-hidden="true" className="absolute left-[-20%] top-[20%] -z-10 h-[70%] w-[70%] bg-[radial-gradient(closest-side,rgba(0,123,255,.13),transparent)]" />
      <div className="container-x">
        <Chapter
          id="design-title"
          index="03"
          label="Design & identity"
          light="A calm"
          bold="design system."
          intro="Warm cream and sage surfaces, deep navy type, and accent colours that each do one job. Every value below comes from the website’s own stylesheet."
        />

        {/* palette */}
        <ul className="mt-12 grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-4 sm:gap-x-4 md:mt-16 lg:grid-cols-7 lg:gap-x-5" aria-label="Colour palette">
          {s.palette.map((c) => (
            <li key={c.token} className="cs-reveal">
              <span className="block aspect-square rounded-[12px] border border-white/10 sm:aspect-[3/2] sm:rounded-[14px] lg:aspect-[4/5]" style={{ background: c.hex }} aria-hidden="true" />
              <p className="mt-3 font-mono text-[12px] text-white">{c.hex}</p>
              <p className="mt-0.5 font-mono text-[11px] text-cyan/80">{c.token}</p>
              <p className="mt-1.5 text-[12.5px] leading-snug text-mist/65">{c.role}</p>
            </li>
          ))}
        </ul>

        {/* typography + logo */}
        <div className="mt-16 grid grid-cols-1 items-start gap-6 md:mt-20 lg:grid-cols-12 lg:gap-8">
          <figure className="cs-reveal lg:col-span-7">
            <Detail slug={s.slug} image={img.typography} alt="Type in the hero: the eyebrow Koh Samui · Thailand, the title Teddy Bike Samui with Samui in italic, the line Scooter & car rental in Koh Samui, and the introduction." />
            <figcaption className="mt-4 grid gap-3 sm:grid-cols-2">
              {s.type.map((t) => (
                <span key={t.name} className="block border-t border-white/12 pt-3">
                  <span className="block text-[15px] font-extrabold uppercase tracking-[0.02em] text-white">{t.name}</span>
                  <span className="mt-1 block text-[13.5px] text-mist/60">{t.role}</span>
                </span>
              ))}
            </figcaption>
          </figure>
          <figure className="cs-reveal lg:col-span-5">
            <Detail slug={s.slug} image={img.headerLogo} alt="The header: menu button, the Teddy Bike Samui logo and the wordmark Teddy Bike Samui, Bike Rental." />
            <figcaption className="mt-4 border-t border-white/12 pt-3 text-[13.5px] leading-relaxed text-mist/60">
              <span className="block text-[15px] font-extrabold uppercase tracking-[0.02em] text-white">Logo & wordmark</span>
              The client’s logo, set beside a serif wordmark in the header.
            </figcaption>
          </figure>
        </div>

        {/* interface details */}
        <div className="mt-6 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:mt-8 lg:grid-cols-12 lg:gap-8">
          <div className="grid content-start gap-6 lg:col-span-4 lg:gap-8">
            <figure className="cs-reveal">
              <Detail slug={s.slug} image={img.headerControls} alt="Header controls: an EN / FR language switch and a navy Book now button." />
              <figcaption className="mt-3 text-[13px] text-mist/65">Language switch and Book now</figcaption>
            </figure>
            <figure className="cs-reveal">
              <Detail slug={s.slug} image={img.whatsappButton} alt="The green Book on WhatsApp button." />
              <figcaption className="mt-3 text-[13px] text-mist/65">The WhatsApp action</figcaption>
            </figure>
          </div>
          <figure className="cs-reveal lg:col-span-3">
            <Detail
              slug={s.slug}
              image={img.vehiclePanel}
              alt="Showroom vehicle panel: Honda, 125cc, 01 / 08, Click 125, 250 baht a day, deposit 2,000 baht or passport in red, dots, View & book and See our scooters."
            />
            <figcaption className="mt-3 text-[13px] text-mist/65">A vehicle panel in the showroom</figcaption>
          </figure>
          <div className="sm:col-span-2 lg:col-span-5 lg:pl-4">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-mist/60">Layout principles</p>
            <Notes
              cols="sm:grid-cols-2 lg:grid-cols-1"
              dense
              items={[
                { title: 'A clear order', text: 'Eyebrow, serif title, a plain line, then the action.' },
                { title: 'Pill-shaped actions', text: 'Navy to book, green for WhatsApp.' },
                { title: 'Soft panels', text: 'Rounded corners on cards and forms.' },
                { title: 'Colour with a job', text: 'Red is kept for deposits.' },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── 04 · Website experience ──────────────────────────────── */
function Experience({ study: s }) {
  const img = s.images
  return (
    <section id="experience" className={`${paper} ${pad} overflow-hidden`} aria-labelledby="experience-title">
      <div className="container-x">
        <Chapter
          id="experience-title"
          index="04"
          label="Website experience"
          light="The whole offer,"
          bold="on one page."
          intro="One homepage carries the rental, from the first screen to the last call to WhatsApp."
          onPaper
        />

        {/* the homepage, full length */}
        <div className="mt-12 grid items-start gap-12 md:mt-16 lg:grid-cols-12 lg:gap-10">
          {/* tablets and desktops (≥ 768 px): the full homepage, scrollable inside the frame.
              Capped at 75 % of the screen height, and the wheel passes back to the page at
              either end, so the frame never traps the page scroll. */}
          <figure className="cs-reveal hidden md:block lg:col-span-8">
            <BrowserFrame domain={s.domain} tone="light" aspect="aspect-[16/10] lg:aspect-auto lg:h-[min(75svh,980px)]" className="shadow-[0_40px_80px_-40px_rgba(11,26,44,.45)]">
              <div
                tabIndex={0}
                role="region"
                aria-label="The Teddy Bike Samui homepage, full length. Scrollable."
                className="absolute inset-0 overflow-y-auto [scrollbar-width:thin]"
              >
                <Shot
                  slug={s.slug}
                  image={img.afterFull}
                  fill={false}
                  sizes="(min-width: 1280px) 820px, (min-width: 1024px) 64vw, 92vw"
                  alt="The full Teddy Bike Samui homepage: first screen, Our fleet showroom, Rental without the hassle, Activities, How it works, frequently asked questions, Google reviews, Your ride is waiting, partner and footer."
                />
              </div>
            </BrowserFrame>
            <figcaption className="mt-4 text-[13px] leading-relaxed text-[#0b1a2c]/65">
              The full homepage at 1440 px. Scroll inside the frame.
            </figcaption>
          </figure>

          {/* phones (< 768 px): no nested scrolling — the homepage told in phone-sized
              captures, readable at full width */}
          <figure className="md:hidden">
            <ol className="space-y-10">
              {s.homeMobile.map((it, i) => (
                <li key={it.title} className={`cs-reveal w-[88%] ${i % 2 ? 'ml-auto' : ''}`}>
                  <p className="mb-3 flex items-baseline gap-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0b1a2c]/70">
                    <span className="text-[#0057b8]">{it.index}</span>
                    {it.title}
                  </p>
                  <div className={screen}>
                    <Shot slug={s.slug} image={it.image} fill={false} sizes="88vw" alt={it.alt} />
                  </div>
                </li>
              ))}
            </ol>
            <figcaption className="mt-6 text-[13px] leading-relaxed text-[#0b1a2c]/65">
              The homepage on a phone, 390 px wide. Partial views end at a gap between blocks.
            </figcaption>
          </figure>
          <div className="lg:col-span-4">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0b1a2c]/65">Top to bottom</p>
            <Notes items={s.homepage} onPaper dense titlesOnPhones cols="md:grid-cols-3 lg:grid-cols-1" />
          </div>
        </div>

        {/* the showroom */}
        <div className="mt-20 grid items-center gap-10 border-t border-[#0b1a2c]/12 pt-14 md:mt-28 md:pt-20 lg:grid-cols-12 lg:gap-10">
          <figure className="cs-reveal lg:col-span-8">
            <BrowserFrame domain={s.domain} tone="light" aspect="aspect-[16/10]" className="shadow-[0_40px_80px_-40px_rgba(11,26,44,.45)]">
              <Shot
                slug={s.slug}
                image={img.afterShowroom}
                sizes="(min-width: 1280px) 820px, (min-width: 1024px) 64vw, 92vw"
                alt="The showroom on desktop: Scooters and Cars switch, Honda Click 125, 125cc, 1 of 8, 250 baht a day, deposit 2,000 baht or passport, View & book and See our scooters."
              />
            </BrowserFrame>
          </figure>
          <div className="lg:col-span-4">
            <h3 className="text-[clamp(1.6rem,4.4vw,2.4rem)] uppercase leading-[1] tracking-[-0.03em] text-[#0b1a2c]">
              <span className="block font-light">The fleet,</span>
              <span className="block font-extrabold">as a showroom.</span>
            </h3>
            <p className="mt-5 text-[15.5px] leading-relaxed text-[#0b1a2c]/72">
              Swipe or use the arrows to move from the smallest scooter to the largest; switch to cars in one tap.
            </p>
            <div className="mt-8">
              <Notes items={s.showroom} onPaper dense cols="md:grid-cols-3 lg:grid-cols-1" />
            </div>
          </div>
        </div>

        {/* under the hood */}
        <div className="mt-20 border-t border-[#0b1a2c]/12 pt-12 md:mt-28 md:pt-16">
          <h3 className="mb-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0b1a2c]/65 md:mb-10">Under the hood</h3>
          <Notes items={s.craft} onPaper dense />
          <p className="mt-8 max-w-3xl text-[13px] leading-relaxed text-[#0b1a2c]/65">
            Implementation work documented in the website’s production package and test reports — not performance measurements.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ── 05 · Mobile experience ───────────────────────────────── */
function Mobile({ study: s }) {
  const img = s.images
  const phone = '(min-width: 1024px) 260px, 42vw'
  return (
    <section id="mobile" className={`${dark} ${pad} overflow-hidden`} aria-labelledby="mobile-title">
      <div aria-hidden="true" className="absolute right-[-20%] top-[10%] -z-10 h-[80%] w-[80%] bg-[radial-gradient(closest-side,rgba(0,123,255,.16),transparent)]" />
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Chapter id="mobile-title" index="05" label="Mobile experience" light="Made for the" bold="phone in hand." stacked />
          <div className="mt-12 md:mt-14">
            <Notes items={s.mobile} cols="md:grid-cols-1 lg:grid-cols-1" />
          </div>
        </div>

        <div className="relative mx-auto grid w-full max-w-[560px] grid-cols-2 gap-5 sm:gap-8 lg:col-span-6">
          <figure className="cs-reveal">
            <PhoneFrame>
              <Shot slug={s.slug} image={img.afterMobileShowroom} sizes={phone} alt="The showroom on a phone: Honda Click 125, 250 baht a day, deposit 2,000 baht or passport, View & book." />
            </PhoneFrame>
            <figcaption className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-mist/65">Showroom</figcaption>
          </figure>
          <figure className="cs-reveal mt-16 sm:mt-24">
            <PhoneFrame>
              <Shot slug={s.slug} image={img.afterMobileMenu} sizes={phone} alt="The menu on a phone: Home, Our scooters, Our cars, Documents & driving in Thailand, Activities, Good spots, FAQ, Contact us." />
            </PhoneFrame>
            <figcaption className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-mist/65">Menu</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

/* ── 06 · Booking journey ─────────────────────────────────── */
function Booking({ study: s }) {
  return (
    <section id="booking" className={`${paper} ${pad}`} aria-labelledby="booking-title">
      <div className="container-x">
        <Chapter
          id="booking-title"
          index="06"
          label="Booking journey"
          light="From a vehicle"
          bold="to a WhatsApp message."
          intro="Every vehicle page ends with a short request form. The website takes no payment and confirms nothing on its own: the request opens in WhatsApp, written and ready to send, and the business replies to confirm availability. Payment happens at delivery."
          onPaper
        />

        <div className="mt-12 grid items-center gap-12 md:mt-16 lg:grid-cols-12 lg:gap-10">
          <figure className="cs-reveal lg:col-span-7">
            <Label tag="Vehicle page" onPaper>
              Book this vehicle — Yamaha Xmax 300
            </Label>
            <BrowserFrame domain={s.domain} tone="light" aspect="aspect-[16/10]" className="shadow-[0_40px_80px_-40px_rgba(11,26,44,.45)]">
              <Shot
                slug={s.slug}
                image={s.images.afterBooking}
                sizes="(min-width: 1280px) 700px, (min-width: 1024px) 56vw, 92vw"
                alt="Booking form on the Xmax 300 page: name, start and end dates, where you are staying, an optional message, Send request on WhatsApp, and No WhatsApp? Send by email."
              />
            </BrowserFrame>
          </figure>
          <div className="lg:col-span-5">
            <Notes items={s.booking} onPaper cols="md:grid-cols-1 lg:grid-cols-1" />
          </div>
        </div>

        <div className="mt-16 grid items-center gap-10 md:mt-24 lg:grid-cols-12 lg:gap-10">
          <div className="lg:order-last lg:col-span-7">
            <figure className="cs-reveal">
              <Label tag="Contact page" onPaper>
                Every channel in one place
              </Label>
              <BrowserFrame domain={s.domain} tone="light" aspect="aspect-[16/10]" className="shadow-[0_40px_80px_-40px_rgba(11,26,44,.45)]">
                <Shot
                  slug={s.slug}
                  image={s.images.afterContact}
                  sizes="(min-width: 1280px) 700px, (min-width: 1024px) 56vw, 92vw"
                  alt="Contact page: WhatsApp, Email, Facebook, Instagram and TikTok cards, and Open every day from 9am to 7pm, Koh Samui, Thailand."
                />
              </BrowserFrame>
            </figure>
          </div>
          <div className="lg:col-span-5">
            <h3 className="text-[clamp(1.6rem,4.4vw,2.4rem)] uppercase leading-[1] tracking-[-0.03em] text-[#0b1a2c]">
              <span className="block font-light">Every way</span>
              <span className="block font-extrabold">to get in touch.</span>
            </h3>
            <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-[#0b1a2c]/72">
              WhatsApp first, then email, Facebook, Instagram and TikTok — with the opening hours: every day, 9am to 7pm.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── 07 · The evolution (the only before/after chapter) ───── */
function Evolution({ study: s }) {
  const img = s.images
  const caption =
    'Historical versions, rendered from archived source files on 23 October 2026 at identical viewport sizes: the original website (production files of July 2026) and the later version (production package approved in October 2026). Not captures of the live site.'
  return (
    <section id="evolution" className={`${dark} ${pad} overflow-hidden bg-navy-deep`} aria-labelledby="evolution-title">
      <div className="container-x">
        <Chapter
          id="evolution-title"
          index="07"
          label="The evolution"
          light="Built first."
          bold="Then evolved."
          intro="Motion designed and built the original website, then returned to it: the same identity, the same promise and the same WhatsApp booking, with a new first screen and a showroom in place of two category cards."
        />

        <div className="mt-12 grid items-start gap-14 md:mt-16 lg:grid-cols-12 lg:gap-10">
          <BeforeAfter
            className="lg:col-span-8"
            slug={s.slug}
            domain={s.domain}
            before={img.beforeDesktopHero}
            after={img.afterDesktopHero}
            beforeAlt="Original homepage, desktop: centred title and Book on WhatsApp button, no vehicle shown."
            afterAlt="Later homepage, desktop: title on the left, Yamaha Xmax 300 on the right, Google rating under the button."
            sizes="(min-width: 1280px) 800px, (min-width: 1024px) 64vw, 92vw"
            label="Desktop · 1440 × 900"
            caption={caption}
          />
          <BeforeAfter
            className="mx-auto w-full max-w-[300px] lg:col-span-4 lg:max-w-[290px]"
            slug={s.slug}
            frame="phone"
            before={img.beforeMobileHero}
            after={img.afterMobileHero}
            beforeAlt="Original homepage on a phone: title, promise and Book on WhatsApp button, text only."
            afterAlt="Later homepage on a phone: the Xmax 300 under the title, then a full-width Book on WhatsApp button and the Google rating."
            sizes="(min-width: 1024px) 290px, 300px"
            label="Mobile · 390 × 844"
            caption="Same capture conditions, on a phone-sized screen."
          />
        </div>

        <div className="mt-14 grid items-start gap-12 md:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Notes items={s.heroChanges} dense cols="md:grid-cols-3" />
          </div>
          {/* vehicle discovery, compact */}
          <figure className="cs-reveal flex items-start gap-4 sm:gap-6 lg:col-span-5">
            {[
              ['Before', img.beforeMobileChooseRide, 'Original Choose your ride section on a phone: a Scooters card and a Cars card, one above the other.'],
              ['After', img.afterMobileShowroom, 'Later showroom on a phone: one vehicle with its price, deposit and View & book.'],
            ].map(([tag, image, alt]) => (
              <div key={tag} className="w-[27%] max-w-[120px] shrink-0">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan">{tag}</p>
                <div className="overflow-hidden rounded-[8px] border border-white/10">
                  <Shot slug={s.slug} image={image} fill={false} sizes="120px" alt={alt} />
                </div>
              </div>
            ))}
            <figcaption className="flex-1 text-[14px] leading-relaxed text-mist/65">
              <span className="mb-2 block text-[15px] font-extrabold uppercase tracking-[0.02em] text-white">Vehicle discovery</span>
              On a phone, two category cards filled about one and a half screens. The showroom puts a vehicle, its price, its deposit
              and the next step on one.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

/* ── 08 · Explore the website ─────────────────────────────── */
// The conclusion, then the studio: creating websites from the ground up.
function Explore({ study: s }) {
  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32 lg:py-[clamp(130px,10vw,170px)]" aria-labelledby="explore-title">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan to-transparent" />
        <div className="absolute left-1/2 top-[-40%] h-[90%] w-[110%] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(0,123,255,.22),transparent)]" />
      </div>
      <div className="container-x">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan">
          <span className="text-white/60">08</span>
          <span className="h-px w-8 bg-gradient-to-r from-cyan to-transparent" aria-hidden="true" />
          Explore the website
        </p>
        <div className="mt-6 grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-10">
          <h2 id="explore-title" className="text-[clamp(2.6rem,11vw,8.5rem)] uppercase leading-[0.9] tracking-[-0.045em] text-white lg:col-span-7">
            <span className="block font-light">See it</span>
            <span className="text-gradient block font-extrabold">live.</span>
          </h2>
          <div className="lg:col-span-5 lg:pb-3">
            <p className="max-w-md text-[16px] leading-relaxed text-mist/75 md:text-[18px]">
              A complete website for a rental business — the fleet, the details and the way to book — designed and developed by
              Motion Digital Studio.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
              <MagneticButton href={s.url} target="_blank" rel="noopener noreferrer">
                <span className="sm:hidden">Visit the website</span>
                <span className="hidden sm:inline">Visit {s.domain}</span> <ArrowUpRight />
                <span className="sr-only"> {s.domain} (opens in a new tab)</span>
              </MagneticButton>
              <a
                href="/#work"
                className="inline-flex min-h-[44px] items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-mist/75 transition-colors hover:text-white"
              >
                Back to the portfolio <ArrowRight />
              </a>
            </div>
          </div>
        </div>

        {/* from this project to the studio */}
        <div className="mt-20 grid grid-cols-1 items-end gap-8 border-t border-white/10 pt-10 md:mt-28 md:pt-14 lg:grid-cols-12 lg:gap-10">
          <h3 className="text-[clamp(1.9rem,6.4vw,4rem)] uppercase leading-[0.98] tracking-[-0.035em] text-white lg:col-span-7">
            <span className="block font-light">Your website,</span>
            <span className="block font-extrabold">from the ground up.</span>
          </h3>
          <div className="lg:col-span-5">
            <p className="max-w-md text-[15px] leading-relaxed text-mist/70 md:text-[17px]">
              Motion Digital Studio designs and develops distinctive websites for businesses in Koh Samui, across Thailand and
              worldwide.
            </p>
            <div className="mt-7">
              <MagneticButton
                href={whatsappLink(`Hi Motion Digital Studio! I just read the ${s.name} case study and I'd like to talk about a website.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsApp width="18" height="18" /> Start your project
                <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
