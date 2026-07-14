import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/**
 * The navy glow.
 *
 * Services / Pricing / Testimonials don't sit on the page grey — they sit on an
 * enormous blurred navy rectangle (#03236d, blur 110px) whose soft edges bleed
 * out into the sections above and below. It is scroll-linked, not a reveal: it
 * grows from scale 0.5 / opacity 0.5 up to 1 as you come down the page. That's
 * the "Trigger 2" element in the reference, and it is why the headings in these
 * sections are white.
 *
 * The blur is what makes it work — hard edges here would look like a coloured
 * band. Rendered behind the content with a negative z-index, and the wrapper is
 * deliberately NOT overflow-clipped so the bloom can spill.
 */
export default function DeepGlow({ children, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.75], [0.5, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [0.5, 1])

  return (
    <div ref={ref} className={`relative isolate ${className}`}>
      <motion.div
        aria-hidden="true"
        style={reduce ? { scale: 1, opacity: 1 } : { scale, opacity }}
        className="pointer-events-none absolute inset-x-[-6%] top-[-4%] bottom-[-4%] -z-10 rounded-[6rem] bg-deepblue blur-[110px]"
      />
      {children}
    </div>
  )
}
