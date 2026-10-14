import { ChevronDown } from 'lucide-react'
import { highlightMetrics } from '@/lib/highlightMetrics'

type ExperienceHighlightsProps = {
  highlights: readonly string[]
}

const bulletClass =
  'relative pl-4 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-cyan/80 before:content-[""]'

export function ExperienceHighlights({ highlights }: ExperienceHighlightsProps) {
  const count = highlights.length

  return (
    <>
      <ul className="mt-4 hidden list-none space-y-2.5 md:block">
        {highlights.map((item, i) => (
          <li key={i} className={bulletClass}>
            {highlightMetrics(item)}
          </li>
        ))}
      </ul>

      <details className="experience-highlights-accordion mt-4 md:hidden group">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-text transition-colors hover:border-white/15 [&::-webkit-details-marker]:hidden">
          <span>View highlights ({count})</span>
          <ChevronDown
            className="size-4 shrink-0 text-muted transition-transform group-open:rotate-180"
            aria-hidden
          />
        </summary>
        <ul className="mt-2 list-none space-y-2 border-l border-white/10 pl-3">
          {highlights.map((item, i) => (
            <li key={i} className={bulletClass}>
              {highlightMetrics(item)}
            </li>
          ))}
        </ul>
      </details>
    </>
  )
}
