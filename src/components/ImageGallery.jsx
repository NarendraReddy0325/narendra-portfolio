import Media from './Media'
import { ImageReveal } from './Motion'
import { Shell } from './Folio'

/**
 * Gallery for concept work — where the Figma screens are the point of the page.
 *
 * The rhythm alternates deliberately rather than running a uniform grid: a
 * contained screen sits in the measure with room to breathe, then the next one
 * breaks full-bleed to the right edge. Reading a static gallery should still
 * feel like it has a tempo.
 *
 * Pattern repeats every 3: contained / full-bleed / offset-right.
 */
export default function ImageGallery({ images = [], title }) {
  if (!images.length) return null

  return (
    <section aria-label={`${title} — design screens`} className="mt-28 lg:mt-40">
      <Shell className="mb-12">
        <p className="font-mono text-micro text-ink-faint">
          Screens — {String(images.length).padStart(2, '0')}
        </p>
      </Shell>

      <div className="space-y-16 lg:space-y-28">
        {images.map((src, i) => {
          const beat = i % 3

          // Full-bleed: escapes the shell to the right viewport edge.
          if (beat === 1) {
            return (
              <div key={src} className="pl-6 md:pl-10 lg:pl-30">
                <ImageReveal>
                  <Media
                    src={src}
                    alt={`${title} — screen ${i + 1} of ${images.length}`}
                    caption={`${title} — screen ${i + 1}`}
                    className="aspect-[16/9] w-full bg-paper-sunk object-cover"
                  />
                </ImageReveal>
                <p className="mt-4 font-mono text-micro text-ink-faint">
                  {String(i + 1).padStart(2, '0')}
                </p>
              </div>
            )
          }

          // Offset: sits in the right two-thirds, leaving a deliberate void.
          if (beat === 2) {
            return (
              <Shell key={src}>
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <div className="lg:col-span-8 lg:col-start-5">
                    <ImageReveal>
                      <Media
                        src={src}
                        alt={`${title} — screen ${i + 1} of ${images.length}`}
                        caption={`${title} — screen ${i + 1}`}
                        className="aspect-[4/3] w-full bg-paper-sunk object-cover"
                      />
                    </ImageReveal>
                    <p className="mt-4 font-mono text-micro text-ink-faint">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                  </div>
                </div>
              </Shell>
            )
          }

          // Contained.
          return (
            <Shell key={src}>
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-10">
                  <ImageReveal>
                    <Media
                      src={src}
                      alt={`${title} — screen ${i + 1} of ${images.length}`}
                      caption={`${title} — screen ${i + 1}`}
                      className="aspect-[16/10] w-full bg-paper-sunk object-cover"
                    />
                  </ImageReveal>
                  <p className="mt-4 font-mono text-micro text-ink-faint">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                </div>
              </div>
            </Shell>
          )
        })}
      </div>
    </section>
  )
}
