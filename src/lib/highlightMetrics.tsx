import type { ReactNode } from 'react'

export const METRIC_RE = /(\+?\d+%|\d+\+|2 weeks)/g

export function highlightMetrics(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const re = new RegExp(METRIC_RE.source, 'g')
  let lastIndex = 0
  let key = 0
  let match: RegExpExecArray | null

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    nodes.push(
      <span
        key={`m-${key++}`}
        className="font-mono text-acid [text-shadow:0_0_12px_rgb(182_255_59_/_0.45)]"
      >
        {match[0]}
      </span>,
    )
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return nodes.length > 0 ? nodes : [text]
}
