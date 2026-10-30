/**
 * Device frames. Children are laid out inside an inline-size container,
 * so mock websites can size everything in `cqw` and scale perfectly.
 */

export function BrowserFrame({ domain, children, className = '', aspect = 'aspect-[16/10]', tone = 'dark' }) {
  const light = tone === 'light'
  return (
    <div
      className={`overflow-hidden rounded-[14px] border max-md:shadow-none md:shadow-[0_24px_50px_-24px_rgba(0,0,0,.85)] lg:shadow-[0_32px_64px_-30px_rgba(0,0,0,.85)] ${
        light ? 'border-white/20 bg-[#eef1f5]' : 'border-white/10 bg-[#0c1626]'
      } ${className}`}
    >
      <div className={`flex items-center gap-3 border-b px-3 py-2 md:px-4 md:py-2.5 ${light ? 'border-black/5 bg-[#e6eaef]' : 'border-white/5 bg-[#0f1c2f]'}`}>
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]/80 md:h-2.5 md:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]/80 md:h-2.5 md:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]/80 md:h-2.5 md:w-2.5" />
        </div>
        <div
          className={`mx-auto flex min-w-0 max-w-[60%] flex-1 items-center justify-center gap-1.5 truncate rounded-md px-3 py-1 text-[9px] font-medium md:text-[11px] ${
            light ? 'bg-white/80 text-slate-500' : 'bg-white/5 text-mist/60'
          }`}
        >
          <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          <span className="truncate">{domain}</span>
        </div>
        <span className="w-10 md:w-12" aria-hidden="true" />
      </div>
      <div className={`@container relative overflow-hidden ${aspect}`}>{children}</div>
    </div>
  )
}

/**
 * Realistic iPhone 15/16 Pro: brushed-titanium band, thin even black bezel,
 * Dynamic Island, true 1179 × 2556 screen ratio and matching corner radii.
 * Everything is sized in `cqw` of the phone's own width, so the proportions hold
 * at any size. Straight, never tilted; only a modest static shadow (cheap to scroll).
 *
 * `screen`: the aspect of a real capture whose status bar and browser toolbar were cropped
 * off (e.g. 'aspect-[1290/2323]'). The display then shows only the website, and the
 * Dynamic Island sits in a black strip above it instead of covering the site's header.
 */
const BUTTON = 'absolute w-[1.1cqw] bg-gradient-to-b from-[#8d9096] via-[#55585e] to-[#8d9096]'

export function PhoneFrame({ children, className = '', screen, ...rest }) {
  return (
    <div {...rest} className={`@container relative ${className}`}>
      {/* side buttons: action + volume (left), side button (right) */}
      <span aria-hidden="true" className={`${BUTTON} -left-[0.8cqw] top-[17%] h-[5.2%] rounded-l-[0.8cqw]`} />
      <span aria-hidden="true" className={`${BUTTON} -left-[0.8cqw] top-[25%] h-[9%] rounded-l-[0.8cqw]`} />
      <span aria-hidden="true" className={`${BUTTON} -left-[0.8cqw] top-[36%] h-[9%] rounded-l-[0.8cqw]`} />
      <span aria-hidden="true" className={`${BUTTON} -right-[0.8cqw] top-[28%] h-[14%] rounded-r-[0.8cqw]`} />

      {/* titanium band */}
      <div className="rounded-[16.9cqw] bg-[linear-gradient(150deg,#b4b7bc_0%,#62656b_18%,#34363b_45%,#5b5e64_75%,#aeb1b6_100%)] p-[0.9cqw] shadow-[0_18px_36px_-14px_rgba(0,0,0,.8)]">
        {/* black bezel */}
        <div className={`relative rounded-[16cqw] bg-black p-[3cqw] shadow-[inset_0_0_0_0.35cqw_rgba(255,255,255,.07)] ${screen ? 'pb-[6cqw] pt-[13cqw]' : ''}`}>
          {screen && <div aria-hidden="true" className="absolute left-1/2 top-[3.2cqw] h-[7.6cqw] w-[30%] -translate-x-1/2 rounded-full bg-[#111]" />}
          {/* display */}
          <div className={`@container relative overflow-hidden bg-navy ${screen ? `${screen} rounded-b-[13cqw] rounded-t-[4cqw]` : 'aspect-[1179/2556] rounded-[13cqw]'}`}>
            {children}
            {!screen && <div aria-hidden="true" className="absolute left-1/2 top-[1.3%] h-[4.3%] w-[32%] -translate-x-1/2 rounded-full bg-black" />}
            {/* faint glass reflection */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.07)_0%,transparent_32%)]" />
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Landscape tablet for the tablet captures of the live sites (browser bar cropped off):
 * graphite frame, even bezel, front camera on the long edge. Sized in `cqw` like the phone.
 * Deliberately not a desktop browser window: these captures come from a tablet.
 */
export function TabletFrame({ children, className = '', screen = 'aspect-[1536/876]' }) {
  return (
    <div className={`@container relative ${className}`}>
      <div className="relative rounded-[4.2cqw] bg-[linear-gradient(150deg,#55585e_0%,#232427_30%,#17181a_60%,#3c3e43_100%)] p-[0.35cqw] shadow-[0_28px_56px_-30px_rgba(0,0,0,.75)]">
        <div className="relative rounded-[3.9cqw] bg-[#0b0b0c] p-[2.1cqw] shadow-[inset_0_0_0_0.15cqw_rgba(255,255,255,.06)]">
          <span aria-hidden="true" className="absolute left-1/2 top-[0.85cqw] h-[0.45cqw] w-[0.45cqw] -translate-x-1/2 rounded-full bg-[#1d2430] ring-[0.12cqw] ring-white/5" />
          <div className={`@container relative overflow-hidden rounded-[1.8cqw] bg-navy ${screen}`}>
            {children}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.06)_0%,transparent_30%)]" />
          </div>
        </div>
      </div>
    </div>
  )
}
