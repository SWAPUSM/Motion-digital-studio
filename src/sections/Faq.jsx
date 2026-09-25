import { useId, useState } from 'react'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import { WhatsApp } from '../components/Icons.jsx'
import { FAQS } from '../data/content.js'
import { whatsappLink } from '../config.js'

export default function Faq() {
  const [open, setOpen] = useState(-1)
  const uid = useId()

  return (
    <section id="faq" className="relative py-16 md:py-24 lg:py-[clamp(72px,5.5vw,96px)]" aria-labelledby="faq-title">
      <div className="container-x grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div>
          <SectionHeading id="faq-title" index="08" label="FAQ" lines={['Questions,', 'answered.']} />
          <Reveal as="p" className="mt-5 max-w-sm text-[15px] leading-relaxed text-mist/70 md:mt-6">
            Something else on your mind?{' '}
            <a
              href={whatsappLink('Hi Motion Digital Studio! I have a question about a website project.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-cyan underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              <WhatsApp width="15" height="15" /> Ask us on WhatsApp
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="ring-gradient overflow-hidden rounded-[24px] bg-white/[.03]">
            {FAQS.map((f, i) => {
              const isOpen = open === i
              const qid = `${uid}-q${i}`
              const aid = `${uid}-a${i}`
              return (
                <div key={f.q} className={i > 0 ? 'border-t border-white/[.07]' : ''}>
                  <h3>
                    <button
                      type="button"
                      id={qid}
                      aria-expanded={isOpen}
                      aria-controls={aid}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="group flex min-h-[60px] w-full items-center justify-between gap-5 px-5 py-4 text-left transition-colors duration-500 hover:bg-white/[.03] md:px-7 md:py-5"
                    >
                      <span className={`text-[13.5px] font-bold uppercase tracking-[0.06em] transition-colors duration-500 md:text-[14.5px] ${isOpen ? 'text-cyan' : 'text-white'}`}>
                        {f.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`relative grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-[var(--ease-expo)] ${
                          isOpen ? 'rotate-45 border-cyan bg-cyan/10 text-cyan' : 'border-white/15 text-white group-hover:border-cyan/60'
                        }`}
                      >
                        <span className="absolute h-px w-3 bg-current" />
                        <span className="absolute h-3 w-px bg-current" />
                      </span>
                    </button>
                  </h3>
                  {/* grid-rows 0fr → 1fr animates to the content's natural height, no JS measuring */}
                  <div
                    id={aid}
                    role="region"
                    aria-labelledby={qid}
                    inert={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-expo)] ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl px-5 pb-5 text-[14px] leading-relaxed text-mist/75 md:px-7 md:pb-6 md:text-[15px]">{f.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
