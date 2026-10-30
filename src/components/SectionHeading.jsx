import { m } from 'motion/react'
import MaskedLines from './MaskedLines.jsx'

const ease = [0.16, 1, 0.3, 1]

/** Eyebrow + multi-line headline (light lines, heavy last line) with a masked line-by-line reveal. */
export default function SectionHeading({ id, index, label, lines, accentLast = true, align = 'left', className = '', as = 'h2' }) {
  const center = align === 'center'
  return (
    <div className={`${center ? 'text-center' : ''} ${className}`}>
      <m.p
        className={`eyebrow flex items-center gap-3 ${center ? 'justify-center' : ''}`}
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.8, ease }}
      >
        <span className="text-white/70">{index}</span>
        <span className="h-px w-8 bg-gradient-to-r from-cyan to-transparent" aria-hidden="true" />
        {label}
      </m.p>
      <MaskedLines
        as={as}
        id={id}
        lines={lines}
        accentLast={accentLast}
        editorial
        className="mt-5 text-[clamp(1.9rem,7.6vw,4.6rem)] uppercase leading-[0.98] tracking-[-0.035em] text-white md:mt-7"
      />
    </div>
  )
}
