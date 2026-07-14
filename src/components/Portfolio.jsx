import { useState } from 'react'
import { projects } from '../data'
import { Eyebrow, Media, PillButton, PillLink, Reveal } from './ui'
import Lightbox from './Lightbox'

/**
 * The numbered project rows.
 *
 * Each is a white card: title top-left, an oversized ghost index top-right, the
 * description and CTA bottom-left, artwork filling the right half.
 *
 * The artwork sits at scale(1.05) and settles to 1 on hover, while a dark
 * overlay fades in over it — both lifted from the reference, where the image
 * wrapper carries `transform: scale(1.05)` and the overlay sits at opacity 0.
 * The button's label rolls at the same time.
 */
export default function Portfolio() {
  const [active, setActive] = useState(null)

  return (
    <section id="portfolio" className="shell py-20 lg:py-28">
      <Reveal className="flex flex-col items-center text-center">
        <Eyebrow>My Portfolio</Eyebrow>
        <h2 className="mt-5 max-w-[16ch] text-3xl font-semibold sm:text-5xl">
          Projects That Delivered Real Impact
        </h2>
      </Reveal>

      <div className="mt-14 space-y-5">
        {projects.map((p, i) => {
          const isLive = p.type === 'live'

          return (
            // Project rows travel 60px — twice the text distance. The heavier
            // the block, the further it moves.
            <Reveal key={p.title} as="panel">
              <article className="card group grid gap-6 p-5 sm:p-7 lg:grid-cols-2 lg:gap-10 lg:p-8">
                <div className="flex min-h-[16rem] flex-col lg:min-h-[20rem]">
                  <div className="flex items-start justify-between gap-6">
                    <h3 className="text-2xl font-semibold sm:text-3xl">{p.title}</h3>
                    <span
                      aria-hidden="true"
                      className="text-4xl leading-none font-semibold tracking-tight text-line select-none sm:text-5xl"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {!isLive && <span className="chip mt-4 self-start">Concept — unpublished</span>}

                  <p className="mt-auto max-w-[46ch] pt-8 text-sm leading-relaxed text-body">
                    {p.desc}
                  </p>

                  <div className="mt-7">
                    {isLive ? (
                      <PillLink href={p.url} external>
                        Explore Project
                      </PillLink>
                    ) : (
                      // No live site exists, so open the screens instead of
                      // sending anyone to a link that goes nowhere.
                      <PillButton onClick={() => setActive(p)}>View Screens</PillButton>
                    )}
                  </div>
                </div>

                {/* Artwork. Overflow-clipped so the 1.05 → 1 settle reads as the
                    image easing into its frame rather than the frame growing. */}
                <div className="rounded-card relative overflow-hidden">
                  <Media
                    src={p.image}
                    alt={`${p.title} — project preview`}
                    rounded=""
                    className="h-full w-full scale-[1.05] object-cover transition-transform duration-700 ease-[cubic-bezier(0.44,0,0.56,1)] group-hover:scale-100 aspect-[4/3] lg:aspect-auto lg:min-h-[20rem]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-ink/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>

      <Lightbox project={active} onClose={() => setActive(null)} />
    </section>
  )
}
