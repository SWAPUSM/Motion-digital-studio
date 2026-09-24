import { m } from 'motion/react'

/** Fade-and-rise entrance when scrolled into view. */
export default function Reveal({ children, delay = 0, y = 20, className = '', as = 'div', ...rest }) {
  const Comp = m[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Comp>
  )
}
