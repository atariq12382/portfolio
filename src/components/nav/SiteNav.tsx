import { lazy, Suspense } from 'react'
import type { GooeyNavItem } from '@/components/GooeyNav'
import { SECTIONS } from '@/config/sections'
import { useBootComplete } from '@/context/BootContext'
import { useSectionNav } from '@/context/SectionNavContext'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const GooeyNav = lazy(() => import('@/components/GooeyNav'))

const items: GooeyNavItem[] = SECTIONS.map((section) => ({
  label: section.label,
  href: `#${section.id}`,
}))

function NavFallback() {
  const { activeIndex, navigateToIndex } = useSectionNav()

  return (
    <nav aria-label="Sections" className="flex flex-wrap justify-end gap-1">
      {items.map((item, index) => (
        <a
          key={item.href}
          href={item.href}
          className={`cursor-target rounded-md px-2 py-1 font-mono text-xs transition-colors ${
            index === activeIndex ? 'text-acid' : 'text-muted hover:text-text'
          }`}
          onClick={(event) => {
            event.preventDefault()
            navigateToIndex(index)
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}

export function SiteNav() {
  const { activeIndex, navigateToIndex } = useSectionNav()
  const bootComplete = useBootComplete()
  const reducedMotion = usePrefersReducedMotion()

  if (!bootComplete || reducedMotion) {
    return <NavFallback />
  }

  return (
    <Suspense fallback={<NavFallback />}>
      <GooeyNav
        items={items}
        activeIndex={activeIndex}
        onChange={(index) => navigateToIndex(index)}
        theme="dark"
        color="var(--color-acid)"
        activeTextColor="var(--color-bg)"
        frame
        size="sm"
        className="max-w-[min(100vw-8rem,52rem)]"
      />
    </Suspense>
  )
}
