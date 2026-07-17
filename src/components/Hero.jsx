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
   hanging in the air.

   WHY THERE ARE TWO SETS OF POSITIONS
   `left` is a percentage of the WORD, and the word is 24vw — deliberately wider
   than a phone, because it's a backdrop and is meant to run off both edges. The
   pills were riding along with it: at 390px the word measures ~449px, so the
   3% pill sat at -16px and the 79% pill ran ~44px past the right edge. "UI/UX"
   was sliced down the middle and "Mobile Design" read as "Mobile D".

   Widening the pills' box wouldn't save it either — four pills total ~344px of
   a 390px screen, so a row of four can only ever overlap or overflow. Below
   `md` two of them stand down and the survivors move to positions that clear
   both edges; from `md` up the word is wide enough for all four, so the
   original composition returns untouched. */
const TAGS = [
  {
    // 8%, not the 3% this started at. At 768-1088 the word overflows the
    // viewport far enough that a 3% offset put this pill at -28px — clipped,
    // on desktop, the whole time. 8% is the smallest offset that clears the
    // left edge at every width from md up; measured, not eyeballed.
    left: '8%',
    leftSm: '10%',
    drop: 6,
    rotate: -14,
    float: { y: 12, x: 5, duration: 4.2, delay: 0 },
  },
  {
    left: '26%',
    smHidden: true,
    drop: -10,
    rotate: 9,
    float: { y: -14, x: -6, duration: 5.1, delay: 0.5 },
  },
  {
    left: '58%',
    // 62 rather than the 52 that would mirror the desktop spacing: on a phone
    // the portrait is far larger relative to the word, and 52% parked this pill
    // squarely across his mouth. 62% sets it down on the shoulder to the right
    // of his face, which is where the desktop pills sit anyway.
    leftSm: '62%',
    drop: 8,
    rotate: -8,
    float: { y: 14, x: -5, duration: 4.7, delay: 0.9 },
  },
  {
    left: '79%',
    smHidden: true,
    drop: -6,
    rotate: 13,
    float: { y: -11, x: 7, duration: 5.6, delay: 0.3 },
  },
]

/**
 * A pill that drops in, rotates into its tilt on the way down, and then floats.
 *
 * Two layers, because the drop and the float both want `y`: the outer span
 * owns the entrance (and the final angle), the inner one owns the endless
 * drift. Put both on one element and the float would overwrite the landing.
 */
function HeroTag({ label, rotate, left, leftSm, smHidden = false, drop, float }) {
  const reduce = useReducedMotion()

  return (
    <motion.span
      aria-hidden="true"
      initial={reduce ? { rotate } : { y: -135, rotate: 0 }}
      animate={{ y: 0, rotate }}
      transition={{ duration: 1, ease: EASE, type: 'tween' }}
      // The position goes through a CSS variable so the breakpoint can be a
      // plain Tailwind variant. An inline `left` would be one value for every
      // viewport, and this pill needs two.
      className={`absolute bottom-0 left-[var(--tag-left-sm)] md:left-[var(--tag-left)] ${
        smHidden ? 'hidden md:block' : ''
      }`}
      style={{ '--tag-left': left, '--tag-left-sm': leftSm ?? left, marginBottom: drop }}
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
  const darkRef = useRef(null)
  const portraitRef = useRef(null)
  const [ghostHot, setGhostHot] = useState(false)
  const m = (props) => (reduce ? {} : props)

  /* The spotlight on the ghost word.

     Only the letters under the cursor darken. A dark copy of the word sits on
     top of the pale one, masked to a soft circle that follows the pointer — so
     the darkening is local, and fades out at the edge of the circle instead of
     switching on and off.

     Two things worth knowing:

     1. This can't be a CSS :hover. The word sits at z-0 beneath the .shell that
        holds the portrait and headline, and that shell's box covers this whole
        region — it eats the pointer even where it's fully transparent. Raising
        the word above the shell would fix the hover and wreck the design, since
        it would paint over the portrait. So the hit test is geometric.

     2. The mask centre is written straight to the DOM rather than through React
        state. It changes on every mouse move; re-rendering Hero at that rate
        would drop frames for no reason. */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const inside = (r, e) =>
      r && e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom

    const onMove = (e) => {
      const dark = darkRef.current
      const word = dark?.getBoundingClientRect()
      const face = portraitRef.current?.getBoundingClientRect()
      const on = inside(word, e) && !inside(face, e)

      setGhostHot(on)
      if (!on || !dark) return

      // Mask centre, in the dark word's own coordinate space.
      dark.style.setProperty('--mx', `${e.clientX - word.left}px`)
      dark.style.setProperty('--my', `${e.clientY - word.top}px`)
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
      <div className="shell relative z-10">
        <div className="relative mx-auto flex justify-center">
          {/* The ghost word, centred ACROSS the portrait and lifted a little above
              its middle, so it reads behind your head rather than across your chest.

              It used to hang off the hero section at a fixed `top`, which put it
              high on the page while the portrait sat well below it. Anchoring it
              to this row instead keeps it registered to you at any viewport height,
              because the row IS the portrait's box; the -translate-y is the lift.
              The pills layer below carries the SAME lift, so it stays on the word's
              baseline.

              z-0 keeps it behind the portrait (z-10). It's wider than the row and
              simply overflows it, which is what we want — it's a backdrop. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 flex -translate-y-12 items-center justify-center lg:-translate-y-20"
          >
            {/* Two copies, stacked and pixel-identical: the pale word, and a dark
                one masked to a circle under the cursor. Both take their metrics
                from the same classes, or the dark layer sits a fraction off and
                the letters ghost. */}
            <motion.span
              ref={ghostRef}
              {...m(slide(95, 1))}
              style={reduce ? undefined : { y: ghostY }}
              className="relative inline-block"
            >
              <span className="ghost-base ghost-word block text-[24vw] lg:text-[15rem]">
                {profile.ghostWord}
              </span>

              <span
                ref={darkRef}
                className={`ghost-base ghost-dark block text-[24vw] lg:text-[15rem] ${
                  ghostHot ? 'ghost-dark--on' : ''
                }`}
              >
                {profile.ghostWord}
              </span>
            </motion.span>
          </div>

          {/* The pills, strung along the word's bottom edge.

              This box is centred exactly like the word and sized by an invisible
              copy of it, so `bottom-0` lands on the word's baseline and the `left`
              percentages spread the pills across the WORD rather than the page.
              Sizing it from the word itself means it can never drift out of sync
              with it. z-20 puts them in front of the portrait. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 flex -translate-y-12 items-center justify-center lg:-translate-y-20"
          >
            <div className="relative">
              <span className="ghost-base invisible block text-[24vw] lg:text-[15rem]">
                {profile.ghostWord}
              </span>

              {heroTags.map((label, i) => (
                <HeroTag key={label} label={label} {...TAGS[i % TAGS.length]} />
              ))}
            </div>
          </div>

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
              className="portrait-fade portrait-center relative w-full object-contain"
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
