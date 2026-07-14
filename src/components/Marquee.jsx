import { marqueeWords as words } from '../data'

/** Two identical tracks side by side, each scrolling -50%, so the loop is seamless. */
export default function Marquee() {
  const Track = ({ hidden = false }) => (
    <div
      className="animate-marquee flex shrink-0 items-center gap-10 pr-10"
      aria-hidden={hidden || undefined}
    >
      {[...words, ...words].map((w, i) => (
        <span key={i} className="flex items-center gap-10 text-xl font-medium whitespace-nowrap text-muted">
          {w}
          <span className="text-accent">✦</span>
        </span>
      ))}
    </div>
  )

  return (
    <section className="border-y border-line bg-panel/40 py-6">
      <div className="relative flex overflow-hidden">
        <Track />
        <Track hidden />
      </div>
    </section>
  )
}
