import { useEffect, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import Logo from './Logo.jsx'

const KEY = 'mds-intro-seen'

function alreadySeen() {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

/** Short cinematic brand reveal. Plays once per session. */
export default function Splash({ onDone }) {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(() => !alreadySeen())

  useEffect(() => {
    if (!visible) {
      onDone()
      return
    }
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* storage unavailable — fine */
    }
    const t = setTimeout(() => setVisible(false), reduce ? 350 : 1500)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          key="splash"
          className="fixed inset-0 z-[90] grid place-items-center bg-[#000817]"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <m.div
            className="w-[min(78vw,520px)]"
            initial={{ opacity: 0, scale: 0.94, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Logo priority sizes="(max-width: 640px) 78vw, 520px" alt="" />
          </m.div>
          <m.div
            className="absolute bottom-[12vh] h-px w-40 origin-left bg-gradient-to-r from-electric to-cyan"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1] }}
          />
        </m.div>
      )}
    </AnimatePresence>
  )
}
