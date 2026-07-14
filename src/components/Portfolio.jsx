import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { projects } from '../data'
import { Eyebrow, Media, PillButton, PillLink, Reveal } from './ui'
import Lightbox from './Lightbox'

/* ---------------------------------------------------------------------------
   The stacking deck.

   Each project is `position: sticky`. As you scroll, card 01 pins near the top;
   card 02 then rides up and comes to rest ON it, then 03 on 02, and so on — the
   deck builds as you go.

   Two details make it work:

   1. Each card pins a few pixels LOWER than the one before it (TOP + i * STEP),
      so every card underneath leaves a visible sliver. Without that, each card
      would completely erase the last and the stack would read as a single card.

   2. Later siblings paint over earlier ones by default, so card 02 covers 01
      with no z-index needed — and crucially the cards are opaque, or you'd see
      the deck through them.

   The sticky elements have to be direct children of the list: a sticky element
   can only travel within its own parent's box, so wrapping each one in a
   card-height div would pin it for zero pixels and nothing would stack.
--------------------------------------------------------------------------- */
const TOP = 104 // clears the navbar
const STEP = 14 // the sliver of each card left showing beneath the next

/** A card in the deck. Shrinks slightly as the next one lands on it, so the
 *  buried cards recede instead of looking like a flat pile of paper. */
function ProjectCard({ p, i, total, listProgress, onOpen }) {
  const reduce = useReducedMotion()
  const isLive = p.type === 'live'

  // Card i gets covered as the deck passes it — roughly when progress crosses
  // (i + 1) / total. Clamped, so it holds its final scale once buried.
  const scale = useTransform(listProgress, [i / total, (i + 1) / total], [1, 0.93], {
    clamp: true,
  })

  return (
    <div className="sticky" style={{ top: reduce ? undefined : `${TOP + i * STEP}px` }}>
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
        <Eyebrow>My Portfolio</Eyebrow>
        <h2 className="mt-5 max-w-[16ch] text-3xl font-semibold sm:text-5xl">
          Projects That Delivered Real Impact
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
