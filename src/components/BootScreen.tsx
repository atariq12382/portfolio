import { useEffect, useRef, useState } from 'react'
import { useBootContext } from '@/context/BootContext'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const MIN_MS = 720
const MAX_MS = 1280
const FADE_MS = 320
const REDUCED_MS = 280

const TICKER_LINES = [
  'linking modules',
  'warming shaders',
  'patching reality',
  'ready',
] as const

export function BootScreen() {
  const { bootComplete, setBootComplete } = useBootContext()
  const reducedMotion = usePrefersReducedMotion()
  const [phase, setPhase] = useState<'active' | 'fade' | 'done'>('active')
  const [tickerIndex, setTickerIndex] = useState(0)
  const rafRef = useRef(0)

  useEffect(() => {
    if (bootComplete) return

    const interval = reducedMotion
      ? 0
      : window.setInterval(() => {
          setTickerIndex((i) => (i + 1) % TICKER_LINES.length)
        }, 420)

    const start = performance.now()
    const minDuration = reducedMotion ? REDUCED_MS : MIN_MS
    const hardCap = reducedMotion ? REDUCED_MS : MAX_MS

    let fontsDone = false
    const fontsPromise = document.fonts?.ready?.then(() => {
      fontsDone = true
    })

    const finish = () => {
      if (interval) window.clearInterval(interval)
      setPhase('fade')
      window.setTimeout(() => {
        setPhase('done')
        setBootComplete(true)
      }, reducedMotion ? 120 : FADE_MS)
    }

    const tick = (now: number) => {
      const elapsed = now - start
      const ready =
        elapsed >= minDuration && (fontsDone || elapsed >= hardCap)

      if (ready || elapsed >= hardCap) {
        finish()
        return
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    void fontsPromise

    return () => {
      if (interval) window.clearInterval(interval)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [bootComplete, reducedMotion, setBootComplete])

  if (bootComplete || phase === 'done') return null

  return (
    <div
      className={`boot-screen fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg transition-opacity duration-300 ${
        phase === 'fade' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      role="status"
      aria-live="polite"
      aria-busy={phase === 'active'}
      aria-label="Loading"
    >
      <div className="boot-screen__scanlines pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative flex flex-col items-center">
        <div className="boot-loader relative size-36 sm:size-40">
          <svg
            className="boot-loader__ring boot-loader__ring--cyan absolute inset-0 size-full"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray="18 82"
            />
          </svg>
          <svg
            className="boot-loader__ring boot-loader__ring--magenta absolute inset-0 size-full"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="36"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray="12 88"
            />
          </svg>
          <svg
            className="boot-loader__ring boot-loader__ring--acid absolute inset-0 size-full"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray="22 78"
            />
          </svg>
          <div className="boot-loader__pulse absolute inset-0 rounded-full" aria-hidden />
          <p
            className="boot-loader__logo absolute inset-0 flex items-center justify-center font-mono text-base font-semibold tracking-tight text-acid sm:text-lg"
          >
            AT<span className="text-muted">//</span>DEV
          </p>
        </div>

        <p
          className="mt-5 font-mono text-[10px] uppercase tracking-[0.4em] text-muted"
          key={tickerIndex}
        >
          <span className="text-cyan/90">&gt;</span>{' '}
          <span className={reducedMotion ? '' : 'boot-loader__ticker'}>
            {TICKER_LINES[tickerIndex]}
          </span>
        </p>
      </div>
    </div>
  )
}
