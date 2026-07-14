import { partners, services } from '../data'
import { Eyebrow, PillLink, Reveal } from './ui'

/** One bento tile. Dark or light, per the data. */
function ServiceCard({ s, className = '' }) {
  const dark = s.tone === 'dark'

  return (
    <div
      className={`rounded-card flex h-full flex-col p-7 ${
        dark ? 'bg-dark text-white' : 'bg-card text-ink'
      } ${className}`}
    >
      <h3 className={`text-xl font-semibold ${dark ? 'text-white' : 'text-ink'}`}>{s.title}</h3>
      <p className={`mt-3 max-w-[30ch] text-sm leading-relaxed ${dark ? 'text-white/60' : 'text-body'}`}>
        {s.desc}
      </p>

      {s.tags && (
        <ul className="mt-auto flex flex-wrap gap-2 pt-8">
          {s.tags.map((t) => (
            <li
              key={t}
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                dark ? 'bg-white/10 text-white/80' : 'bg-surface text-body'
              }`}
            >
              {t}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" className="shell py-20 lg:py-28">
      <Reveal className="flex flex-col items-center text-center">
        <Eyebrow>Core Services</Eyebrow>
        <h2 className="mt-5 max-w-[16ch] text-3xl font-semibold sm:text-5xl">
          Design Solutions Built For Growth
        </h2>
      </Reveal>

      {/* Bento: four service tiles on the left, the CTA panel on the right. */}
      <div className="mt-14 grid gap-4 lg:grid-cols-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {services.map((s, i) => (
            <Reveal key={s.title} as="card" delay={i * 0.06} className="h-full">
              <ServiceCard s={s} />
            </Reveal>
          ))}
        </div>

        <Reveal as="panel" delay={0.1} className="lg:col-span-4">
          <div className="rounded-card flex h-full flex-col justify-between gap-8 bg-dark p-7 text-white">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/80">
                <span aria-hidden="true" className="block h-1.5 w-1.5 rotate-45 bg-accent" />
                Trusted By Global Partners
              </span>

              <h3 className="mt-8 text-3xl font-semibold text-white">Let’s Create Impact</h3>
              <p className="mt-3 max-w-[26ch] text-sm leading-relaxed text-white/60">
                Let’s create meaningful and lasting digital impact.
              </p>
            </div>

            <PillLink href="#contact" className="[&_.pill]:bg-white [&_.pill]:text-ink [&_.pill-arrow]:bg-white [&_.pill-arrow]:text-ink">
              Start A Project
            </PillLink>
          </div>
        </Reveal>
      </div>

      {/* Partner strip. Duplicated once so the -50% scroll loops seamlessly. */}
      <div className="mt-14 overflow-hidden" aria-label="Clients and partners">
        <ul className="animate-marquee flex w-max items-center gap-14">
          {[...partners, ...partners].map((p, i) => (
            <li
              key={`${p}-${i}`}
              className="text-xl font-semibold whitespace-nowrap text-faint/70 select-none"
            >
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
