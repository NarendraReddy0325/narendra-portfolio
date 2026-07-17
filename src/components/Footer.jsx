import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { nav, profile, socials } from '../data'
import { PillLink, Reveal } from './ui'

export default function Footer() {
  const year = new Date().getFullYear()
  const reduce = useReducedMotion()
  const ref = useRef(null)

  /* Scroll-linked growth.
     In the reference this panel is not a fade-in — it is tied to scroll
     position and *grows* from half size into place as you come down the page
     (measured: scale and opacity both run 0.5 → 1). It's the closing gesture
     of the whole scroll, so it gets its own treatment rather than the standard
     reveal every other block uses. */
  /* 0 when the panel's top reaches the bottom of the viewport, 1 by the time
     its centre reaches the middle of the screen — so it finishes growing while
     there is still page left to scroll.

     Two traps here, both hit and fixed: "bottom" is not a valid offset keyword
     (it silently pinned progress at 1 and the effect never ran at all), and
     ending the range at the document's own end is degenerate — the panel
     snapped back to half opacity at max scroll. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  // Complete at 0.8 of that range, not 1 — the panel's centre never quite
  // reaches the viewport's centre at max scroll, so mapping to 1 would leave it
  // stranded at 96% forever. useTransform clamps, so it settles at exactly 1.
  const scale = useTransform(scrollYProgress, [0, 0.8], [0.5, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0.5, 1])

  return (
    <footer id="contact" ref={ref} className="shell pt-10 pb-12 lg:pt-16">
      <motion.div
        style={reduce ? undefined : { scale, opacity }}
        // Navy, not charcoal — the reference footer carries the same #03236d
        // wash as the services block, not the dark grey of the FAQ panel.
        className="rounded-panel flex origin-bottom flex-col items-center gap-8 bg-deepblue px-6 py-20 text-center text-white lg:py-28"
      >
        {/* Footer blocks each travel 34px — their own distance in the reference. */}
        {/* "Got Something That Needs Designing?" had two problems: Title Case,
            which no other heading Narendra wrote uses, and it opened with the
            same word as the FAQ heading three hundred pixels above it ("Got
            questions about working together?"). Two "Got …?" questions in a row
            is a page talking to itself.

            A question is still right for the last thing on the page — it hands
            the turn to the reader — but this one is open enough to answer
            whether you're hiring him for a project or for a job. */}
        <Reveal as="footer">
          <h2 className="max-w-[18ch] text-4xl font-semibold text-white sm:text-6xl">
            What are you working on?
          </h2>
        </Reveal>

        <Reveal as="footer" delay={0.08}>
          <PillLink
            href={`mailto:${profile.email}`}
            className="[&_.pill]:bg-white [&_.pill]:text-ink [&_.pill-arrow]:bg-white [&_.pill-arrow]:text-ink"
          >
            Get In Touch
          </PillLink>
        </Reveal>

        <a href={`mailto:${profile.email}`} className="text-sm text-white/60 hover:text-white">
          {profile.email}
        </a>

        <div className="mt-10 flex w-full flex-col items-center gap-6 border-t border-white/10 pt-8 lg:flex-row lg:justify-between">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex flex-wrap justify-center gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 px-4 py-2 text-xs text-white/70 transition-colors hover:border-white/40 hover:text-white"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <p className="mt-8 text-center text-xs text-faint">
        © {year} {profile.name}. Designed in Figma, built in React — by me.
      </p>
    </footer>
  )
}
