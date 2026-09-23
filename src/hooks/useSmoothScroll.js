import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Inertial smooth scrolling for mouse/trackpad users only.
 * Touch devices keep native scrolling (it is already smooth and more reliable on iOS).
 */
export function useSmoothScroll(enabled) {
  useEffect(() => {
    if (!enabled) return
    const lenis = new Lenis({ duration: 1.15, anchors: { offset: -72 }, wheelMultiplier: 0.95 })
    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    })
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [enabled])
}
