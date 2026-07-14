import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data'
import Reveal from './Reveal'
import ProjectGallery from './ProjectGallery'

/** Lime chip for shipped work, outlined chip for concept work. */
function TypeTag({ type }) {
  const live = type === 'live'
  return (
    <span
      className={`absolute top-5 right-5 rounded-full px-3 py-1 text-xs font-medium backdrop-blur ${
        live ? 'bg-accent text-ink' : 'border border-white/40 bg-ink/40 text-white'
      }`}
    >
      {live ? 'Live' : 'Concept'}
    </span>
  )
}

/** The card artwork: gradient wash, optional real screenshot on top. */
function Artwork({ p }) {
  return (
    <div className={`relative aspect-[16/10] bg-gradient-to-br ${p.color}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
      <div className="grid-bg absolute inset-0 opacity-30 mix-blend-overlay" />

      {p.image && (
        <img
          src={p.image}
          alt={`${p.title} — ${p.category}`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      )}

      <span className="absolute top-5 left-5 rounded-full bg-ink/40 px-3 py-1 text-xs font-medium text-white backdrop-blur">
        {p.category}
      </span>

      <TypeTag type={p.type} />

      <span className="absolute right-5 bottom-5 grid h-12 w-12 place-items-center rounded-full bg-ink text-cream transition-transform duration-300 group-hover:scale-110">
        {p.type === 'live' ? '↗' : '⊞'}
      </span>
    </div>
  )
}

function Body({ p }) {
  return (
    <div className="flex items-start justify-between gap-4 p-6">
      <div>
        <h3 className="font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
          {p.title}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{p.desc}</p>
      </div>
      <span className="shrink-0 text-sm text-muted">{p.year}</span>
    </div>
  )
}

const lift = { type: 'spring', stiffness: 250, damping: 20 }

export default function Portfolio() {
  const [active, setActive] = useState(null)

  return (
    <section id="portfolio" className="container-px py-20 md:py-28">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="eyebrow">Portfolio</span>
          <h2 className="font-display mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
            Selected work
          </h2>
        </div>
        <p className="max-w-sm text-muted">
          Ten projects across commerce, product and brand. Live sites open in a new tab; concept
          work opens its design screens.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.1}>
            {p.type === 'live' ? (
              // Shipped work: go and use it.
              <motion.a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -6 }}
                transition={lift}
                className="card-surface group block h-full overflow-hidden"
              >
                <Artwork p={p} />
                <Body p={p} />
                <span className="sr-only">Opens {p.title} in a new tab</span>
              </motion.a>
            ) : (
              // Concept work: no live site exists, so open the screens instead
              // of sending anyone to a dead link.
              <motion.button
                type="button"
                onClick={() => setActive(p)}
                whileHover={{ y: -6 }}
                transition={lift}
                className="card-surface group block h-full w-full overflow-hidden text-left"
              >
                <Artwork p={p} />
                <Body p={p} />
                <span className="sr-only">View the {p.title} concept screens</span>
              </motion.button>
            )}
          </Reveal>
        ))}
      </div>

      <ProjectGallery project={active} onClose={() => setActive(null)} />
    </section>
  )
}
