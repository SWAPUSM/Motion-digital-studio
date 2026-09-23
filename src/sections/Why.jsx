import { m } from 'motion/react'
import SectionHeading from '../components/SectionHeading.jsx'
import { REASONS } from '../data/content.js'

const ease = [0.16, 1, 0.3, 1]

// Line icons drawn on as they enter the viewport
const ICONS = {
  design: ['M4 20l4-1 11-11-3-3L5 16l-1 4Z', 'M14 6l3 3', 'M4 4h6M4 8h3'],
  mobile: ['M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z', 'M11 18h2'],
  speed: ['M4 16a8 8 0 1 1 16 0', 'M12 16l4-5', 'M4 20h16'],
  business: ['M3 20h18', 'M6 16V11M11 16V7M16 16v-4M21 4l-5 5-3-3-4 4'],
}

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name].map((d, i) => (
        <m.path
          key={d}
          d={d}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.3 + i * 0.2, ease }}
        />
      ))}
    </svg>
  )
}

export default function Why() {
  return (
    <section id="why" className="relative py-24 md:py-36" aria-labelledby="why-title">
      <div className="container-x">
        <SectionHeading id="why-title" index="04" label="Why Motion" lines={['Designed to look good.', 'Built to move business forward.']} />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-20 lg:grid-cols-4 lg:gap-5">
          {REASONS.map((r, i) => (
            <m.article
              key={r.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.9, delay: i * 0.1, ease }}
              className="group relative overflow-hidden rounded-[24px] border border-white/[.07] bg-white/[.025] p-7 transition-colors duration-500 hover:border-cyan/30 hover:bg-white/[.045] md:p-8"
            >
              {/* progress sweep along the top edge */}
              <m.span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-electric via-cyan to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, delay: 0.2 + i * 0.15, ease }}
              />
              <div aria-hidden="true" className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan/0 blur-2xl transition-colors duration-700 group-hover:bg-cyan/20" />
              <div className="relative grid h-14 w-14 place-items-center rounded-2xl border border-cyan/20 bg-gradient-to-br from-electric/20 to-cyan/5 text-cyan transition-transform duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-1 group-hover:rotate-[-4deg]">
                <Icon name={r.icon} />
              </div>
              <h3 className="relative mt-10 text-[17px] font-extrabold uppercase tracking-[0.02em] text-white md:mt-14">{r.title}</h3>
              <p className="relative mt-3 text-[14px] leading-relaxed text-mist/65">{r.text}</p>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  )
}
