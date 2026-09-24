import { m, useScroll, useTransform } from 'motion/react'
import { BrowserFrame, PhoneFrame } from './Devices.jsx'
import PLACEHOLDERS from '../data/placeholders.json'
import { useMediaQuery } from '../hooks/useMediaQuery.js'

const ease = [0.16, 1, 0.3, 1]

/*
 * Hero device showcase: real work by Motion Digital Studio — Samui Property 360 —
 * on desktop (browser) and mobile (phone). The screenshots are the same generated
 * assets the portfolio uses (public/work/<slug>-{desktop,mobile}-*.{avif,webp});
 * change SHOWCASE to feature a different project.
 */
const SHOWCASE = { slug: 'samui-property-360', domain: 'samuiproperty360.com', name: 'Samui Property 360' }

const SHOT = {
  desktop: { widths: [900, 1600], w: 1600, h: 913 },
  mobile: { widths: [390, 780], w: 780, h: 1691 },
}

function Shot({ kind, sizes }) {
  const { slug, name } = SHOWCASE
  const { widths, w, h } = SHOT[kind]
  const set = (ext) => widths.map((x) => `/work/${slug}-${kind}-${x}.${ext} ${x}w`).join(', ')
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <img
        src={`/work/${slug}-${kind}-${widths[0]}.webp`}
        srcSet={set('webp')}
        sizes={sizes}
        alt={`${name} website on ${kind === 'desktop' ? 'desktop' : 'a phone'}`}
        width={w}
        height={h}
        decoding="async"
        className="absolute inset-0 block h-full w-full bg-navy-soft bg-cover bg-top object-cover object-top"
        style={{ backgroundImage: `url(${PLACEHOLDERS[`${slug}-${kind}`]})` }}
      />
    </picture>
  )
}

/* ── Floating workspace cards ─────────────────────────────────────────────
 * Decorative glimpses of Motion's design & build process. Deliberately abstract:
 * no numbers, statistics, results or client names. */

function DesignSystemCard() {
  return (
    <div className="glass rounded-2xl p-[8%] shadow-[0_16px_40px_-18px_rgba(0,0,0,.8)]">
      <p className="text-[clamp(6.5px,0.72vw,9px)] font-semibold uppercase tracking-[0.25em] text-mist/60">Design system</p>
      <div className="mt-[7%] flex gap-[5%]">
        {['#061424', '#007BFF', '#00D1FF', '#E2E8F0'].map((c) => (
          <span key={c} className="aspect-square flex-1 rounded-[22%] ring-1 ring-white/10" style={{ background: c }} />
        ))}
      </div>
      <div className="mt-[8%] flex items-end gap-[6%]">
        <span className="text-[clamp(13px,1.9vw,24px)] font-bold leading-none text-white">Aa</span>
        <span className="mb-[3%] flex-1 space-y-[6%]">
          <span className="block h-[3px] w-full rounded bg-white/25" />
          <span className="block h-[3px] w-2/3 rounded bg-white/15" />
        </span>
      </div>
      <div className="mt-[8%] flex items-center justify-between">
        <span className="h-[clamp(8px,1vw,13px)] w-[46%] rounded-full bg-gradient-to-r from-electric to-cyan" />
        <span className="relative h-[clamp(8px,1vw,13px)] w-[22%] rounded-full bg-cyan/30">
          <span className="absolute right-[8%] top-1/2 aspect-square h-[70%] -translate-y-1/2 rounded-full bg-white" />
        </span>
      </div>
    </div>
  )
}

function ResponsiveCard() {
  return (
    <div className="glass rounded-2xl p-[8%] shadow-[0_16px_40px_-18px_rgba(0,0,0,.8)]">
      <p className="text-[clamp(6.5px,0.72vw,9px)] font-semibold uppercase tracking-[0.25em] text-mist/60">Responsive</p>
      <div className="mt-[9%] flex items-end justify-between gap-[5%]">
        {[
          ['w-[46%] aspect-[16/10]', 'rounded-[4px]'],
          ['w-[26%] aspect-[3/4]', 'rounded-[4px]'],
          ['w-[15%] aspect-[9/19]', 'rounded-[5px]'],
        ].map(([size, r], i) => (
          <span key={i} className={`${size} ${r} relative border border-cyan/40 bg-cyan/[.06] p-[6%]`}>
            <span className="block h-[18%] w-full rounded-sm bg-cyan/40" />
            <span className="mt-[10%] block h-[8%] w-3/4 rounded-sm bg-white/20" />
            <span className="mt-[8%] block h-[8%] w-1/2 rounded-sm bg-white/15" />
          </span>
        ))}
      </div>
    </div>
  )
}

function BuildCard() {
  const lines = [
    ['w-[18%] bg-electric/80', 'w-[40%] bg-white/25'],
    ['ml-[10%] w-[26%] bg-cyan/70', 'w-[30%] bg-white/15'],
    ['ml-[10%] w-[34%] bg-white/25', 'w-[16%] bg-cyan/50'],
    ['w-[14%] bg-electric/80'],
  ]
  return (
    <div className="glass rounded-2xl p-[7%] shadow-[0_20px_44px_-18px_rgba(0,0,0,.85)]">
      <p className="flex items-center gap-1.5 text-[clamp(6.5px,0.72vw,9px)] font-semibold uppercase tracking-[0.25em] text-cyan">
        <span className="font-mono tracking-normal">&lt;/&gt;</span> Development
      </p>
      <div className="mt-[7%] grid grid-cols-[1.25fr_1fr] items-end gap-[7%]">
        <div className="space-y-[9%]">
          {lines.map((row, i) => (
            <div key={i} className="flex gap-[6%]">
              {row.map((c, j) => (
                <span key={j} className={`h-[3px] rounded ${c}`} />
              ))}
            </div>
          ))}
        </div>
        <svg viewBox="0 0 60 34" className="w-full" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="build-curve" x1="0" x2="1">
              <stop offset="0" stopColor="#007BFF" />
              <stop offset="1" stopColor="#00D1FF" />
            </linearGradient>
            <linearGradient id="build-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#00D1FF" stopOpacity=".25" />
              <stop offset="1" stopColor="#00D1FF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M2 30 C 12 28, 16 22, 26 21 S 40 12, 58 4 L58 34 L2 34 Z" fill="url(#build-fill)" />
          <path d="M2 30 C 12 28, 16 22, 26 21 S 40 12, 58 4" stroke="url(#build-curve)" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="58" cy="4" r="2.4" fill="#E6FBFF" />
        </svg>
      </div>
    </div>
  )
}

/**
 * A layered digital workspace in the existing 3D stage: the real Samui Property 360
 * site on desktop (dominant) and mobile, with small process cards at different
 * depths. Every layer floats on its own slow rhythm, and on scroll the layers
 * drift at slightly different speeds (background slower, foreground faster).
 * Phones get a flatter composition with two cards; large screens get three.
 */
export default function HeroShowcase({ ready, tilt, reduce, rotateX, rotateY, stageY, stageScale, pauseRef }) {
  // Scroll parallax per depth (px across the first ~700px of scroll). Small on purpose.
  const { scrollY } = useScroll()
  const isLg = useMediaQuery('(min-width: 1024px)')
  const depth = (px) => (reduce ? 0 : px)
  const yBack = useTransform(scrollY, [0, 700], [0, depth(42)], { clamp: true })
  const yMid = useTransform(scrollY, [0, 700], [0, depth(16)], { clamp: true })
  const yPhone = useTransform(scrollY, [0, 700], [0, depth(-26)], { clamp: true })
  const yFront = useTransform(scrollY, [0, 700], [0, depth(-48)], { clamp: true })

  return (
    <m.div
      ref={pauseRef}
      style={{ y: stageY, scale: stageScale }}
      className="relative mx-auto aspect-[10/8.2] w-full max-w-[560px] [perspective:1600px] sm:max-w-[620px] lg:aspect-[4/3] lg:max-w-none"
      initial={{ opacity: 0 }}
      animate={ready ? { opacity: 1 } : {}}
      transition={{ duration: 1.1, ease, delay: 0.25 }}
      aria-hidden="true"
    >
      <m.div
        className={`absolute inset-0 [transform-style:preserve-3d] ${tilt || reduce ? '' : 'animate-sway-soft'}`}
        style={tilt ? { rotateX, rotateY } : reduce ? { rotateX: 5, rotateY: -6 } : undefined}
      >
        {/* depth glow */}
        <div className="absolute inset-0 bg-[radial-gradient(closest-side,rgba(0,123,255,.38),transparent)] [transform:translateZ(-160px)]" />

        {/* back: design system, peeking out behind the browser's top-left corner */}
        <Layer z={isLg ? -120 : -50} y={yBack} float="drift" delay={0.55} ready={ready} className="left-[2%] top-[-6%] w-[34%] lg:left-[-4%] lg:top-[-9%] lg:w-[27%]">
          <DesignSystemCard />
        </Layer>

        {/* middle: the real website on desktop — the dominant element */}
        <Layer z={0} float="slow" delay={0.4} ready={ready} className="left-[4%] top-[18%] w-[85%] lg:left-[1%] lg:top-[16%] lg:w-[92%]">
          <BrowserFrame domain={SHOWCASE.domain} tone="dark" aspect="aspect-[7/4]">
            <Shot kind="desktop" sizes="(min-width: 1024px) 46vw, 86vw" />
          </BrowserFrame>
          <div className="absolute -bottom-8 left-[5%] right-[5%] h-16 bg-[radial-gradient(closest-side,rgba(0,123,255,.4),transparent)]" />
        </Layer>

        {/* middle-front (large screens): responsive card between browser and phone */}
        <Layer z={45} y={yMid} float="b" delay={0.7} ready={ready} className="right-[-4%] top-[5%] hidden w-[22%] lg:block">
          <ResponsiveCard />
        </Layer>

        {/* front: the same site on mobile, overlapping the browser's corner */}
        <Layer z={90} y={yPhone} float="a" delay={0.65} ready={ready} className="right-[1%] top-[35%] w-[24%] lg:right-[-2%] lg:top-[33%] lg:w-[23%]">
          <PhoneFrame>
            <Shot kind="mobile" sizes="(min-width: 1024px) 12vw, 24vw" />
          </PhoneFrame>
        </Layer>

        {/* foreground edge: development card over the browser's bottom-left corner */}
        <Layer z={150} y={yFront} float="tilt" delay={0.85} ready={ready} className="bottom-[1%] left-[6%] w-[35%] lg:bottom-[2%] lg:left-[-5%] lg:w-[32%]">
          <BuildCard />
        </Layer>
      </m.div>
    </m.div>
  )
}

const FLOAT = { a: 'animate-float-a', b: 'animate-float-b', slow: 'animate-float-slow', drift: 'animate-drift', tilt: 'animate-float-tilt' }

function Layer({ z, y, className, children, delay, ready, float }) {
  return (
    <m.div
      className={`absolute ${className}`}
      style={{ transformStyle: 'preserve-3d', z }}
      initial={{ opacity: 0, y: 40 }}
      animate={ready ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.3, ease, delay }}
    >
      <m.div style={y ? { y } : undefined}>
        <div className={FLOAT[float] || ''}>{children}</div>
      </m.div>
    </m.div>
  )
}
