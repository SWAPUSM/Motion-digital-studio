import { Scene } from './Devices.jsx'

/*
 * Hand-built website mockups rendered in HTML/CSS (no images to download).
 * All sizing uses container query units so they scale with their device frame.
 * Work mocks render a full page taller than the frame; `.mock-page` scrolls it to the end on hover/tap.
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
          <div key={name} className="overflow-hidden rounded-[1cqw] border border-white/10 bg-white/5 backdrop-blur">
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

/* ─── Teddy Bike Samui ────────────────────────────────────────── */

function TeddyPage({ mobile }) {
  const px = mobile ? 'px-[7cqw]' : 'px-[4cqw]'
  return (
    <div className="mock-page absolute inset-x-0 top-0 min-h-full bg-[#fbfaf6] pb-[6cqw] text-[#141414]">
      <div className={`flex items-center justify-between ${px} ${mobile ? 'pt-[15cqw] pb-[4cqw]' : 'py-[2.2cqw]'}`}>
        <span className={`font-black tracking-tight ${mobile ? 'text-[5.5cqw]' : 'text-[1.9cqw]'}`}>
          TEDDY<span className="text-[#f5b800]">BIKE</span>
        </span>
        {!mobile && (
          <div className="flex gap-[2.4cqw] text-[1.15cqw] font-semibold text-black/60">
            <span>Scooters</span>
            <span>Cars</span>
            <span>Prices</span>
            <span>Contact</span>
          </div>
        )}
        <span className={`rounded-full bg-[#FFC928] font-bold ${mobile ? 'px-[4cqw] py-[2cqw] text-[3.2cqw]' : 'px-[2cqw] py-[0.8cqw] text-[1.15cqw]'}`}>Book now</span>
      </div>
      <Scene
        className={`${mobile ? 'mx-[4cqw] h-[104cqw] rounded-[5cqw]' : 'mx-[2.4cqw] h-[28cqw] rounded-[2cqw]'}`}
        sky={['#3db8f5', '#c9efff']}
        sea={['#12a5c8', '#07708f']}
        sun="#fff6c9"
        horizon={56}
        sunX={78}
        hills="#2c8f6e"
      >
        <div className={`absolute ${mobile ? 'left-[6cqw] top-[7cqw]' : 'left-[3cqw] top-[3.4cqw]'} text-white`}>
          <p className={`font-black uppercase leading-[0.95] drop-shadow ${mobile ? 'text-[10cqw]' : 'text-[5cqw]'}`}>
            Ride Samui
            <br />
            your way.
          </p>
          <p className={`mt-[1cqw] font-semibold opacity-90 ${mobile ? 'text-[3.4cqw]' : 'text-[1.3cqw]'}`}>Scooters & cars across Koh Samui</p>
        </div>
      </Scene>
      {/* booking bar */}
      <div
        className={`relative z-10 mx-auto grid items-center bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,.25)] ${
          mobile ? '-mt-[6cqw] w-[84%] grid-cols-1 gap-[2cqw] rounded-[4cqw] p-[3cqw] text-[3cqw]' : '-mt-[3cqw] w-[80%] grid-cols-4 gap-[1cqw] rounded-[1.4cqw] p-[1cqw] text-[1.1cqw]'
        }`}
      >
        {(mobile ? ['Pick-up date'] : ['Pick-up date', 'Return date', 'Vehicle']).map((f) => (
          <span key={f} className={`rounded-[0.8cqw] bg-black/[.04] text-black/50 ${mobile ? 'px-[3cqw] py-[2.4cqw]' : 'px-[1.2cqw] py-[1cqw]'}`}>
            {f}
          </span>
        ))}
        <span className={`rounded-[0.8cqw] bg-[#141414] text-center font-bold text-[#FFC928] ${mobile ? 'py-[2.4cqw]' : 'py-[1cqw]'}`}>Check availability</span>
      </div>
      <div className={`${px} ${mobile ? 'mt-[7cqw]' : 'mt-[3.4cqw]'}`}>
        <p className={`font-black uppercase ${mobile ? 'text-[6cqw]' : 'text-[2.2cqw]'}`}>Our fleet</p>
        <div className={`mt-[2cqw] grid ${mobile ? 'grid-cols-1 gap-[3cqw]' : 'grid-cols-3 gap-[1.4cqw]'}`}>
          {[
            ['Scooters', '#FFC928'],
            ['Big bikes', '#141414'],
            ['Cars', '#12a5c8'],
          ].map(([name, c]) => (
            <div key={name} className={`overflow-hidden bg-white shadow-[0_6px_20px_-12px_rgba(0,0,0,.35)] ${mobile ? 'rounded-[4cqw]' : 'rounded-[1.4cqw]'}`}>
              <div className={`relative ${mobile ? 'h-[26cqw]' : 'h-[10cqw]'}`} style={{ background: `linear-gradient(135deg, ${c}, ${c}cc)` }}>
                <div className="absolute bottom-[18%] left-1/2 h-[26%] w-[56%] -translate-x-1/2 rounded-full bg-black/20 blur-[2px]" />
                <div className="absolute bottom-[26%] left-1/2 aspect-square w-[18%] -translate-x-[140%] rounded-full border-[0.6cqw] border-white/90" />
                <div className="absolute bottom-[26%] left-1/2 aspect-square w-[18%] translate-x-[40%] rounded-full border-[0.6cqw] border-white/90" />
              </div>
              <div className={`flex items-center justify-between ${mobile ? 'p-[3.4cqw] text-[3.4cqw]' : 'p-[1.2cqw] text-[1.2cqw]'}`}>
                <span className="font-bold">{name}</span>
                <span className="text-black/50">Daily · Weekly · Monthly</span>
              </div>
            </div>
          ))}
        </div>
        <div className={`mt-[3cqw] flex items-center justify-between rounded-[1.6cqw] bg-[#141414] text-white ${mobile ? 'flex-col gap-[3cqw] rounded-[4cqw] p-[5cqw] text-[3.6cqw]' : 'p-[2cqw] text-[1.4cqw]'}`}>
          <span className="font-bold">Questions? Just ask.</span>
          <span className={`rounded-full bg-[#25D366] font-bold ${mobile ? 'px-[5cqw] py-[2.4cqw]' : 'px-[2cqw] py-[0.8cqw]'}`}>Chat on WhatsApp</span>
        </div>
      </div>
    </div>
  )
}

/* ─── Samui Property 360 ──────────────────────────────────────── */

function PropertyPage({ mobile }) {
  const px = mobile ? 'px-[7cqw]' : 'px-[4cqw]'
  return (
    <div className="mock-page absolute inset-x-0 top-0 min-h-full bg-[#0B1A1E] pb-[6cqw] text-[#F3EBDD]">
      <div className={`flex items-center justify-between ${px} ${mobile ? 'pt-[15cqw] pb-[4cqw]' : 'py-[2.2cqw]'}`}>
        <span className={`uppercase tracking-[0.2em] ${mobile ? 'text-[4.2cqw]' : 'text-[1.5cqw]'}`} style={serif}>
          Samui Property <span className="text-[#C89B5A]">360</span>
        </span>
        {!mobile && (
          <div className="flex gap-[2.4cqw] text-[1.05cqw] uppercase tracking-[0.2em] text-[#F3EBDD]/60">
            <span>Tours</span>
            <span>Villas</span>
            <span>Land</span>
            <span>Contact</span>
          </div>
        )}
      </div>
      <Scene
        className={`${mobile ? 'mx-[4cqw] h-[112cqw] rounded-[4cqw]' : 'mx-[2.4cqw] h-[30cqw] rounded-[1.4cqw]'}`}
        sky={['#10272c', '#c7955a']}
        sea={['#1d4a4f', '#0B1A1E']}
        sun="#ffe2b0"
        horizon={60}
        sunX={34}
        hills="#0e2226"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(11,26,30,.6))]" />
        {/* 360° hotspots */}
        {[
          [28, 44],
          [62, 52],
          [80, 36],
        ].map(([l, t]) => (
          <span key={l} className="absolute" style={{ left: `${l}%`, top: `${t}%` }}>
            <span className="absolute -inset-[1.4cqw] animate-ping rounded-full border border-[#F3EBDD]/60 [animation-duration:2.4s]" />
            <span className={`block rounded-full border-2 border-[#F3EBDD] bg-[#C89B5A]/60 ${mobile ? 'h-[4cqw] w-[4cqw]' : 'h-[1.6cqw] w-[1.6cqw]'}`} />
          </span>
        ))}
        <div className={`absolute bottom-[8%] ${mobile ? 'left-[6cqw]' : 'left-[3cqw]'}`}>
          <p className={`text-[#C89B5A] uppercase tracking-[0.3em] ${mobile ? 'text-[2.8cqw]' : 'text-[1cqw]'}`}>Immersive visit</p>
          <p className={`mt-[0.6cqw] leading-[1.05] ${mobile ? 'text-[8cqw]' : 'text-[3.6cqw]'}`} style={serif}>
            Visit before
            <br />
            you arrive.
          </p>
        </div>
        <span
          className={`absolute bottom-[10%] right-[4%] rounded-full bg-[#F3EBDD] font-semibold text-[#0B1A1E] ${mobile ? 'px-[4cqw] py-[2cqw] text-[3cqw]' : 'px-[2cqw] py-[1cqw] text-[1.15cqw]'}`}
        >
          Enter the tour →
        </span>
      </Scene>
      <div className={`${px} ${mobile ? 'mt-[8cqw]' : 'mt-[3.4cqw]'}`}>
        <div className="flex items-end justify-between">
          <p className={`${mobile ? 'text-[6.4cqw]' : 'text-[2.4cqw]'}`} style={serif}>
            Featured properties
          </p>
          {!mobile && <span className="text-[1.05cqw] uppercase tracking-[0.2em] text-[#C89B5A]">View all</span>}
        </div>
        <div className={`mt-[2.4cqw] grid ${mobile ? 'grid-cols-1 gap-[4cqw]' : 'grid-cols-3 gap-[1.6cqw]'}`}>
          {[
            ['Ocean View Villa', 'Chaweng Noi', ['#1a3a40', '#d7a870']],
            ['Hillside Retreat', 'Bophut', ['#0f2a30', '#8fb6b0']],
            ['Beachfront Estate', 'Lipa Noi', ['#221b2a', '#d9876a']],
          ].map(([name, area, sky]) => (
            <div key={name} className={`overflow-hidden border border-[#C89B5A]/25 ${mobile ? 'rounded-[3cqw]' : 'rounded-[1cqw]'}`}>
              <Scene className={`${mobile ? 'h-[36cqw]' : 'h-[11cqw]'}`} sky={sky} sea={['#1d4a4f', '#0B1A1E']} horizon={62} sunX={60}>
                <span className={`absolute left-[6%] top-[8%] rounded-full border border-[#F3EBDD]/40 bg-[#0B1A1E]/60 ${mobile ? 'px-[2.4cqw] py-[1cqw] text-[2.6cqw]' : 'px-[0.9cqw] py-[0.3cqw] text-[0.95cqw]'}`}>
                  360°
                </span>
              </Scene>
              <div className={`${mobile ? 'p-[4cqw]' : 'p-[1.3cqw]'}`}>
                <p className={`${mobile ? 'text-[4.4cqw]' : 'text-[1.45cqw]'}`} style={serif}>
                  {name}
                </p>
                <p className={`mt-[0.4cqw] uppercase tracking-[0.2em] text-[#F3EBDD]/50 ${mobile ? 'text-[2.6cqw]' : 'text-[0.95cqw]'}`}>{area}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Valérie d'Art Don ───────────────────────────────────────── */

function ValeriePage({ mobile }) {
  const px = mobile ? 'px-[7cqw]' : 'px-[5cqw]'
  return (
    <div className="mock-page absolute inset-x-0 top-0 min-h-full bg-[#f8f0ea] pb-[6cqw] text-[#3a2a25]">
      <div className={`flex items-center justify-between ${px} ${mobile ? 'pt-[15cqw] pb-[4cqw]' : 'py-[2.4cqw]'}`}>
        <span className={`italic ${mobile ? 'text-[5.4cqw]' : 'text-[2cqw]'}`} style={serif}>
          Valérie d’Art Don
        </span>
        {!mobile && (
          <div className="flex gap-[2.4cqw] text-[1.05cqw] uppercase tracking-[0.24em] text-[#3a2a25]/60">
            <span>Brows</span>
            <span>Lips</span>
            <span>Eyes</span>
            <span>Gallery</span>
          </div>
        )}
        <span className={`rounded-full border border-[#3a2a25]/40 uppercase tracking-[0.18em] ${mobile ? 'px-[3cqw] py-[1.6cqw] text-[2.6cqw]' : 'px-[1.8cqw] py-[0.8cqw] text-[1cqw]'}`}>
          Book
        </span>
      </div>
      <div className={`grid items-center ${px} ${mobile ? 'grid-cols-1 gap-[6cqw] pt-[4cqw]' : 'grid-cols-2 gap-[4cqw] pt-[2cqw]'}`}>
        <div className={mobile ? 'order-2' : ''}>
          <p className={`uppercase tracking-[0.35em] text-[#b77a66] ${mobile ? 'text-[2.8cqw]' : 'text-[1cqw]'}`}>Permanent makeup artistry</p>
          <p className={`mt-[1.4cqw] leading-[1.02] ${mobile ? 'text-[11cqw]' : 'text-[4.6cqw]'}`} style={serif}>
            The art of <em className="text-[#b77a66]">natural</em> beauty.
          </p>
          <p className={`mt-[1.6cqw] leading-relaxed text-[#3a2a25]/65 ${mobile ? 'text-[3.4cqw]' : 'text-[1.3cqw]'}`}>
            Soft, refined results designed around your features — so you wake up ready.
          </p>
          <span className={`mt-[2.4cqw] inline-block rounded-full bg-[#3a2a25] uppercase tracking-[0.2em] text-[#f8f0ea] ${mobile ? 'px-[6cqw] py-[3cqw] text-[3cqw]' : 'px-[2.4cqw] py-[1.1cqw] text-[1.05cqw]'}`}>
            Book a consultation
          </span>
        </div>
        <div
          className={`relative mx-auto overflow-hidden rounded-t-full ${mobile ? 'h-[62cqw] w-[70%]' : 'h-[34cqw] w-[78%]'}`}
          style={{ background: 'radial-gradient(120% 90% at 50% 20%, #f3d3c3, #d9a08e 55%, #a86b5b)' }}
        >
          <div className="absolute inset-x-[18%] top-[22%] h-[40%] rounded-full bg-[#fbe6da]/50 blur-[2cqw]" />
          <div className="absolute inset-x-[30%] top-[46%] h-[1.4%] rounded-full bg-[#6b3b30]/50" />
          <div className="absolute inset-x-[36%] top-[66%] h-[3%] rounded-full bg-[#b2544b]/50" />
        </div>
      </div>
      <div className={`${px} ${mobile ? 'mt-[10cqw]' : 'mt-[4cqw]'}`}>
        <div className={`grid border-t border-[#3a2a25]/15 ${mobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {[
            ['01', 'Brows', 'Microblading & powder brows'],
            ['02', 'Lips', 'Soft lip blush'],
            ['03', 'Eyes', 'Lash line enhancement'],
          ].map(([n, t, d]) => (
            <div key={n} className={`border-b border-[#3a2a25]/15 ${mobile ? 'py-[5cqw]' : 'border-r py-[2.4cqw] pr-[2cqw] last:border-r-0 [&:not(:first-child)]:pl-[2cqw]'}`}>
              <span className={`text-[#b77a66] ${mobile ? 'text-[3cqw]' : 'text-[1cqw]'}`}>{n}</span>
              <p className={`mt-[0.6cqw] ${mobile ? 'text-[6cqw]' : 'text-[2.2cqw]'}`} style={serif}>
                {t}
              </p>
              <p className={`text-[#3a2a25]/60 ${mobile ? 'text-[3.2cqw]' : 'text-[1.1cqw]'}`}>{d}</p>
            </div>
          ))}
        </div>
        <p className={`mx-auto mt-[4cqw] max-w-[80%] text-center italic leading-snug ${mobile ? 'text-[5cqw]' : 'text-[2.2cqw]'}`} style={serif}>
          Explore the gallery →
        </p>
      </div>
    </div>
  )
}

const PAGES = { teddy: TeddyPage, property: PropertyPage, valerie: ValeriePage }

export function ProjectMock({ mock, mobile = false }) {
  const Page = PAGES[mock]
  return Page ? <Page mobile={mobile} /> : null
}
