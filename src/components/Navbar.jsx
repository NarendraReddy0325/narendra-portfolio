import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { site } from '../data/site'

const NAV = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [lifted, setLifted] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Don't let the page scroll behind the open mobile sheet.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          lifted ? 'bg-paper/85 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav
          className="flex items-center justify-between px-6 py-5 md:px-10 lg:pr-12 lg:pl-30"
          aria-label="Primary"
        >
          <Link
            to="/"
            className="link-draw font-display-sm text-[1.15rem] tracking-[-0.01em]"
            data-cursor="Home"
          >
            {site.name}
            <span className="text-accent">.</span>
          </Link>

          <ul className="hidden items-center gap-10 md:flex">
            {NAV.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `link-draw font-mono text-meta transition-colors duration-300 ${
                      isActive ? 'text-accent' : 'text-ink hover:text-accent'
                    }`
                  }
                  // The underline stays drawn on the active route, so the rule
                  // doubles as the "you are here" mark instead of a colour swap.
                  data-active={pathname.startsWith(to) ? 'true' : 'false'}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="font-mono text-meta md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="on-deep fixed inset-0 z-40 flex flex-col justify-between bg-deep px-6 pt-28 pb-10 text-paper md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="space-y-2">
              {NAV.map(({ to, label }, i) => (
                <motion.li
                  key={to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink to={to} className="font-display block py-2 text-[3.25rem] text-paper">
                    {label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>

            <div className="space-y-1">
              <p className="font-mono text-micro text-ink-faint">Get in touch</p>
              <a href={`mailto:${site.email}`} className="font-display-sm text-[1.35rem] text-paper">
                {site.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
