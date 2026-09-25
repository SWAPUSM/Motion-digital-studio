import { useId } from 'react'
import { m } from 'motion/react'

/**
 * A luminous ribbon of light echoing the flowing "M" of the logo —
 * the visual thread of motion that runs through the site. It draws in once and
 * then stays still (an endless travelling pulse would repaint it every frame).
 */
export default function Ribbon({ d, className = '', viewBox = '0 0 1440 800', delay = 0.2, animateIn = true }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg className={`pointer-events-none ${className}`} viewBox={viewBox} preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`rg-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#007BFF" stopOpacity="0" />
          <stop offset=".25" stopColor="#007BFF" />
          <stop offset=".7" stopColor="#00D1FF" />
          <stop offset="1" stopColor="#E6FBFF" />
        </linearGradient>
      </defs>
      {/* soft wide body */}
      <m.path
        d={d}
        stroke={`url(#rg-${id})`}
        strokeWidth="46"
        strokeLinecap="round"
        opacity=".13"
        initial={animateIn ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, delay, ease: [0.65, 0, 0.35, 1] }}
      />
      <m.path
        d={d}
        stroke={`url(#rg-${id})`}
        strokeWidth="12"
        strokeLinecap="round"
        opacity=".35"
        initial={animateIn ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, delay: delay + 0.05, ease: [0.65, 0, 0.35, 1] }}
      />
      {/* bright core */}
      <m.path
        d={d}
        stroke={`url(#rg-${id})`}
        strokeWidth="1.6"
        strokeLinecap="round"
        initial={animateIn ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, delay: delay + 0.1, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  )
}
