import { about, profile } from '../data'
import { CountUp, Eyebrow, PillLink, Reveal } from './ui'
import StatCard from './StatCard'

/**
 * The About bento.
 *
 * Left: a tall portrait plate. Right: a 2x2 of small cards — two count-up
 * stats, a third stat with a capability chip, and the "approach" tile.
 * On mobile the bento unstacks into a single column in reading order.
 */
export default function About() {
  return (
    <section id="about" className="shell py-20 lg:py-28">
      <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-3">
          <Eyebrow>About Me</Eyebrow>
        </div>

        <div className="lg:col-span-9">
          <h2 className="max-w-[24ch] text-3xl leading-[1.15] font-semibold sm:text-4xl">
            {about.statement}
          </h2>
          <PillLink href="#contact" className="mt-8">
            Get In Touch
          </PillLink>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-4 lg:grid-cols-12">
        {/* Portrait plate. The cut-out has no background of its own, so the card
            provides one — a soft grey wash it stands on, bottom-aligned.
            Images scale up from 0.9 rather than translating, per the reference. */}
        <Reveal as="image" className="lg:col-span-5">
          <div className="rounded-card relative flex h-full min-h-[20rem] items-end justify-center overflow-hidden bg-gradient-to-b from-[#dfe3ec] to-[#eef0f5]">
            <img
              src={about.image}
              alt={`${profile.name}, product and UI/UX designer`}
              loading="lazy"
              decoding="async"
              width={1131}
              height={1372}
              className="portrait-fade w-[88%] max-w-[22rem] object-contain"
            />
          </div>
        </Reveal>

        {/* The 2x2. The top two tiles are the LANDING SLOTS for the cards that
            fly down out of the hero — same component, so the card that leaves
            the hero is the card that arrives here. On desktop these render
            invisible and TravelingStats draws the real ones on top; below lg
            there's no travel and these are simply the cards. They don't get a
            reveal, because something is already flying into them. */}
        {/* content-start is doing real work here. This column stretches to match
            the portrait beside it, and a grid's auto rows STRETCH to fill that
            extra height by default — which is what left a gap under each counter
            card. Pinning align-content to the start keeps both rows at their
            natural size: the counter cards stay compact around their content,
            the taller tiles keep their own height, and the only space between
            them is the gap. */}
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:content-start">
          <StatCard stat={about.stats[0]} anchorId="stat-about-0" anchor />
          <StatCard stat={about.stats[1]} anchorId="stat-about-1" anchor />

          {/* Third stat, plus a capability chip.

              This tile used to carry a "4.8 client satisfaction score" with a
              star — a number the template invented. It's gone. A fabricated
              rating is the fastest way to lose a room, and it's the first thing
              anyone sharp will ask you to back up. What's here now is true. */}
          <Reveal as="card" delay={0.15}>
            <div className="card flex h-full flex-col justify-between gap-5 p-6">
              <div>
                <CountUp
                  to={about.stats[2].value}
                  suffix={about.stats[2].suffix}
                  className="text-4xl font-semibold tracking-tight text-ink"
                />
                <p className="mt-2 text-sm leading-snug text-body">{about.stats[2].label}</p>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5">
                  <span aria-hidden="true" className="block h-1.5 w-1.5 rotate-45 bg-accent" />
                  <span className="text-sm font-semibold text-ink">{about.capability.label}</span>
                </span>
                <span className="text-xs text-faint">{about.capability.caption}</span>
              </div>
            </div>
          </Reveal>

          {/* Approach tile */}
          <Reveal as="card" delay={0.2}>
            <div className="card flex h-full flex-col gap-5 p-6">
              <h3 className="text-xl leading-snug font-semibold">{about.approach.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {about.approach.tags.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
