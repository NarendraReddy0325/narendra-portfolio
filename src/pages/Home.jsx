import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import { Folio, Shell } from '../components/Folio'
import { MaskLines, Rise, Rule } from '../components/Motion'
import ProjectCard from '../components/ProjectCard'
import SkillsStrip from '../components/SkillsStrip'
import { featuredProjects } from '../data/projects'
import { site } from '../data/site'

export default function Home() {
  const featured = featuredProjects()

  return (
    <PageTransition>
      {/* ---------------------------------------------------------------- HERO
          Not centered. The name sits hard against the left rail at display
          size, the positioning statement hangs off the right of the grid, and
          a mono colophon block anchors the bottom-right corner. The thesis is
          the typography itself. */}
      <Folio label="Index" index="01">
        <section className="pt-36 pb-20 lg:pt-52 lg:pb-32">
          <Shell>
            <p className="font-mono text-micro text-ink-faint">
              {site.role} — {site.location}
            </p>

            <h1 className="font-display mt-8 -ml-1 text-[3.4rem] sm:text-[5.5rem] lg:-ml-3 lg:text-[9rem]">
              {/* Each word of the name gets its own masked line. */}
              <MaskLines lines={site.name.split(' ')} delay={0.15} stagger={0.1} />
            </h1>

            <div className="mt-14 grid grid-cols-1 gap-10 lg:mt-24 lg:grid-cols-12">
              <Rise delay={0.5} className="lg:col-span-6 lg:col-start-6">
                <p className="text-lead leading-[1.45] text-ink">{site.positioning}</p>

                <Link
                  to="/work"
                  data-cursor="See the work"
                  className="link-draw mt-8 inline-block font-mono text-meta text-accent"
                >
                  Ten projects, in detail →
                </Link>
              </Rise>

              {/* Colophon. A magazine masthead block: the facts, set small. */}
              <Rise delay={0.62} className="lg:col-span-3 lg:col-start-6 lg:hidden xl:col-start-6">
                <dl className="grid grid-cols-3 gap-4 border-t border-rule pt-5">
                  {site.stats.map(({ value, label }) => (
                    <div key={label}>
                      <dt className="font-display text-[2rem] text-ink">{value}</dt>
                      <dd className="mt-1 font-mono text-micro text-ink-faint">{label}</dd>
                    </div>
                  ))}
                </dl>
              </Rise>
            </div>
          </Shell>

          {/* Desktop colophon — bottom-right, deliberately off the main column. */}
          <Shell className="hidden lg:mt-28 lg:block">
            <div className="grid grid-cols-12">
              <div className="col-span-5 col-start-8">
                <dl className="grid grid-cols-3 gap-6 border-t border-rule pt-5">
                  {site.stats.map(({ value, label }) => (
                    <div key={label}>
                      <dt className="font-display text-[2.4rem] text-ink">{value}</dt>
                      <dd className="mt-1 font-mono text-micro text-ink-faint">{label}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 font-mono text-micro text-accent">{site.availability}</p>
              </div>
            </div>
          </Shell>
        </section>
      </Folio>

      {/* ------------------------------------------------------------ FEATURED
          Alternating offsets. Cards do not sit in an even 2-up grid — they
          step down the page with different widths and vertical offsets, so
          scrolling has a rhythm instead of a beat. */}
      <Folio label="Selected work" index={`01—${String(featured.length).padStart(2, '0')}`}>
        <section className="pt-8 lg:pt-16">
          <Shell>
            <Rule className="mb-14" />

            <div className="grid grid-cols-1 gap-x-10 gap-y-20 lg:grid-cols-12 lg:gap-y-40">
              {featured.map((project, i) => {
                const odd = i % 2 === 1
                return (
                  <div
                    key={project.slug}
                    className={
                      odd
                        ? 'lg:col-span-5 lg:col-start-8 lg:mt-40'
                        : 'lg:col-span-6 lg:col-start-1'
                    }
                  >
                    <ProjectCard project={project} index={i} priority={i === 0} />
                  </div>
                )
              })}
            </div>

            <div className="mt-24 border-t border-rule pt-8 lg:mt-40">
              <Link
                to="/work"
                data-cursor="All work"
                className="link-draw font-display text-[2rem] sm:text-[3.25rem]"
              >
                All ten projects
                <span aria-hidden="true" className="ml-3 text-accent">
                  →
                </span>
              </Link>
            </div>
          </Shell>
        </section>
      </Folio>

      {/* --------------------------------------------------------------- ABOUT
          The dark section. One per page, used as a breath — and the only place
          the skills strip lives, so it reads as a change of stock rather than
          a decorated div. */}
      <Folio label="About" index="02" dark className="mt-32 bg-deep text-paper lg:mt-48">
        <section className="py-24 lg:py-36">
          <Shell>
            <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <h2 className="font-display text-[2.6rem] text-paper lg:text-[3.25rem]">
                  <MaskLines lines={['Two years,', 'ten projects.']} />
                </h2>
              </div>

              <Rise className="lg:col-span-6 lg:col-start-7">
                {site.blurb.map((p, i) => (
                  <p key={i} className="mb-5 text-[1.05rem] leading-[1.7] text-paper/70 last:mb-0">
                    {p}
                  </p>
                ))}
                <Link
                  to="/about"
                  data-cursor="Read more"
                  className="link-draw mt-8 inline-block font-mono text-meta text-accent-lift"
                >
                  More about how I work →
                </Link>
              </Rise>
            </div>
          </Shell>

          <div className="mt-20 border-t border-deep-rule pt-10 lg:mt-28">
            <SkillsStrip />
          </div>
        </section>
      </Folio>

      {/* ------------------------------------------------------------- CONTACT */}
      <Folio label="Contact" index="03">
        <section className="pt-28 lg:pt-40">
          <Shell>
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-9">
                <p className="font-mono text-micro text-ink-faint">Next</p>
                <h2 className="font-display mt-6 -ml-1 text-[3rem] leading-[0.95] sm:text-[4.5rem] lg:-ml-2 lg:text-[5.5rem]">
                  Have something
                  <br />
                  worth building?
                </h2>
                <Link
                  to="/contact"
                  data-cursor="Get in touch"
                  className="mt-10 inline-flex items-center gap-4 bg-ink px-7 py-4 text-paper transition-colors duration-400 hover:bg-accent"
                >
                  <span className="font-display-sm text-[1.25rem]">Start a conversation</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </Shell>
        </section>
      </Folio>
    </PageTransition>
  )
}
