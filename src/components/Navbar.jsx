import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { nav, profile } from '../data'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // The pill only grows its border and blur once you've left the hero.
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
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        aria-label="Primary"
        className={`flex w-full max-w-5xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 ${
          scrolled ? 'border-line bg-ink/80 backdrop-blur-xl' : 'border-transparent bg-transparent'
        }`}
      >
        <a href="#top" className="flex items-center gap-2 pl-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-sm font-bold text-ink">
            {profile.initial}
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-cream"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#contact" className="btn-primary hidden md:inline-flex">
            Get In Touch
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 bg-cream transition ${open ? 'translate-y-2 rotate-45' : ''}`}
              />
              <span className={`block h-0.5 w-5 bg-cream transition ${open ? 'opacity-0' : ''}`} />
              <span
                className={`block h-0.5 w-5 bg-cream transition ${open ? '-translate-y-2 -rotate-45' : ''}`}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 right-4 left-4 rounded-3xl border border-line bg-panel/95 p-4 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    onClick={() => setOpen(false)}
                    href={item.href}
                    className="block rounded-2xl px-4 py-3 text-cream hover:bg-card"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a onClick={() => setOpen(false)} href="#contact" className="btn-primary mt-2 w-full">
                  Get In Touch
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
