import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/** Scroll-in reveal. Used on every section block. */
export function Reveal({ children, delay = 0, y = 24, className = '' }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? {} : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** The small blue-diamond eyebrow above every section heading. */
export function Eyebrow({ children, tone = 'light' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-medium ${
        tone === 'dark' ? 'text-white/70' : 'text-body'
      }`}
    >
      <span aria-hidden="true" className="block h-1.5 w-1.5 rotate-45 bg-accent" />
      {children}
    </span>
  )
}

/** Black pill + its circular arrow. The site's one call to action. */
export function PillLink({ href, children, external = false, className = '' }) {
  const props = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <span className={`group inline-flex items-center gap-2 ${className}`}>
      <a href={href} {...props} className="pill">
        {children}
        {external && <span className="sr-only">(opens in a new tab)</span>}
      </a>
      <a href={href} {...props} aria-hidden="true" tabIndex={-1} className="pill-arrow">
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
      </a>
    </span>
  )
}

/** Same pill, but it fires a callback instead of navigating. */
export function PillButton({ onClick, children, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center gap-2 ${className}`}
    >
      <span className="pill">{children}</span>
      <span aria-hidden="true" className="pill-arrow">
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </button>
  )
}

/**
 * Count-up number. Runs once, when the card scrolls into view.
 *
 * Reduced-motion users get the final number immediately — the animation is a
 * flourish, and the value is the information.
 */
export function CountUp({ to, suffix = '', duration = 1600, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setN(to)
      return
    }

    let raf
    const start = performance.now()

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      // ease-out cubic, so it decelerates into the final value
      setN(Math.round(to * (1 - Math.pow(1 - t, 3))))
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration, reduce])

  return (
    <span ref={ref} className={className}>
      {n}
      {suffix}
    </span>
  )
}

/**
 * Image with a dark fallback.
 *
 * None of the referenced images exist until you add them, so rather than broken
 * icons this falls back to the dark plate the template uses anyway. Drop a real
 * file at the path in data.js and it swaps in — no code change.
 */
export function Media({ src, alt, className = '', rounded = 'rounded-card' }) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`bg-dark ${rounded} ${className}`}
        title={`Awaiting image: public${src ?? ''}`}
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`${rounded} ${className}`}
    />
  )
}
