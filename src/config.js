// ─────────────────────────────────────────────────────────────
// Site-wide settings. Update the contact details below before launch.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: 'Motion Digital Studio',
  tagline: 'Websites that move business forward.',
  url: 'https://motiondigitalstudio.com',

  // TODO: WhatsApp number in international format, digits only (e.g. 66812345678)
  whatsapp: '66000000000',
  // TODO: studio email address
  email: 'hello@motiondigitalstudio.com',

  // TODO: replace with the studio's profile URLs
  social: {
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
    tiktok: 'https://www.tiktok.com/',
  },
}

export const DEFAULT_WA_MESSAGE =
  "Hi Motion Digital Studio! I'd like to start a website project."

export function whatsappLink(message = DEFAULT_WA_MESSAGE) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`
}

export function mailtoLink(subject = 'New website project') {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`
}

export const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]
