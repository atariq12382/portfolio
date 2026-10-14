import { lazy, Suspense, type ReactNode } from 'react'
import { BootScreen } from '@/components/BootScreen'
import { useBootComplete } from '@/context/BootContext'
import { useSplashCursorEnabled } from '@/context/ChaosModeContext'
import { BackgroundLayer } from '@/components/background/BackgroundLayer'
import { MobileDock } from '@/components/nav/MobileDock'
import { SiteHeader } from '@/components/nav/SiteHeader'
import { SceneChrome } from '@/components/SceneChrome'
import { SectionNavProvider } from '@/context/SectionNavContext'
import { useFinePointer } from '@/hooks/useFinePointer'

const ACID = '#b6ff3b'

const ClickSpark = lazy(() => import('@/components/ClickSpark'))
const TargetCursor = lazy(() => import('@/components/TargetCursor'))
const SplashCursor = lazy(() => import('@/components/SplashCursor'))

function RootLayoutChrome({ children }: { children: ReactNode }) {
  const finePointer = useFinePointer()
  const bootComplete = useBootComplete()
  const enablePointerFx = finePointer && bootComplete
  const splashEnabled = useSplashCursorEnabled()

  const content = (
    <div className="relative min-h-svh overflow-x-clip">
      <BackgroundLayer />
      <SceneChrome />
      {children}
      {splashEnabled ? (
        <Suspense fallback={null}>
          <SplashCursor />
        </Suspense>
      ) : null}
      {enablePointerFx ? (
        <Suspense fallback={null}>
          <TargetCursor
            cursorColor={ACID}
            cursorColorOnTarget={ACID}
            targetSelector=".cursor-target"
            hideDefaultCursor
            blendMode="normal"
          />
        </Suspense>
      ) : null}
    </div>
  )

  return (
    <SectionNavProvider>
      <BootScreen />
      {enablePointerFx ? (
        <Suspense fallback={content}>
          <ClickSpark
            sparkColor={ACID}
            glow={0.4}
            disabled={false}
            className="relative min-h-svh overflow-x-clip"
          >
            {content}
          </ClickSpark>
        </Suspense>
      ) : (
        content
      )}
      <SiteHeader />
      <MobileDock />
    </SectionNavProvider>
  )
}

export function RootLayout({ children }: { children: ReactNode }) {
  return <RootLayoutChrome>{children}</RootLayoutChrome>
}
