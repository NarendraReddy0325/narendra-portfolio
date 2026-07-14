import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'

/**
 * Lenis smooth scrolling — the reference runs it (its <html> carries the
 * `lenis` class), and it is the single biggest reason its motion feels
 * different from a stock page. Every scroll-linked effect on the site is
 * sampled against Lenis's eased scroll position rather than the raw wheel, so
 * without it the reveals fire on a hard, steppy scroll and read as cheap.
 *
 * Disabled entirely under prefers-reduced-motion: hijacking someone's scroll
 * is exactly the kind of thing that setting exists to prevent.
 */
export default function SmoothScroll() {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Anchor links have to go through Lenis, or they jump while it eases.
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (!id || id === '#') return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -80 })
    }

    document.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onClick)
      lenis.destroy()
    }
  }, [reduce])

  return null
}
