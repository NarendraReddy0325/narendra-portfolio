import { motion, useReducedMotion } from 'framer-motion'
import { profile, heroTags, about } from '../data'
import { CountUp } from './ui'

/* ---------------------------------------------------------------------------
   Hero motion, lifted verbatim from the reference's appear-animation config.

   The signature is that almost nothing fades — elements *slide into place at
   full opacity*, and the two pills rotate into their tilt as they land. Only
   the greeting and headline fade, and they stagger 0.2s apart.

   ease [0.44, 0, 0.56, 1] is a symmetric in-out curve: it accelerates out of
   the start and decelerates into the end, which is what gives the drop its
   weight. (An ease-out would just look like it's braking.)
--------------------------------------------------------------------------- */
const EASE = [0.44, 0, 0.56, 1]
const LINEAR = [0, 0, 1, 1]

/** Slides in from a y offset without fading. */
const slide = (from, duration = 1, ease = EASE, delay = 0) => ({
  initial: { y: from },
  animate: { y: 0 },
  transition: { duration, ease, delay, type: 'tween' },
})

/** Fades up 30px. The only fade in the hero. */
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
      className={`absolute z-20 rounded-full bg-white/90 px-4 py-2 text-xs font-medium whitespace-nowrap text-body shadow-[0_10px_30px_-12px_rgba(16,16,16,0.35)] backdrop-blur ${className}`}
    >
      {label}
    </motion.span>
  )
}

/** One of the floating white stat cards. */
function StatCard({ stat, className = '', delay = 0 }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      {...(reduce ? {} : fadeUp(delay))}
      className={`card flex items-center justify-between gap-6 px-6 py-5 shadow-[0_24px_60px_-30px_rgba(16,16,16,0.35)] ${className}`}
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
  const m = (props) => (reduce ? {} : props)

  return (
    <section id="top" className="hero-wash relative overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-24">
      {/* Ghost word — rises from below, linear, no fade. Decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[14%] z-0 flex justify-center"
      >
        <motion.span
          {...m(slide(170, 0.6, LINEAR))}
          className="ghost-word text-[24vw] whitespace-nowrap lg:text-[15rem]"
        >
          {profile.ghostWord}
        </motion.span>
      </div>

      <div className="shell relative z-10">
        <div className="relative mx-auto flex justify-center">
          {/* Portrait: a transparent cut-out, so it sits straight on the wash
              with no card behind it. The base fade must be a MASK — a gradient
              overlay would paint a block across the transparent shoulders. */}
          <motion.div
            {...m(slide(95, 1))}
            className="relative z-10 w-full max-w-[380px] lg:max-w-[440px]"
          >
            <img
              src={profile.portrait}
              alt={`${profile.name}, product and UI/UX designer`}
              width={1131}
              height={1372}
              className="w-full object-contain [mask-image:linear-gradient(to_bottom,black_72%,transparent_98%)]"
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

          {/* Desktop: stat cards float to the right of the portrait. */}
          <div className="absolute right-0 bottom-6 hidden w-[21rem] flex-col gap-3 lg:flex">
            <StatCard stat={about.stats[0]} delay={0.45} />
            <StatCard stat={about.stats[1]} delay={0.6} />
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

        {/* Below lg the cards can't float — they become a normal row. */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:hidden">
          <StatCard stat={about.stats[0]} delay={0.1} />
          <StatCard stat={about.stats[1]} delay={0.2} />
        </div>
      </div>
    </section>
  )
}
