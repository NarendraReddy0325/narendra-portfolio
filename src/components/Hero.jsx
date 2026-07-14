import { motion, useReducedMotion } from 'framer-motion'
import { profile, heroTags, about } from '../data'
import { CountUp, Media } from './ui'

const EASE = [0.16, 1, 0.3, 1]

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
})

/** A tilted pill floating over the portrait. */
function TiltTag({ label, className, rotate, delay }) {
  return (
    <motion.span
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.8, rotate }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={`absolute z-20 rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-body shadow-[0_10px_30px_-12px_rgba(16,16,16,0.35)] backdrop-blur ${className}`}
    >
      {label}
    </motion.span>
  )
}

/** One of the floating white stat cards on the right of the portrait. */
function StatCard({ stat, className = '', delay = 0 }) {
  return (
    <motion.div
      {...rise(delay)}
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

  return (
    <section id="top" className="hero-wash relative overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-24">
      {/* The oversized ghost word. Decorative, so it's hidden from assistive tech
          and clipped by the section. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[14%] z-0 flex justify-center"
      >
        <span className="ghost-word text-[24vw] whitespace-nowrap lg:text-[15rem]">
          {profile.ghostWord}
        </span>
      </div>

      <div className="shell relative z-10">
        {/* Portrait + the things orbiting it. */}
        <div className="relative mx-auto flex justify-center">
          <motion.div
            initial={reduce ? {} : { opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
            className="relative z-10 w-full max-w-[380px] lg:max-w-[440px]"
          >
            <Media
              src={profile.portrait}
              alt={`${profile.name}, product and UI/UX designer`}
              rounded="rounded-[1.25rem]"
              className="aspect-[4/5] w-full object-cover object-top"
            />
            {/* The portrait fades into the page at its base, as in the reference. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#d9dde5]"
            />
          </motion.div>

          <TiltTag
            label={heroTags[0]}
            rotate={-14}
            delay={0.5}
            className="top-[42%] -left-2 sm:left-4 lg:left-16"
          />
          <TiltTag
            label={heroTags[1]}
            rotate={-8}
            delay={0.62}
            className="top-[28%] -right-2 sm:right-4 lg:right-24"
          />

          {/* Desktop: stat cards float over the wash to the right. */}
          <div className="pointer-events-none absolute right-0 bottom-4 hidden w-[22rem] flex-col gap-3 lg:flex">
            <StatCard stat={about.stats[0]} delay={0.7} />
            <StatCard stat={about.stats[1]} delay={0.8} />
          </div>
        </div>

        {/* Headline. Sits bottom-left, overlapping the portrait's base. */}
        <div className="relative z-20 -mt-10 lg:-mt-24">
          <motion.p {...rise(0.25)} className="text-sm text-body lg:text-base">
            {profile.greeting}
          </motion.p>

          <motion.h1
            {...rise(0.35)}
            className="mt-3 text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.035em] sm:text-6xl lg:text-[4.5rem]"
          >
            {profile.headline[0]}
            <br />
            {profile.headline[1]}
          </motion.h1>
        </div>

        {/* Mobile / tablet: the same stats, laid out as a normal row. */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:hidden">
          <StatCard stat={about.stats[0]} delay={0.1} />
          <StatCard stat={about.stats[1]} delay={0.18} />
        </div>
      </div>
    </section>
  )
}
