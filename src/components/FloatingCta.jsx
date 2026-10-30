import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { WhatsApp } from './Icons.jsx'
import { whatsappLink } from '../config.js'

/** Mobile-only WhatsApp shortcut, shown between the hero and the final CTA. */
export default function FloatingCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    const contact = document.getElementById('contact')
    if (!hero || !contact) return
    const state = { hero: true, contact: false }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) state[e.target === hero ? 'hero' : 'contact'] = e.isIntersecting
      setShow(!state.hero && !state.contact)
    })
    io.observe(hero)
    io.observe(contact)
    return () => io.disconnect()
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <m.a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Start your project on WhatsApp"
          className="fixed bottom-[calc(env(safe-area-inset-bottom)+16px)] right-4 z-50 grid h-[52px] w-[52px] place-items-center rounded-full bg-gradient-to-br from-electric to-cyan text-white shadow-[0_10px_24px_-10px_rgba(0,123,255,.8)] ring-1 ring-white/15 md:hidden"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <WhatsApp width="24" height="24" />
        </m.a>
      )}
    </AnimatePresence>
  )
}
