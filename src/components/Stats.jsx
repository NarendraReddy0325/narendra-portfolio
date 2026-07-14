import { stats } from '../data'
import Reveal from './Reveal'

/* The 1px gaps between panels are the parent's background showing through —
   `gap-px` on a bg-line grid. That's where the hairlines come from. */
export default function Stats() {
  return (
    <section id="about" className="container-px py-20 md:py-28">
      <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="bg-card p-8 md:p-10">
            <div className="font-display text-5xl font-semibold text-cream md:text-6xl">{s.value}</div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
