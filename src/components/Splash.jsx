import { useEffect, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import Logo from './Logo.jsx'

const KEY = 'mds-intro-seen'
const PUSH = { duration: 0.95, ease: [0.22, 1, 0.36, 1] } // soft, slow at the end

function alreadySeen() {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

/**
 * Brand intro, played once per visit: the logo settles in, then the camera
 * "pushes in" through it — the logo scales toward the viewer and fades while
 * the site fades in behind. Transform + opacity only, so it stays on the GPU
 * (smooth on iPhone, no repaint flicker).
 */
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
    const t = setTimeout(() => setVisible(false), reduce ? 350 : 1300)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          key="splash"
          className="pointer-events-none fixed inset-0 z-[90] grid place-items-center overflow-hidden"
          aria-hidden="true"
        >
          {/* backdrop fades out to reveal the site behind */}
          <m.div
            className="absolute inset-0 bg-[#000817]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.75, delay: 0.15, ease: [0.4, 0, 0.2, 1] } }}
          />
          <m.div
            className="relative w-[min(78vw,520px)] [backface-visibility:hidden] [will-change:transform,opacity]"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }}
            exit={{
              scale: 4.2,
              opacity: 0,
              // the logo is gone before the backdrop thins, so its edges never show
              transition: { scale: PUSH, opacity: { duration: 0.5, ease: [0.4, 0, 0.6, 1] } },
            }}
          >
            <Logo priority sizes="(max-width: 640px) 78vw, 520px" alt="" />
          </m.div>
          <m.div
            className="absolute bottom-[12vh] h-px w-40 origin-left bg-gradient-to-r from-electric to-cyan"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1, transition: { duration: 1.2, ease: [0.65, 0, 0.35, 1] } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          />
        </m.div>
      )}
    </AnimatePresence>
  )
}
