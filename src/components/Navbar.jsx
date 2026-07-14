import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { nav, profile } from '../data'
import { Roll, RollArrow } from './ui'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`shell flex items-center justify-between py-5 transition-colors duration-500 ${
          scrolled ? 'bg-page/80 backdrop-blur-xl' : ''
        }`}
      >
        {/* Wordmark. The reference uses a solid dark block; this is the name. */}
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-dark text-sm font-semibold text-white">
            {profile.name.charAt(0)}
          </span>
          <span className="text-[0.95rem] font-semibold tracking-tight text-ink">
            {profile.name}
          </span>
        </a>

        {/* Nav links roll too — the label is stacked twice in a clipped box and
            slides up on hover. No colour change; the motion is the feedback. */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="group block text-sm text-body hover:text-ink">
                  <Roll>{item.label}</Roll>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="group hidden items-center gap-2 md:flex">
          <a href="#contact" className="pill">
            <Roll>Get In Touch</Roll>
          </a>
          <a href="#contact" aria-hidden="true" tabIndex={-1} className="pill-arrow">
            <RollArrow />
          </a>
        </div>

        <div className="flex items-center gap-2">

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full bg-deep text-white md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span className="space-y-1">
              <span
                className={`block h-0.5 w-4 bg-white transition ${open ? 'translate-y-1.5 rotate-45' : ''}`}
              />
              <span className={`block h-0.5 w-4 bg-white transition ${open ? 'opacity-0' : ''}`} />
              <span
                className={`block h-0.5 w-4 bg-white transition ${open ? '-translate-y-1.5 -rotate-45' : ''}`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="shell md:hidden"
          >
            <ul className="card overflow-hidden p-2 shadow-[0_20px_60px_-30px_rgba(16,16,16,0.4)]">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-ink hover:bg-surface"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="p-2">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="pill w-full justify-center"
                >
                  Get In Touch
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
