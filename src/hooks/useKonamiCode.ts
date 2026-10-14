import { useEffect, useRef } from 'react'

const SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
] as const

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
  return target.isContentEditable
}

export function useKonamiCode(onMatch: () => void) {
  const indexRef = useRef(0)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return

      const expected = SEQUENCE[indexRef.current]
      if (event.code === expected) {
        indexRef.current += 1
        if (indexRef.current >= SEQUENCE.length) {
          indexRef.current = 0
          onMatch()
        }
        return
      }

      indexRef.current = event.code === SEQUENCE[0] ? 1 : 0
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onMatch])
}
