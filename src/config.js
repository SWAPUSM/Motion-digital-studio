// ─────────────────────────────────────────────────────────────
// Site-wide settings. Update the contact details below before launch.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: 'Motion Digital Studio',
  tagline: 'Websites that move business forward.',
  url: 'https://motiondigitalstudio.netlify.app',

  // TODO (required): WhatsApp number in international format, digits only
  // (e.g. 66812345678). Every "Start your project" button opens this chat.
  whatsapp: '66000000000',

  // Optional contact details. Leave empty until real — anything empty is simply
  // not shown (no "Email us" link, no social icons), so nothing fake goes live.
  email: '',
  social: {
    instagram: '', // e.g. 'https://www.instagram.com/motiondigitalstudio'
    facebook: '',
    tiktok: '',
  },
}

export const HAS_EMAIL = Boolean(SITE.email)

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
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]
