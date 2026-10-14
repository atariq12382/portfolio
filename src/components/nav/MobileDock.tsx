import Dock from '@/components/Dock'
import { SECTIONS } from '@/config/sections'
import { useSectionNav } from '@/context/SectionNavContext'

const ACID = '#b6ff3b'

export function MobileDock() {
  const { activeIndex, navigateToIndex } = useSectionNav()

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 md:hidden">
      <div className="pointer-events-auto relative mx-auto h-[88px] max-w-lg">
        <Dock
          position="bottom"
          theme="dark"
          accentColor={ACID}
          tiles
          showIndicators
          showLabels={false}
          baseItemSize={44}
          magnification={56}
          panelHeight={64}
          gap={6}
          items={SECTIONS.map((section, index) => ({
            label: section.label,
            icon: <section.icon className="size-5" strokeWidth={1.75} />,
            active: index === activeIndex,
            className: 'cursor-target',
            onClick: () => navigateToIndex(index),
          }))}
        />
      </div>
    </div>
  )
}
