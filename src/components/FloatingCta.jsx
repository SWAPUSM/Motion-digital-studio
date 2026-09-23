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
          rel="noopener"
          aria-label="Start your project on WhatsApp"
          className="fixed bottom-[max(env(safe-area-inset-bottom),18px)] right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-electric to-cyan text-white shadow-[0_12px_40px_-8px_rgba(0,123,255,.9)] md:hidden"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
          <WhatsApp width="24" height="24" />
        </m.a>
      )}
    </AnimatePresence>
  )
}
