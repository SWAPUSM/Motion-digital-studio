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
 */
const BUTTON = 'absolute w-[1.1cqw] bg-gradient-to-b from-[#8d9096] via-[#55585e] to-[#8d9096]'

export function PhoneFrame({ children, className = '', ...rest }) {
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
        <div className="rounded-[16cqw] bg-black p-[3cqw] shadow-[inset_0_0_0_0.35cqw_rgba(255,255,255,.07)]">
          {/* display */}
          <div className="@container relative aspect-[1179/2556] overflow-hidden rounded-[13cqw] bg-navy">
            {children}
            <div aria-hidden="true" className="absolute left-1/2 top-[1.3%] h-[4.3%] w-[32%] -translate-x-1/2 rounded-full bg-black" />
            {/* faint glass reflection */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.07)_0%,transparent_32%)]" />
          </div>
        </div>
      </div>
    </div>
  )
}
