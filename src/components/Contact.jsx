import { nav, profile, socials } from '../data'
import Reveal from './Reveal'

export default function Contact() {
  return (
    <footer id="contact" className="relative overflow-hidden pt-20 md:pt-28">
      <div className="container-px">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-gradient-to-b from-panel to-card px-8 py-16 text-center md:px-16 md:py-24">
            <div className="glow absolute inset-0" />
            <div className="grid-bg absolute inset-0 opacity-30 [mask-image:radial-gradient(circle_at_50%_50%,black,transparent_70%)]" />

            <div className="relative">
              <span className="eyebrow">Contact</span>

              <h2 className="font-display mx-auto mt-6 max-w-2xl text-4xl leading-tight font-semibold tracking-tight md:text-6xl">
                Let’s build something worth remembering.
              </h2>

              <p className="mx-auto mt-5 max-w-lg text-lg text-muted">
                Have a project in mind? Tell me what you’re building, roughly when you need it, and
                what isn’t working today.
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <a href={`mailto:${profile.email}`} className="btn-primary">
                  {profile.email}
                </a>
                <a
                  href={socials[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  See more on {socials[0].label}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="container-px py-12">
        <div className="flex flex-col items-center justify-between gap-6 border-t border-line pt-8 md:flex-row">
          <a href="#top" className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-sm font-bold text-ink">
              {profile.initial}
            </span>
            <span className="font-display text-lg font-semibold">{profile.name}</span>
          </a>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-cream"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-line px-4 py-2 text-xs text-muted transition-colors hover:border-cream/40 hover:text-cream"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-center text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}. Crafted with care. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
