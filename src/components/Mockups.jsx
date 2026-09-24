import { Scene } from './Devices.jsx'

/*
 * Hand-built website mockup for the hero device stack, rendered in HTML/CSS (no images to download).
 * All sizing uses container query units so they scale with their device frame.
 */

const serif = { fontFamily: 'ui-serif, Georgia, "Times New Roman", serif' }

/* ─── Hero: a luxury villa brand site ─────────────────────────── */

export function AuroraDesktop() {
  return (
    <div className="absolute inset-0 bg-[#07101d] text-white">
      <Scene
        className="absolute inset-0"
        sky={['#071a33', '#2a6fa8']}
        sea={['#0a4a74', '#041425']}
        sun="#bff4ff"
        horizon={64}
        sunX={70}
        hills="#061528"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050d19]/85 via-[#050d19]/35 to-transparent" />
      <div className="relative flex items-center justify-between px-[4cqw] py-[2.6cqw]">
        <span className="text-[1.7cqw] font-bold tracking-[0.4em]">AURORA</span>
        <div className="flex gap-[2.6cqw] text-[1.15cqw] uppercase tracking-[0.2em] text-white/70">
          <span>Villas</span>
          <span>Experiences</span>
          <span>Journal</span>
        </div>
        <span className="rounded-full border border-white/30 px-[1.8cqw] py-[0.7cqw] text-[1.1cqw] uppercase tracking-[0.2em]">Reserve</span>
      </div>
      <div className="relative mt-[5cqw] max-w-[52%] px-[4cqw]">
        <p className="text-[1.1cqw] uppercase tracking-[0.35em] text-cyan">Private Villa Collection</p>
        <p className="mt-[1.6cqw] text-[5.2cqw] leading-[1.02]" style={serif}>
          Stay where the ocean begins.
        </p>
        <p className="mt-[1.8cqw] max-w-[80%] text-[1.35cqw] leading-relaxed text-white/65">
          Six hillside residences with infinity pools, private chefs and sunsets that never repeat.
        </p>
        <div className="mt-[2.6cqw] flex gap-[1.2cqw]">
          <span className="rounded-full bg-white px-[2.2cqw] py-[1cqw] text-[1.15cqw] font-semibold uppercase tracking-[0.18em] text-[#07101d]">
            Book your stay
          </span>
          <span className="rounded-full border border-white/30 px-[2.2cqw] py-[1cqw] text-[1.15cqw] uppercase tracking-[0.18em]">Explore</span>
        </div>
      </div>
      <div className="absolute inset-x-[4cqw] bottom-[3cqw] grid grid-cols-3 gap-[1.4cqw]">
        {[
          ['Villa Solène', ['#0d2a4d', '#e39a6d'], ['#15476c', '#0a2135']],
          ['Villa Marée', ['#1b3d6b', '#88c9ea'], ['#0f5d86', '#07263b']],
          ['Villa Horizon', ['#140e2e', '#b56a8a'], ['#2b3b6b', '#0c1731']],
        ].map(([name, sky, sea]) => (
          <div key={name} className="overflow-hidden rounded-[1cqw] border border-white/10 bg-[#0b1a2e]/80">
            <Scene className="h-[7.5cqw]" sky={sky} sea={sea} horizon={58} sunX={30} />
            <div className="flex items-center justify-between px-[1.2cqw] py-[1cqw] text-[1.1cqw]">
              <span style={serif}>{name}</span>
              <span className="text-white/50">4 BR</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AuroraMobile() {
  return (
    <div className="absolute inset-0 bg-[#07101d] text-white">
      <Scene className="absolute inset-x-0 top-0 h-[64%]" sky={['#071a33', '#2a6fa8']} sea={['#0a4a74', '#041425']} sun="#bff4ff" horizon={60} sunX={68} hills="#061528" />
      <div className="absolute inset-x-0 top-0 h-[64%] bg-gradient-to-b from-transparent via-transparent to-[#07101d]" />
      <div className="relative flex items-center justify-between px-[7cqw] pt-[16cqw]">
        <span className="text-[5cqw] font-bold tracking-[0.35em]">AURORA</span>
        <span className="flex flex-col gap-[1.2cqw]">
          <span className="h-[0.8cqw] w-[6cqw] rounded bg-white" />
          <span className="h-[0.8cqw] w-[4cqw] self-end rounded bg-white" />
        </span>
      </div>
      <div className="relative px-[7cqw] pt-[42cqw]">
        <p className="text-[3.2cqw] uppercase tracking-[0.3em] text-cyan">Private Villas</p>
        <p className="mt-[3cqw] text-[11cqw] leading-[1]" style={serif}>
          Stay where the ocean begins.
        </p>
        <span className="mt-[6cqw] block rounded-full bg-white py-[3.6cqw] text-center text-[3.6cqw] font-semibold uppercase tracking-[0.18em] text-[#07101d]">
          Book your stay
        </span>
        <div className="mt-[6cqw] grid grid-cols-2 gap-[3cqw]">
          <Scene className="h-[24cqw] rounded-[3cqw]" sky={['#0d2a4d', '#e39a6d']} sea={['#15476c', '#0a2135']} horizon={58} />
          <Scene className="h-[24cqw] rounded-[3cqw]" sky={['#1b3d6b', '#88c9ea']} sea={['#0f5d86', '#07263b']} horizon={58} sunX={30} />
        </div>
      </div>
    </div>
  )
}
