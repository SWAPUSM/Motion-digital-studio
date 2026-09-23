import Logo from '../components/Logo.jsx'
import { Facebook, Instagram, TikTok } from '../components/Icons.jsx'
import { NAV_LINKS, SITE } from '../config.js'

const SOCIALS = [
  { label: 'Instagram', href: SITE.social.instagram, Icon: Instagram },
  { label: 'Facebook', href: SITE.social.facebook, Icon: Facebook },
  { label: 'TikTok', href: SITE.social.tiktok, Icon: TikTok },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[.06] pb-[max(env(safe-area-inset-bottom),28px)] pt-16 md:pt-20">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr] md:gap-8">
          <div>
            <div className="w-[220px] overflow-hidden rounded-2xl ring-1 ring-white/[.06] md:w-[260px]">
              <Logo sizes="260px" />
            </div>
            <p className="mt-6 text-[15px] font-semibold text-white">{SITE.name}</p>
            <p className="mt-1 text-[14px] text-mist/60">{SITE.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow text-mist/55">Navigate</p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[14px] font-medium text-mist/75 transition-colors hover:text-cyan">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-mist/55">Follow</p>
            <ul className="mt-5 flex gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener"
                    aria-label={label}
                    className="grid h-12 w-12 place-items-center rounded-full border border-white/10 text-mist/80 transition-all duration-500 hover:-translate-y-1 hover:border-cyan/60 hover:bg-cyan/10 hover:text-cyan"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[12px] font-semibold uppercase tracking-[0.3em] text-mist/60">Thailand • Worldwide</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/[.06] pt-6 text-[12px] text-mist/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <a href="#top" className="transition-colors hover:text-white">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
