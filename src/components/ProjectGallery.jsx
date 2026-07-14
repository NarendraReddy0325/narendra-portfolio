import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Lightbox for concept projects.
 *
 * Concept work has no live site to send anyone to, so instead of a dead link
 * the card opens the Figma screens here. Keyboard: ← → to move, Esc to close.
 *
 * Images that aren't on disk yet fall back to a labelled panel rather than a
 * broken-image icon, so the gallery is presentable before you add real files.
 */
export default function ProjectGallery({ project, onClose }) {
  const [i, setI] = useState(0)
  const [failed, setFailed] = useState({})

  const images = project?.images ?? []
  const count = images.length

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

  // Reset to the first screen whenever a different project is opened.
  useEffect(() => setI(0), [project?.title])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} — concept screens`}
          className="fixed inset-0 z-[80] flex flex-col bg-ink/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <header className="container-px flex shrink-0 items-center justify-between gap-4 py-6">
            <div>
              <p className="text-xs tracking-[0.2em] text-accent uppercase">Concept — unpublished</p>
              <h2 className="font-display mt-1 text-2xl font-semibold tracking-tight">
                {project.title}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              {count > 1 && (
                <span className="text-sm text-muted">
                  {i + 1} / {count}
                </span>
              )}
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-cream transition-colors hover:border-cream/40 hover:bg-panel"
                aria-label="Close gallery"
              >
                ✕
              </button>
            </div>
          </header>

          {/* Stop clicks on the artwork from closing the dialog. */}
          <div
            className="container-px flex min-h-0 flex-1 items-center gap-4 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            {count > 1 && (
              <button
                type="button"
                onClick={() => setI((n) => (n - 1 + count) % count)}
                className="hidden h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-cream transition-colors hover:border-cream/40 hover:bg-panel sm:grid"
                aria-label="Previous screen"
              >
                ←
              </button>
            )}

            <div className="card-surface relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
              <div className="grid-bg absolute inset-0 opacity-30" aria-hidden="true" />

              {failed[images[i]] ? (
                <div className="relative p-10 text-center">
                  <p className="text-xs tracking-[0.2em] text-muted uppercase">Awaiting image</p>
                  <p className="font-display mt-2 text-xl text-cream">
                    {project.title} — screen {i + 1}
                  </p>
                  <p className="mt-3 text-sm text-muted">
                    Drop the file at <code className="text-accent">public{images[i]}</code>
                  </p>
                </div>
              ) : (
                <img
                  src={images[i]}
                  alt={`${project.title} — screen ${i + 1} of ${count}`}
                  loading="lazy"
                  decoding="async"
                  onError={() => setFailed((f) => ({ ...f, [images[i]]: true }))}
                  className="relative max-h-[70vh] w-auto max-w-full object-contain"
                />
              )}
            </div>

            {count > 1 && (
              <button
                type="button"
                onClick={() => setI((n) => (n + 1) % count)}
                className="hidden h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-cream transition-colors hover:border-cream/40 hover:bg-panel sm:grid"
                aria-label="Next screen"
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
