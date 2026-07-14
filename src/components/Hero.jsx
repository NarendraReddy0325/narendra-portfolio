import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data'

// Three.js is heavy — keep it out of the initial bundle.
const Scene3D = lazy(() => import('./Scene3D'))

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      {/* Graph-paper grid, faded out toward the edges. */}
      <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(circle_at_50%_30%,black,transparent_75%)]" />
      <div className="glow absolute inset-0" />

      {/* The 3D blob. Decorative and non-interactive, so it never eats a click. */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-90" aria-hidden="true">
        <div className="absolute top-[8%] right-[-10%] h-[520px] w-[520px] md:right-[2%]">
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </div>
      </div>

      <div className="container-px relative z-10">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <motion.span variants={item} className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {profile.availability}
          </motion.span>

          <motion.p variants={item} className="mt-8 text-lg text-muted">
            {profile.greeting}
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display mt-3 text-5xl leading-[1.02] font-semibold tracking-tight md:text-7xl"
          >
            Product, UI/UX <br />
            <span className="text-gradient">&amp; Brand Design</span>
          </motion.h1>

          <motion.p variants={item} className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#portfolio" className="btn-primary">
              View My Work →
            </a>
            <a href="#contact" className="btn-ghost">
              Get In Touch
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
