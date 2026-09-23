import { useRef } from 'react'
import { m, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import { useFinePointer } from '../hooks/useMediaQuery.js'

const variants = {
  primary:
    'text-white bg-gradient-to-r from-electric to-[#00a8ff] shadow-[0_10px_40px_-10px_rgba(0,123,255,.8),inset_0_1px_0_rgba(255,255,255,.25)] hover:shadow-[0_14px_50px_-8px_rgba(0,209,255,.75),inset_0_1px_0_rgba(255,255,255,.3)]',
  ghost: 'text-white glass hover:bg-white/10 hover:border-white/20',
}

const sizes = {
  md: 'h-12 px-6 text-[12px] gap-2.5',
  lg: 'h-14 px-8 text-[13px] gap-3',
  xl: 'h-16 md:h-[72px] px-9 md:px-12 text-[13px] md:text-[15px] gap-3',
}

/** CTA with a subtle magnetic pull on desktop pointers. Renders an <a>. */
export default function MagneticButton({ children, variant = 'primary', size = 'lg', strength = 0.28, className = '', ...props }) {
  const ref = useRef(null)
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })
  const active = fine && !reduce

  const onMove = (e) => {
    if (!active) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <m.a
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex select-none items-center justify-center overflow-hidden rounded-full font-semibold uppercase tracking-[0.18em] transition-[box-shadow,background-color,border-color] duration-500 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {variant === 'primary' && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
      )}
      <span className="relative inline-flex items-center gap-[inherit]">{children}</span>
    </m.a>
  )
}
