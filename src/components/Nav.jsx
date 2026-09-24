import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import MagneticButton from './MagneticButton.jsx'
import { WhatsApp } from './Icons.jsx'
import { NAV_LINKS, whatsappLink } from '../config.js'

const ease = [0.16, 1, 0.3, 1]

export default function Nav({ ready }) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  // Smart header: hides after a deliberate scroll down, returns on a deliberate
  // scroll up anywhere on the page, and always shows near the top. Work is batched
  // into one rAF per frame; direction must move ≥ THRESHOLD px before the state
  // flips, so tiny Safari/momentum jitters never toggle it. Positions are clamped
  // to the real scroll range, so iOS rubber-band overscroll (negative scrollY at
  // the top, overshoot at the bottom) can't hide or show it by mistake.
  useEffect(() => {
    const TOP = 20 // always visible within this distance of the top
    const HIDE_AFTER = 64 // never hide before this point
    const THRESHOLD = 8 // px of intentional movement before changing state
    const clampY = () => {
      const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      return Math.min(Math.max(window.scrollY, 0), max)
    }
    let anchor = clampY() // where the current direction run started
    let dir = 0
    let isHidden = false
    let ticking = false

    const update = () => {
      ticking = false
      const y = clampY()
      setScrolled(y > 24)
      if (y <= TOP) {
        anchor = y
        dir = 0
        if (isHidden) setHidden((isHidden = false))
        return
      }
      const d = y > anchor ? 1 : y < anchor ? -1 : 0
      if (d !== 0 && d !== dir) {
        // direction changed: start measuring the new run from the turning point
        dir = d
        anchor = y - d // the 1px that revealed the new direction counts
        return
      }
      const travelled = Math.abs(y - anchor)
      if (travelled < THRESHOLD) return
      if (dir === 1 && !isHidden && y > HIDE_AFTER) setHidden((isHidden = true))
      else if (dir === -1 && isHidden) setHidden((isHidden = false))
      anchor = y
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      {/* outer element slides out/in on scroll (CSS transform, GPU-only);
          the inner one keeps the original entrance animation */}
      <header
        className={`fixed inset-x-0 top-0 z-[60] pt-[max(env(safe-area-inset-top),10px)] transition-transform duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none ${
          hidden && !open ? '-translate-y-[120%]' : 'translate-y-0'
        }`}
      >
        <m.div initial={{ y: -90, opacity: 0 }} animate={ready ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.8, ease }}>
        <nav
          aria-label="Main"
          className={`container-x flex items-center justify-between transition-all duration-500 ${scrolled ? 'py-2' : 'py-3 md:py-5'}`}
        >
          <div
            className={`flex w-full items-center justify-between rounded-full py-1.5 pl-1.5 pr-1.5 transition-all duration-500 md:pl-2 ${
              scrolled ? 'glass shadow-[0_10px_40px_-12px_rgba(0,0,0,.6)]' : 'border border-transparent'
            }`}
          >
            <a href="#top" className="flex min-w-0 items-center gap-2 md:gap-3">
              {/* official transparent "M" symbol, uncropped, sitting straight on the header */}
              <span className="grid h-[44px] w-[66px] shrink-0 place-items-center md:h-[52px] md:w-[78px]">
                <picture className="flex w-[84%]">
                  <source type="image/avif" srcSet="/brand/motion-mark-128.avif 128w, /brand/motion-mark-256.avif 256w" sizes="(min-width: 768px) 66px, 56px" />
                  <source type="image/webp" srcSet="/brand/motion-mark-128.webp 128w, /brand/motion-mark-256.webp 256w" sizes="(min-width: 768px) 66px, 56px" />
                  <img src="/brand/motion-mark-256.png" width="1774" height="887" alt="" decoding="async" fetchPriority="high" className="block h-auto w-full object-contain" />
                </picture>
              </span>
              <span className="flex min-w-0 flex-col leading-none">
                <span className="text-[15px] font-extrabold uppercase tracking-[0.22em] text-white md:text-[17px]">Motion</span>
                <span className="mt-1.5 text-[9.5px] font-semibold uppercase tracking-[0.3em] text-cyan md:text-[10.5px]">Digital Studio</span>
                <span className="sr-only"> — home</span>
              </span>
            </a>

            <ul className="hidden items-center gap-0.5 xl:flex">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="relative rounded-full px-3.5 py-2 text-[12px] font-medium uppercase tracking-[0.18em] text-mist/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <MagneticButton href={whatsappLink()} target="_blank" rel="noopener noreferrer" size="md">
                  <WhatsApp width="16" height="16" /> Start your project
                </MagneticButton>
              </div>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full glass xl:hidden"
              >
                <span className={`absolute h-[1.5px] w-5 bg-white transition-transform duration-500 ${open ? 'rotate-45' : '-translate-y-[4px]'}`} />
                <span className={`absolute h-[1.5px] w-5 bg-white transition-transform duration-500 ${open ? '-rotate-45' : 'translate-y-[4px]'}`} />
              </button>
            </div>
          </div>
        </nav>
        </m.div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            className="fixed inset-0 z-[55] flex flex-col overflow-y-auto bg-navy-deep/[.98] px-6 pb-[max(env(safe-area-inset-bottom),28px)] pt-[max(6rem,15svh)] xl:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 44px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="flex flex-col gap-[min(0.5rem,1svh)]">
              {NAV_LINKS.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <m.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-[min(0.5rem,1.2svh)] text-[min(2.4rem,6svh)] font-extrabold uppercase leading-[1.1] tracking-[-0.01em] text-white"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 + i * 0.06, ease }}
                  >
                    <span className="text-xs font-semibold tracking-[0.2em] text-cyan">0{i + 1}</span>
                    {l.label}
                  </m.a>
                </li>
              ))}
            </ul>
            <m.div
              className="mt-auto pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease }}
            >
              <MagneticButton href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="w-full">
                <WhatsApp /> Start your project
              </MagneticButton>
              <p className="mt-6 text-center text-[11px] uppercase tracking-[0.3em] text-mist/50">Thailand • Worldwide</p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
