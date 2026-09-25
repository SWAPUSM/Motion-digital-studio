// Browser / device icons from the official standalone "M" (the transparent PNG
// supplied by the client, also used by the intro, header and footer).
// The M is only resized and centred on a square canvas — never cropped,
// recoloured or redrawn. Home-screen icons sit on the brand navy.
import { writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const SRC = new URL('./mark-source.png', import.meta.url).pathname
const PUBLIC = new URL('../public/', import.meta.url).pathname
const NAVY = '#061424'
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 }

/** The whole M (2:1) fitted into a size×size square, `inset` = M width / square. */
async function icon(size, { inset = 0.94, background = CLEAR } = {}) {
  const w = Math.round(size * inset)
  const mark = await sharp(SRC).resize({ width: w }).png().toBuffer()
  const { height: h } = await sharp(mark).metadata()
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: mark, left: Math.round((size - w) / 2), top: Math.round((size - h) / 2) }])
    .png({ compressionLevel: 9 })
    .toBuffer()
}

// favicon.ico: 16/32/48 PNG images in one ICO container
const sizes = [16, 32, 48]
const pngs = await Promise.all(sizes.map((s) => icon(s, { inset: 1 })))
const header = Buffer.alloc(6 + 16 * sizes.length)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(sizes.length, 4)
let offset = header.length
sizes.forEach((s, i) => {
  const e = 6 + 16 * i
  header.writeUInt8(s, e)
  header.writeUInt8(s, e + 1)
  header.writeUInt16LE(1, e + 4) // colour planes
  header.writeUInt16LE(32, e + 6) // bits per pixel
  header.writeUInt32LE(pngs[i].length, e + 8)
  header.writeUInt32LE(offset, e + 12)
  offset += pngs[i].length
})
await writeFile(`${PUBLIC}favicon.ico`, Buffer.concat([header, ...pngs]))

// transparent PNG favicons (Google uses a multiple of 48px)
await writeFile(`${PUBLIC}brand/favicon-48.png`, await icon(48, { inset: 1 }))
await writeFile(`${PUBLIC}brand/favicon-96.png`, await icon(96, { inset: 1 }))

// home-screen icons on navy (iOS fills transparency with black)
await writeFile(`${PUBLIC}brand/apple-touch-icon.png`, await icon(180, { inset: 0.8, background: NAVY }))
await writeFile(`${PUBLIC}brand/icon-192.png`, await icon(192, { inset: 0.8, background: NAVY }))
await writeFile(`${PUBLIC}brand/icon-512.png`, await icon(512, { inset: 0.8, background: NAVY }))

console.log('icons built')
