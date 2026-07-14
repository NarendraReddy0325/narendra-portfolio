import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useSpring, useMotionValue, useReducedMotion, AnimatePresence } from 'framer-motion'

import PageTransition from '../components/PageTransition'
import { Folio, Shell } from '../components/Folio'
import { MaskLines, Rule } from '../components/Motion'
import ProjectCard, { TypeTag } from '../components/ProjectCard'
import Media from '../components/Media'
import { projects } from '../data/projects'

const EASE = [0.16, 1, 0.3, 1]

/**
 * The index as a contact sheet.
 *
 * Ten projects in a grid of ten thumbnails is a wall of noise — you can't read
 * any of it. So the desktop index is a typographic list, and the image only
 * appears for the row you're actually pointing at, floating with the cursor.
 * One project, full attention, at a time. This is the signature interaction of
 * the site.
 *
 * On touch (and under reduced motion) there is no hover and no cursor to
 * follow, so it falls back to the card grid — a real fallback, not a squashed
 * version of the desktop layout.
 */
export default function Work() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 32, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 260, damping: 32, mass: 0.6 })

  const track = (e) => {
    x.set(e.clientX)
    y.set(e.clientY)
  }

  const liveCount = projects.filter((p) => p.type === 'live').length

  return (
    <PageTransition>
      <Folio label="Work" index={String(projects.length).padStart(2, '0')}>
        <section className="pt-36 pb-24 lg:pt-52">
          <Shell>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="font-mono text-micro text-ink-faint">Selected projects</p>
                <h1 className="font-display mt-7 -ml-1 text-[3.4rem] sm:text-[5.5rem] lg:-ml-3">
                  <MaskLines lines={['Everything', 'I’ve shipped.']} delay={0.1} />
                </h1>
              </div>

              <div className="self-end lg:col-span-4 lg:col-start-9">
                <p className="max-w-[36ch] text-[1.05rem] leading-relaxed text-ink-muted">
                  {liveCount} live in production, {projects.length - liveCount} concept studies.
                  Concept work is labelled as such throughout — none of it pretends to be a
                  shipped product.
                </p>
              </div>
            </div>

            <Rule className="mt-16" />

            {/* ---------------------------------------------------- DESKTOP LIST */}
            <ul
              className="hidden lg:block"
              onPointerMove={reduce ? undefined : track}
              onPointerLeave={() => setActive(null)}
            >
              {projects.map((project, i) => {
                const { slug, title, category, year, type } = project
                const isActive = active?.slug === slug

                // Solid by default; hollow when another row has the pointer;
                // accent when it's this one. Nothing dims — the type changes
                // state instead, so the page stays at full contrast throughout.
                const state = !active ? 'idle' : isActive ? 'on' : 'ghost'

                return (
                  <li key={slug} className="border-b border-rule">
                    <Link
                      to={`/work/${slug}`}
                      data-cursor={type === 'live' ? 'View case' : 'View concept'}
                      onPointerEnter={() => setActive(project)}
                      onFocus={() => setActive(project)}
                      onBlur={() => setActive(null)}
                      className="group grid grid-cols-12 items-baseline gap-6 py-8"
                    >
                      <span className="col-span-1 font-mono text-micro text-ink-faint">
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      {/* The title also slides right on hover — the row opens
                          toward the project rather than just recolouring. */}
                      <span
                        data-state={state}
                        className="title-stroke font-display col-span-6 text-[3.25rem] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4"
                      >
                        {title}
                      </span>

                      <span
                        className="col-span-3 font-mono text-micro text-ink-muted transition-opacity duration-500"
                        style={{ opacity: state === 'ghost' ? 0.35 : 1 }}
                      >
                        {category}
                      </span>

                      <span className="col-span-1 font-mono text-micro text-ink-faint">{year}</span>

                      <span
                        className="col-span-1 justify-self-end transition-opacity duration-500"
                        style={{ opacity: state === 'ghost' ? 0.35 : 1 }}
                      >
                        <TypeTag type={type} />
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </Shell>

          {/* -------------------------------------------- MOBILE / TOUCH FALLBACK */}
          <Shell className="lg:hidden">
            <div className="mt-4 grid grid-cols-1 gap-16 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-20">
              {projects.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} priority={i < 2} />
              ))}
            </div>
          </Shell>
        </section>
      </Folio>

      {/* The floating preview. Rendered once, outside the list, so it can sit
          above everything and follow the pointer freely. */}
      {!reduce && (
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.slug}
              aria-hidden="true"
              className="pointer-events-none fixed top-0 left-0 z-40 hidden w-[26rem] lg:block"
              style={{ x: sx, y: sy, translateX: '-108%', translateY: '-50%' }}
              initial={{ opacity: 0, scale: 0.94, rotate: -1.5 }}
              animate={{ opacity: 1, scale: 1, rotate: -1.5 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <Media
                src={active.thumbnail}
                alt=""
                caption={active.title}
                className="aspect-[4/3] w-full bg-paper-sunk object-cover shadow-[0_24px_60px_-24px_rgba(20,20,20,0.35)]"
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </PageTransition>
  )
}
