// Web versions of the official Motion "M" symbol (transparent PNG supplied by the
// client). Resized and re-encoded only — never cropped, recoloured or redrawn.
import sharp from 'sharp'

const SRC = new URL('./mark-source.png', import.meta.url).pathname
const OUT = new URL('../public/brand/', import.meta.url).pathname

for (const w of [128, 256]) {
  const img = sharp(SRC).resize({ width: w })
  await img.clone().avif({ quality: 70 }).toFile(`${OUT}motion-mark-${w}.avif`)
  await img.clone().webp({ quality: 90, alphaQuality: 100 }).toFile(`${OUT}motion-mark-${w}.webp`)
}
await sharp(SRC).resize({ width: 256 }).png({ compressionLevel: 9 }).toFile(`${OUT}motion-mark-256.png`)
console.log('mark built')
