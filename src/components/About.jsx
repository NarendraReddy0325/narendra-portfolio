import { about } from '../data'
import Reveal from './Reveal'

export default function About() {
  return (
    <section className="container-px py-20 md:py-28">
      <div className="grid items-end gap-10 md:grid-cols-2">
        <Reveal>
          <span className="eyebrow">About</span>
          <h2 className="font-display mt-6 text-4xl leading-tight font-semibold tracking-tight md:text-5xl">
            {about.heading}
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-lg leading-relaxed text-muted">{about.body}</p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {about.tools.map((t) => (
              <li
                key={t}
                className="rounded-full border border-line bg-panel px-4 py-2 text-sm text-muted"
              >
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
