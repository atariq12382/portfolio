import { DEFAULT_SECTION_ID, type SectionId } from '@/config/sections'

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function scrollToSection(id: SectionId): void {
  const targetId = id || DEFAULT_SECTION_ID
  const el = document.getElementById(targetId)
  if (!el) return

  el.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  })
}
