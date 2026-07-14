/**
 * Outbound link to a shipped site.
 *
 * The one place the accent gets used as a fill. It's a bar, not a pill — and the
 * arrow travels on hover so the affordance says "leaving this page", which is
 * exactly what it does. Screen readers get the destination spelled out.
 */
export default function ExternalLinkCTA({ href, title, className = '' }) {
  let host = ''
  try {
    host = new URL(href).hostname.replace(/^www\./, '')
  } catch {
    host = href
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="Live site"
      className={`group inline-flex items-center gap-5 bg-accent py-4 pr-5 pl-6 text-paper transition-colors duration-400 hover:bg-accent-lift ${className}`}
    >
      <span className="flex flex-col gap-0.5 text-left">
        <span className="font-mono text-micro text-paper/70">{host}</span>
        <span className="font-display-sm text-[1.25rem]">View live site</span>
      </span>

      <span
        aria-hidden="true"
        className="translate-x-0 text-[1.4rem] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 group-hover:-translate-y-1"
      >
        ↗
      </span>

      <span className="sr-only">— {title}, opens in a new tab</span>
    </a>
  )
}
