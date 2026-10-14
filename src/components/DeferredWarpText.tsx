import { lazy, Suspense, type ComponentProps } from 'react'
import type WarpTextType from '@/components/WarpText'
import { useBootComplete } from '@/context/BootContext'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const WarpText = lazy(() => import('@/components/WarpText'))

type WarpTextProps = ComponentProps<typeof WarpTextType>

export function DeferredWarpText({
  fallbackText,
  ...props
}: WarpTextProps & { fallbackText: string }) {
  const bootComplete = useBootComplete()
  const reducedMotion = usePrefersReducedMotion()

  if (reducedMotion) {
    return (
      <span className={props.className} style={{ color: props.color }}>
        {fallbackText}
      </span>
    )
  }

  if (!bootComplete) {
    return (
      <span
        className={props.className}
        style={{
          color: props.color,
          fontFamily: props.fontFamily,
          fontSize: props.fontSize,
          fontWeight: props.fontWeight,
          letterSpacing: props.letterSpacing,
          lineHeight: props.lineHeight,
        }}
      >
        {fallbackText}
      </span>
    )
  }

  return (
    <Suspense
      fallback={
        <span className={props.className} style={{ color: props.color }}>
          {fallbackText}
        </span>
      }
    >
      <WarpText {...props} />
    </Suspense>
  )
}
