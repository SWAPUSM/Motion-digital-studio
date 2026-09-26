// Pre-renders the landing pages after `vite build`: renders each page with
// react-dom/server and writes the HTML into its dist/<page>/index.html, so search
// engines receive the full content without running JavaScript. The client bundle
// then hydrates it (src/<page>/main.jsx).
import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'

const PAGES = ['web-design-koh-samui', 'website-redesign']
const SERVER_ENTRY = { 'web-design-koh-samui': 'src/koh-samui/entry-server.jsx', 'website-redesign': 'src/website-redesign/entry-server.jsx' }

const root = fileURLToPath(new URL('..', import.meta.url))
const ssrOut = `${root}.ssr/`

await build({
  root,
  logLevel: 'warn',
  build: {
    ssr: true,
    outDir: ssrOut,
    emptyOutDir: true,
    rollupOptions: { input: Object.fromEntries(PAGES.map((p) => [p, SERVER_ENTRY[p]])) },
  },
})

for (const page of PAGES) {
  const { render } = await import(`${ssrOut}${page}.js`)
  const file = `${root}dist/${page}/index.html`
  const html = await readFile(file, 'utf8')
  if (!html.includes('<!--app-html-->')) throw new Error(`prerender: <!--app-html--> placeholder not found in ${file}`)
  await writeFile(file, html.replace('<!--app-html-->', render()))
  console.log(`prerendered /${page}/`)
}
await rm(ssrOut, { recursive: true, force: true })
