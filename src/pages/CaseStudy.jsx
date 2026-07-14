import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'

import PageTransition from '../components/PageTransition'
import { Folio, Shell } from '../components/Folio'
import { Rise, Rule } from '../components/Motion'
import ProjectHero from '../components/ProjectHero'
import ImageGallery from '../components/ImageGallery'
import ExternalLinkCTA from '../components/ExternalLinkCTA'
import { getProject, projects } from '../data/projects'
import { site } from '../data/site'

/** The three beats of a case study. A real sequence, so it's numbered. */
const SECTIONS = [
  { key: 'problem', label: 'The problem' },
  { key: 'process', label: 'The work' },
  { key: 'outcome', label: 'The outcome' },
]

export default function CaseStudy() {
  const { slug } = useParams()
  const project = getProject(slug)

  useEffect(() => {
    if (project) document.title = `${project.title} — ${site.name}`
    return () => {
      document.title = `${site.name} — ${site.role}`
    }
  }, [project])

  if (!project) return <Navigate to="/work" replace />

  const isLive = project.type === 'live'
  const i = projects.findIndex((p) => p.slug === slug)
  const next = projects[(i + 1) % projects.length]

  return (
    <PageTransition>
      <Folio label={project.category} index={String(i + 1).padStart(2, '0')}>
        <ProjectHero project={project} />

        {/* ---------------------------------------------------------- THE BODY
            Narrow measure, offset right. Long-form reading gets a real column
            width (~62ch) and is pushed off the left rail — the prose is not
            the same shape as the imagery, on purpose. */}
        <article className="mt-28 lg:mt-40">
          <Shell>
            <div className="grid grid-cols-1 gap-x-10 lg:grid-cols-12">
              <div className="lg:col-span-7 lg:col-start-5">
                {SECTIONS.map(({ key, label }, n) => (
                  <Rise key={key} className="mb-16 last:mb-0">
                    <div className="flex items-baseline gap-5">
                      <span className="font-mono text-micro text-accent">
                        {String(n + 1).padStart(2, '0')}
                      </span>
                      <h2 className="font-display text-[2rem] lg:text-[2.4rem]">{label}</h2>
                    </div>
                    <p className="mt-5 max-w-[62ch] text-[1.05rem] leading-[1.75] text-ink-muted">
                      {project[key]}
                    </p>
                  </Rise>
                ))}
              </div>
            </div>
          </Shell>
        </article>

        {/* ------------------------------------------------------- TYPE-SPECIFIC
            This is the fork the whole data model exists for. */}
        {isLive ? (
          /* LIVE: the outbound link, restated as a full section. It was already
             offered above the fold; this is for anyone who read to the end. */
          <section className="mt-28 lg:mt-40">
            <Shell>
              <Rule className="mb-14" />
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <h2 className="font-display text-[2.4rem] lg:text-[3.25rem]">
                    It’s live.
                    <br />
                    Go and use it.
                  </h2>
                </div>
                <div className="self-end lg:col-span-5 lg:col-start-7">
                  <p className="max-w-[46ch] text-ink-muted">
                    Everything described above is in production. The best way to judge the work is
                    to put your hands on it.
                  </p>
                  {project.liveUrl && (
                    <ExternalLinkCTA href={project.liveUrl} title={project.title} className="mt-8" />
                  )}
                </div>
              </div>
            </Shell>
          </section>
        ) : (
          /* CONCEPT: the screens are the payload. Gallery carries the page. */
          <ImageGallery images={project.figmaImages} title={project.title} />
        )}

        {/* ------------------------------------------------------------ NEXT UP */}
        <section className="mt-32 lg:mt-48">
          <Shell>
            <Rule className="mb-10" />
            <Link
              to={`/work/${next.slug}`}
              data-cursor="Next project"
              className="group block"
            >
              <p className="font-mono text-micro text-ink-faint">Next project</p>
              <div className="mt-4 flex flex-wrap items-baseline justify-between gap-4">
                <h2 className="font-display text-[3rem] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 sm:text-[4.5rem]">
                  {next.title}
                </h2>
                <span className="font-mono text-micro text-ink-muted">{next.category}</span>
              </div>
            </Link>
          </Shell>
        </section>
      </Folio>
    </PageTransition>
  )
}
