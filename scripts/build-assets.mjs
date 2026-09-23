// Generates web-optimised versions of the official logo.
// The artwork itself is never altered — only resized / re-encoded,
// and (for square icons) centred on a matching navy canvas.
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const SRC = new URL('./logo-source.png', import.meta.url).pathname
const OUT = new URL('../public/brand/', import.meta.url).pathname
await mkdir(OUT, { recursive: true })

for (const w of [480, 960, 1536]) {
  await sharp(SRC).resize({ width: w }).webp({ quality: 86 }).toFile(`${OUT}motion-logo-${w}.webp`)
  await sharp(SRC).resize({ width: w }).avif({ quality: 60 }).toFile(`${OUT}motion-logo-${w}.avif`)
}
// JPEG fallback for browsers without AVIF/WebP
await sharp(SRC).resize({ width: 960 }).jpeg({ quality: 88 }).toFile(`${OUT}motion-logo-960.jpg`)
// Social share image (1200x630), logo centred on its own navy tone
await sharp(SRC).resize({ height: 630 }).extend({ left: 128, right: 127, background: '#000817' })
  .resize(1200, 630).jpeg({ quality: 88 }).toFile(`${OUT}og-image.jpg`)
// Square icons: full logo, letterboxed on navy
for (const s of [32, 180]) {
  await sharp(SRC).resize({ width: s, height: s, fit: 'contain', background: '#000817' })
    .png().toFile(`${OUT}icon-${s}.png`)
}
console.log('assets done')
