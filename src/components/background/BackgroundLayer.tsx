/**
 * Single mount point for the page’s heavy GPU background (React Bits Dither).
 * Do not add another WebGL/canvas effect without disabling Dither or sharing one context.
 */
import { lazy, Suspense } from 'react'
import { useDitherEligible } from '@/hooks/useDitherEligible'
import { BackgroundVignette } from './BackgroundVignette'
import { StaticBackground } from './StaticBackground'

const LazyDitherBackground = lazy(() => import('./DitherBackground'))

export function BackgroundLayer() {
  const ditherEligible = useDitherEligible()

  return (
    <>
      {ditherEligible ? (
        <Suspense fallback={<StaticBackground />}>
          <LazyDitherBackground />
        </Suspense>
      ) : (
        <StaticBackground />
      )}
      <BackgroundVignette />
    </>
  )
}
