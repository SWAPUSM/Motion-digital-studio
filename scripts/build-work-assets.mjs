// Builds the portfolio image set in public/work/ from the master captures in
// scripts/work-masters/ (kept out of public/ so they are never deployed):
//   <slug>-desktop-master.webp  (7:4 desktop capture, ≥1600px wide)
//   <slug>-mobile-master.webp   (full iPhone screenshot, ≥780px wide)
// Outputs AVIF + WebP at two (desktop) or three (mobile) widths, plus tiny blurred
// previews that are inlined in src/data/placeholders.json (shown while the real image loads).
import sharp from 'sharp'
import { readdir, writeFile } from 'node:fs/promises'

const SRC = new URL('./work-masters/', import.meta.url).pathname
const DIR = new URL('../public/work/', import.meta.url).pathname
const SIZES = { desktop: [1600, 900], mobile: [780, 390, 200] }

const placeholders = {}
for (const file of (await readdir(SRC)).filter((f) => f.endsWith('-master.webp')).sort()) {
  const [, slug, kind] = file.match(/^(.*)-(desktop|mobile)-master\.webp$/)
  for (const w of SIZES[kind]) {
    const base = sharp(SRC + file).resize({ width: w })
    await base.clone().avif({ quality: 55, effort: 6 }).toFile(`${DIR}${slug}-${kind}-${w}.avif`)
    await base.clone().webp({ quality: 78 }).toFile(`${DIR}${slug}-${kind}-${w}.webp`)
  }
  const tiny = await sharp(SRC + file).resize({ width: 20 }).webp({ quality: 50 }).toBuffer()
  placeholders[`${slug}-${kind}`] = `data:image/webp;base64,${tiny.toString('base64')}`
}
await writeFile(new URL('../src/data/placeholders.json', import.meta.url), JSON.stringify(placeholders, null, 2) + '\n')
console.log('work assets built:', Object.keys(placeholders).join(', '))
