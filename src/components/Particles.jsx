import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

/**
 * Very light canvas particle field drifting forward (left → right).
 * Pauses when off-screen or the tab is hidden; disabled for reduced motion.
 */
export default function Particles({ className = '', density = 1 }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let w = 0
    let h = 0
    let raf = 0
    let running = false
    let parts = []

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(70, (w * h) / 16000) * density)
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.3,
        v: Math.random() * 0.25 + 0.05,
        a: Math.random() * 0.5 + 0.15,
        p: Math.random() * Math.PI * 2,
      }))
    }

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of parts) {
        p.x += p.v
        p.p += 0.01
        if (p.x > w + 4) {
          p.x = -4
          p.y = Math.random() * h
        }
        const y = p.y + Math.sin(p.p) * 6
        ctx.globalAlpha = p.a * (0.6 + 0.4 * Math.sin(p.p * 1.7))
        ctx.fillStyle = p.r > 1.1 ? '#00D1FF' : '#9fdcff'
        ctx.beginPath()
        ctx.arc(p.x, y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (!running) {
        running = true
        raf = requestAnimationFrame(tick)
      }
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const ro = new ResizeObserver(resize)
    const io = new IntersectionObserver(([e]) => (e.isIntersecting && !document.hidden ? start() : stop()))
    const onVis = () => (document.hidden ? stop() : start())

    // Decorative only — wait until the main thread is idle before starting.
    const init = () => {
      resize()
      ro.observe(canvas)
      io.observe(canvas)
      document.addEventListener('visibilitychange', onVis)
    }
    const idle = window.requestIdleCallback ? requestIdleCallback(init, { timeout: 3000 }) : setTimeout(init, 1500)

    return () => {
      window.cancelIdleCallback ? cancelIdleCallback(idle) : clearTimeout(idle)
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [reduce, density])

  return <canvas ref={ref} className={`pointer-events-none ${className}`} aria-hidden="true" />
}
