import { motion } from 'framer-motion'

/**
 * Route-level wrapper. The page lifts and clears rather than cross-fading, so
 * transitions read as pages of a book turning, not as a slideshow dissolve.
 * Wrap every page component in this.
 */
export default function PageTransition({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
