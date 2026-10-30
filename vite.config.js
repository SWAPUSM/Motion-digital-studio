import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
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

/**
 * Build identifier in /build.txt (to confirm on a device which build is served): the commit
 * (MDS_BUILD_ID from the packaging script, whose source is a git archive without .git) and
 * the build time.
 */
const git = (cmd) => {
  try {
    return execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
  } catch {
    return ''
  }
}
const BUILD_ID = process.env.MDS_BUILD_ID || `${git('git rev-parse --short HEAD') || 'unknown'}${git('git status --porcelain') ? '+local' : ''}`

function buildId() {
  return {
    name: 'build-id',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'build.txt', source: `${BUILD_ID} · ${new Date().toISOString().slice(0, 19).replace('T', ' ')} UTC\n` })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), faqSchema(), buildId()],
  build: {
    target: 'es2020',
    cssMinify: true,
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        'web-design-koh-samui': fileURLToPath(new URL('./web-design-koh-samui/index.html', import.meta.url)),
        'website-redesign': fileURLToPath(new URL('./website-redesign/index.html', import.meta.url)),
        'projects/teddy-bike-samui': fileURLToPath(new URL('./projects/teddy-bike-samui/index.html', import.meta.url)),
      },
    },
  },
})
