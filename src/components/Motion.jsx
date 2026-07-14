import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Text that reveals by sliding up from behind a clipping edge — the line is
 * *uncovered*, not faded in. Used only on display headlines, where the mask
 * edge reads as a deliberate typographic gesture.
 *
 * Pass an array of strings to stagger multiple lines.
 */
export function MaskLines({ lines, className = '', delay = 0, stagger = 0.09, as = 'span' }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] ?? motion.span

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={reduce ? { y: 0 } : { y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/**
 * Image reveal: a wipe that uncovers the frame while the image itself settles
 * back from a slight scale-up. Reserved for project imagery — NOT a general
 * scroll-fade to sprinkle on every div.
 */
export function ImageReveal({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={reduce ? {} : { clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      <motion.div
        initial={reduce ? {} : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-12%' }}
        transition={{ duration: 1.3, ease: EASE, delay }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/**
 * Restrained entrance for prose blocks. Deliberately small travel (10px) and
 * used sparingly — section intros and list groups only.
 */
export function Rise({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? {} : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/** A hairline that draws itself across. Used as a section divider. */
export function Rule({ className = '', dark = false }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      aria-hidden="true"
      className={`h-px w-full origin-left ${dark ? 'bg-deep-rule' : 'bg-rule'} ${className}`}
      initial={reduce ? {} : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: EASE }}
    />
  )
}
