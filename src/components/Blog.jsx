import { posts } from '../data'
import { Eyebrow, Media, Reveal, Roll } from './ui'

/**
 * Blog cards.
 *
 * Hover darkens the cover and slides a "View Details" pill up into the middle
 * of it — in the reference the button sits at `top: 160px, opacity: 0` and moves
 * to `top: 50%` on hover. Cards travel 60px on scroll, same as project rows.
 *
 * Posts without an `href` render inert. A card that looks clickable and goes
 * nowhere is worse than one that doesn't pretend.
 */
export default function Blog() {
  return (
    <section id="blog" className="shell py-20 lg:py-28">
      <Reveal className="flex flex-col items-center text-center">
        <Eyebrow>Latest Articles</Eyebrow>
        <h2 className="mt-5 max-w-[14ch] text-3xl font-semibold sm:text-5xl">
          Where strategy meets creativity
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {posts.map((p, i) => {
          const linked = Boolean(p.href)

          return (
            <Reveal key={p.title} as="panel" delay={i * 0.08} className="h-full">
              <article className="card group h-full p-3">
                <div className="relative overflow-hidden rounded-[1.25rem]">
                  <Media
                    src={p.image}
                    alt={`${p.title} — article cover`}
                    rounded=""
                    className="aspect-[16/10] w-full object-cover"
                  />

                  {linked && (
                    <>
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-ink/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      />
                      {/* Rises from below centre into place. */}
                      <span className="pointer-events-none absolute top-1/2 left-1/2 flex -translate-x-1/2 translate-y-8 items-center gap-2 rounded-[10px] bg-card px-5 py-3 text-sm font-medium text-ink opacity-0 transition-all duration-500 ease-[cubic-bezier(0.44,0,0.56,1)] group-hover:-translate-y-1/2 group-hover:opacity-100">
                        View Details
                        <span aria-hidden="true">→</span>
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-center justify-between gap-4 px-3 py-4">
                  <h3 className="text-lg font-semibold">
                    {linked ? (
                      <a href={p.href} target="_blank" rel="noopener noreferrer" className="group">
                        <Roll>{p.title}</Roll>
                      </a>
                    ) : (
                      p.title
                    )}
                  </h3>
                  <span className="chip shrink-0">{linked ? p.tag : 'Coming soon'}</span>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
