import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useKonamiCode } from '@/hooks/useKonamiCode'
import { useFinePointer } from '@/hooks/useFinePointer'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type ChaosModeContextValue = {
  chaosMode: boolean
  toggleChaosMode: () => void
  announce: string
}

const ChaosModeContext = createContext<ChaosModeContextValue | null>(null)

export function ChaosModeProvider({ children }: { children: ReactNode }) {
  const [chaosMode, setChaosMode] = useState(false)
  const [announce, setAnnounce] = useState('')
  const reducedMotion = usePrefersReducedMotion()

  const toggleChaosMode = useCallback(() => {
    setChaosMode((prev) => {
      const next = !prev
      setAnnounce(next ? 'Chaos mode enabled' : 'Chaos mode disabled')
      return next
    })
  }, [])

  useKonamiCode(toggleChaosMode)

  useEffect(() => {
    const root = document.documentElement
    if (chaosMode) {
      root.setAttribute('data-chaos-mode', '')
    } else {
      root.removeAttribute('data-chaos-mode')
    }
  }, [chaosMode])

  const value = useMemo(
    () => ({
      chaosMode: chaosMode && !reducedMotion,
      toggleChaosMode,
      announce,
    }),
    [announce, chaosMode, reducedMotion, toggleChaosMode],
  )

  return (
    <ChaosModeContext.Provider value={value}>
      {children}
      <div className="sr-only" aria-live="polite">{announce}</div>
    </ChaosModeContext.Provider>
  )
}

export function useChaosMode() {
  const ctx = useContext(ChaosModeContext)
  if (!ctx) {
    return { chaosMode: false, toggleChaosMode: () => {}, announce: '' }
  }
  return ctx
}

export function useSplashCursorEnabled(): boolean {
  const reducedMotion = usePrefersReducedMotion()
  const finePointer = useFinePointer()
  const { chaosMode } = useChaosMode()
  return chaosMode && !reducedMotion && finePointer
}
