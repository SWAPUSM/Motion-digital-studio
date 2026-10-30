import { usePauseOffscreen } from '../hooks/usePauseOffscreen.js'
import { INDUSTRIES } from '../data/content.js'

/** The industries we work for, as a slow marquee (paused off-screen). Shown in Why Motion. */
export default function IndustriesMarquee() {
  const pauseRef = usePauseOffscreen()
  const row = [...INDUSTRIES, ...INDUSTRIES]
  return (
    <div ref={pauseRef} className="overflow-hidden">
      <div className="relative mt-10 border-y border-white/[.07] py-5 md:mt-16 md:py-8 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <ul className="sr-only">
          {INDUSTRIES.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <div aria-hidden="true" className="animate-marquee flex w-max items-center">
          {row.map((x, i) => (
            <span key={i} className="flex items-center whitespace-nowrap text-[clamp(1.4rem,4vw,2.6rem)] font-extrabold uppercase tracking-[-0.01em]">
              <span className={i % 2 ? 'text-white/40' : 'text-white/85'}>{x}</span>
              <span className="mx-6 text-cyan md:mx-10">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
