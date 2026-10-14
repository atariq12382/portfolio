import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

type NetworkInformationLike = {
  saveData?: boolean
  addEventListener(type: 'change', listener: () => void): void
  removeEventListener(type: 'change', listener: () => void): void
}

function getNetworkConnection(): NetworkInformationLike | undefined {
  return (navigator as Navigator & { connection?: NetworkInformationLike })
    .connection
}

function readEligible(): boolean {
  if (typeof window === 'undefined') return false

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (window.matchMedia('(pointer: coarse)').matches) return false
  if (window.matchMedia('(max-width: 768px)').matches) return false

  const connection = getNetworkConnection()
  if (connection?.saveData) return false

  const cores = navigator.hardwareConcurrency
  if (cores !== undefined && cores <= 4) return false

  return true
}

export function useDitherEligible(): boolean {
  const reducedMotion = usePrefersReducedMotion()
  const [eligible, setEligible] = useState(readEligible)

  useEffect(() => {
    if (reducedMotion) {
      setEligible(false)
      return
    }

    setEligible(readEligible())

    const mobileMq = window.matchMedia('(max-width: 768px)')
    const coarseMq = window.matchMedia('(pointer: coarse)')
    const onMediaChange = () => setEligible(readEligible())

    mobileMq.addEventListener('change', onMediaChange)
    coarseMq.addEventListener('change', onMediaChange)
    window.addEventListener('resize', onMediaChange)

    const connection = getNetworkConnection()
    connection?.addEventListener('change', onMediaChange)

    return () => {
      mobileMq.removeEventListener('change', onMediaChange)
      coarseMq.removeEventListener('change', onMediaChange)
      window.removeEventListener('resize', onMediaChange)
      connection?.removeEventListener('change', onMediaChange)
    }
  }, [reducedMotion])

  return eligible && !reducedMotion
}
