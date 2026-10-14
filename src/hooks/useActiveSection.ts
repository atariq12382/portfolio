import { useSectionNav } from '@/context/SectionNavContext'

/** Scroll-spy + navigation state (provided by SectionNavProvider). */
export function useActiveSection() {
  const { activeId, activeIndex, navigateTo, navigateToIndex } = useSectionNav()
  return {
    activeId,
    activeIndex,
    navigateTo,
    navigateToIndex,
    setActiveFromScroll: () => {},
  }
}
