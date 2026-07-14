import { motion } from 'framer-motion'
import { posts } from '../data'
import Reveal from './Reveal'

/* Posts without an `href` in data.js render as inert cards rather than links —
   a card that looks clickable and goes nowhere is worse than one that doesn't
   pretend. Add `href` to a post and it becomes a real link automatically. */
export default function Blog() {
  return (
    <section id="blog" className="container-px py-20 md:py-28">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="eyebrow">Blog</span>
          <h2 className="font-display mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
            Latest writing
          </h2>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {posts.map((p, i) => {
          const linked = Boolean(p.href)

          return (
            <Reveal key={p.title} delay={i * 0.1} className="h-full">
              <motion.article
                whileHover={linked ? { y: -6 } : undefined}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                className="card-surface group h-full overflow-hidden"
              >
                <div className="relative aspect-[16/10] bg-gradient-to-br from-panel to-card">
                  <div className="grid-bg absolute inset-0 opacity-40" />
                  <span className="absolute top-5 left-5 rounded-full border border-line bg-ink/60 px-3 py-1 text-xs text-muted backdrop-blur">
                    {p.tag}
                  </span>
                </div>

                <div className="p-6">
                  <p className="text-sm text-muted">{p.date}</p>

                  <h3 className="font-display mt-2 text-xl leading-snug font-semibold tracking-tight transition-colors group-hover:text-accent">
                    {linked ? (
                      <a href={p.href} target="_blank" rel="noopener noreferrer">
                        {p.title}
                      </a>
                    ) : (
                      p.title
                    )}
                  </h3>

                  <span className="mt-4 inline-flex items-center gap-2 text-sm text-accent">
                    {linked ? 'Read article →' : 'Coming soon'}
                  </span>
                </div>
              </motion.article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
