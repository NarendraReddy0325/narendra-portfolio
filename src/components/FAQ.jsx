import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { faqs } from '../data'
import Reveal from './Reveal'

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className="container-px py-20 md:py-28">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <span className="eyebrow">FAQ</span>
          <h2 className="font-display mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
            Questions, answered
          </h2>
          <p className="mt-4 text-muted">
            Everything worth knowing before we start working together.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-card/70">
            {faqs.map((f, i) => {
              const isOpen = open === i

              return (
                <div key={f.q}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="font-medium text-cream">{f.q}</span>
                      <span
                        aria-hidden="true"
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-lg transition-transform duration-300 ${
                          isOpen ? 'rotate-45 bg-accent text-ink' : 'text-muted'
                        }`}
                      >
                        +
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 leading-relaxed text-muted">{f.a}</p>
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
