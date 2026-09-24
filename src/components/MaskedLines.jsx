import { m } from 'motion/react'

const ease = [0.16, 1, 0.3, 1]

/**
 * Headline whose lines rise out of a mask when the heading enters the viewport.
 * The in-view trigger lives on the heading itself — the masked spans are clipped,
 * so they can't be observed directly.
 */
export default function MaskedLines({ lines, as = 'h2', id, className = '', accentLast = true, delay = 0 }) {
  const Tag = m[as]
  return (
    <Tag id={id} className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-8% 0px' }}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.06em]">
          <m.span
            className={`block ${accentLast && i === lines.length - 1 ? 'text-gradient' : ''}`}
            variants={{
              hidden: { y: '105%' },
              show: { y: 0, transition: { duration: 0.85, delay: delay + i * 0.08, ease } },
            }}
          >
            {line}
            {i < lines.length - 1 && ' '}
          </m.span>
        </span>
      ))}
    </Tag>
  )
}
