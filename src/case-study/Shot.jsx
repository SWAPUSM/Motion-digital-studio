import PLACEHOLDERS from '../data/case-placeholders.json'

/**
 * One authentic capture from public/projects/<slug>/, as AVIF + WebP at the widths the
 * asset build produced. Explicit width/height keep the layout stable while it loads; the
 * tiny blurred preview shows in the meantime.
 */
export default function Shot({ slug, image, alt, sizes, priority = false, className = '', fill = true }) {
  const { name, widths, w, h } = image
  const set = (ext) => widths.map((x) => `/projects/${slug}/${name}-${x}.${ext} ${x}w`).join(', ')
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <img
        src={`/projects/${slug}/${name}-${widths[widths.length - 1]}.webp`}
        srcSet={set('webp')}
        sizes={sizes}
        alt={alt}
        width={w}
        height={h}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding={priority ? 'sync' : 'async'}
        draggable="false"
        className={`block bg-[#eceee9] bg-cover bg-top ${fill ? 'absolute inset-0 h-full w-full object-cover object-top' : 'h-auto w-full'} ${className}`}
        style={{ backgroundImage: `url(${PLACEHOLDERS[`${slug}/${name}`]})` }}
      />
    </picture>
  )
}
