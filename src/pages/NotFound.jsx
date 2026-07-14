import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import { Folio, Shell } from '../components/Folio'
import { MaskLines } from '../components/Motion'

export default function NotFound() {
  return (
    <PageTransition>
      <Folio label="Not found" index="404">
        <section className="flex min-h-[70vh] items-center pt-36 pb-24">
          <Shell className="w-full">
            <p className="font-mono text-micro text-ink-faint">404</p>
            <h1 className="font-display mt-6 -ml-1 text-[3.4rem] sm:text-[5.5rem] lg:-ml-3">
              <MaskLines lines={['This page', 'doesn’t exist.']} />
            </h1>
            <p className="mt-8 max-w-[42ch] text-lead text-ink-muted">
              The link is broken or the project moved. The work is all still here.
            </p>
            <Link
              to="/work"
              data-cursor="All work"
              className="link-draw mt-10 inline-block font-mono text-meta text-accent"
            >
              Go to the work →
            </Link>
          </Shell>
        </section>
      </Folio>
    </PageTransition>
  )
}
