import { Link } from 'react-router-dom'
import { site } from '../data/site'

/**
 * The footer is the closing page, not a legal strip. It carries the actual ask
 * (email), the places to find me, and a sign-off — and the email is set at
 * display size because it's the single most useful thing on it.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="on-deep folio mt-32 bg-deep pb-10 text-paper lg:mt-48">
      <div className="px-6 pt-20 md:px-10 lg:pr-12 lg:pl-30 lg:pt-28">
        <div className="grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-mono text-micro text-ink-faint">Currently</p>
            <p className="font-display-sm mt-3 max-w-[28ch] text-[1.5rem] leading-snug text-paper/90">
              {site.availability}. If you have something that needs designing properly, I&apos;d
              like to hear about it.
            </p>

            <a
              href={`mailto:${site.email}`}
              data-cursor="Write to me"
              className="link-draw font-display mt-10 inline-block text-[2rem] break-all text-paper sm:text-[3.25rem]"
            >
              {site.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:col-span-4 lg:col-start-9">
            <nav aria-label="Footer">
              <p className="font-mono text-micro text-ink-faint">Pages</p>
              <ul className="mt-4 space-y-2">
                {[
                  { to: '/', label: 'Index' },
                  { to: '/work', label: 'Work' },
                  { to: '/about', label: 'About' },
                  { to: '/contact', label: 'Contact' },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="link-draw text-[0.95rem] text-paper/80 hover:text-paper">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="font-mono text-micro text-ink-faint">Elsewhere</p>
              <ul className="mt-4 space-y-2">
                {site.socials.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-draw text-[0.95rem] text-paper/80 hover:text-paper"
                    >
                      {label}
                      <span aria-hidden="true" className="ml-1 text-ink-faint">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-deep-rule pt-6 font-mono text-micro text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {site.name}
          </span>
          <span>{site.location}</span>
          <span>Set in Fraunces &amp; Inter</span>
        </div>
      </div>
    </footer>
  )
}
