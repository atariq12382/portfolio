import type { ReactNode } from 'react'
import type { MagicBentoItem } from '@/components/MagicBento'
import type { Project } from '@/data/portfolio'

export function isProjectUrl(url?: string): boolean {
  return Boolean(url?.trim())
}

export function toProjectBentoItems(
  projectList: readonly Project[],
  renderCard: (project: Project) => ReactNode,
): MagicBentoItem[] {
  return projectList.map((project) => ({
    id: project.id,
    title: project.title,
    content: renderCard(project),
    colSpan: 1,
    rowSpan: 1,
  }))
}

export function findProjectById(
  projectList: readonly Project[],
  id: string | number | undefined,
): Project | null {
  if (id === undefined) return null
  const key = String(id)
  return projectList.find((project) => project.id === key) ?? null
}
