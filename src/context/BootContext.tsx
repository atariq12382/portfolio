import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type BootContextValue = {
  bootComplete: boolean
  setBootComplete: (value: boolean) => void
}

const BootContext = createContext<BootContextValue | null>(null)

export function BootProvider({ children }: { children: ReactNode }) {
  const [bootComplete, setBootCompleteState] = useState(false)

  const setBootComplete = useCallback((value: boolean) => {
    setBootCompleteState(value)
  }, [])

  const value = useMemo(
    () => ({ bootComplete, setBootComplete }),
    [bootComplete, setBootComplete],
  )

  return <BootContext.Provider value={value}>{children}</BootContext.Provider>
}

export function useBootComplete(): boolean {
  const ctx = useContext(BootContext)
  if (!ctx) return true
  return ctx.bootComplete
}

export function useBootContext(): BootContextValue {
  const ctx = useContext(BootContext)
  if (!ctx) {
    throw new Error('useBootContext must be used within BootProvider')
  }
  return ctx
}
