import { about, profile } from '../data'
import { CountUp, Eyebrow, Media, PillLink, Reveal } from './ui'
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
              className="portrait-fade portrait-center w-[88%] max-w-[22rem] object-contain"
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

          {/* Third stat: big number top-left, a chip on the baseline, and a small
              image plate tucked into the bottom-right corner — the reference's
              layout exactly.

              What's NOT here is the reference's "4.8 client satisfaction score"
              star. That number was invented by the template. The shape of the
              tile is the same; the claim in it is one you can defend. */}
          <Reveal as="card" delay={0.15}>
            <div className="card relative h-full overflow-hidden p-6 pb-8">
              <CountUp
                to={about.stats[2].value}
                suffix={about.stats[2].suffix}
                className="text-4xl font-semibold tracking-tight text-ink"
              />
              <p className="mt-2 max-w-[16ch] text-sm leading-snug text-body">
                {about.stats[2].label}
              </p>

              {/* The chip sits bottom-left, the image plate bottom-right — the
                  reference's arrangement. The chip's caption lived here at first
                  and the plate covered it, so it's gone: the label carries the
                  claim on its own. */}
              <span className="absolute bottom-7 left-6 inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-2">
                <span aria-hidden="true" className="block h-2 w-2 rotate-45 bg-accent" />
                <span className="text-sm font-semibold whitespace-nowrap text-ink">
                  {about.capability.label}
                </span>
              </span>

              <Media
                src={about.tileImage}
                alt=""
                rounded="rounded-tl-[16px]"
                className="absolute right-0 bottom-0 h-[110px] w-[120px] object-cover"
              />
            </div>
          </Reveal>

          {/* Approach tile. The last chip is rotated and pinned to the right —
              the reference's "Branding" chip standing on its edge. */}
          <Reveal as="card" delay={0.2}>
            <div className="card relative h-full overflow-hidden p-6 pb-8">
              <h3 className="max-w-[18ch] text-xl leading-snug font-semibold">
                {about.approach.title}
              </h3>

              <ul className="mt-6 flex flex-col items-start gap-2 pr-24">
                {about.approach.tags.slice(0, 3).map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>

              {about.approach.tags[3] && (
                <span className="chip absolute right-5 bottom-8 rotate-[62deg] origin-bottom">
                  {about.approach.tags[3]}
                </span>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
