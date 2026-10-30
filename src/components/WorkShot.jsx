import PLACEHOLDERS from '../data/placeholders.json'

/**
 * Portfolio captures of the live websites (public/work/, built by `npm run work-assets`
 * from scripts/work-masters/): a tablet capture with the browser bar cropped off, and an
 * iPhone capture with the status bar and Safari toolbar cropped off. Nothing else edited.
 */
export const WORK_SHOT = {
  tablet: { widths: [768, 1152, 1536], w: 1536, h: 876, screen: 'aspect-[1536/876]' },
  mobile: { widths: [260, 520, 780], w: 780, h: 1405, screen: 'aspect-[1290/2323]' },
}

/** AVIF with WebP fallback, chosen by `sizes`; a 20px blurred preview shows until it loads. */
export default function WorkShot({ slug, kind, alt, sizes, loading = 'lazy', fetchPriority }) {
  const { widths, w, h } = WORK_SHOT[kind]
  const set = (ext) => widths.map((x) => `/work/${slug}-${kind}-${x}.${ext} ${x}w`).join(', ')
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <img
        src={`/work/${slug}-${kind}-${widths[1]}.webp`}
        srcSet={set('webp')}
        sizes={sizes}
        alt={alt}
        width={w}
        height={h}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        draggable="false"
        className="absolute inset-0 block h-full w-full bg-navy-soft bg-cover bg-top object-cover object-top"
        style={{ backgroundImage: `url(${PLACEHOLDERS[`${slug}-${kind}`]})` }}
      />
    </picture>
  )
}
