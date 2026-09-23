/**
 * The official Motion Digital Studio logo, rendered exactly as supplied
 * (resized/re-encoded only — never cropped, recoloured or redrawn).
 */
export default function Logo({ className = '', sizes = '160px', priority = false, alt = 'Motion Digital Studio — Websites that move business forward.' }) {
  return (
    <picture>
      <source type="image/avif" srcSet="/brand/motion-logo-480.avif 480w, /brand/motion-logo-960.avif 960w, /brand/motion-logo-1536.avif 1536w" sizes={sizes} />
      <source type="image/webp" srcSet="/brand/motion-logo-480.webp 480w, /brand/motion-logo-960.webp 960w, /brand/motion-logo-1536.webp 1536w" sizes={sizes} />
      <img
        src="/brand/motion-logo-960.jpg"
        width="1536"
        height="1024"
        alt={alt}
        className={`block h-auto w-full ${className}`}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        draggable="false"
      />
    </picture>
  )
}
