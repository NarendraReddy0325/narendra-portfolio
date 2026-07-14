import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

/**
 * The eyes cursor.
 *
 * A soft white disc that trails the pointer, with a pair of eyes inside that
 * actually look where you're going: the pupils lean toward the direction of
 * travel. Over anything clickable the disc swells and the eyes widen.
 *
 * Only runs on a fine pointer (a mouse). On touch there is no cursor to
 * replace, and under prefers-reduced-motion a spring-trailed object following
 * you around the screen is exactly the kind of thing to switch off.
 *
 * The native cursor is only hidden once this one is actually live — if the
 * component never mounts, you keep your normal pointer rather than losing it.
 */
export default function Cursor() {
  const reduce = useReducedMotion()
  const [live, setLive] = useState(false)
  const [hot, setHot] = useState(false) // over something clickable
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  // The disc lags slightly behind the pointer — that lag is what gives it
  // weight. Too stiff and it's just a second cursor; too loose and it's laggy.
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 })

  // The pupils lean toward travel, so the eyes read as looking where you go.
  const px = useSpring(0, { stiffness: 300, damping: 22 })
  const py = useSpring(0, { stiffness: 300, damping: 22 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine || reduce) return

    setLive(true)
    document.body.dataset.cursor = 'on'

    let lastX = 0
    let lastY = 0

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)

      // Direction of travel, clamped — the pupils can only lean so far.
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      lastX = e.clientX
      lastY = e.clientY
      // Clamped to the room inside the eyeball: a 13x17 eye holding an 8px
      // pupil leaves ~2px of play sideways and ~4px up and down.
      px.set(Math.max(-2, Math.min(2, dx * 0.35)))
      py.set(Math.max(-4, Math.min(4, dy * 0.35)))

      setHot(Boolean(e.target.closest?.('a, button, [role="button"], input, textarea, label')))
    }

    const leave = () => setVisible(false)

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)

    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      delete document.body.dataset.cursor
    }
  }, [reduce, x, y, px, py])

  if (!live) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[90] grid place-items-center rounded-full border border-line bg-card/80 backdrop-blur-sm"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: hot ? 64 : 44,
        height: hot ? 64 : 44,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
    >
      <motion.span
        className="flex items-center gap-[3px]"
        animate={{ scale: hot ? 1.2 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 24 }}
      >
        <Eye px={px} py={py} />
        <Eye px={px} py={py} />
      </motion.span>
    </motion.div>
  )
}

/**
 * One eye: a tall white oval with a dark pupil that rolls around inside it.
 *
 * The pupil moves WITHIN the eye rather than the whole eye sliding — that's the
 * difference between eyes that look somewhere and two dots that drift. The
 * white is clipped, so the pupil can never escape the eyeball.
 */
function Eye({ px, py }) {
  return (
    <motion.span
      className="relative block h-[17px] w-[13px] origin-center overflow-hidden rounded-full bg-white ring-1 ring-line/70"
      animate={{ scaleY: [1, 1, 0.08, 1] }}
      transition={{
        duration: 0.26,
        times: [0, 0.72, 0.86, 1],
        repeat: Infinity,
        // An odd interval, so the blink never feels metronomic.
        repeatDelay: 3.4,
        ease: 'easeInOut',
      }}
    >
      <motion.span
        className="absolute top-1/2 left-1/2 block h-[8px] w-[8px] rounded-full bg-ink"
        style={{ x: px, y: py, translateX: '-50%', translateY: '-50%' }}
      />
    </motion.span>
  )
}
