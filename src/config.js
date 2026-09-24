// ─────────────────────────────────────────────────────────────
// Site-wide settings. Update the contact details below before launch.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: 'Motion Digital Studio',
  tagline: 'Websites that move business forward.',
  url: 'https://motiondigitalstudio.com',

  // WhatsApp number in international format, digits only (+66 99 842 2004).
  // Every "Start your project" button opens this chat.
  whatsapp: '66998422004',

  // Anything left empty is simply not shown (no "Email us" link, no social icon).
  email: 'motiondigitalstudioth@gmail.com',
  social: {
    instagram: 'https://www.instagram.com/motiondigital.studio/',
    facebook: 'https://www.facebook.com/share/1EnTocKk83/',
    tiktok: 'https://www.tiktok.com/@motiondigital.studio',
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
