import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  DEFAULT_SECTION_ID,
  sectionIdAt,
  sectionIndex,
  type SectionId,
} from '@/config/sections'
import { resolveActiveSection } from '@/lib/resolveActiveSection'
import { scrollToSection } from '@/lib/scrollToSection'

type SectionNavContextValue = {
  activeId: SectionId
  activeIndex: number
  navigateTo: (id: SectionId) => void
  navigateToIndex: (index: number) => void
}

const SectionNavContext = createContext<SectionNavContextValue | null>(null)

const SCROLL_LOCK_MS = 800

export function SectionNavProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<SectionId>(DEFAULT_SECTION_ID)
  const scrollLockUntil = useRef(0)

  const navigateTo = useCallback((id: SectionId) => {
    scrollLockUntil.current = performance.now() + SCROLL_LOCK_MS
    setActiveId(id)
    scrollToSection(id)
  }, [])

  const navigateToIndex = useCallback(
    (index: number) => {
      navigateTo(sectionIdAt(index))
    },
    [navigateTo],
  )

  useEffect(() => {
    let raf = 0

    const syncActive = () => {
      raf = 0
      if (performance.now() < scrollLockUntil.current) return
      const next = resolveActiveSection()
      if (next) setActiveId(next)
    }

    const scheduleSync = () => {
      if (raf) return
      raf = window.requestAnimationFrame(syncActive)
    }

    scheduleSync()
    window.addEventListener('scroll', scheduleSync, { passive: true })
    window.addEventListener('resize', scheduleSync, { passive: true })

    return () => {
      window.removeEventListener('scroll', scheduleSync)
      window.removeEventListener('resize', scheduleSync)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  const value = useMemo(
    () => ({
      activeId,
      activeIndex: sectionIndex(activeId),
      navigateTo,
      navigateToIndex,
    }),
    [activeId, navigateTo, navigateToIndex],
  )

  return (
    <SectionNavContext.Provider value={value}>
      {children}
    </SectionNavContext.Provider>
  )
}

export function useSectionNav(): SectionNavContextValue {
  const ctx = useContext(SectionNavContext)
  if (!ctx) {
    throw new Error('useSectionNav must be used within SectionNavProvider')
  }
  return ctx
}
