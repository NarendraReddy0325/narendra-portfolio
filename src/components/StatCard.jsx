import { CountUp } from './ui'

/**
 * The counter card — one component, used in two places.
 *
 * In the reference the hero card and the About-bento tile are the same
 * component at different widths, which is what makes the travelling transition
 * possible: the card that leaves the hero is the card that lands in the bento.
 *
 * `anchorId` marks it as a slot for TravelingStats to measure. An anchor is
 * laid out normally (so the grid keeps its shape) but hidden from view on
 * desktop, because the real card is drawn in the fixed layer on top of it.
 */
export default function StatCard({ stat, anchorId, anchor = false, live = false }) {
  return (
    <div
      id={anchorId}
      // h-full so the card fills its grid row (and, in the fixed layer, fills
      // the box TravelingStats sizes for it).
      className={`card flex h-full items-center justify-between gap-6 px-6 py-5 shadow-[0_24px_60px_-30px_rgba(16,16,16,0.35)] ${
        anchor ? 'lg:invisible' : ''
      }`}
    >
      <p className="max-w-[10rem] text-[0.85rem] leading-snug text-body">{stat.label}</p>

      {/* Only the visible copy counts up — an invisible anchor animating its
          number would just be wasted work. */}
      {live || !anchor ? (
        <CountUp
          to={stat.value}
          suffix={stat.suffix}
          className="text-3xl font-semibold tracking-tight text-ink"
        />
      ) : (
        <span className="text-3xl font-semibold tracking-tight text-ink">
          {stat.value}
          {stat.suffix}
        </span>
      )}
    </div>
  )
}
