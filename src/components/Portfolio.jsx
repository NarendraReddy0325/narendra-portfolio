import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { projects } from '../data'
import { Eyebrow, Media, PillButton, PillLink, Reveal } from './ui'
import Lightbox from './Lightbox'

/* ---------------------------------------------------------------------------
   The stacking deck.

   Each project is `position: sticky`. Card 01 pins near the top; card 02 rides
   up and comes to rest ON it, then 03 on 02, and so on — the deck builds as you
   scroll.

   1. Each card pins a few pixels LOWER than the one before it (TOP + i * STEP),
      so every card underneath leaves a visible sliver. Without that, each card
      completely erases the last and the stack reads as a single card.

   2. Later siblings paint over earlier ones by default, so 02 covers 01 with no
      z-index needed — and the cards must be opaque, or you'd see the deck
      through them.

   3. The sticky elements have to be direct children of the list: a sticky
      element can only travel within its own parent's box, so wrapping each in a
      card-height div would pin it for zero pixels and nothing would stack.
--------------------------------------------------------------------------- */
const TOP = 104 // clears the navbar
const STEP = 14 // the sliver of each card left showing beneath the next

/* The section heading was "Projects That Delivered Real Impact" — a boast, in
   the template's voice rather than Narendra's, and one currently backed by nine
   paragraphs reading "TODO(you)". A plain fact is both better writing and a
   claim that survives contact with a reader.

   It's derived from the deck rather than typed beside it, because a heading
   that counts things is a lie on a delay: add a tenth project and a hardcoded
   "nine" is wrong the same day. Spelled out — numerals in a display heading
   read as data, and this is a sentence. */
const WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
const say = (n, noun) => `${WORDS[n] ?? n} ${noun}${n === 1 ? '' : 's'}`

function summarise(list) {
  const live = list.filter((p) => p.type === 'live').length
  const concepts = list.length - live
  const parts = []
  if (live) parts.push(say(live, 'live site'))
  if (concepts) parts.push(say(concepts, 'concept'))
  if (!parts.length) return 'Selected work'
  const s = parts.join(', ')
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function ProjectCard({ p, i, total, listProgress, onOpen }) {
  const reduce = useReducedMotion()
  const isLive = p.type === 'live'

  // Buried cards recede: card i shrinks as the deck passes it, so the stack has
  // depth instead of looking like a flat pile of paper. Clamped, so it holds its
  // final scale once covered.
  const scale = useTransform(listProgress, [i / total, (i + 1) / total], [1, 0.93], {
    clamp: true,
  })

  return (
    <div className="sticky" style={{ top: reduce ? undefined : `${TOP + i * STEP}px` }}>
      {/* The bounce. A spring with low damping, so the card overshoots its
          resting place and settles back — it lands on the deck with weight
          rather than gliding to a stop.

          This has to be its own wrapper. The article below binds `scale` to a
          scroll-driven MotionValue, and you can't both animate a property and
          bind it to a MotionValue on the same element — the spring and the
          scroll would fight over the transform. */}
      <motion.div
        initial={reduce ? false : { y: 90, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-12%' }}
        transition={{ type: 'spring', stiffness: 260, damping: 13, mass: 0.9 }}
      >
        <motion.article
          style={reduce ? undefined : { scale, transformOrigin: 'center top' }}
          className="card group grid gap-6 p-5 shadow-[0_-8px_40px_-24px_rgba(16,16,16,0.28)] sm:p-7 lg:grid-cols-2 lg:gap-10 lg:p-8"
        >
          <div className="flex min-h-[15rem] flex-col lg:min-h-[19rem]">
            <div className="flex items-start justify-between gap-6">
              <h3 className="text-2xl font-semibold sm:text-3xl">{p.title}</h3>
              <span
                aria-hidden="true"
                className="text-4xl leading-none font-semibold tracking-tight text-line select-none sm:text-5xl"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            {!isLive && <span className="chip mt-4 self-start">Concept — unpublished</span>}

            <p className="mt-auto max-w-[46ch] pt-8 text-sm leading-relaxed text-body">{p.desc}</p>

            <div className="mt-7">
              {isLive ? (
                <PillLink href={p.url} external>
                  Explore Project
                </PillLink>
              ) : (
                // No live site exists, so open the screens rather than send
                // anyone to a link that goes nowhere.
                <PillButton onClick={() => onOpen(p)}>View Screens</PillButton>
              )}
            </div>
          </div>

          {/* Artwork sits at 1.05 and settles to 1 on hover, with a dark wash
              fading in over it. */}
          <div className="rounded-card relative overflow-hidden">
            <Media
              src={p.image}
              alt={`${p.title} — project preview`}
              rounded=""
              className="aspect-[4/3] h-full w-full scale-[1.05] object-cover transition-transform duration-700 ease-[cubic-bezier(0.44,0,0.56,1)] group-hover:scale-100 lg:aspect-auto lg:min-h-[19rem]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-ink/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </div>
        </motion.article>
      </motion.div>
    </div>
  )
}

export default function Portfolio() {
  const [active, setActive] = useState(null)
  const listRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section id="portfolio" className="shell py-20 lg:py-28">
      <Reveal className="flex flex-col items-center text-center">
        <Eyebrow>Work</Eyebrow>
        <h2 className="mt-5 max-w-[16ch] text-3xl font-semibold sm:text-5xl">
          {summarise(projects)}
        </h2>
      </Reveal>

      {/* space-y gives the deck the scroll distance it needs to build — without
          it the cards would arrive on top of each other instantly. */}
      <div ref={listRef} className="mt-14 space-y-6">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.title}
            p={p}
            i={i}
            total={projects.length}
            listProgress={scrollYProgress}
            onOpen={setActive}
          />
        ))}
      </div>

      <Lightbox project={active} onClose={() => setActive(null)} />
    </section>
  )
}
