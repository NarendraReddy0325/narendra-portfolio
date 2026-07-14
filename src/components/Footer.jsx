import { nav, profile, socials } from '../data'
import { PillLink, Reveal } from './ui'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="shell pt-10 pb-12 lg:pt-16">
      <Reveal>
        <div className="rounded-panel flex flex-col items-center gap-8 bg-dark px-6 py-20 text-center text-white lg:py-28">
          <h2 className="max-w-[16ch] text-4xl font-semibold text-white sm:text-6xl">
            Ready To Start Something Great?
          </h2>

          <PillLink
            href={`mailto:${profile.email}`}
            className="[&_.pill]:bg-white [&_.pill]:text-ink [&_.pill-arrow]:bg-white [&_.pill-arrow]:text-ink"
          >
            Get In Touch
          </PillLink>

          <a href={`mailto:${profile.email}`} className="text-sm text-white/60 hover:text-white">
            {profile.email}
          </a>

          {/* Footer nav + socials, on the dark panel's baseline. */}
          <div className="mt-10 flex w-full flex-col items-center gap-6 border-t border-white/10 pt-8 lg:flex-row lg:justify-between">
            <nav aria-label="Footer">
              <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <ul className="flex flex-wrap justify-center gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/15 px-4 py-2 text-xs text-white/70 transition-colors hover:border-white/40 hover:text-white"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <p className="mt-8 text-center text-xs text-faint">
        © {year} {profile.name}. Designed &amp; built by {profile.name}.
      </p>
    </footer>
  )
}
