import { testimonials } from '../data'
import Reveal from './Reveal'

/* NOTE: the quotes in src/data.js are placeholders with placeholder names.
   Replace them with real client quotes before publishing, or delete
   <Testimonials /> from App.jsx and this section disappears cleanly. */
export default function Testimonials() {
  return (
    <section className="container-px py-20 md:py-28">
      <Reveal className="max-w-2xl">
        <span className="eyebrow">Testimonials</span>
        <h2 className="font-display mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
          What clients say
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 0.1} className="h-full">
            <figure className="card-surface flex h-full flex-col p-8">
              <div className="text-accent" aria-label="Five out of five">
                ★★★★★
              </div>

              <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-cream/90">
                “{t.quote}”
              </blockquote>

              <figcaption className="mt-6 border-t border-line pt-5">
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-muted">{t.role}</div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
