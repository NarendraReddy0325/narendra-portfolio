import { motion } from 'framer-motion'
import { posts } from '../data'
import { Eyebrow, Media, Reveal } from './ui'

/* Posts without an `href` render as inert cards. A card that looks clickable
   and goes nowhere is worse than one that doesn't pretend. Add `href` in
   data.js and the card becomes a real link automatically. */
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
            <Reveal key={p.title} delay={i * 0.08} className="h-full">
              <motion.article
                whileHover={linked ? { y: -6 } : undefined}
                transition={{ type: 'spring', stiffness: 250, damping: 22 }}
                className="card h-full p-3"
              >
                <Media
                  src={p.image}
                  alt={`${p.title} — article cover`}
                  rounded="rounded-[1.25rem]"
                  className="aspect-[16/10] w-full object-cover"
                />

                <div className="flex items-center justify-between gap-4 px-3 py-4">
                  <h3 className="text-lg font-semibold">
                    {linked ? (
                      <a href={p.href} target="_blank" rel="noopener noreferrer">
                        {p.title}
                      </a>
                    ) : (
                      p.title
                    )}
                  </h3>
                  <span className="chip shrink-0">{linked ? p.tag : 'Coming soon'}</span>
                </div>
              </motion.article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
