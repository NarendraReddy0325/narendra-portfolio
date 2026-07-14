import { useReducedMotion } from 'framer-motion'
import { site } from '../data/site'

/**
 * A running strip of practice areas on the dark section.
 *
 * It moves because a list of skills genuinely is a loop with no beginning or
 * end — not to add motion for its own sake. It halts on hover so it can be
 * read, and holds still entirely under reduced-motion.
 */
export default function SkillsStrip({ items = site.skills }) {
  const reduce = useReducedMotion()

  const Item = ({ label }) => (
    <li className="flex shrink-0 items-center gap-8 pr-8">
      <span className="font-display-sm text-[1.6rem] whitespace-nowrap text-paper/90 sm:text-[2rem]">
        {label}
      </span>
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-lift" />
    </li>
  )

  if (reduce) {
    return (
      <ul className="flex flex-wrap gap-x-8 gap-y-3 px-6 lg:px-30">
        {items.map((s) => (
          <Item key={s} label={s} />
        ))}
      </ul>
    )
  }

  // Duplicated once so the -50% translation lands seamlessly back at the start.
  const run = [...items, ...items]

  return (
    <div className="marquee py-2" aria-label="Practice areas">
      <ul className="marquee__track flex w-max">
        {run.map((s, i) => (
          <Item key={`${s}-${i}`} label={s} />
        ))}
      </ul>
    </div>
  )
}

/** Grouped tool list for /about. A definition list, because that's what it is. */
export function ToolsList({ groups = site.toolkit }) {
  return (
    <dl className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
      {groups.map(({ group, items }) => (
        <div key={group} className="border-t border-rule py-6">
          <dt className="font-mono text-micro text-ink-faint">{group}</dt>
          <dd className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
            {items.map((item) => (
              <span key={item} className="font-display-sm text-[1.15rem] text-ink">
                {item}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  )
}
