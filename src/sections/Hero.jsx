import { useRef } from 'react'
import { m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { useFinePointer } from '../hooks/useMediaQuery.js'
import MagneticButton from '../components/MagneticButton.jsx'
import Ribbon from '../components/Ribbon.jsx'
import Particles from '../components/Particles.jsx'
import { BrowserFrame, PhoneFrame } from '../components/Devices.jsx'
import { AuroraDesktop, AuroraMobile } from '../components/Mockups.jsx'
import { ArrowRight, WhatsApp } from '../components/Icons.jsx'
import { whatsappLink } from '../config.js'

const ease = [0.16, 1, 0.3, 1]
const LINES = ['Websites that', 'move business', 'forward.']
const RIBBON = 'M-80 640 C 180 660, 300 250, 560 300 S 820 700, 1040 460 S 1300 90, 1540 170'

export default function Hero({ ready }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const fine = useFinePointer()
  const tilt = fine && !reduce

  // Cursor-driven perspective (desktop only)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const spring = { stiffness: 90, damping: 18, mass: 0.6 }
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-20, -4]), spring)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [12, 2]), spring)
  const glowX = useSpring(useTransform(px, [-0.5, 0.5], ['30%', '70%']), spring)
  const glowY = useSpring(useTransform(py, [-0.5, 0.5], ['30%', '70%']), spring)

  const onMove = (e) => {
    if (!tilt) return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }

  // Scroll: the stage drifts forward, copy lifts away
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 110])
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.92])

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onMove}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pb-10 pt-24 md:pt-32 lg:pb-10"
      aria-labelledby="hero-title"
    >
      {/* Atmosphere */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_75%_30%,rgba(0,123,255,.28),transparent_60%),radial-gradient(60%_50%_at_10%_90%,rgba(0,209,255,.12),transparent_60%)]" />
        <m.div
          className="absolute h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,209,255,.16),transparent_60%)]"
          style={{ left: tilt ? glowX : '70%', top: tilt ? glowY : '40%' }}
        />
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(70%_60%_at_60%_40%,#000,transparent)]" />
        <Particles className="absolute inset-0 h-full w-full" density={fine ? 1 : 0.5} />
        {ready && <Ribbon d={RIBBON} className="absolute inset-0 h-full w-full opacity-90" delay={0.3} />}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-navy" />
        <div className="noise absolute inset-0" />
      </div>

      <div className="container-x grid flex-1 items-center gap-6 sm:gap-12 lg:grid-cols-[1.08fr_1fr] lg:gap-6">
        {/* Copy */}
        <m.div style={{ y: copyY, opacity: copyOpacity }} className="relative z-10">
          <m.p
            className="eyebrow flex items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease, delay: 0.05 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan [animation:pulse-ring_2s_ease-out_infinite]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            Motion Digital Studio
          </m.p>

          <h1
            id="hero-title"
            className="mt-6 text-[clamp(1.85rem,9.1vw,3.9rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.025em] text-white lg:text-[clamp(3.2rem,4.9vw,5.1rem)]"
          >
            {LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.07em]">
                <m.span
                  className={`block ${i === 2 ? 'text-gradient' : ''}`}
                  initial={{ y: '108%' }}
                  animate={ready ? { y: 0 } : {}}
                  transition={{ duration: 1.1, ease, delay: 0.12 + i * 0.12 }}
                >
                  {line}
                  {i === 2 && (
                    <m.span
                      aria-hidden="true"
                      className="ml-3 inline-block h-[0.1em] w-[1.6em] translate-y-[-0.28em] rounded-full bg-gradient-to-r from-cyan to-transparent align-middle"
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={ready ? { scaleX: 1 } : {}}
                      transition={{ duration: 1.2, ease, delay: 0.9 }}
                    />
                  )}
                </m.span>
              </span>
            ))}
          </h1>

          <m.p
            className="mt-5 max-w-[34rem] text-[15px] leading-relaxed text-mist/75 md:text-[17px]"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease, delay: 0.55 }}
          >
            Modern, high-performance websites designed to turn visitors into customers and businesses into stronger brands.
          </m.p>

          <m.div
            className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease, delay: 0.7 }}
          >
            <MagneticButton href={whatsappLink()} target="_blank" rel="noopener">
              <WhatsApp /> Start your project
            </MagneticButton>
            <MagneticButton href="#work" variant="ghost">
              View our work <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
            </MagneticButton>
          </m.div>
        </m.div>

        {/* 3D stage */}
        <m.div
          style={{ y: stageY, scale: stageScale }}
          className="relative mx-auto aspect-[4/3.1] w-full max-w-[640px] [perspective:1600px] sm:aspect-[4/3] lg:max-w-none"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 1.4, ease, delay: 0.35 }}
          aria-hidden="true"
        >
          <m.div
            className={`absolute inset-0 [transform-style:preserve-3d] ${tilt || reduce ? '' : 'animate-sway'}`}
            style={tilt ? { rotateX, rotateY } : reduce ? { rotateX: 8, rotateY: -12 } : undefined}
          >
            {/* depth glow */}
            <div className="absolute inset-[8%] rounded-[40px] bg-[radial-gradient(closest-side,rgba(0,123,255,.45),transparent)] blur-2xl [transform:translateZ(-160px)]" />

            {/* design-system card (back) */}
            <Layer z={-80} className="left-[-4%] top-[-3%] w-[34%]" delay={0.55} ready={ready} float="b">
              <div className="glass rounded-2xl p-[6%] shadow-2xl">
                <p className="text-[clamp(7px,1.1vw,10px)] font-semibold uppercase tracking-[0.25em] text-mist/60">Design system</p>
                <div className="mt-3 flex gap-1.5">
                  {['#061424', '#007BFF', '#00D1FF', '#E2E8F0'].map((c) => (
                    <span key={c} className="aspect-square flex-1 rounded-md ring-1 ring-white/10" style={{ background: c }} />
                  ))}
                </div>
                <p className="mt-3 text-[clamp(16px,3vw,30px)] font-bold leading-none text-white">Aa</p>
                <div className="mt-2 h-1 w-3/4 rounded bg-white/15" />
                <div className="mt-1.5 h-1 w-1/2 rounded bg-white/10" />
              </div>
            </Layer>

            {/* main browser */}
            <Layer z={0} className="left-[6%] top-[14%] w-[86%]" delay={0.4} ready={ready}>
              <BrowserFrame domain="aurora-villas.com">
                <AuroraDesktop />
              </BrowserFrame>
              <div className="absolute -bottom-6 left-[10%] right-[10%] h-10 rounded-full bg-electric/40 blur-2xl" />
            </Layer>

            {/* phone (front) */}
            <Layer z={110} className="right-[-1%] top-[30%] w-[25%]" delay={0.7} ready={ready} float="a">
              <PhoneFrame>
                <AuroraMobile />
              </PhoneFrame>
            </Layer>

            {/* status chip (front) */}
            <Layer z={160} className="bottom-[4%] left-[-1%] w-[42%]" delay={0.85} ready={ready} float="b">
              <div className="glass flex items-center gap-3 rounded-2xl p-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,.8)] md:p-4">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-electric to-cyan md:h-10 md:w-10">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                    <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 text-[clamp(7px,1.1vw,10px)] font-semibold uppercase tracking-[0.2em] text-cyan">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" /> Live
                  </p>
                  <svg viewBox="0 0 120 28" className="mt-1 h-5 w-full md:h-6" fill="none">
                    <defs>
                      <linearGradient id="spark" x1="0" x2="1">
                        <stop offset="0" stopColor="#007BFF" />
                        <stop offset="1" stopColor="#00D1FF" />
                      </linearGradient>
                    </defs>
                    <m.path
                      d="M2 24 C 20 22, 26 18, 40 19 S 60 12, 72 13 S 96 6, 118 3"
                      stroke="url(#spark)"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={ready ? { pathLength: 1 } : {}}
                      transition={{ duration: 1.6, ease, delay: 1.2 }}
                    />
                  </svg>
                </div>
              </div>
            </Layer>
          </m.div>
        </m.div>
      </div>

      {/* scroll cue */}
      <m.a
        href="#intro"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-mist/50 transition-colors hover:text-white lg:flex"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.4, duration: 1 }}
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <span className="animate-scroll-cue absolute inset-0 bg-gradient-to-b from-cyan to-electric" />
        </span>
      </m.a>
    </section>
  )
}

function Layer({ z, className, children, delay, ready, float }) {
  return (
    <m.div
      className={`absolute ${className}`}
      style={{ transformStyle: 'preserve-3d', z }}
      initial={{ opacity: 0, y: 40 }}
      animate={ready ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.3, ease, delay }}
    >
      <div className={float === 'a' ? 'animate-float-a' : float === 'b' ? 'animate-float-b' : ''}>{children}</div>
    </m.div>
  )
}
