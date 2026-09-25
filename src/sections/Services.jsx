import { m } from 'motion/react'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import { ArrowUpRight, Check, Clock } from '../components/Icons.jsx'
import { CUSTOM_WORK, PACKAGES } from '../data/content.js'
import { whatsappLink } from '../config.js'

/** Writes pointer position to CSS vars — no React re-render per mouse move. */
function trackPointer(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export default function Services() {
  return (
    <section id="services" className="relative py-16 md:py-36 lg:py-[clamp(88px,7vw,120px)]" aria-labelledby="services-title">
      <div aria-hidden="true" className="absolute inset-x-0 top-1/3 -z-10 h-[60%] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,123,255,.12),transparent)]" />
      <div className="container-x">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end md:gap-6">
          <SectionHeading id="services-title" index="02" label="Services" lines={['Choose your', 'momentum.']} />
          <Reveal as="p" className="max-w-sm text-[15px] leading-relaxed text-mist/65">
            Transparent packages, premium craft. Every website is custom-designed — never a template.
          </Reveal>
        </div>

        <div className="mt-9 grid gap-4 md:mt-20 md:gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {PACKAGES.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>

        <p className="mt-4 px-1 text-[12px] leading-relaxed text-mist/55 md:mt-5 md:text-[12.5px]">
          Delivery times begin once all required content and information have been received from the client.
        </p>

        <div className="mt-5 grid gap-4 md:mt-6 md:gap-5 lg:grid-cols-2 lg:gap-6">
          <Reveal>
            <div
              onPointerMove={trackPointer}
              className="ring-gradient group relative flex h-full flex-col gap-4 overflow-hidden rounded-[28px] bg-white/[.03] p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:p-9"
            >
              <div className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <p className="eyebrow">Website care</p>
                <p className="mt-3 text-2xl font-extrabold text-white md:text-3xl">
                  1,500 THB <span className="text-base font-medium text-mist/50">/ month</span>
                </p>
                <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-mist/65">Optional ongoing website support and small updates.</p>
              </div>
              <a
                href={whatsappLink("Hi! I'm interested in the Website Care plan.")}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex shrink-0 items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-cyan transition-colors hover:text-white"
              >
                Add Website Care <ArrowUpRight className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div
              onPointerMove={trackPointer}
              className="ring-gradient group relative flex h-full flex-col gap-4 overflow-hidden rounded-[28px] bg-white/[.03] p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:p-9"
            >
              <div className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <p className="eyebrow">Custom quote</p>
                <p className="mt-3 text-2xl font-extrabold text-white md:text-3xl">Bigger ideas.</p>
                <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-mist/65">{CUSTOM_WORK.join(' • ')}</p>
              </div>
              <a
                href={whatsappLink("Hi! I'd like a custom quote for a larger web project.")}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex shrink-0 items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-cyan transition-colors hover:text-white"
              >
                Request a quote <ArrowUpRight className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function PackageCard({ pkg, index }) {
  const featured = pkg.featured
  return (
    <m.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onPointerMove={trackPointer}
      className={`ring-gradient group relative flex flex-col overflow-hidden rounded-[28px] p-6 transition-[transform,box-shadow] duration-700 ease-[var(--ease-expo)] md:p-9 lg:hover:-translate-y-2 ${
        featured
          ? 'bg-gradient-to-b from-electric/[.18] via-navy-soft/60 to-navy-soft/30 shadow-[0_30px_100px_-30px_rgba(0,123,255,.6)]'
          : 'bg-white/[.03] hover:shadow-[0_30px_80px_-30px_rgba(0,123,255,.45)]'
      }`}
      aria-labelledby={`pkg-${pkg.id}`}
    >
      <div className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {featured && (
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 bg-[radial-gradient(closest-side,rgba(0,209,255,.2),transparent)]" />
      )}

      <div className="relative flex items-center justify-between">
        <span className="text-[11px] font-semibold tracking-[0.25em] text-white/55">0{index + 1}</span>
        {featured && (
          <span className="rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan">
            Most immersive
          </span>
        )}
      </div>

      <h3 id={`pkg-${pkg.id}`} className="relative mt-6 text-[22px] font-extrabold uppercase leading-tight tracking-[-0.01em] text-white md:mt-8 md:text-[26px]">
        {pkg.name}
      </h3>
      <p className="relative mt-3 text-[14px] leading-relaxed text-mist/65">{pkg.summary}</p>

      <p className="relative mt-6 flex items-baseline gap-2 md:mt-8">
        <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-mist/50">From</span>
        <span className={`text-[40px] font-extrabold leading-none tracking-[-0.02em] md:text-[46px] ${featured ? 'text-gradient' : 'text-white'}`}>
          {pkg.price}
        </span>
        <span className="text-[13px] font-semibold text-mist/60">THB</span>
      </p>
      {pkg.bestFor && (
        <p className="relative mt-4 text-[12.5px] leading-relaxed text-mist/60">
          <span className="mr-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan/85">Best for</span>
          {pkg.bestFor.join(' • ')}
        </p>
      )}

      <div className="relative my-6 h-px md:my-8 bg-gradient-to-r from-white/15 via-white/5 to-transparent" />

      <ul className="relative flex-1 space-y-3 md:space-y-3.5">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[14px] text-mist/80">
            <span className="mt-[1px] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-cyan/10 text-cyan">
              <Check width="12" height="12" />
            </span>
            {f}
          </li>
        ))}
      </ul>

      {pkg.delivery && (
        <p className="relative mt-7 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-white/[.07] pt-4 md:mt-8">
          <span className="flex items-center gap-2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-mist/60">
            <Clock className="text-cyan/85" />
            Estimated delivery
          </span>
          <span className="whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.08em] text-white/90">{pkg.delivery}</span>
        </p>
      )}

      <a
        href={whatsappLink(`Hi Motion Digital Studio! I'm interested in the ${pkg.name} package.`)}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative mt-5 inline-flex h-12 md:mt-6 items-center justify-center gap-2 rounded-full text-[12px] font-semibold uppercase tracking-[0.18em] transition-all duration-500 ${
          featured
            ? 'bg-gradient-to-r from-electric to-cyan text-white shadow-[0_10px_30px_-10px_rgba(0,209,255,.8)] hover:shadow-[0_14px_40px_-8px_rgba(0,209,255,.9)]'
            : 'border border-white/15 text-white hover:border-cyan/60 hover:bg-cyan/10'
        }`}
      >
        Start your project <ArrowUpRight className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </m.article>
  )
}
