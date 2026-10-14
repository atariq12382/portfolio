import { useEffect, useState } from 'react'

export function useMinMd(): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia('(min-width: 768px)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return matches
}
