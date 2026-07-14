import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { about } from '../data'
import StatCard from './StatCard'

/**
 * The two counter cards that ride down out of the hero and settle into the
 * About bento.
 *
 * This is a shared-element transition, not a hand-off between two copies. The
 * cards are rendered ONCE, in a fixed layer, and each frame they are placed at
 * a lerp between two invisible anchors: their slot in the hero and their slot
 * in the About grid.
 *
 * The trick is that both anchors are ordinary in-flow elements, so their
 * viewport rects already move with the page. Interpolating between the two
 * *current* rects means:
 *
 *   t = 0  → the card sits exactly on the hero slot
 *   t = 1  → the card sits exactly on the About slot, and because we keep
 *            tracking that rect, it then scrolls with the grid like any other
 *            element. No snap at the hand-off.
 *
 * t is driven by how far you've scrolled relative to the gap between the two
 * slots, smoothstepped so it eases in and out rather than tracking the
 * scrollbar linearly.
 */
const PAIRS = [
  { hero: 'stat-hero-0', about: 'stat-about-0', stat: about.stats[0] },
  { hero: 'stat-hero-1', about: 'stat-about-1', stat: about.stats[1] },
]

const lerp = (a, b, t) => a + (b - a) * t
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)
// Smoothstep: eases both ends, so the cards don't lurch off the mark.
const smooth = (t) => t * t * (3 - 2 * t)

export default function TravelingStats() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const refs = useRef([])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const sync = () => setEnabled(mq.matches && !reduce)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [reduce])

  useEffect(() => {
    if (!enabled) return

    let raf
    const frame = () => {
      raf = requestAnimationFrame(frame)

      PAIRS.forEach((pair, i) => {
        const el = refs.current[i]
        const from = document.getElementById(pair.hero)
        const to = document.getElementById(pair.about)
        if (!el || !from || !to) return

        const a = from.getBoundingClientRect()
        const b = to.getBoundingClientRect()
        const scrollY = window.scrollY

        // Document-space tops are fixed; their difference is the travel budget.
        const aDoc = a.top + scrollY
        const bDoc = b.top + scrollY
        const distance = bDoc - aDoc
        if (distance <= 0) return

        const t = smooth(clamp01(scrollY / distance))

        el.style.width = `${lerp(a.width, b.width, t)}px`
        el.style.height = `${lerp(a.height, b.height, t)}px`
        el.style.transform = `translate3d(${lerp(a.left, b.left, t)}px, ${lerp(a.top, b.top, t)}px, 0)`
        el.style.opacity = '1'
      })
    }

    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [enabled])

  if (!enabled) return null

  return (
    // Fixed so the cards are positioned in viewport space — the same space the
    // anchors' rects are measured in. aria-hidden because the anchors already
    // carry this content in the reading order, twice would be noise.
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30">
      {PAIRS.map((pair, i) => (
        <div
          key={pair.hero}
          ref={(node) => (refs.current[i] = node)}
          style={{ position: 'absolute', top: 0, left: 0, opacity: 0, willChange: 'transform' }}
        >
          <StatCard stat={pair.stat} live />
        </div>
      ))}
    </div>
  )
}
