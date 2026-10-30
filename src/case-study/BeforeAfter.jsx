import { useId, useState } from 'react'
import { BrowserFrame, PhoneFrame } from '../components/Devices.jsx'
import Shot from './Shot.jsx'
import './before-after.css'

/**
 * Before/after comparison of two captures taken at the same viewport size.
 * - Slider: the original sits over the evolved version and is clipped at the divider.
 *   A native <input type="range"> drives it, so keyboard, touch and screen readers work
 *   without extra code. On touch screens it only listens on a band across the middle,
 *   so the page still scrolls when you swipe over the image.
 * - Side by side: both captures, labelled. It is also what shows without JavaScript
 *   (before-after.css switches on html.js).
 */
function Frame({ phone, domain, children }) {
  return phone ? (
    <PhoneFrame className="w-full">{children}</PhoneFrame>
  ) : (
    <BrowserFrame domain={domain} tone="light" aspect="aspect-[16/10]">
      {children}
    </BrowserFrame>
  )
}

export default function BeforeAfter({ slug, domain, frame = 'browser', before, after, beforeAlt, afterAlt, sizes, label, caption, className = '' }) {
  const [pos, setPos] = useState(50)
  const [mode, setMode] = useState('slider')
  const id = useId()
  const phone = frame === 'phone'

  const chip = 'pointer-events-none absolute z-[2] rounded-full bg-navy-deep/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white md:text-[11px]'

  return (
    <figure className={`cs-compare ${className}`} data-mode={mode} aria-labelledby={`${id}-cap`}>
      <div className="cs-toggle mb-4 flex-wrap items-center justify-between gap-x-3 gap-y-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mist/65">{label}</p>
        <div role="group" aria-label={`${label}: view`} className="flex rounded-full border border-white/10 p-1">
          {[
            ['slider', 'Slider'],
            ['side', 'Side by side'],
          ].map(([value, text]) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
              className={`min-h-[36px] whitespace-nowrap rounded-full px-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors md:px-4 ${
                mode === value ? 'bg-white text-navy' : 'text-mist/70 hover:text-white'
              }`}
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      {/* slider */}
      <div className="cs-slider">
        <Frame phone={phone} domain={domain}>
          <div className="absolute inset-0 select-none" style={{ '--pos': `${pos}%` }}>
            <Shot slug={slug} image={after} alt={afterAlt} sizes={sizes} />
            <div className="absolute inset-0" style={{ clipPath: 'inset(0 calc(100% - var(--pos)) 0 0)' }}>
              <Shot slug={slug} image={before} alt={beforeAlt} sizes={sizes} />
            </div>
            <span className={`${chip} left-2 top-2 md:left-3 md:top-3`} aria-hidden="true">
              Before
            </span>
            <span className={`${chip} right-2 top-2 md:right-3 md:top-3`} aria-hidden="true">
              After
            </span>
            <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 z-[1] w-[2px] -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(6,20,36,.25)]" style={{ left: 'var(--pos)' }} />
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label={`${label}: drag to compare the original website (left) with the evolved website (right)`}
              aria-valuetext={`${pos}% original, ${100 - pos}% evolved`}
              className="cs-range absolute inset-x-0 top-1/2 z-[3] m-0 h-16 w-full -translate-y-1/2 cursor-ew-resize appearance-none bg-transparent opacity-0 [@media(pointer:fine)]:inset-y-0 [@media(pointer:fine)]:h-full [@media(pointer:fine)]:translate-y-0"
            />
            <span
              aria-hidden="true"
              className="cs-knob pointer-events-none absolute top-1/2 z-[2] grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-[0_6px_24px_-6px_rgba(0,0,0,.6)] md:h-12 md:w-12"
              style={{ left: 'var(--pos)' }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
              </svg>
            </span>
          </div>
        </Frame>
      </div>

      {/* side by side (also the no-JavaScript view) */}
      <div className={`cs-side grid gap-4 ${phone ? 'grid-cols-2 gap-3 sm:gap-6' : 'md:grid-cols-2 md:gap-5'}`}>
        {[
          ['Before', 'Original website', before, beforeAlt],
          ['After', 'Evolved website', after, afterAlt],
        ].map(([tag, text, image, alt]) => (
          <div key={tag}>
            <p className="mb-2.5 flex flex-wrap items-baseline gap-x-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-mist/65 md:tracking-[0.2em]">
              <span className="text-cyan">{tag}</span> {text}
            </p>
            <Frame phone={phone} domain={domain}>
              <Shot slug={slug} image={image} alt={alt} sizes={phone ? '(min-width: 1024px) 240px, 45vw' : '(min-width: 1280px) 600px, (min-width: 768px) 46vw, 92vw'} />
            </Frame>
          </div>
        ))}
      </div>

      <figcaption id={`${id}-cap`} className="mt-4 text-[13px] leading-relaxed text-mist/65">
        {caption}
      </figcaption>
    </figure>
  )
}
