import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import { Folio, Shell } from '../components/Folio'
import { MaskLines, Rise, Rule } from '../components/Motion'
import { ToolsList } from '../components/SkillsStrip'
import Media from '../components/Media'
import { site } from '../data/site'

export default function About() {
  return (
    <PageTransition>
      <Folio label="About" index="—">
        <section className="pt-36 pb-24 lg:pt-52">
          <Shell>
            <div className="grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="font-mono text-micro text-ink-faint">{site.role}</p>
                <h1 className="font-display mt-7 -ml-1 text-[3.4rem] sm:text-[5.5rem] lg:-ml-3">
                  <MaskLines lines={['I design', 'the boring', 'parts well.']} delay={0.1} />
                </h1>
              </div>

              {/* Portrait. Deliberately not a circle, not centered, and not
                  cropped to a headshot — it's a plate in the margin. */}
              <Rise delay={0.35} className="lg:col-span-4 lg:col-start-9 lg:pt-6">
                <Media
                  src="/images/portrait.jpg"
                  alt={`${site.name}, ${site.role}`}
                  caption="Portrait"
                  className="aspect-[4/5] w-full bg-paper-sunk object-cover"
                />
                <p className="mt-3 font-mono text-micro text-ink-faint">
                  {site.shortName} — {site.location}
                </p>
              </Rise>
            </div>

            {/* ------------------------------------------------------------ BIO */}
            <div className="mt-24 grid grid-cols-1 gap-x-10 lg:mt-36 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <Rule className="mb-5" />
                <h2 className="font-mono text-micro text-ink-faint">Background</h2>
              </div>
              <Rise className="lg:col-span-7 lg:col-start-5">
                {site.bio.map((p, i) => (
                  <p key={i} className="mb-6 max-w-[62ch] text-[1.05rem] leading-[1.75] text-ink-muted last:mb-0">
                    {p}
                  </p>
                ))}
              </Rise>
            </div>

            {/* -------------------------------------------------------- PROCESS
                Numbered because it genuinely is a sequence — each step depends
                on the one before it. */}
            <div className="mt-28 grid grid-cols-1 gap-x-10 lg:mt-44 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <Rule className="mb-5" />
                <h2 className="font-mono text-micro text-ink-faint">How I work</h2>
              </div>

              <ol className="lg:col-span-8 lg:col-start-5">
                {site.process.map(({ title, body }, i) => (
                  <Rise key={title} delay={i * 0.06}>
                    <li className="border-t border-rule py-8 first:border-t-0 first:pt-0 lg:py-10">
                      <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-12">
                        <span className="font-mono text-micro text-accent sm:col-span-1">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div className="sm:col-span-11">
                          <h3 className="font-display text-[1.9rem] lg:text-[2.4rem]">{title}</h3>
                          <p className="mt-3 max-w-[58ch] leading-[1.7] text-ink-muted">{body}</p>
                        </div>
                      </div>
                    </li>
                  </Rise>
                ))}
              </ol>
            </div>

            {/* -------------------------------------------------------- TOOLKIT */}
            <div className="mt-28 grid grid-cols-1 gap-x-10 lg:mt-44 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <Rule className="mb-5" />
                <h2 className="font-mono text-micro text-ink-faint">Toolkit</h2>
              </div>
              <div className="lg:col-span-8 lg:col-start-5">
                <ToolsList />
              </div>
            </div>

            {/* ----------------------------------------------------------- NEXT */}
            <div className="mt-28 lg:mt-44">
              <Rule className="mb-10" />
              <Link
                to="/contact"
                data-cursor="Get in touch"
                className="link-draw font-display text-[2.4rem] sm:text-[3.25rem]"
              >
                Work with me
                <span aria-hidden="true" className="ml-3 text-accent">
                  →
                </span>
              </Link>
            </div>
          </Shell>
        </section>
      </Folio>
    </PageTransition>
  )
}
