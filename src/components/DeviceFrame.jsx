import Media from './Media'

/**
 * Browser chrome for live sites. The point is context: a shipped product is
 * shown as a thing that exists at a URL, so the address bar carries the real
 * domain. Concept work never gets this frame — that distinction is the whole
 * reason the component exists.
 */
export function BrowserFrame({ src, alt, url, caption, className = '', eager = false }) {
  let host = ''
  try {
    host = url ? new URL(url).hostname.replace(/^www\./, '') : ''
  } catch {
    host = url ?? ''
  }

  return (
    <figure className={`bg-paper-sunk shadow-[0_1px_0_var(--color-rule)] ${className}`}>
      <div className="flex items-center gap-3 border-b border-rule px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-rule" />
          <span className="h-2 w-2 rounded-full bg-rule" />
          <span className="h-2 w-2 rounded-full bg-rule" />
        </span>
        {host && (
          <span className="truncate bg-paper px-3 py-1 font-mono text-micro tracking-[0.06em] text-ink-faint normal-case">
            {host}
          </span>
        )}
      </div>
      <Media
        src={src}
        alt={alt}
        caption={caption}
        eager={eager}
        className="aspect-[16/10] w-full object-cover object-top"
      />
    </figure>
  )
}

/**
 * Phone frame for mobile-first concept work.
 */
export function PhoneFrame({ src, alt, caption, className = '' }) {
  return (
    <figure className={`mx-auto w-full max-w-[300px] ${className}`}>
      <div className="rounded-[2rem] border border-rule bg-paper-sunk p-2.5">
        <div className="relative overflow-hidden rounded-[1.5rem]">
          <span
            className="absolute top-2 left-1/2 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-ink/15"
            aria-hidden="true"
          />
          <Media
            src={src}
            alt={alt}
            caption={caption}
            className="aspect-[9/19] w-full object-cover object-top"
          />
        </div>
      </div>
    </figure>
  )
}
