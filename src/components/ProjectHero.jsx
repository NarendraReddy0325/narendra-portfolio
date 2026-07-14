import { Link } from 'react-router-dom'
import { MaskLines, ImageReveal } from './Motion'
import { Shell } from './Folio'
import { BrowserFrame } from './DeviceFrame'
import Media from './Media'
import { TypeTag } from './ProjectCard'
import ExternalLinkCTA from './ExternalLinkCTA'

/**
 * Top of a case study.
 *
 * Live projects get browser chrome and the outbound CTA *here*, above the fold —
 * if someone wants to go see the real thing, making them read 800 words first is
 * a design failure. Concept projects get a plain plate and an explicit
 * "Concept / Unpublished design" label, so nothing on the page implies a
 * product that doesn't exist.
 */
export default function ProjectHero({ project }) {
  const { title, type, category, year, role, timeline, tools, summary, thumbnail, liveUrl } = project
  const isLive = type === 'live'

  const meta = [
    { k: 'Role', v: role },
    { k: 'Timeline', v: timeline },
    { k: 'Year', v: year },
    { k: 'Tools', v: tools?.join(', ') },
  ].filter((m) => m.v)

  return (
    <header className="pt-32 lg:pt-40">
      <Shell>
        <Link
          to="/work"
          className="link-draw font-mono text-micro text-ink-muted hover:text-accent"
          data-cursor="Back"
        >
          ← All work
        </Link>

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <TypeTag type={type} />
              <span className="font-mono text-micro text-ink-faint">{category}</span>
            </div>

            {/* Title is allowed to overhang the measure to the left. */}
            <h1 className="font-display mt-5 -ml-1 text-[3.25rem] sm:text-[4.5rem] lg:-ml-2 lg:text-[5.5rem]">
              <MaskLines lines={[title]} />
            </h1>

            {!isLive && (
              <p className="mt-5 inline-block border border-rule px-3 py-1.5 font-mono text-micro text-ink-muted">
                Concept — unpublished design
              </p>
            )}

            <p className="mt-7 max-w-[52ch] text-lead leading-[1.5] text-ink-muted">{summary}</p>

            {isLive && liveUrl && <ExternalLinkCTA href={liveUrl} title={title} className="mt-9" />}
          </div>

          {/* Metadata rail. Right-hand column on desktop, definition list on mobile. */}
          <dl className="grid grid-cols-2 gap-x-6 gap-y-6 self-start border-t border-rule pt-6 sm:grid-cols-4 lg:col-span-4 lg:grid-cols-1 lg:gap-y-5 lg:border-t-0 lg:pt-2">
            {meta.map(({ k, v }) => (
              <div key={k} className="lg:border-t lg:border-rule lg:pt-3">
                <dt className="font-mono text-micro text-ink-faint">{k}</dt>
                <dd className="mt-1.5 text-[0.95rem] leading-snug text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Shell>

      {/* Hero image. Full-bleed to the right edge — one of the places the grid
          is deliberately broken. */}
      <div className="mt-16 pl-6 md:pl-10 lg:mt-24 lg:pl-30">
        <ImageReveal>
          {isLive ? (
            <BrowserFrame src={thumbnail} alt={`${title} homepage`} url={liveUrl} caption={title} eager />
          ) : (
            <Media
              src={thumbnail}
              alt={`${title} — key screen`}
              caption={title}
              eager
              className="aspect-[16/9] w-full bg-paper-sunk object-cover"
            />
          )}
        </ImageReveal>
      </div>
    </header>
  )
}
