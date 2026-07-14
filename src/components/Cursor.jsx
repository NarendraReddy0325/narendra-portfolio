import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue, useReducedMotion } from 'framer-motion'

/**
 * Custom cursor.
 *
 * A small ink dot that swells into a labelled disc over anything that declares
 * `data-cursor="<label>"`. It exists to answer one question — what happens if I
 * click this? — which is why the label is real text ("View case", "Live site")
 * rather than an arrow glyph.
 *
 * Runs only on fine pointers, and never when reduced motion is requested.
 */
export default function Cursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState(null)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 700, damping: 45, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 700, damping: 45, mass: 0.4 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine || reduce) return

    setEnabled(true)
    document.body.dataset.cursor = 'on'

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)

      const hit = e.target.closest?.('[data-cursor]')
      setLabel(hit ? hit.dataset.cursor : null)
    }
    const leave = () => setVisible(false)

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)

    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      delete document.body.dataset.cursor
    }
  }, [reduce, x, y])

  if (!enabled) return null

  const active = Boolean(label)

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-70 flex items-center justify-center rounded-full"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: active ? 92 : 10,
        height: active ? 92 : 10,
        backgroundColor: active ? 'var(--color-accent)' : 'var(--color-ink)',
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span
        className="font-mono text-micro whitespace-nowrap text-paper"
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: active ? 0.25 : 0.1, delay: active ? 0.08 : 0 }}
      >
        {label}
      </motion.span>
    </motion.div>
  )
}
