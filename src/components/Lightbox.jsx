import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Media } from './ui'

/**
 * Screen viewer for concept projects.
 *
 * Concept work has no live site, so "Explore Project" opens the design screens
 * here rather than pointing at a dead link. ← → to move, Esc to close.
 */
export default function Lightbox({ project, onClose }) {
  const [i, setI] = useState(0)
  const images = project?.images ?? []
  const count = images.length

  useEffect(() => setI(0), [project?.title])

  useEffect(() => {
    if (!project) return

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setI((n) => (n + 1) % count)
      if (e.key === 'ArrowLeft') setI((n) => (n - 1 + count) % count)
    }

    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, count, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} — concept screens`}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] flex flex-col bg-ink/80 backdrop-blur-md"
        >
          <header className="shell flex shrink-0 items-center justify-between gap-4 py-6">
            <div>
              <p className="text-xs font-medium text-white/60">Concept — unpublished design</p>
              <h2 className="mt-1 text-xl font-semibold text-white">{project.title}</h2>
            </div>

            <div className="flex items-center gap-4">
              {count > 1 && (
                <span className="text-sm text-white/60">
                  {i + 1} / {count}
                </span>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink transition-transform hover:scale-105"
              >
                ✕
              </button>
            </div>
          </header>

          <div
            onClick={(e) => e.stopPropagation()}
            className="shell flex min-h-0 flex-1 items-center gap-4 pb-10"
          >
            {count > 1 && (
              <button
                type="button"
                onClick={() => setI((n) => (n - 1 + count) % count)}
                aria-label="Previous screen"
                className="hidden h-11 w-11 shrink-0 place-items-center rounded-full bg-white/90 text-ink transition-transform hover:scale-105 sm:grid"
              >
                ←
              </button>
            )}

            <Media
              src={images[i]}
              alt={`${project.title} — screen ${i + 1} of ${count}`}
              rounded="rounded-card"
              className="max-h-[72vh] min-h-[40vh] w-full flex-1 object-contain"
            />

            {count > 1 && (
              <button
                type="button"
                onClick={() => setI((n) => (n + 1) % count)}
                aria-label="Next screen"
                className="hidden h-11 w-11 shrink-0 place-items-center rounded-full bg-white/90 text-ink transition-transform hover:scale-105 sm:grid"
              >
                →
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
