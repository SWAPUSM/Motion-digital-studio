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
    <section id="why" className="relative py-16 md:py-36" aria-labelledby="why-title">
      <div className="container-x">
        <SectionHeading id="why-title" index="05" label="Why Motion" lines={['Designed to look good.', 'Built to move business forward.']} />

        <div className="mt-9 grid gap-3 sm:grid-cols-2 sm:gap-4 md:mt-20 lg:grid-cols-4 lg:gap-5">
          {REASONS.map((r, i) => (
            <m.article
              key={r.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.9, delay: i * 0.1, ease }}
              className="group relative grid grid-cols-[auto_1fr] items-center gap-x-4 overflow-hidden rounded-[20px] border border-white/[.07] bg-white/[.025] p-4 transition-colors duration-500 hover:border-cyan/30 hover:bg-white/[.045] sm:block sm:rounded-[24px] sm:p-7 md:p-8"
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
              <div aria-hidden="true" className="absolute -right-16 -top-16 h-44 w-44 bg-[radial-gradient(closest-side,rgba(0,209,255,.2),transparent)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              <div className="relative row-span-2 grid h-12 w-12 place-items-center rounded-2xl sm:h-14 sm:w-14 border border-cyan/20 bg-gradient-to-br from-electric/20 to-cyan/5 text-cyan transition-transform duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-1 group-hover:rotate-[-4deg]">
                <Icon name={r.icon} />
              </div>
              <h3 className="relative self-end text-[15px] font-extrabold uppercase tracking-[0.02em] text-white sm:mt-10 sm:text-[17px] md:mt-14">{r.title}</h3>
              <p className="relative mt-1 self-start text-[13.5px] leading-snug text-mist/65 sm:mt-3 sm:text-[14px] sm:leading-relaxed">{r.text}</p>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  )
}
