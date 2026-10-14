import type { ReactNode } from 'react'
import type { MagicBentoItem } from '@/components/MagicBento'
import type { SkillGroup, SkillGroupId } from '@/data/portfolio'

const MARQUEE_SEPARATOR = ' · '

export function dedupeSkills(skills: readonly SkillGroup[]): string[] {
  const seen = new Set<string>()
  const result: string[] = []
  for (const group of skills) {
    for (const skill of group.skills) {
      if (!seen.has(skill)) {
        seen.add(skill)
        result.push(skill)
      }
    }
  }
  return result
}

export function getMarqueeRows(
  skills: readonly SkillGroup[],
): readonly [string[], string[]] {
  const all = dedupeSkills(skills)
  const mid = Math.ceil(all.length / 2)
  return [all.slice(0, mid), all.slice(mid)]
}

export function formatMarqueeLine(items: readonly string[]): string {
  return items.join(MARQUEE_SEPARATOR)
}

const BENTO_ORDER: readonly SkillGroupId[] = [
  'ai-llm',
  'languages',
  'frontend',
  'backend',
  'databases-cloud',
  'tools',
]

export function sortSkillGroupsForBento(
  skills: readonly SkillGroup[],
): SkillGroup[] {
  const byId = new Map(skills.map((group) => [group.id, group]))
  return BENTO_ORDER.flatMap((id) => {
    const group = byId.get(id)
    return group ? [group] : []
  })
}

export function toMagicBentoItems(
  groups: readonly SkillGroup[],
  renderCategory: (group: SkillGroup) => ReactNode,
): MagicBentoItem[] {
  return sortSkillGroupsForBento(groups).map((group) => {
    const featured = group.id === 'ai-llm'
    return {
      id: group.id,
      content: renderCategory(group),
      colSpan: featured ? 2 : 1,
      rowSpan: featured ? 2 : 1,
    }
  })
}
