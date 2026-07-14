import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { profile, heroTags, about } from '../data'
import { CountUp } from './ui'

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

/** A pill that drops in and rotates into its tilt on the way down. */
function TiltTag({ label, rotate, className }) {
  const reduce = useReducedMotion()

  return (
    <motion.span
      aria-hidden="true"
      initial={reduce ? { rotate } : { y: -135, rotate: 0 }}
      animate={{ y: 0, rotate }}
      transition={{ duration: 1, ease: EASE, type: 'tween' }}
      className={`absolute z-20 rounded-full bg-page/90 px-4 py-2 text-xs font-medium whitespace-nowrap text-body shadow-[0_10px_30px_-12px_rgba(16,16,16,0.35)] backdrop-blur ${className}`}
    >
      {label}
    </motion.span>
  )
}

function StatCard({ stat, delay = 0 }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      {...(reduce ? {} : fadeUp(delay))}
      className="card flex items-center justify-between gap-6 px-6 py-5 shadow-[0_24px_60px_-30px_rgba(16,16,16,0.35)]"
    >
      <p className="max-w-[9rem] text-[0.8rem] leading-snug text-body">{stat.label}</p>
      <CountUp
        to={stat.value}
        suffix={stat.suffix}
        className="text-3xl font-semibold tracking-tight text-ink"
      />
    </motion.div>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)
  const m = (props) => (reduce ? {} : props)

  /* Scroll-linked descent: the two cards ride downward as the hero leaves the
     viewport and hand off to the About bento, which carries the same figures.
     Springing the progress keeps the travel from feeling glued to the bar. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })

  const cardsY = useTransform(progress, [0, 1], [0, 300])
  const cardsOpacity = useTransform(progress, [0, 0.72, 1], [1, 1, 0])
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
          {...m(slide(95, 1))}
          style={reduce ? undefined : { y: ghostY }}
          className="ghost-word text-[24vw] whitespace-nowrap lg:text-[15rem]"
        >
          {profile.ghostWord}
        </motion.span>
      </div>

      <div className="shell relative z-10">
        <div className="relative mx-auto flex justify-center">
          {/* The arch + portrait rise together, 170px, linear, over 0.6s. */}
          <motion.div
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

          <TiltTag
            label={heroTags[0]}
            rotate={-26}
            className="top-[40%] left-0 sm:left-6 lg:left-20"
          />
          <TiltTag
            label={heroTags[1]}
            rotate={15}
            className="top-[24%] right-0 sm:right-6 lg:right-28"
          />

          <motion.div
            style={reduce ? undefined : { y: cardsY, opacity: cardsOpacity }}
            className="absolute right-0 bottom-6 hidden w-[21rem] flex-col gap-3 lg:flex"
          >
            <StatCard stat={about.stats[0]} delay={0.45} />
            <StatCard stat={about.stats[1]} delay={0.6} />
          </motion.div>
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

        {/* Below lg the cards can't float, so they become a normal row. */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:hidden">
          <StatCard stat={about.stats[0]} delay={0.1} />
          <StatCard stat={about.stats[1]} delay={0.2} />
        </div>
      </div>
    </section>
  )
}
