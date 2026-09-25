import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { FAQS } from './src/data/content.js'

/**
 * FAQPage structured data, generated from the same FAQS the page renders, so the
 * schema always matches the visible questions and answers word for word.
 * Replaces the <!-- faq-schema --> placeholder in index.html.
 */
function faqSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  return {
    name: 'faq-schema',
    transformIndexHtml: (html) =>
      html.replace('<!-- faq-schema -->', `<script type="application/ld+json">${JSON.stringify(data)}</script>`),
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), faqSchema()],
  build: {
    target: 'es2020',
    cssMinify: true,
  },
})
