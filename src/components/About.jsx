import { about, profile } from '../data'
import { CountUp, Eyebrow, PillLink, Reveal } from './ui'

/**
 * The About bento.
 *
 * Left: a tall portrait plate. Right: a 2×2 of small cards — two count-up
 * stats, a rating tile, and the "approach" tile with its skill chips.
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
            provides one — a soft grey wash it stands on, bottom-aligned. */}
        <Reveal className="lg:col-span-5">
          <div className="rounded-card relative flex h-full min-h-[20rem] items-end justify-center overflow-hidden bg-gradient-to-b from-[#dfe3ec] to-[#eef0f5]">
            <img
              src={about.image}
              alt={`${profile.name}, product and UI/UX designer`}
              loading="lazy"
              decoding="async"
              width={1131}
              height={1372}
              className="w-[86%] max-w-[22rem] translate-y-1 object-contain"
            />
          </div>
        </Reveal>

        {/* The 2×2 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          <Reveal delay={0.05}>
            <div className="card flex h-full flex-col justify-between gap-6 p-6">
              <p className="max-w-[10rem] text-sm leading-snug text-body">{about.stats[0].label}</p>
              <CountUp
                to={about.stats[0].value}
                suffix={about.stats[0].suffix}
                className="text-4xl font-semibold tracking-tight text-ink"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card flex h-full flex-col justify-between gap-6 p-6">
              <p className="max-w-[10rem] text-sm leading-snug text-body">{about.stats[1].label}</p>
              <CountUp
                to={about.stats[1].value}
                suffix={about.stats[1].suffix}
                className="text-4xl font-semibold tracking-tight text-ink"
              />
            </div>
          </Reveal>

          {/* Rating tile: big number, then the star chip and a small plate. */}
          <Reveal delay={0.15}>
            <div className="card flex h-full flex-col justify-between gap-5 p-6">
              <div>
                <CountUp
                  to={about.stats[2].value}
                  suffix={about.stats[2].suffix}
                  className="text-4xl font-semibold tracking-tight text-ink"
                />
                <p className="mt-2 text-sm leading-snug text-body">{about.stats[2].label}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5">
                  <span aria-hidden="true" className="text-star">
                    ★
                  </span>
                  <span className="text-sm font-semibold text-ink">{about.rating.score}</span>
                </span>
                <span className="text-xs text-faint">{about.rating.label}</span>
              </div>
            </div>
          </Reveal>

          {/* Approach tile */}
          <Reveal delay={0.2}>
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
