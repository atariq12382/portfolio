import { GlitchLogo } from '@/components/nav/GlitchLogo'
import { SiteNav } from '@/components/nav/SiteNav'

export function SiteHeader() {
  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-50 border-b border-surface/80 bg-bg/75 backdrop-blur-md"
      aria-label="Site"
    >
      <div className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <GlitchLogo />
        <div className="hidden min-w-0 flex-1 justify-end md:flex">
          <SiteNav />
        </div>
      </div>
    </header>
  )
}
