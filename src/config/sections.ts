import type { LucideIcon } from 'lucide-react'
import {
  Briefcase,
  Cpu,
  FolderKanban,
  Home,
  Mail,
  User,
} from 'lucide-react'

export type SectionId =
  | 'home'
  | 'about'
  | 'experience'
  | 'skills'
  | 'projects'
  | 'contact'

export type SectionConfig = {
  id: SectionId
  label: string
  icon: LucideIcon
}

export const SECTIONS: readonly SectionConfig[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Cpu },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'contact', label: 'Contact', icon: Mail },
] as const

export const DEFAULT_SECTION_ID: SectionId = 'home'

export function sectionIndex(id: SectionId): number {
  const index = SECTIONS.findIndex((s) => s.id === id)
  return index >= 0 ? index : 0
}

export function sectionIdAt(index: number): SectionId {
  return SECTIONS[index]?.id ?? DEFAULT_SECTION_ID
}
