import { pricing } from '../data'
import { Eyebrow, PillLink, Reveal } from './ui'

/**
 * NOT MOUNTED. You asked to drop pricing, so App.jsx doesn't render this.
 * To bring it back, add these two lines to src/App.jsx:
 *
 *   import Pricing from './components/Pricing'
 *   …
 *   <Pricing />        // after <Services />
 */
export default function Pricing() {
  return (
    <section id="pricing" className="shell py-20 lg:py-28">
      <Reveal className="flex flex-col items-center text-center">
        <Eyebrow>Pricing</Eyebrow>
        <h2 className="mt-5 max-w-[18ch] text-3xl font-semibold sm:text-5xl">
          Flexible design support for growing brands
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        {pricing.map((plan, i) => (
          <Reveal key={plan.name} as="pop" delay={i * 0.08} className="h-full">
            <div
              className={`rounded-card flex h-full flex-col p-8 ${
                plan.featured ? 'bg-accent-tint ring-1 ring-accent-soft' : 'bg-card'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm font-medium text-body">{plan.name}</span>
                {plan.featured && (
                  <span aria-hidden="true" className="block h-2 w-2 rotate-45 bg-accent" />
                )}
              </div>

              <p className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight text-ink">{plan.price}</span>
                <span className="text-sm text-faint">{plan.period}</span>
              </p>

              <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-body">{plan.desc}</p>

              <p className="mt-8 text-sm font-medium text-ink">What’s included:</p>
              <ul className="mt-4 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-body">
                    <span aria-hidden="true" className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-10">
                <PillLink href="#contact">Get In Touch</PillLink>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
