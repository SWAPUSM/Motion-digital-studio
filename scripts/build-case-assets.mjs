// Builds a case study's public images from the founder's original captures.
//   npm run case-assets -- <masters folder> [slug]      (slug defaults to teddy-bike-samui)
// The masters stay outside the repository; scripts/case-studies/<slug>.json lists them
// with their SHA-256, and the build stops if any file differs by a single byte.
// Images are only resized (and, where the JSON says so, cropped at a section edge)
// then re-encoded as AVIF + WebP — never retouched. Output: public/projects/<slug>/,
// plus tiny blurred previews in src/data/case-placeholders.json.
import sharp from 'sharp'
import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'

const [srcArg, slug = 'teddy-bike-samui'] = process.argv.slice(2)
if (!srcArg) throw new Error('usage: npm run case-assets -- <masters folder> [slug]')
const SRC = resolve(srcArg)
const spec = JSON.parse(await readFile(new URL(`./case-studies/${slug}.json`, import.meta.url), 'utf8'))
const DIR = new URL(`../public/projects/${slug}/`, import.meta.url).pathname
await mkdir(DIR, { recursive: true })

const masters = {}
for (const [file, sha] of Object.entries(spec.masters)) {
  const buf = await readFile(join(SRC, file))
  const got = createHash('sha256').update(buf).digest('hex')
  if (got !== sha) throw new Error(`${file}: SHA-256 ${got} does not match ${sha}`)
  masters[file] = buf
}

const source = (master, crop) => {
  const img = sharp(masters[master], { limitInputPixels: false })
  return crop ? img.extract(crop) : img
}

const placeholderFile = new URL('../src/data/case-placeholders.json', import.meta.url)
const placeholders = JSON.parse(await readFile(placeholderFile, 'utf8').catch(() => '{}'))
for (const { name, master, crop, widths } of spec.images) {
  for (const w of widths) {
    const base = (await source(master, crop).png().toBuffer().then((b) => sharp(b))).resize({ width: w })
    await base.clone().avif({ quality: 55, effort: 6 }).toFile(`${DIR}${name}-${w}.avif`)
    await base.clone().webp({ quality: 78 }).toFile(`${DIR}${name}-${w}.webp`)
  }
  const tiny = await sharp(await source(master, crop).png().toBuffer()).resize({ width: 20 }).webp({ quality: 50 }).toBuffer()
  placeholders[`${slug}/${name}`] = `data:image/webp;base64,${tiny.toString('base64')}`
}

const { master, crop, size } = spec.og
await sharp(await source(master, crop).png().toBuffer())
  .resize({ width: size[0], height: size[1] })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(`${DIR}og-image.jpg`)

await writeFile(placeholderFile, JSON.stringify(placeholders, null, 2) + '\n')
console.log(`case assets built for ${slug}:`, spec.images.map((i) => i.name).join(', '), '+ og-image.jpg')
