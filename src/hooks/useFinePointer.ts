import { useEffect, useState } from 'react'

const QUERY = '(hover: hover) and (pointer: fine)'

export function useFinePointer(): boolean {
  const [fine, setFine] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(QUERY).matches
  })

  useEffect(() => {
    const media = window.matchMedia(QUERY)
    const update = () => setFine(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return fine
}
