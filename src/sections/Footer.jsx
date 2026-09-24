import Logo from '../components/Logo.jsx'
import { Facebook, Instagram, Mail, TikTok, WhatsApp } from '../components/Icons.jsx'
import { HAS_EMAIL, NAV_LINKS, SITE, mailtoLink, whatsappLink } from '../config.js'

// Only profiles that are actually configured are shown — never placeholders.
const SOCIALS = [
  { label: 'Instagram', href: SITE.social.instagram, Icon: Instagram },
  { label: 'Facebook', href: SITE.social.facebook, Icon: Facebook },
  { label: 'TikTok', href: SITE.social.tiktok, Icon: TikTok },
].filter((s) => s.href)

const heading = 'text-[10px] font-semibold uppercase tracking-[0.3em] text-mist/55'
const link = 'text-[14px] font-medium text-mist/75 transition-colors duration-300 hover:text-cyan'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden pb-[max(env(safe-area-inset-bottom),28px)] pt-14 md:pt-20">
      {/* glowing hairline + soft light, echoing the motion line */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
      <div aria-hidden="true" className="absolute left-1/2 top-0 h-56 w-[90%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(0,123,255,.16),transparent)]" />

      <div className="container-x relative">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[1.5fr_1fr_1fr_auto] md:gap-10">
          {/* brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-4">
              <span className="block w-[88px] shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/[.08] md:w-[104px]">
                <Logo sizes="104px" alt="Motion Digital Studio logo" />
              </span>
              <div>
                <p className="text-[15px] font-extrabold uppercase tracking-[0.2em] text-white md:text-[16px]">Motion Digital Studio</p>
                <p className="mt-1.5 text-[13.5px] text-mist/65">{SITE.tagline}</p>
              </div>
            </div>
            <p className="mt-7 text-[12px] font-bold uppercase leading-[1.7] tracking-[0.22em] text-white/85">
              Based in Thailand.
              <br />
              <span className="text-gradient">Building worldwide.</span>
            </p>
          </div>

          <nav aria-label="Footer">
            <p className={heading}>Navigate</p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={link}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={heading}>Contact</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`${link} inline-flex items-center gap-2`}>
                  <WhatsApp width="15" height="15" className="text-cyan" /> WhatsApp
                </a>
              </li>
              {HAS_EMAIL && (
                <li>
                  <a href={mailtoLink()} className={`${link} inline-flex items-center gap-2`}>
                    <Mail width="15" height="15" className="text-cyan" /> Email
                  </a>
                </li>
              )}
            </ul>
          </div>

          {SOCIALS.length > 0 && (
            <div className="col-span-2 md:col-span-1">
              <p className={heading}>Follow</p>
              <ul className="mt-4 flex gap-3">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} (opens in a new tab)`}
                      className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-mist/80 transition-all duration-500 hover:-translate-y-0.5 hover:border-cyan/60 hover:bg-cyan/10 hover:text-cyan hover:shadow-[0_0_20px_rgba(0,209,255,.25)]"
                    >
                      <Icon />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[.06] pt-6 text-[12px] text-mist/55 sm:flex-row sm:items-center sm:justify-between md:mt-16">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <a href="#top" className="inline-flex min-h-[32px] items-center transition-colors hover:text-white">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
