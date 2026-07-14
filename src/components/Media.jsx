import { useState } from 'react'

/**
 * Lazy image with a typographic fallback.
 *
 * Until you drop your real files into public/images/<slug>/, none of the
 * referenced images exist. Rather than showing broken-image icons, this falls
 * back to a composed plate carrying the caption — so the layout can be judged
 * on its proportions right now, and every image silently swaps in as soon as
 * the real file lands at the path in projects.js. No code change needed.
 */
export default function Media({ src, alt, caption, className = '', imgClassName = '', eager = false }) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return (
      <div
        className={`relative flex items-end bg-paper-sunk ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-3 border border-rule/70" aria-hidden="true" />
        <div className="relative z-10 p-5 sm:p-7">
          <p className="font-mono text-micro text-ink-faint">Awaiting image</p>
          <p className="font-display-sm mt-1 text-[1.35rem] text-ink-muted">{caption ?? alt}</p>
        </div>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={`${className} ${imgClassName}`}
    />
  )
}
