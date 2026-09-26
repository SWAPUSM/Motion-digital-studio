import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import { ArrowRight, Check } from '../components/Icons.jsx'
import { LandingHero, PageShell, ProjectCards, card, lead, section, textLink } from '../components/Landing.jsx'
import { PricingPlans } from '../sections/Services.jsx'
import Faq from '../sections/Faq.jsx'
import FinalCta from '../sections/FinalCta.jsx'
import { KS_BUSINESSES, KS_FAQS, KS_PROJECT_NOTES, KS_REASONS, KS_SERVICES } from '../data/kohSamui.js'

/** /web-design-koh-samui/ — the Koh Samui web design page, in the site's own visual language. */
export default function KohSamuiPage() {
  return (
    <PageShell>
      <LandingHero
        eyebrow="Koh Samui, Thailand"
        lines={['Web design', 'in Koh Samui']}
        intro={
          <>
            Motion Digital Studio creates modern, high-performance websites for businesses in Koh Samui. We are based on the
            island, so we can work directly with local businesses — from villas and restaurants to tours and real estate.
          </>
        }
        waMessage="Hi Motion Digital Studio! I'd like a website for my business in Koh Samui."
        facts={['Based in Koh Samui', 'Mobile-first design', 'From 8,000 THB']}
      />
      <Businesses />
      <Services />
      <Reasons />
      <ProjectCards
        index="04"
        intro="Real websites for real businesses — two of them here in Koh Samui."
        note={(p) => KS_PROJECT_NOTES[p.id]}
      />
      <Pricing />
      <Faq items={KS_FAQS} index="06" />
      <FinalCta />
    </PageShell>
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
