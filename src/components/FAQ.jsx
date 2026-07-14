import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { faqs } from '../data'
import { Eyebrow, PillLink, Reveal } from './ui'

/** Dark panel on the left, accordion on the right. */
export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className="shell py-20 lg:py-28">
      <div className="grid gap-5 lg:grid-cols-12">
        <Reveal as="panel" className="lg:col-span-5">
          <div className="rounded-panel flex h-full flex-col items-center justify-center gap-7 bg-dark p-10 text-center text-white">
            <Eyebrow tone="dark">FAQ Questions</Eyebrow>
            <h2 className="max-w-[14ch] text-3xl font-semibold text-white sm:text-4xl">
              Got questions about working together?
            </h2>
            <PillLink
              href="#contact"
              className="[&_.pill]:bg-white [&_.pill]:text-ink [&_.pill-arrow]:bg-white [&_.pill-arrow]:text-ink"
            >
              Get In Touch
            </PillLink>
          </div>
        </Reveal>

        {/* The accordion list travels 50px — its own distance in the reference,
            between the card (40) and panel (60) groups. */}
        <Reveal as="list" delay={0.08} className="lg:col-span-7">
          <div className="space-y-3">
            {faqs.map((f, i) => {
              const isOpen = open === i

              return (
                <div key={f.q} className="card overflow-hidden">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                    >
                      <span className="font-medium text-ink">{f.q}</span>
                      <span
                        aria-hidden="true"
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-lg transition-all duration-300 ${
                          isOpen ? 'rotate-45 bg-deep text-white' : 'bg-surface text-body'
                        }`}
                      >
                        +
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[52ch] px-6 pb-6 text-sm leading-relaxed text-body">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
