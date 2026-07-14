import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { profile, heroTags, about } from '../data'
import StatCard from './StatCard'

/* ---------------------------------------------------------------------------
   Hero motion — the reference's appear-animation config, verbatim.

     ghost word ("Desinger")  y:  95 → 0   1.0s   ease
     portrait arch            y: 170 → 0   0.6s   LINEAR
     tilt pill (left)         y:-135 → 0,  rotate 0 → -26°   1.0s
     tilt pill (right)        y:-135 → 0,  rotate 0 → +15°   1.0s
     greeting                 y:  30 → 0,  fade   0.6s
     headline                 y:  30 → 0,  fade   0.6s, delay 0.2s

   Note almost nothing fades: elements slide into place at full opacity, and the
   pills rotate into their tilt as they land. Only the two lines of text fade.

   ease [0.44, 0, 0.56, 1] is a symmetric in-out — it accelerates out of the
   start and decelerates into the end, which is what gives the drop its weight.
--------------------------------------------------------------------------- */
const EASE = [0.44, 0, 0.56, 1]
const LINEAR = [0, 0, 1, 1]

const slide = (from, duration = 1, ease = EASE) => ({
  initial: { y: from },
  animate: { y: 0 },
  transition: { duration, ease, type: 'tween' },
})

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0.001, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE, delay, type: 'tween' },
})

/* The four pills, strung along the BOTTOM EDGE of the ghost "DESIGNER" — they
   sit on its baseline like objects resting on a shelf, rather than scattered
   around the portrait.

   `left` places each along that line; `drop` nudges it above or below the
   baseline so they don't form a dead-straight row.

   The floats are deliberately mismatched in distance, direction and duration.
   Four pills bobbing on the same clock read as a broken loop, not as objects
   hanging in the air. */
const TAGS = [
  { left: '3%', drop: 6, rotate: -14, float: { y: 12, x: 5, duration: 4.2, delay: 0 } },
  { left: '26%', drop: -10, rotate: 9, float: { y: -14, x: -6, duration: 5.1, delay: 0.5 } },
  { left: '58%', drop: 8, rotate: -8, float: { y: 14, x: -5, duration: 4.7, delay: 0.9 } },
  { left: '79%', drop: -6, rotate: 13, float: { y: -11, x: 7, duration: 5.6, delay: 0.3 } },
]

/**
 * A pill that drops in, rotates into its tilt on the way down, and then floats.
 *
 * Two layers, because the drop and the float both want `y`: the outer span
 * owns the entrance (and the final angle), the inner one owns the endless
 * drift. Put both on one element and the float would overwrite the landing.
 */
function HeroTag({ label, rotate, left, drop, float }) {
  const reduce = useReducedMotion()

  return (
    <motion.span
      aria-hidden="true"
      initial={reduce ? { rotate } : { y: -135, rotate: 0 }}
      animate={{ y: 0, rotate }}
      transition={{ duration: 1, ease: EASE, type: 'tween' }}
      className="absolute bottom-0"
      style={{ left, marginBottom: drop }}
    >
      <motion.span
        className="block rounded-full bg-page/90 px-4 py-2 text-xs font-medium whitespace-nowrap text-body shadow-[0_10px_30px_-12px_rgba(16,16,16,0.35)] backdrop-blur"
        animate={
          reduce
            ? undefined
            : { y: [0, float.y, 0], x: [0, float.x, 0], rotate: [0, float.x > 0 ? 2 : -2, 0] }
        }
        transition={
          reduce
            ? undefined
            : {
                duration: float.duration,
                // Starts only once the pill has landed, so the drop reads clean.
                delay: 1 + float.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
      >
        {label}
      </motion.span>
    </motion.span>
  )
}

/* The hero slot for a travelling card. It animates in like everything else, but
   on desktop it renders invisible — TravelingStats draws the real card on top
   of it and then carries it down into the About bento. Below lg there is no
   travel, so the card here is the visible one. */
function StatSlot({ stat, anchorId, delay = 0 }) {
  const reduce = useReducedMotion()

  return (
    <motion.div {...(reduce ? {} : fadeUp(delay))}>
      <StatCard stat={stat} anchorId={anchorId} anchor />
    </motion.div>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)
  const ghostRef = useRef(null)
  const portraitRef = useRef(null)
  const [ghostHot, setGhostHot] = useState(false)
  const m = (props) => (reduce ? {} : props)

  /* Hovering the ghost word.
     Worked out geometrically rather than with :hover, because the .shell above
     it covers this region and eats the pointer — see the note in index.css.
     Hovering the portrait doesn't count: you're over the photo, not the word. */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const inside = (r, e) =>
      r && e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom

    const onMove = (e) => {
      const word = ghostRef.current?.getBoundingClientRect()
      const face = portraitRef.current?.getBoundingClientRect()
      setGhostHot(inside(word, e) && !inside(face, e))
    }

    const onLeave = () => setGhostHot(false)

    section.addEventListener('pointermove', onMove, { passive: true })
    section.addEventListener('pointerleave', onLeave)
    return () => {
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  /* The stat cards' travel is owned by TravelingStats — they leave this section
     entirely and land in the About bento, so nothing here moves them. All that's
     left scroll-linked here is the ghost word drifting up against the portrait,
     which separates the layers as you scroll. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })
  const ghostY = useTransform(progress, [0, 1], [0, -70])

  return (
    <section
      ref={sectionRef}
      id="top"
      className="hero-wash relative overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-24"
    >
      {/* Ghost word — rises 95px on load, then drifts up as you scroll. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[14%] z-0 flex justify-center"
      >
        <motion.span
          ref={ghostRef}
          {...m(slide(95, 1))}
          style={reduce ? undefined : { y: ghostY }}
          className={`ghost-word text-[24vw] whitespace-nowrap lg:text-[15rem] ${
            ghostHot ? 'ghost-word--hot' : ''
          }`}
        >
          {profile.ghostWord}
        </motion.span>
      </div>

      {/* The pills, strung along the bottom edge of that word.

          They live in their own box rather than inside the portrait row, so they
          can be anchored to the word's baseline. It shares the word's `top` and
          matches its height (the ghost has line-height 0.8, so its box is 0.8 ×
          its font size), which puts `bottom-0` exactly on the baseline.

          z-20 keeps them above the portrait — the ghost word itself is z-0 and
          sits behind everything. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[14%] z-20 h-[19.2vw] lg:h-[12rem]"
      >
        <div className="shell relative h-full">
          {heroTags.map((label, i) => (
            <HeroTag key={label} label={label} {...TAGS[i % TAGS.length]} />
          ))}
        </div>
      </div>

      <div className="shell relative z-10">
        <div className="relative mx-auto flex justify-center">
          {/* The arch + portrait rise together, 170px, linear, over 0.6s. */}
          <motion.div
            ref={portraitRef}
            {...m(slide(170, 0.6, LINEAR))}
            className="relative z-10 flex w-full max-w-[380px] justify-center lg:max-w-[440px]"
          >
            {/* The blue arch behind you — a 300px-radius dome running from the
                accent down into the page grey. */}
            <div
              aria-hidden="true"
              className="hero-arch absolute inset-x-0 bottom-0 top-[12%] rounded-b-none"
            />

            {/* Transparent cut-out. .portrait-fade dissolves the bottom and both
                sides — the source photo crops your shoulders at its own borders,
                so without it the shirt ends in hard vertical edges. */}
            <img
              src={profile.portrait}
              alt={`${profile.name}, product and UI/UX designer`}
              width={1131}
              height={1372}
              className="portrait-fade relative w-full object-contain"
            />
          </motion.div>

          {/* Departure slots. No scroll-fade any more — the cards physically
              travel, so fading them out here would delete the thing that moves. */}
          <div className="absolute right-0 bottom-6 hidden w-[21rem] flex-col gap-3 lg:flex">
            <StatSlot stat={about.stats[0]} anchorId="stat-hero-0" delay={0.45} />
            <StatSlot stat={about.stats[1]} anchorId="stat-hero-1" delay={0.6} />
          </div>
        </div>

        {/* Headline sits bottom-left, overlapping the portrait's base. */}
        <div className="relative z-20 -mt-10 lg:-mt-24">
          <motion.p {...m(fadeUp(0))} className="text-sm text-body lg:text-base">
            {profile.greeting}
          </motion.p>

          <motion.h1
            {...m(fadeUp(0.2))}
            className="mt-3 text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.035em] sm:text-6xl lg:text-[4.5rem]"
          >
            {profile.headline[0]}
            <br />
            {profile.headline[1]}
          </motion.h1>
        </div>

        {/* Below lg there's no travel — these are just cards. */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:hidden">
          <StatCard stat={about.stats[0]} />
          <StatCard stat={about.stats[1]} />
        </div>
      </div>
    </section>
  )
}
