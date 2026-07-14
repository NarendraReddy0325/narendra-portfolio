import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { testimonials } from '../data'
import { Eyebrow, Media, Reveal } from './ui'

/* NOTE: the quotes in src/data.js are invented placeholders with placeholder
   names. Replace them with real client quotes before publishing, or delete
   <Testimonials /> from App.jsx — the section disappears cleanly. */
export default function Testimonials() {
  const [i, setI] = useState(0)
  const t = testimonials[i]

  return (
    <section className="shell py-20 lg:py-28">
      <Reveal className="flex flex-col items-center text-center">
        <Eyebrow>Client Feedback</Eyebrow>
        <h2 className="mt-5 max-w-[18ch] text-3xl font-semibold sm:text-5xl">
          Trusted by ambitious teams worldwide
        </h2>
      </Reveal>

      {/* Testimonial + pricing cards arrive at scale 0.7 in the reference —
          markedly smaller than anything else, so they pop rather than slide. */}
      <Reveal as="pop" className="mt-14">
        <div className="card grid gap-6 p-5 sm:p-7 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col justify-between">
            <div>
              <span className="pill pointer-events-none text-xs">Customer Stories</span>

              {/* Crossfade between quotes; the card height is held by the grid. */}
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-7 max-w-[42ch] text-lg leading-relaxed text-body"
                >
                  {t.quote}

                  <footer className="mt-8">
                    <div className="font-semibold text-ink">{t.name}</div>
                    <div className="mt-0.5 text-sm text-faint">{t.role}</div>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Dots. Real buttons, so this is keyboard-operable. */}
            <div className="mt-10 flex gap-2">
              {testimonials.map((_, n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setI(n)}
                  aria-label={`Show testimonial ${n + 1} of ${testimonials.length}`}
                  aria-current={n === i}
                  className={`h-9 w-9 rounded-full transition-colors duration-300 ${
                    n === i ? 'bg-deep' : 'bg-surface hover:bg-line'
                  }`}
                />
              ))}
            </div>
          </div>

          <Media
            src={t.image}
            alt=""
            className="aspect-[4/3] w-full object-cover lg:aspect-auto lg:min-h-[20rem]"
          />
        </div>
      </Reveal>
    </section>
  )
}
