// Pre-renders /web-design-koh-samui/ after `vite build`: renders the page with
// react-dom/server and writes the HTML into dist/web-design-koh-samui/index.html,
// so search engines receive the full content without running JavaScript.
// The client bundle then hydrates it (src/koh-samui/main.jsx).
import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'

const root = fileURLToPath(new URL('..', import.meta.url))
const ssrOut = `${root}.ssr/`
const page = `${root}dist/web-design-koh-samui/index.html`

await build({
  root,
  logLevel: 'warn',
  build: { ssr: 'src/koh-samui/entry-server.jsx', outDir: ssrOut, emptyOutDir: true },
})
const { render } = await import(`${ssrOut}entry-server.js`)

const html = await readFile(page, 'utf8')
if (!html.includes('<!--app-html-->')) throw new Error('prerender: <!--app-html--> placeholder not found in ' + page)
await writeFile(page, html.replace('<!--app-html-->', render()))
await rm(ssrOut, { recursive: true, force: true })
console.log('prerendered /web-design-koh-samui/')
