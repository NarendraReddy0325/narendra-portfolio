import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { partners, services } from '../data'
import { Eyebrow, PillLink, Reveal } from './ui'

/* The tags on the Brand Identity card are the one true parallax on the page:
   they keep drifting while fully visible, each at its own rate and angle. Read
   off the reference's own transforms — the x offsets, the landing rotations,
   and the fact that each moves a different distance as you scroll past. */
const TAGS = [
  { from: 50, spin: 30, drift: -46 },
  { from: -50, spin: -13, drift: -22 },
  { from: 0, spin: 0, drift: -60 },
  { from: -50, spin: 12, drift: -34 },
  { from: -50, spin: 0, drift: -50 },
  { from: 50, spin: 0, drift: -28 },
  { from: 50, spin: -8, drift: -40 },
]

/** A tag that flies in from the side, rotates into place, then keeps drifting. */
function DriftTag({ label, from, spin, drift, delay, progress, dark }) {
  const reduce = useReducedMotion()
  const y = useTransform(progress, [0, 1], [0, drift])

  return (
    <motion.li
      style={reduce ? undefined : { y }}
      initial={reduce ? { rotate: spin } : { opacity: 0.001, x: from, rotate: 0 }}
      whileInView={{ opacity: 1, x: 0, rotate: spin }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.6, delay, ease: [0.44, 0, 0.56, 1], type: 'tween' }}
      className={`rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap ${
        dark ? 'bg-page text-body' : 'bg-surface text-body'
      }`}
    >
      {label}
    </motion.li>
  )
}

function ServiceCard({ s, progress }) {
  const dark = s.tone === 'dark'

  return (
    <div
      className={`rounded-card flex h-full flex-col p-7 ${
        dark ? 'bg-dark text-white' : 'bg-card text-ink'
      }`}
    >
      <h3 className={`text-xl font-semibold ${dark ? 'text-white' : 'text-ink'}`}>{s.title}</h3>
      <p
        className={`mt-3 max-w-[30ch] text-sm leading-relaxed ${dark ? 'text-white/70' : 'text-body'}`}
      >
        {s.desc}
      </p>

      {s.tags && (
        <ul className="mt-auto flex flex-wrap items-center gap-2 pt-10">
          {s.tags.map((t, i) => {
            const cfg = TAGS[i % TAGS.length]
            return (
              <DriftTag
                key={t}
                label={t}
                {...cfg}
                delay={0.05 * i}
                progress={progress}
                dark={dark}
              />
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  return (
    <section id="services" ref={ref} className="shell py-20 lg:py-28">
      {/* On the navy glow, so the heading is white and the eyebrow lightens. */}
      <Reveal className="flex flex-col items-center text-center">
        <Eyebrow tone="dark">Core Services</Eyebrow>
        <h2 className="mt-5 max-w-[16ch] text-3xl font-semibold text-white sm:text-5xl">
          Design Solutions Built For Growth
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-4 lg:grid-cols-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {services.map((s, i) => (
            <Reveal key={s.title} as="card" delay={i * 0.06} className="h-full">
              <ServiceCard s={s} progress={scrollYProgress} />
            </Reveal>
          ))}
        </div>

        {/* The CTA panel is LIGHT against the navy, not dark. */}
        <Reveal as="panel" delay={0.1} className="lg:col-span-4">
          <div className="rounded-card flex h-full flex-col justify-between gap-8 bg-card p-7">
            <div>
              <span className="chip inline-flex items-center gap-2">
                <span aria-hidden="true" className="block h-1.5 w-1.5 rotate-45 bg-accent" />
                Trusted By Global Partners
              </span>

              <h3 className="mt-8 text-3xl font-semibold">Let’s Create Impact</h3>
              <p className="mt-3 max-w-[26ch] text-sm leading-relaxed text-body">
                Let’s create meaningful and lasting digital impact.
              </p>
            </div>

            <PillLink href="#contact">Start A Project</PillLink>
          </div>
        </Reveal>
      </div>

      {/* Partner strip. Duplicated once so the -50% scroll loops seamlessly. */}
      <div className="mt-14 overflow-hidden" aria-label="Clients and partners">
        <ul className="animate-marquee flex w-max items-center gap-14">
          {[...partners, ...partners].map((p, i) => (
            <li
              key={`${p}-${i}`}
              className="text-xl font-semibold whitespace-nowrap text-white/30 select-none"
            >
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
