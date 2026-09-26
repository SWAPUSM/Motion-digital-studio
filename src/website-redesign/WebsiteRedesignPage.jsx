import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import { ArrowRight, Check } from '../components/Icons.jsx'
import { LandingHero, PageShell, ProjectCards, card, lead, section, textLink } from '../components/Landing.jsx'
import { PricingPlans } from '../sections/Services.jsx'
import Faq from '../sections/Faq.jsx'
import FinalCta from '../sections/FinalCta.jsx'
import { RD_FAQS, RD_INCLUDES, RD_KEEP, RD_PROJECT_NOTES, RD_SIGNS, RD_STEPS } from '../data/redesign.js'

/** /website-redesign/ — redesigning an existing website, for businesses in any industry. */
export default function WebsiteRedesignPage() {
  return (
    <PageShell>
      <LandingHero
        eyebrow="Thailand & worldwide"
        lines={['Website', 'Redesign']}
        intro={
          <>
            Your business has moved on. Your website should too. Motion Digital Studio redesigns existing websites into modern,
            high-performance sites that present your business clearly on every screen — for businesses in Thailand and
            worldwide.
          </>
        }
        waMessage="Hi Motion Digital Studio! I'd like to redesign my website."
        facts={['Every website custom-designed', 'Mobile-first design', 'From 8,000 THB']}
      />
      <Signs />
      <Includes />
      <Keep />
      <Steps />
      <Pricing />
      <ProjectCards index="06" intro="Websites designed and built by Motion Digital Studio." note={(p) => RD_PROJECT_NOTES[p.id]} />
      <Faq items={RD_FAQS} index="07" />
      <FinalCta />
    </PageShell>
  )
}

function Signs() {
  return (
    <section id="signs" className={section} aria-labelledby="signs-title">
      <div className="container-x">
        <SectionHeading id="signs-title" index="01" label="Redesign" lines={['When is it time', 'to redesign?']} />
        <Reveal as="p" className={`mt-6 md:mt-8 ${lead}`}>
          A website doesn’t have to be broken to hold a business back. A redesign is worth considering when:
        </Reveal>

        <ul className="mt-9 grid gap-3 sm:grid-cols-2 sm:gap-4 md:mt-14 lg:grid-cols-3 lg:gap-5">
          {RD_SIGNS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={(i % 3) * 0.06} className={`${card} p-5 sm:p-6`}>
              <h3 className="text-[15px] font-extrabold uppercase tracking-[0.02em] text-white sm:text-[16px]">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-mist/65">{s.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Includes() {
  return (
    <section id="includes" className={section} aria-labelledby="includes-title">
      <div aria-hidden="true" className="absolute inset-x-0 top-1/3 -z-10 h-[60%] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,123,255,.12),transparent)]" />
      <div className="container-x">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end md:gap-6">
          <SectionHeading id="includes-title" index="02" label="Included" lines={['What your new', 'website includes.']} />
          <Reveal as="p" className="max-w-sm text-[15px] leading-relaxed text-mist/65">
            A redesign is a new, custom-designed website, built to the same standards as every project we deliver.
          </Reveal>
        </div>

        <ul className="mt-9 grid gap-3 sm:grid-cols-2 sm:gap-4 md:mt-14 lg:grid-cols-3 lg:gap-5">
          {RD_INCLUDES.map((s, i) => (
            <Reveal as="li" key={s.title} delay={(i % 3) * 0.06} className={`${card} flex gap-4 p-5 sm:p-6`}>
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
      </div>
    </section>
  )
}

function Keep() {
  return (
    <section id="keep" className={section} aria-labelledby="keep-title">
      <div className="container-x">
        <SectionHeading id="keep-title" index="03" label="Continuity" lines={['What you', 'keep.']} />

        <ul className="mt-9 grid gap-3 sm:gap-4 md:mt-14 lg:grid-cols-3 lg:gap-5">
          {RD_KEEP.map((k, i) => (
            <Reveal as="li" key={k.title} delay={i * 0.06} className={`${card} p-5 sm:p-7`}>
              <h3 className="text-[15px] font-extrabold uppercase tracking-[0.02em] text-white sm:text-[17px]">{k.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-mist/65">{k.text}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal as="p" className="mt-8 max-w-3xl text-[14px] leading-relaxed text-mist/60">
          Complex content migrations and significant SEO migrations are quoted separately. No one can guarantee that existing
          Google rankings are preserved.
        </Reveal>
      </div>
    </section>
  )
}

function Steps() {
  return (
    <section id="how" className={section} aria-labelledby="how-title">
      <div className="container-x">
        <SectionHeading id="how-title" index="04" label="Process" lines={['How a redesign', 'works.']} />
        <Reveal as="p" className={`mt-6 md:mt-8 ${lead}`}>
          Whether your current website runs on WordPress, Wix or another platform, we rebuild it with our own development
          workflow.
        </Reveal>

        <ol className="mt-9 grid gap-3 sm:grid-cols-2 sm:gap-4 md:mt-14 lg:grid-cols-4 lg:gap-5">
          {RD_STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.06} className={`${card} p-5 sm:p-7`}>
              <span className="text-[11px] font-semibold tracking-[0.25em] text-cyan" aria-hidden="true">
                0{i + 1}
              </span>
              <h3 className="mt-4 text-[15px] font-extrabold uppercase tracking-[0.02em] text-white sm:text-[17px]">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-mist/65">{s.text}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-[14px] leading-relaxed text-mist/60">
            Payment: 50% to start, 50% before launch. Delivery times begin once all required content and information have been
            received.
          </p>
          <a href="/#process" className={`${textLink} shrink-0`}>
            See our full process <ArrowRight />
          </a>
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
            A redesign uses the same packages as any new website. Choose the one that fits your project.
          </Reveal>
        </div>
        <PricingPlans />
      </div>
    </section>
  )
}
