/**
 * The folio rail.
 *
 * Every page hangs off a hairline margin column on the left, carrying running
 * metadata set sideways — the section name and its index. It's the magazine
 * folio mark, and it's what lets headlines and images overhang into the margin
 * elsewhere without the page losing its spine.
 *
 * The rail is a desktop device. Below lg it collapses to a horizontal eyebrow,
 * because a vertical rail on a 375px screen is decoration, not structure.
 */

export function Folio({ label, index, dark = false, children, className = '' }) {
  return (
    <div className={`folio ${dark ? 'on-deep' : ''} ${className}`}>
      {/* Desktop: the sideways mark on the rail. */}
      <div className="pointer-events-none absolute top-0 left-0 hidden h-full w-22 lg:block">
        <div className="sticky top-32 flex justify-center">
          <span
            className={`font-mono text-micro whitespace-nowrap ${
              dark ? 'text-ink-faint/70' : 'text-ink-faint'
            }`}
            style={{ writingMode: 'vertical-rl' }}
          >
            {label}
            {index && <span className="ml-6 tracking-[0.2em]">{index}</span>}
          </span>
        </div>
      </div>

      {/* Mobile: the same information, laid flat. */}
      <div className="flex items-center gap-3 px-6 pt-6 lg:hidden">
        <span className="font-mono text-micro text-ink-faint">{label}</span>
        <span className={`h-px flex-1 ${dark ? 'bg-deep-rule' : 'bg-rule'}`} />
        {index && <span className="font-mono text-micro text-ink-faint">{index}</span>}
      </div>

      {children}
    </div>
  )
}

/**
 * Content measure. Clears the rail on desktop and hangs the right edge short of
 * the viewport so full-bleed elements have somewhere to break out *to*.
 */
export function Shell({ children, className = '' }) {
  return <div className={`px-6 md:px-10 lg:pr-12 lg:pl-30 xl:pr-20 ${className}`}>{children}</div>
}
