/**
 * Device frames. Children are laid out inside an inline-size container,
 * so mock websites can size everything in `cqw` and scale perfectly.
 */

export function BrowserFrame({ domain, children, className = '', aspect = 'aspect-[16/10]', tone = 'dark' }) {
  const light = tone === 'light'
  return (
    <div
      className={`overflow-hidden rounded-[14px] border shadow-[0_40px_120px_-30px_rgba(0,0,0,.85),0_0_0_1px_rgba(255,255,255,.04)] ${
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
      <div className={`@container relative overflow-hidden [content-visibility:auto] [--frame-h:62.5cqw] ${aspect}`}>{children}</div>
    </div>
  )
}

export function PhoneFrame({ children, className = '', ...rest }) {
  return (
    <div
      {...rest}
      className={`rounded-[2.1rem] border border-white/15 bg-[#05080f] p-[5px] shadow-[0_40px_90px_-20px_rgba(0,0,0,.9),inset_0_0_0_1px_rgba(255,255,255,.05)] ${className}`}
    >
      <div className="@container relative aspect-[9/19.5] overflow-hidden rounded-[1.75rem] [content-visibility:auto] [--frame-h:216.6cqw]">
        {children}
        <div className="absolute left-1/2 top-[1.8%] h-[3.2%] w-[32%] -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />
      </div>
    </div>
  )
}

/** Stylised photographic scene (sky, sun, sea) — lightweight stand-in for imagery. */
export function Scene({ sky = ['#0b2545', '#f4a37a'], sea = ['#123d5e', '#061a2c'], sun = '#ffe1b0', horizon = 62, sunX = 64, hills, className = '', children }) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(180deg, ${sky[0]} 0%, ${sky[1]} ${horizon}%, ${sea[0]} ${horizon}%, ${sea[1]} 100%)` }}
    >
      <div
        className="absolute aspect-square w-[16%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ left: `${sunX}%`, top: `${horizon - 6}%`, background: `radial-gradient(circle, ${sun} 0 38%, transparent 70%)`, filter: 'blur(1px)' }}
      />
      {hills && (
        <div
          className="absolute inset-x-0"
          style={{
            top: `${horizon - 14}%`,
            height: '14.2%',
            background: hills,
            clipPath: 'polygon(0 100%,0 55%,12% 30%,24% 52%,38% 18%,52% 46%,63% 34%,76% 60%,88% 38%,100% 55%,100% 100%)',
          }}
        />
      )}
      <div
        className="absolute inset-x-0 bottom-0 opacity-30"
        style={{
          top: `${horizon}%`,
          background: 'repeating-linear-gradient(180deg, rgba(255,255,255,.18) 0 1px, transparent 1px 7px)',
          maskImage: 'linear-gradient(180deg, #000, transparent)',
          WebkitMaskImage: 'linear-gradient(180deg, #000, transparent)',
        }}
      />
      {children}
    </div>
  )
}
