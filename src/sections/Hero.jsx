import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { useFinePointer } from '../hooks/useMediaQuery.js'
import { usePauseOffscreen } from '../hooks/usePauseOffscreen.js'
import MagneticButton from '../components/MagneticButton.jsx'
import Ribbon from '../components/Ribbon.jsx'
import HeroShowcase from '../components/HeroShowcase.jsx'
import { ArrowRight, WhatsApp } from '../components/Icons.jsx'
import { whatsappLink } from '../config.js'

const ease = [0.16, 1, 0.3, 1]
const LINES = ['Websites that', 'move business', 'forward.']
const RIBBON = 'M-80 640 C 180 660, 300 250, 560 300 S 820 700, 1040 460 S 1300 90, 1540 170'

export default function Hero({ ready }) {
  // decorative loops in the hero (stage sway, scroll cue) pause once it's off-screen
  const pauseRef = usePauseOffscreen()
  const reduce = useReducedMotion()
  const fine = useFinePointer()
  const tilt = fine && !reduce

  // Cursor-driven perspective (desktop only)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const spring = { stiffness: 90, damping: 18, mass: 0.6 }
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-20, -4]), spring)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [12, 2]), spring)

  const onMove = (e) => {
    if (!tilt) return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <m.section
      id="top"
      ref={pauseRef}
      onPointerMove={onMove}
      initial={{ scale: 1.06 }}
      animate={ready ? { scale: 1 } : {}}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pb-10 pt-24 md:pt-32 lg:pb-10"
      aria-labelledby="hero-title"
    >
      {/* Atmosphere */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_75%_30%,rgba(0,123,255,.28),transparent_60%),radial-gradient(60%_50%_at_10%_90%,rgba(0,209,255,.12),transparent_60%)]" />
        <div className="absolute left-[70%] top-[40%] h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,209,255,.16),transparent_60%)]" />
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(70%_60%_at_60%_40%,#000,transparent)]" />
        {ready && <Ribbon d={RIBBON} className="absolute inset-0 h-full w-full opacity-90" delay={0.3} animateIn={!reduce} />}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-navy" />
      </div>

      <div className="container-x grid flex-1 items-center gap-6 sm:gap-12 lg:grid-cols-[1.08fr_1fr] lg:gap-6">
        {/* Copy */}
        <div className="relative z-10">
          <m.p
            className="eyebrow flex items-center gap-3 max-[380px]:tracking-[0.2em]"
            initial={{ opacity: 0.5, y: 8 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute -inset-1 rounded-full bg-cyan/25" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            Premium web design studio
          </m.p>

          <h1
            id="hero-title"
            className="mt-6 text-[clamp(1.85rem,9.1vw,3.9rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.025em] text-white lg:text-[clamp(3.2rem,4.9vw,5.1rem)]"
          >
            {/* The message is legible from the first frame: lines lift and brighten
                into place rather than rising from behind a mask. */}
            {LINES.map((line, i) => (
              <span key={line} className="block pb-[0.07em]">
                <m.span
                  className={`block ${i === 2 ? 'text-gradient' : ''}`}
                  initial={{ opacity: 0.45, y: '0.28em' }}
                  animate={ready ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, ease, delay: i * 0.07 }}
                >
                  {line}
                  {i < LINES.length - 1 && ' '}
                  {i === 2 && (
                    <m.span
                      aria-hidden="true"
                      className="ml-3 inline-block h-[0.1em] w-[1.6em] translate-y-[-0.28em] rounded-full bg-gradient-to-r from-cyan to-transparent align-middle"
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={ready ? { scaleX: 1 } : {}}
                      transition={{ duration: 1, ease, delay: 0.45 }}
                    />
                  )}
                </m.span>
              </span>
            ))}
          </h1>

          <m.p
            className="mt-5 max-w-[34rem] text-[15px] leading-relaxed text-mist/75 md:text-[17px]"
            initial={{ opacity: 0.55, y: 10 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
          >
            Modern, high-performance websites designed to turn visitors into customers and businesses into stronger brands.
          </m.p>

          <m.div
            className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4"
            initial={{ opacity: 0.6, y: 10 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
          >
            <MagneticButton href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <WhatsApp /> Start your project
            </MagneticButton>
            <MagneticButton href="#work" variant="ghost">
              View our work <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
            </MagneticButton>
          </m.div>
        </div>

        {/* device showcase: real work (Samui Property 360) on desktop + mobile */}
        <HeroShowcase
          ready={ready}
          tilt={tilt}
          reduce={reduce}
          rotateX={rotateX}
          rotateY={rotateY}
        />
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
          <span className="animate-scroll-cue absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-transparent via-cyan to-transparent" />
        </span>
      </m.a>
    </m.section>
  )
}
