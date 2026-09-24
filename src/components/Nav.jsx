import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import Logo from './Logo.jsx'
import MagneticButton from './MagneticButton.jsx'
import { WhatsApp } from './Icons.jsx'
import { NAV_LINKS, whatsappLink } from '../config.js'

const ease = [0.16, 1, 0.3, 1]

export default function Nav({ ready }) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > 480 && y > last + 4)
      if (y < last - 4) setHidden(false)
      last = y
    }
    onScroll()
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
      <m.header
        className="fixed inset-x-0 top-0 z-[60] pt-[max(env(safe-area-inset-top),10px)]"
        initial={{ y: -90, opacity: 0 }}
        animate={ready ? { y: hidden && !open ? -110 : 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease }}
      >
        <nav
          aria-label="Main"
          className={`container-x flex items-center justify-between transition-all duration-500 ${scrolled ? 'py-2' : 'py-3 md:py-5'}`}
        >
          <div
            className={`flex w-full items-center justify-between rounded-full py-1.5 pl-1.5 pr-1.5 transition-all duration-500 md:pl-2 ${
              scrolled ? 'glass shadow-[0_10px_40px_-12px_rgba(0,0,0,.6)]' : 'border border-transparent'
            }`}
          >
            <a href="#top" className="flex min-w-0 items-center gap-3 md:gap-4" aria-label="Motion Digital Studio — home">
              <span className="block w-[66px] shrink-0 overflow-hidden rounded-[14px] ring-1 ring-white/10 md:w-[78px]">
                <Logo priority sizes="80px" alt="" />
              </span>
              <span className="flex min-w-0 flex-col leading-none" aria-hidden="true">
                <span className="text-[15px] font-extrabold uppercase tracking-[0.22em] text-white md:text-[17px]">Motion</span>
                <span className="mt-1.5 text-[9.5px] font-semibold uppercase tracking-[0.3em] text-cyan md:text-[10.5px]">Digital Studio</span>
              </span>
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="relative rounded-full px-4 py-2 text-[12px] font-medium uppercase tracking-[0.18em] text-mist/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <MagneticButton href={whatsappLink()} target="_blank" rel="noopener" size="md">
                  <WhatsApp width="16" height="16" /> Start your project
                </MagneticButton>
              </div>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full glass lg:hidden"
              >
                <span className={`absolute h-[1.5px] w-5 bg-white transition-transform duration-500 ${open ? 'rotate-45' : '-translate-y-[4px]'}`} />
                <span className={`absolute h-[1.5px] w-5 bg-white transition-transform duration-500 ${open ? '-rotate-45' : 'translate-y-[4px]'}`} />
              </button>
            </div>
          </div>
        </nav>
      </m.header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            className="fixed inset-0 z-[55] flex flex-col bg-navy-deep/95 px-6 pb-10 pt-32 backdrop-blur-xl lg:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 44px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <m.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-2 text-[2.4rem] font-extrabold uppercase tracking-[-0.01em] text-white"
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
              className="mt-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease }}
            >
              <MagneticButton href={whatsappLink()} target="_blank" rel="noopener" className="w-full">
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
