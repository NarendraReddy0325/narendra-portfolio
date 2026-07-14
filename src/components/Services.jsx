import { motion } from 'framer-motion'
import { services } from '../data'
import Reveal from './Reveal'

export default function Services() {
  return (
    <section id="services" className="relative py-20 md:py-28">
      <div className="container-px">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Services</span>
          <h2 className="font-display mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
            What I can help you build
          </h2>
          <p className="mt-4 text-lg text-muted">
            From a first impression to a shipped product — full-stack design, handled with care.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="h-full">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                className="card-surface h-full p-7"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-panel text-xl font-semibold text-accent">
                  0{i + 1}
                </div>

                <h3 className="font-display mt-6 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.desc}</p>

                <ul className="mt-6 space-y-2">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-sm text-muted">
                      <span className="h-1 w-1 rounded-full bg-accent" />
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
