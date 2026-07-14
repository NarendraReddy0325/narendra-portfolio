import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { impact, partners, services } from '../data'
import { Eyebrow, Media, PillLink, Reveal } from './ui'

/* The tags on the Brand Identity card are the one true parallax on the page:
   they keep drifting while fully visible, each at its own rate and angle. */
const TAGS = [
  { from: 50, spin: 30, drift: -46 },
  { from: -50, spin: -13, drift: -22 },
  { from: 0, spin: 0, drift: -60 },
  { from: -50, spin: 12, drift: -34 },
  { from: -50, spin: 0, drift: -50 },
  { from: 50, spin: 0, drift: -28 },
  { from: 50, spin: -8, drift: -40 },
]

function DriftTag({ label, from, spin, drift, delay, progress }) {
  const reduce = useReducedMotion()
  const y = useTransform(progress, [0, 1], [0, drift])

  return (
    <motion.li
      style={reduce ? undefined : { y }}
      initial={reduce ? { rotate: spin } : { opacity: 0.001, x: from, rotate: 0 }}
      whileInView={{ opacity: 1, x: 0, rotate: spin }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.6, delay, ease: [0.44, 0, 0.56, 1], type: 'tween' }}
      className="rounded-full bg-page px-3 py-1.5 text-xs font-medium whitespace-nowrap text-body"
    >
      {label}
    </motion.li>
  )
}

/**
 * The sideways ticker inside the Web Experience card.
 *
 * Runs on a loop forever, independent of scroll — the reference does the same.
 * The strip is duplicated so the -50% translation lands seamlessly back at the
 * start, and the card clips it, so thumbnails slide in and out of the edges.
 */
function Ticker({ images, title }) {
  const strip = [...images, ...images]

  return (
    <div className="marquee -mx-7 mt-auto pt-8">
      <ul className="marquee__track flex w-max gap-3 px-7">
        {strip.map((src, i) => (
          <li key={i} className="shrink-0">
            <Media
              src={src}
              alt={i < images.length ? `${title} — sample ${i + 1}` : ''}
              rounded="rounded-[10px]"
              className="h-[105px] w-[156px] border-2 border-page/20 object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

function ServiceCard({ s, progress }) {
  const dark = s.tone === 'dark'

  return (
    <div
      className={`rounded-card relative flex h-full flex-col overflow-hidden p-7 ${
        dark ? 'bg-dark text-white' : 'bg-card text-ink'
      } ${s.media === 'bleed' ? 'pb-0' : ''}`}
    >
      <h3 className={`text-xl font-semibold ${dark ? 'text-white' : 'text-ink'}`}>{s.title}</h3>
      <p
        className={`mt-3 max-w-[30ch] text-sm leading-relaxed ${dark ? 'text-white/70' : 'text-body'}`}
      >
        {s.desc}
      </p>

      {s.media === 'tags' && (
        <ul className="mt-auto flex flex-wrap items-center gap-2 pt-10">
          {s.tags.map((t, i) => (
            <DriftTag
              key={t}
              label={t}
              {...TAGS[i % TAGS.length]}
              delay={0.05 * i}
              progress={progress}
            />
          ))}
        </ul>
      )}

      {/* One image in a blue-outlined frame. The accent border is the only place
          the blue shows up inside a card. */}
      {s.media === 'frame' && (
        <Reveal as="image" className="mt-auto pt-8">
          <Media
            src={s.image}
            alt={`${s.title} — sample work`}
            rounded="rounded-[10px]"
            className="h-[163px] w-full border-2 border-accent object-cover"
          />
        </Reveal>
      )}

      {s.media === 'ticker' && <Ticker images={s.images} title={s.title} />}

      {/* Runs off the bottom edge of the card — the card is clipped, so the
          image is cut rather than shrunk. */}
      {s.media === 'bleed' && (
        <Reveal as="image" className="mt-auto pt-8">
          <Media
            src={s.image}
            alt={`${s.title} — sample work`}
            rounded="rounded-t-[10px]"
            className="h-[200px] w-full object-cover object-top"
          />
        </Reveal>
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
      <Reveal className="flex flex-col items-center text-center">
        <Eyebrow tone="dark">Core Services</Eyebrow>
        <h2 className="mt-5 max-w-[16ch] text-3xl font-semibold text-white sm:text-5xl">
          Design Solutions Built For Growth
        </h2>
      </Reveal>

      {/* The whole block sits inside one glassy panel on the navy — a faint
          diagonal white wash, not a solid card. */}
      <div className="mt-14 rounded-[20px] bg-gradient-to-br from-white/15 via-white/5 to-white/15 p-4 sm:p-8">
        <div className="grid gap-3 lg:grid-cols-[1fr_1fr_22rem]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {[services[0], services[2]].map((s, i) => (
              <Reveal key={s.title} as="card" delay={i * 0.06} className="h-full">
                <ServiceCard s={s} progress={scrollYProgress} />
              </Reveal>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {[services[1], services[3]].map((s, i) => (
              <Reveal key={s.title} as="card" delay={0.04 + i * 0.06} className="h-full">
                <ServiceCard s={s} progress={scrollYProgress} />
              </Reveal>
            ))}
          </div>

          {/* The tall card: image on top, CTA underneath, one card. */}
          <Reveal as="panel" delay={0.12} className="h-full">
            <div className="rounded-card flex h-full flex-col gap-8 bg-card p-6">
              <div className="relative flex justify-center">
                {/* The two blurred blue slivers either side of the image. */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-8 -left-4 h-36 w-14 rounded-full bg-gradient-to-b from-[#9aacfe] to-[#cdd5fb] blur-[10px]"
                />
                <span
                  aria-hidden="true"
                  className="absolute -right-4 bottom-40 h-28 w-14 rounded-full bg-gradient-to-b from-[#758dfe] to-[#90a4fc] blur-[10px]"
                />
                <Media
                  src={impact.image}
                  alt="Recent client work"
                  rounded="rounded-[10px]"
                  className="relative aspect-[302/365] w-full object-cover"
                />
              </div>

              <div className="mt-auto">
                <div
                  aria-hidden="true"
                  className="h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent"
                />

                <span className="chip mt-6 inline-flex items-center gap-2">
                  <span aria-hidden="true" className="block h-1.5 w-1.5 rotate-45 bg-accent" />
                  {impact.chip}
                </span>

                <h3 className="mt-5 text-3xl font-semibold">{impact.title}</h3>
                <p className="mt-3 max-w-[26ch] text-sm leading-relaxed text-body">{impact.desc}</p>

                <PillLink href="#contact" className="mt-7">
                  {impact.cta}
                </PillLink>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Partner strip. Duplicated once so the -50% scroll loops seamlessly. */}
      <div className="marquee mt-14" aria-label="Clients and partners">
        <ul className="marquee__track flex w-max items-center gap-14">
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
