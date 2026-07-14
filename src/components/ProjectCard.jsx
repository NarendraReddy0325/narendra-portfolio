import { Link } from 'react-router-dom'
import Media from './Media'
import { ImageReveal } from './Motion'

/** Live and concept work read differently at a glance — a filled teal mark for
 *  shipped, an outlined one for concept. Same shape, different weight. */
export function TypeTag({ type, className = '' }) {
  const live = type === 'live'
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-micro ${
        live ? 'text-accent' : 'text-ink-muted'
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${live ? 'bg-accent' : 'border border-ink-muted'}`}
      />
      {live ? 'Live' : 'Concept'}
    </span>
  )
}

/**
 * Grid card. The title sits *below* the image and hangs slightly left of the
 * image edge, so the type breaks the frame rather than sitting politely inside
 * a card. There is no card — no border, no radius, no shadow.
 */
export default function ProjectCard({ project, index, className = '', priority = false }) {
  const { slug, title, category, year, summary, thumbnail, type } = project

  return (
    <article className={`group relative ${className}`}>
      <Link
        to={`/work/${slug}`}
        className="block"
        data-cursor={type === 'live' ? 'View case' : 'View concept'}
      >
        <ImageReveal className="bg-paper-sunk">
          <Media
            src={thumbnail}
            alt={`${title} — ${category} project thumbnail`}
            caption={title}
            eager={priority}
            className="aspect-[4/3] w-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        </ImageReveal>

        <div className="relative -ml-1 flex items-start justify-between gap-6 pt-5 sm:-ml-3">
          <div>
            <h3 className="font-display text-[2rem] leading-none sm:text-[2.4rem]">
              <span className="link-draw">{title}</span>
            </h3>
            <p className="mt-3 max-w-[42ch] text-[0.95rem] leading-relaxed text-ink-muted">
              {summary}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2 pt-2">
            <span className="font-mono text-micro text-ink-faint">
              {index != null ? String(index + 1).padStart(2, '0') : year}
            </span>
            <TypeTag type={type} />
          </div>
        </div>

        <p className="mt-4 font-mono text-micro text-ink-faint">
          {category} — {year}
        </p>
      </Link>
    </article>
  )
}
