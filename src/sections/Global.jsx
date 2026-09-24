import { m } from 'motion/react'
import Reveal from '../components/Reveal.jsx'
import MaskedLines from '../components/MaskedLines.jsx'
import { INDUSTRIES } from '../data/content.js'

const ease = [0.16, 1, 0.3, 1]

// Destinations on the globe face (in a 400×400 viewBox), connected from Thailand
const TH = [262, 214]
const DESTS = [
  [118, 130],
  [150, 250],
  [330, 300],
  [300, 110],
  [70, 200],
]

function arc([x1, y1], [x2, y2]) {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2 - Math.hypot(x2 - x1, y2 - y1) * 0.35
  return `M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`
}

function Globe() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="globe-fill" cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#0b3b73" stopOpacity=".7" />
          <stop offset=".6" stopColor="#061a33" stopOpacity=".5" />
          <stop offset="1" stopColor="#061424" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="arc-g" x1="0" x2="1">
          <stop offset="0" stopColor="#00D1FF" />
          <stop offset="1" stopColor="#007BFF" />
        </linearGradient>
        <clipPath id="globe-clip">
          <circle cx="200" cy="200" r="170" />
        </clipPath>
      </defs>
      <circle cx="200" cy="200" r="170" fill="url(#globe-fill)" stroke="rgba(0,209,255,.35)" strokeWidth="1" />
      <g clipPath="url(#globe-clip)" stroke="rgba(226,232,240,.12)" fill="none" strokeWidth=".8">
        {[-120, -80, -40, 0, 40, 80, 120].map((y) => (
          <ellipse key={y} cx="200" cy={200 + y} rx={Math.sqrt(170 ** 2 - y ** 2)} ry={Math.sqrt(170 ** 2 - y ** 2) * 0.16} />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <ellipse
            key={i}
            cx="200"
            cy="200"
            rx="170"
            ry="170"
            style={{ transformOrigin: '200px 200px', animation: `meridian 18s linear ${-i * 3}s infinite` }}
          />
        ))}
      </g>
      {DESTS.map((d, i) => (
        <g key={i}>
          <m.path
            d={arc(TH, d)}
            fill="none"
            stroke="url(#arc-g)"
            strokeWidth="1.3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.4 + i * 0.18, ease }}
          />
          <path d={arc(TH, d)} fill="none" stroke="#E6FBFF" strokeWidth="1.6" strokeDasharray="3 37" style={{ animation: `dash ${3 + i * 0.4}s linear infinite` }} />
          <circle cx={d[0]} cy={d[1]} r="3" fill="#00D1FF" />
        </g>
      ))}
      <g>
        <circle cx={TH[0]} cy={TH[1]} r="6" fill="#00D1FF" style={{ transformOrigin: `${TH[0]}px ${TH[1]}px`, animation: 'pulse-ring 2.4s ease-out infinite' }} />
        <circle cx={TH[0]} cy={TH[1]} r="5" fill="#fff" stroke="#00D1FF" strokeWidth="2" />
      </g>
    </svg>
  )
}

export default function Global() {
  const row = [...INDUSTRIES, ...INDUSTRIES]
  return (
    <section id="global" className="relative overflow-hidden py-16 md:py-36" aria-labelledby="global-title">
      <div className="container-x grid items-center gap-6 md:gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="eyebrow flex items-center gap-3">
            <span className="text-white/55">07</span>
            <span className="h-px w-8 bg-gradient-to-r from-cyan to-transparent" aria-hidden="true" />
            Global reach
          </p>
          <MaskedLines id="global-title" lines={['Based in Thailand.', 'Building worldwide.']} className="mt-6 text-[clamp(2rem,8.4vw,5.2rem)] font-extrabold uppercase leading-[1] tracking-[-0.025em] text-white" />
          <Reveal as="p" delay={0.2} className="mt-6 max-w-md text-[15px] leading-relaxed text-mist/65 md:text-[17px]">
            Our studio is in Thailand. Our clients are everywhere. Wherever your business is, we design for the customers you want to
            reach.
          </Reveal>
        </div>
        <Reveal delay={0.1} className="relative mx-auto aspect-square w-full max-w-[340px] md:max-w-[460px]">
          <div aria-hidden="true" className="absolute inset-[10%] rounded-full bg-electric/25 blur-3xl" />
          <Globe />
          <span className="absolute left-[47%] top-[58%] rounded-full border border-cyan/30 bg-navy/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan backdrop-blur">
            Thailand
          </span>
        </Reveal>
      </div>

      {/* industries marquee */}
      <div className="relative mt-10 border-y border-white/[.07] py-5 md:mt-24 md:py-8 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
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
    </section>
  )
}
