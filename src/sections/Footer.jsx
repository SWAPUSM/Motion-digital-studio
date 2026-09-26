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

/** `base`: '' on the homepage; '/' on other pages, so section links lead back to it. */
export default function Footer({ base = '' }) {
  return (
    <footer className="relative overflow-hidden pb-[max(env(safe-area-inset-bottom),28px)] pt-14 md:pt-20">
      {/* glowing hairline + soft light, echoing the motion line */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
      <div aria-hidden="true" className="absolute left-1/2 top-0 h-56 w-[90%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(0,123,255,.16),transparent)]" />

      <div className="container-x relative">
        {/* Contact gets a column wide enough for the phone number and email on one line:
            phones: brand, Navigate | Services, Contact, Follow (full width rows);
            tablets: brand | Follow, then Navigate | Contact with Services below;
            lg+: four columns, Services under Contact. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[1fr_1.6fr_auto] md:grid-rows-[auto_auto_1fr] md:gap-x-10 lg:grid-cols-[1.5fr_0.9fr_1.1fr_auto] lg:grid-rows-[auto_1fr] lg:gap-y-8">
          {/* brand */}
          <div className="col-span-2 md:col-start-1 md:row-start-1 lg:col-span-1 lg:row-span-2">
            <div className="flex items-center gap-4">
              {/* official transparent "M" symbol (same asset as the header), uncropped */}
              <picture className="flex w-[88px] shrink-0 md:w-[104px]">
                <source type="image/avif" srcSet="/brand/motion-mark-128.avif 128w, /brand/motion-mark-256.avif 256w" sizes="(min-width: 768px) 104px, 88px" />
                <source type="image/webp" srcSet="/brand/motion-mark-128.webp 128w, /brand/motion-mark-256.webp 256w" sizes="(min-width: 768px) 104px, 88px" />
                <img src="/brand/motion-mark-256.png" width="1774" height="887" alt="" loading="lazy" decoding="async" className="block h-auto w-full object-contain" />
              </picture>
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

          <nav aria-label="Footer" className="md:col-start-1 md:row-start-2 md:row-span-2 lg:col-start-2 lg:row-start-1">
            <p className={heading}>Navigate</p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={base + l.href} className={link}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-start-2 md:row-start-3 lg:col-start-3 lg:row-start-2">
            <p className={heading}>Services</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href="/web-design-koh-samui/" className={link}>
                  Web Design Koh Samui
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 md:col-start-2 md:row-start-2 lg:col-start-3 lg:row-start-1">
            <p className={heading}>Contact</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`${link} inline-flex items-center gap-2`}>
                  <WhatsApp width="15" height="15" className="shrink-0 text-cyan" />
                  <span className="whitespace-nowrap">
                    <span className="sr-only">WhatsApp </span>
                    {SITE.phone}
                  </span>
                </a>
              </li>
              {HAS_EMAIL && (
                <li>
                  {/* fits on one line except around 1024–1279px, where it breaks before the @ */}
                  <a href={mailtoLink()} className={`${link} inline-flex max-w-full items-start gap-2`}>
                    <Mail width="15" height="15" className="mt-[3px] shrink-0 text-cyan" />
                    <span className="min-w-0 [overflow-wrap:anywhere]">
                      {SITE.email.split('@')[0]}
                      <wbr />@{SITE.email.split('@')[1]}
                    </span>
                  </a>
                </li>
              )}
            </ul>
          </div>

          {SOCIALS.length > 0 && (
            <div className="col-span-2 md:col-span-1 md:col-start-3 md:row-start-1 lg:col-start-4 lg:row-span-2">
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
