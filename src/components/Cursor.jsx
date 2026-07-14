import { useEffect, useState } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

/**
 * The eyes cursor.
 *
 * A soft white disc that trails the pointer with a pair of eyes inside — and
 * the eyes genuinely look at your pointer, rather than just leaning with the
 * direction of travel.
 *
 * The trick is that the disc LAGS behind the real pointer (that lag is what
 * gives it weight). So the vector from the disc to the true pointer position is
 * exactly where the eyes should be looking. Point the pupils down that vector
 * and they track your mouse: they lead into a fast movement, drift back to
 * centre when you stop, and glance sideways when you flick past. Velocity-based
 * pupils can't do that — they just twitch and snap back to centre.
 *
 * Only runs on a fine pointer, and never under prefers-reduced-motion. The
 * native cursor is hidden only once this one is actually live, so if it never
 * mounts you keep your normal pointer instead of losing it.
 */

const DISC = 36
const DISC_HOT = 52

// How far an iris may travel inside its eye before it would clip the white.
const REACH_X = 2
const REACH_Y = 2.6

const clamp = (v, r) => Math.max(-r, Math.min(r, v))

export default function Cursor() {
  const reduce = useReducedMotion()
  const [live, setLive] = useState(false)
  const [hot, setHot] = useState(false) // over something clickable
  const [down, setDown] = useState(false) // mouse held
  const [visible, setVisible] = useState(false)

  // The true pointer.
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)

  // The disc, trailing behind it.
  const sx = useSpring(x, { stiffness: 480, damping: 40, mass: 0.55 })
  const sy = useSpring(y, { stiffness: 480, damping: 40, mass: 0.55 })

  // The pupils, aiming from the disc at the true pointer.
  const px = useSpring(0, { stiffness: 320, damping: 26 })
  const py = useSpring(0, { stiffness: 320, damping: 26 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine || reduce) return

    setLive(true)
    document.body.dataset.cursor = 'on'

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      setHot(
        Boolean(e.target.closest?.('a, button, [role="button"], input, textarea, select, label')),
      )
    }

    // Each frame: aim the pupils down the disc → pointer vector. The further
    // the disc is behind, the harder the eyes look ahead.
    let raf
    const aim = () => {
      raf = requestAnimationFrame(aim)
      const dx = x.get() - sx.get()
      const dy = y.get() - sy.get()
      px.set(clamp(dx * 0.16, REACH_X))
      py.set(clamp(dy * 0.16, REACH_Y))
    }
    raf = requestAnimationFrame(aim)

    const leave = () => setVisible(false)
    const onDown = () => setDown(true)
    const onUp = () => setDown(false)

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('pointerleave', leave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerleave', leave)
      delete document.body.dataset.cursor
    }
  }, [reduce, x, y, sx, sy, px, py])

  if (!live) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[90] grid place-items-center rounded-full bg-white shadow-[0_6px_20px_-6px_rgba(16,16,16,0.28)] ring-1 ring-ink/10"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: hot ? DISC_HOT : DISC,
        height: hot ? DISC_HOT : DISC,
        scale: down ? 0.88 : 1, // a small press, so clicks feel physical
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
    >
      <motion.span
        className="flex items-center gap-[3px]"
        animate={{ scale: hot ? 1.2 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 26 }}
      >
        <Eye px={px} py={py} hot={hot} squint={down} />
        <Eye px={px} py={py} hot={hot} squint={down} delay={0.05} />
      </motion.span>
    </motion.div>
  )
}

/**
 * One eye — built the way an eye is actually built, because that's what makes
 * it read as an eye rather than a dot on a circle:
 *
 *   sclera      the white, which CLIPS everything inside it, so the iris is cut
 *               off by the eyelid at the edge instead of sliding out
 *   shading     a soft dark wash at the top — the shadow a real upper lid casts.
 *               Without it the white is a flat disc and the eye looks dead.
 *   iris        the coloured ring; it is the iris that moves, not a black dot
 *   pupil       the true black, inside the iris
 *   catchlight  the tiny white glint. This is the single detail that makes the
 *               eye look wet rather than printed.
 */
function Eye({ px, py, hot, squint, delay = 0 }) {
  const lid = useMotionValue(1)

  // Blink: both eyes, on a loop, with a long and slightly odd gap so it never
  // feels metronomic. The second eye is offset a hair — real eyes aren't
  // perfectly synchronised, and that tiny error is what sells it.
  useEffect(() => {
    let cancelled = false
    let timer

    const schedule = () => {
      // 2.8s–6.3s, so you can never predict the next one.
      const wait = 2800 + Math.random() * 3500
      timer = setTimeout(async () => {
        if (cancelled) return
        await animate(lid, [1, 0.06, 1], {
          duration: 0.19,
          times: [0, 0.45, 1],
          ease: 'easeInOut',
          delay,
        })
        if (!cancelled) schedule()
      }, wait)
    }

    schedule()
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [lid, delay])

  return (
    <motion.span
      className="relative block h-[15px] w-[12px] origin-center overflow-hidden rounded-full bg-white ring-[0.5px] ring-ink/20"
      style={{ scaleY: lid }}
      animate={{ scaleY: squint ? 0.3 : undefined }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      {/* The shadow the upper lid casts across the top of the eyeball. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-gradient-to-b from-ink/25 via-transparent to-ink/8"
      />

      {/* The iris moves, carrying the pupil and the glint with it. */}
      <motion.span
        className="absolute top-1/2 left-1/2 block rounded-full bg-[#2f3a4a] ring-[0.5px] ring-ink/40"
        style={{ x: px, y: py, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: hot ? 9 : 8, height: hot ? 9 : 8 }}
        transition={{ type: 'spring', stiffness: 400, damping: 26 }}
      >
        {/* Pupil: dilates a little over anything clickable, the way a real one
            does when it's interested. */}
        <motion.span
          className="absolute top-1/2 left-1/2 block rounded-full bg-[#08090c]"
          style={{ translateX: '-50%', translateY: '-50%' }}
          animate={{ width: hot ? 5 : 4, height: hot ? 5 : 4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 26 }}
        />
        {/* Catchlight, offset up and left, as if lit from above. */}
        <span className="absolute top-[1px] left-[1.5px] block h-[2.5px] w-[2.5px] rounded-full bg-white/90" />
      </motion.span>
    </motion.span>
  )
}
