import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { FAQS } from './src/data/content.js'
import { KS_FAQS } from './src/data/kohSamui.js'
import { RD_FAQS } from './src/data/redesign.js'

/**
 * FAQPage structured data, generated from the same questions each page renders, so
 * the schema always matches the visible FAQ word for word. Replaces the
 * <!-- faq-schema --> (homepage), <!-- faq-schema:koh-samui --> and
 * <!-- faq-schema:website-redesign --> placeholders.
 */
function faqSchema() {
  const script = (items) =>
    `<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })}</script>`
  return {
    name: 'faq-schema',
    transformIndexHtml: (html) =>
      html
        .replace('<!-- faq-schema -->', script(FAQS))
        .replace('<!-- faq-schema:koh-samui -->', script(KS_FAQS))
        .replace('<!-- faq-schema:website-redesign -->', script(RD_FAQS)),
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), faqSchema()],
  build: {
    target: 'es2020',
    cssMinify: true,
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        'web-design-koh-samui': fileURLToPath(new URL('./web-design-koh-samui/index.html', import.meta.url)),
        'website-redesign': fileURLToPath(new URL('./website-redesign/index.html', import.meta.url)),
      },
    },
  },
})
