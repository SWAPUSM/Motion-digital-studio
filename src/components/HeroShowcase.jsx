import { m } from 'motion/react'
import { BrowserFrame, PhoneFrame } from './Devices.jsx'
import PLACEHOLDERS from '../data/placeholders.json'

const ease = [0.16, 1, 0.3, 1]

/*
 * Hero device showcase: real work by Motion Digital Studio — Samui Property 360 —
 * on desktop (browser) and mobile (phone). The screenshots are the same generated
 * assets the portfolio uses (public/work/<slug>-{desktop,mobile}-*.{avif,webp});
 * change SHOWCASE to feature a different project.
 */
const SHOWCASE = { slug: 'samui-property-360', domain: 'samuiproperty360.com', name: 'Samui Property 360' }

const SHOT = {
  desktop: { widths: [900, 1600], w: 1600, h: 913 },
  mobile: { widths: [390, 780], w: 780, h: 1691 },
}

function Shot({ kind, sizes }) {
  const { slug, name } = SHOWCASE
  const { widths, w, h } = SHOT[kind]
  const set = (ext) => widths.map((x) => `/work/${slug}-${kind}-${x}.${ext} ${x}w`).join(', ')
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <img
        src={`/work/${slug}-${kind}-${widths[0]}.webp`}
        srcSet={set('webp')}
        sizes={sizes}
        alt={`${name} website on ${kind === 'desktop' ? 'desktop' : 'a phone'}`}
        width={w}
        height={h}
        decoding="async"
        className="absolute inset-0 block h-full w-full bg-navy-soft bg-cover bg-top object-cover object-top"
        style={{ backgroundImage: `url(${PLACEHOLDERS[`${slug}-${kind}`]})` }}
      />
    </picture>
  )
}

/**
 * One browser + one phone in the existing 3D stage (perspective, cursor tilt on
 * desktop, gentle sway on touch). Mobile gets its own, flatter composition rather
 * than a shrunk desktop one. Nothing else floats around them.
 */
export default function HeroShowcase({ ready, tilt, reduce, rotateX, rotateY, stageY, stageScale, pauseRef }) {
  return (
    <m.div
      ref={pauseRef}
      style={{ y: stageY, scale: stageScale }}
      className="relative mx-auto aspect-[10/7] w-full max-w-[560px] [perspective:1600px] sm:max-w-[620px] lg:aspect-[4/3] lg:max-w-none"
      initial={{ opacity: 0 }}
      animate={ready ? { opacity: 1 } : {}}
      transition={{ duration: 1.1, ease, delay: 0.25 }}
      aria-hidden="true"
    >
      <m.div
        className={`absolute inset-0 [transform-style:preserve-3d] ${tilt || reduce ? '' : 'animate-sway-soft'}`}
        style={tilt ? { rotateX, rotateY } : reduce ? { rotateX: 5, rotateY: -6 } : undefined}
      >
        {/* depth glow */}
        <div className="absolute inset-0 bg-[radial-gradient(closest-side,rgba(0,123,255,.38),transparent)] [transform:translateZ(-160px)]" />

        {/* browser: the dominant element */}
        <Layer z={0} className="left-0 top-[3%] w-[87%] lg:left-[1%] lg:top-[16%] lg:w-[92%]" delay={0.4} ready={ready}>
          <BrowserFrame domain={SHOWCASE.domain} tone="dark" aspect="aspect-[7/4]">
            <Shot kind="desktop" sizes="(min-width: 1024px) 46vw, 86vw" />
          </BrowserFrame>
          <div className="absolute -bottom-8 left-[5%] right-[5%] h-16 bg-[radial-gradient(closest-side,rgba(0,123,255,.4),transparent)]" />
        </Layer>

        {/* phone: the same site on mobile, overlapping the browser's corner */}
        <Layer z={90} className="right-[1%] top-[27%] w-[24%] lg:right-[-2%] lg:top-[33%] lg:w-[23%]" delay={0.65} ready={ready} float="a">
          <PhoneFrame>
            <Shot kind="mobile" sizes="(min-width: 1024px) 12vw, 24vw" />
          </PhoneFrame>
        </Layer>
      </m.div>
    </m.div>
  )
}

function Layer({ z, className, children, delay, ready, float }) {
  return (
    <m.div
      className={`absolute ${className}`}
      style={{ transformStyle: 'preserve-3d', z }}
      initial={{ opacity: 0, y: 40 }}
      animate={ready ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.3, ease, delay }}
    >
      <div className={float === 'a' ? 'animate-float-a' : float === 'b' ? 'animate-float-b' : ''}>{children}</div>
    </m.div>
  )
}
