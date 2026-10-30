import { m } from 'motion/react'

const ease = [0.16, 1, 0.3, 1]

/**
 * Hero centrepiece: "digital architecture" — a website shown as an exploded, isometric stack
 * of the layers it is built from, floating apart in blue glass:
 *   01 structure (blueprint grid) · 02 layout (wireframe) · 03 design (glass blocks) ·
 *   04 interaction (navigation, call to action, cursor).
 * Abstract and original: no screenshots, no client or invented brand.
 *
 * Built with plain elements in CSS 3D. Each layer is one flat plane (one compositor layer);
 * only transforms move: the layers assemble once on load, then breathe apart slowly; on
 * desktop the stack follows the cursor. Loops pause off-screen; reduced motion = still.
 * Sized by its own box (container query units), so it fills whatever space the hero gives it.
 */

// depth of each layer (in units of the plane width, via --u)
const LAYERS = [
  { key: 'structure', z: 0 },
  { key: 'layout', z: 1 },
  { key: 'design', z: 2 },
  { key: 'interaction', z: 3 },
]

function Structure() {
  return (
    <div className="arch-plane arch-structure">
      <div className="arch-grid absolute inset-0" />
      <div className="absolute inset-[6%] rounded-[3%] border border-cyan/25" />
    </div>
  )
}

function Layout() {
  const box = 'absolute rounded-[1.4cqw] border border-[#7fdcff]/45'
  return (
    <div className="arch-plane arch-layout">
      <div className={`${box} left-[6%] right-[6%] top-[7%] h-[9%]`} />
      <div className={`${box} left-[6%] top-[21%] h-[38%] w-[52%]`} />
      <div className={`${box} left-[62%] right-[6%] top-[21%] h-[38%]`} />
      {[0, 1, 2].map((i) => (
        <div key={i} className={box} style={{ left: `${6 + i * 30}%`, width: '28%', top: '64%', height: '28%' }} />
      ))}
    </div>
  )
}

function Design() {
  const bar = 'absolute h-[2.6%] rounded-full bg-white/70'
  return (
    <div className="arch-plane arch-design">
      {/* hero block: deep gradient with a light sweep */}
      <div className="absolute left-[6%] top-[21%] h-[38%] w-[52%] overflow-hidden rounded-[1.4cqw] bg-[linear-gradient(135deg,#0047d6_0%,#0a8cff_55%,#7fe6ff_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_80%_20%,rgba(255,255,255,.55),transparent_60%)]" />
      </div>
      <div className={`${bar} left-[64%] top-[25%] w-[24%]`} />
      <div className={`${bar} left-[64%] top-[31%] w-[28%] bg-white/45`} />
      <div className={`${bar} left-[64%] top-[37%] w-[20%] bg-white/45`} />
      <div className="absolute left-[64%] top-[46%] h-[7%] w-[16%] rounded-full bg-[linear-gradient(90deg,#007bff,#00d1ff)]" />
      {[0, 1, 2].map((i) => (
        <div key={i} className="absolute rounded-[1.4cqw] bg-white/[.08] ring-1 ring-white/15" style={{ left: `${6 + i * 30}%`, width: '28%', top: '64%', height: '28%' }}>
          <div className="absolute left-[10%] top-[14%] h-[34%] w-[34%] rounded-[18%] bg-[linear-gradient(135deg,#0a7bff,#00d1ff)] opacity-80" />
          <div className="absolute left-[10%] top-[60%] h-[9%] w-[70%] rounded-full bg-white/50" />
          <div className="absolute left-[10%] top-[76%] h-[9%] w-[50%] rounded-full bg-white/25" />
        </div>
      ))}
    </div>
  )
}

function Interaction() {
  return (
    <div className="arch-plane arch-interaction">
      {/* navigation bar */}
      <div className="absolute left-[6%] right-[6%] top-[7%] flex h-[9%] items-center justify-between rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,.22),rgba(255,255,255,.08))] px-[3%] ring-1 ring-white/30">
        <span className="h-[34%] w-[10%] rounded-full bg-white/85" />
        <span className="flex h-full items-center gap-[6%] w-[40%] justify-end">
          <span className="h-[18%] w-[18%] rounded-full bg-white/50" />
          <span className="h-[18%] w-[18%] rounded-full bg-white/50" />
          <span className="h-[44%] w-[30%] rounded-full bg-[linear-gradient(90deg,#007bff,#00d1ff)]" />
        </span>
      </div>
      {/* the call to action, lifted, with its glow */}
      <div className="arch-cta absolute left-[64%] top-[46%] h-[7%] w-[16%] rounded-full bg-[linear-gradient(90deg,#3aa0ff,#7fe9ff)] shadow-[0_0_3cqw_rgba(0,209,255,.8)]" />
      {/* cursor */}
      <svg viewBox="0 0 24 24" className="absolute left-[76%] top-[51%] w-[5%] drop-shadow-[0_0.4cqw_0.6cqw_rgba(0,0,0,.5)]" aria-hidden="true">
        <path d="M4 3l15 7.5-6.5 1.8L10 19z" fill="#fff" stroke="#0a1a2f" strokeWidth="1" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

const PLANES = { structure: Structure, layout: Layout, design: Design, interaction: Interaction }

export default function HeroArchitecture({ ready, tilt, reduce, rotateX, rotateY, className = '' }) {
  return (
    <m.div
      className={`arch-box relative ${className}`}
      initial={{ opacity: 0 }}
      animate={ready ? { opacity: 1 } : {}}
      transition={{ duration: 1.2, ease, delay: 0.1 }}
      aria-hidden="true"
    >
      {/* light: an electric halo under the stack and a cool core */}
      <div className="absolute inset-[-10%] bg-[radial-gradient(45%_42%_at_50%_58%,rgba(0,123,255,.42),rgba(0,123,255,.1)_55%,transparent_75%)]" />

      <div className="absolute inset-0 grid place-items-center [perspective:2200px]">
        <m.div className="[transform-style:preserve-3d]" style={tilt ? { rotateX, rotateY } : undefined}>
          <div className={`arch-stage ${ready ? 'is-ready' : ''} ${reduce ? 'is-still' : ''}`}>
            {/* light beams joining the corners of the layers */}
            {['tl', 'tr', 'bl', 'br'].map((c) => (
              <span key={c} className={`arch-beam arch-beam-${c}`} />
            ))}
            {/* a phone standing on the structure layer: the same layout, responsive */}
            <div className="arch-phone">
              <div className="arch-phone-screen">
                <span className="absolute left-[12%] right-[12%] top-[7%] h-[5%] rounded-full bg-white/25" />
                <span className="absolute left-[12%] right-[12%] top-[16%] h-[26%] rounded-[8%] bg-[linear-gradient(135deg,#0047d6,#0a8cff_55%,#7fe6ff)]" />
                <span className="absolute left-[12%] top-[47%] h-[3.5%] w-[60%] rounded-full bg-white/60" />
                <span className="absolute left-[12%] top-[53%] h-[3.5%] w-[44%] rounded-full bg-white/30" />
                <span className="absolute left-[12%] top-[61%] h-[6%] w-[42%] rounded-full bg-[linear-gradient(90deg,#007bff,#00d1ff)]" />
                <span className="absolute bottom-[8%] left-[12%] right-[12%] top-[73%] rounded-[8%] bg-white/10 ring-1 ring-white/15" />
              </div>
            </div>
            {LAYERS.map(({ key, z }) => {
              const Plane = PLANES[key]
              return (
                <div key={key} className="arch-layer" style={{ '--z': z }}>
                  <div className="arch-float" style={{ '--i': z }}>
                    <Plane />
                  </div>
                </div>
              )
            })}
          </div>
        </m.div>
      </div>
    </m.div>
  )
}
