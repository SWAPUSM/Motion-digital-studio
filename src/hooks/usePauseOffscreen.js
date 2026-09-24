import { useEffect, useRef } from 'react'

/**
 * Pauses the CSS animations inside an element while it is off-screen
 * (toggles the `anim-paused` class directly — no React re-render).
 */
export function usePauseOffscreen() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => el.classList.toggle('anim-paused', !e.isIntersecting), { rootMargin: '100px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}
