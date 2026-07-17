import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { impact, services, tools } from '../data'
import { Eyebrow, Media, PillLink, Reveal } from './ui'

/* ---------------------------------------------------------------------------
   The Brand Identity chips.

   I probed the reference for this: held its page perfectly still for three
   seconds and every chip moved 0px. They do NOT loop. They are scattered
   across the WHOLE card and their entire motion is scroll-linked — each one
   drifts at its own rate as you scroll past, which is what makes them look
   like they're tumbling around inside the card.

   So each chip is absolutely placed somewhere in the card rather than sitting
   in a row, and carries:

     left / top   where it lives in the card, as a % of the chip field
     spin         the angle it settles at
     from         which side it flies in from on first view
     drift        how far it travels on scroll — the tumble
     bounce       its own ball hop, so it also has life when you stop scrolling

   Positions are hand-placed to scatter like the reference without the chips
   burying each other's backgrounds — its own chips overlap badly, which is
   fine when they're static and not when they're moving.
--------------------------------------------------------------------------- */
const TAGS = [
  {
    left: '36%',
    top: '2%',
    spin: -20,
    from: 50,
    drift: -34,
    bounce: { height: 11, duration: 1.5, rest: 0.5, offset: 0 },
  },
  {
    left: '0%',
    top: '23%',
    spin: -7,
    from: -50,
    drift: -18,
    bounce: { height: 8, duration: 1.7, rest: 0.9, offset: 0.35 },
  },
  {
    left: '20%',
    top: '46%',
    spin: 4,
    from: 0,
    drift: -46,
    bounce: { height: 13, duration: 1.4, rest: 0.4, offset: 0.7 },
  },
  {
    left: '64%',
    top: '26%',
    spin: 13,
    from: 50,
    drift: -26,
    bounce: { height: 9, duration: 1.6, rest: 0.7, offset: 0.15 },
  },
  {
    left: '1%',
    top: '70%',
    spin: -9,
    from: -50,
    drift: -38,
    bounce: { height: 12, duration: 1.55, rest: 0.6, offset: 0.5 },
  },
  {
    left: '58%',
    top: '72%',
    spin: 9,
    from: 50,
    drift: -22,
    bounce: { height: 10, duration: 1.8, rest: 1, offset: 0.9 },
  },
  {
    left: '30%',
    top: '88%',
    spin: -5,
    from: -50,
    drift: -30,
    bounce: { height: 9, duration: 1.45, rest: 0.55, offset: 0.25 },
  },
]

/**
 * A Brand Identity chip.
 *
 * Three things stack on this one element, on three different layers, because
 * they'd otherwise fight over the same transform:
 *
 *   li    → the scroll parallax drift (a MotionValue bound to `style.y`)
 *   li    → the fly-in from the side, which only touches x/rotate/opacity
 *   span  → the perpetual ball bounce (its own `y`, independent of the above)
 *
 * The bounce is shaped like gravity rather than a sine wave: the chip is slow
 * at the top of its arc and fast at the bottom (easeIn on the way down,
 * easeOut on the way up), and it squashes on impact and stretches as it leaves.
 * A symmetric ease would read as floating, not bouncing.
 */
function BounceTag({ label, left, top, from, spin, drift, delay, bounce, progress }) {
  const reduce = useReducedMotion()

  // Layer 1 — the scroll tumble. Bound to a MotionValue, so nothing else may
  // animate `y` on this element.
  const y = useTransform(progress, [0, 1], [0, drift])

  return (
    <motion.li
      className="absolute"
      style={reduce ? { left, top } : { left, top, y }}
    >
      {/* Layer 2 — the fly-in. Only touches x / rotate / opacity. */}
      <motion.div
        initial={reduce ? { rotate: spin } : { opacity: 0.001, x: from, rotate: 0 }}
        whileInView={{ opacity: 1, x: 0, rotate: spin }}
        viewport={{ once: true, margin: '-70px' }}
        transition={{ duration: 0.6, delay, ease: [0.44, 0, 0.56, 1], type: 'tween' }}
      >
        {/* Layer 3 — the ball hop, and the chip itself. The pill IS this
            element, so the whole thing bounces: background, padding and all.
            origin-bottom makes the squash flatten it against the floor rather
            than around its middle, which is what sells the impact. */}
        <motion.div
          className="inline-block origin-bottom rounded-full bg-page px-3 py-1.5 text-xs font-medium whitespace-nowrap text-body"
          animate={
            reduce
              ? undefined
              : {
                  y: [0, -bounce.height, 0, 0],
                  scaleY: [1, 1.04, 0.9, 1],
                  scaleX: [1, 0.97, 1.1, 1],
                }
          }
          transition={
            reduce
              ? undefined
              : {
                  duration: bounce.duration,
                  // Up slow, down fast, then the squash and recovery on impact.
                  times: [0, 0.45, 0.58, 0.75],
                  ease: ['easeOut', 'easeIn', 'easeOut'],
                  repeat: Infinity,
                  repeatDelay: bounce.rest,
                  // Each chip is on its own beat, so they never pulse in unison.
                  delay: delay + 0.7 + bounce.offset,
                }
          }
        >
          {label}
        </motion.div>
      </motion.div>
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
              alt={i < images.length ? `${title} — illustration ${i + 1}` : ''}
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

      {/* The chip field: a positioned area filling the rest of the card, so the
          chips scatter across the WHOLE card rather than queueing up in a row. */}
      {s.media === 'tags' && (
        <ul className="relative mt-8 h-[210px] w-full grow">
          {s.tags.map((t, i) => (
            <BounceTag
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
      {/* alt is deliberately descriptive rather than `${s.title} — sample work`.
          These slots hold illustrations of the service, not screenshots of
          Narendra's projects, and the old wording had the markup asserting the
          artwork was client work — to screen readers and crawlers both. */}
      {s.media === 'frame' && (
        <Reveal as="image" className="mt-auto pt-8">
          <Media
            src={s.image}
            alt={`${s.title} — illustration`}
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
            alt={`${s.title} — illustration`}
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

  // Drives the chips' scroll tumble — 0 as the section enters the viewport,
  // 1 as it leaves.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  return (
    <section id="services" ref={ref} className="shell py-20 lg:py-28">
      {/* "Design Solutions Built For Growth" was the template's, and it was the
          only kind of sentence that survives being said about anybody — swap
          the name and it still fits. It also broke the page's voice: every
          heading Narendra actually wrote is sentence case and says something
          ("I design interfaces people can actually use", "Notes on design, and
          on building it"), and every leftover was Title Case boilerplate. Two
          authors on one page is the tell.

          This says the one thing the four cards below have in common and the
          one thing most designers at his level can't claim. */}
      <Reveal className="flex flex-col items-center text-center">
        <Eyebrow tone="dark">Services</Eyebrow>
        <h2 className="mt-5 max-w-[18ch] text-3xl font-semibold text-white sm:text-5xl">
          The whole thing, not just the screens
        </h2>
      </Reveal>

      {/* The whole block sits inside one glassy panel on the navy — a faint
          diagonal white wash, not a solid card. */}
      <div className="mt-14 rounded-[20px] bg-gradient-to-br from-white/15 via-white/5 to-white/15 p-4 sm:p-8">
        {/* min-w-0 all the way down is load-bearing, not decoration.
            Ticker's track is `w-max`, and max-content propagates upward as the
            min-content size of every ancestor. Grid items default to
            `min-width: auto`, so the card could not shrink below it and blew its
            column out to 1388px — on a 390px phone. overflow-hidden clips what
            you SEE, never what the box is SIZED to. Without these the whole page
            scrolled sideways by 1034px. */}
        <div className="grid gap-3 lg:grid-cols-[1fr_1fr_22rem]">
          <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {[services[0], services[2]].map((s, i) => (
              <Reveal key={s.title} as="card" delay={i * 0.06} className="h-full min-w-0">
                <ServiceCard s={s} progress={scrollYProgress} />
              </Reveal>
            ))}
          </div>

          <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {[services[1], services[3]].map((s, i) => (
              <Reveal key={s.title} as="card" delay={0.04 + i * 0.06} className="h-full min-w-0">
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
                  alt="A design file and the interface it becomes, stacked"
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

      {/* The toolchain strip.

          This was a "Trusted By Global Partners" row of invented client names.
          Claiming clients you don't have is the kind of thing that unravels in
          one conversation. These are tools you actually use — a claim you can
          defend in any room. Duplicated once so the -50% scroll loops
          seamlessly.

          The second copy is aria-hidden. It exists only so the loop has
          somewhere to travel to; without this a screen reader announced the
          whole toolchain twice, back to back. */}
      <div className="marquee marquee--fade mt-14">
        <ul className="marquee__track flex w-max items-center gap-10" aria-label="Tools I work in">
          {[...tools, ...tools].map((t, i) => (
            <li
              key={`${t.label}-${i}`}
              aria-hidden={i >= tools.length ? 'true' : undefined}
              className="flex shrink-0 items-center gap-2.5 select-none"
            >
              {/* The mark is painted, not drawn: the SVG is a mask and the
                  colour comes from the background, so one tone covers thirteen
                  logos and they sit at exactly the weight of the label beside
                  them. */}
              <span
                aria-hidden="true"
                className="block h-6 w-6 shrink-0 bg-white/40"
                style={{
                  maskImage: `url(${t.icon})`,
                  WebkitMaskImage: `url(${t.icon})`,
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                }}
              />
              <span className="text-xl font-semibold whitespace-nowrap text-white/35">
                {t.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
