import { useEffect, useState } from 'react'
import DecryptedText from '@/components/DecryptedText'
import { HERO_ROLE_CYCLE_MS, HERO_ROLES } from '@/data/hero'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function HeroRoleCycler() {
  const reducedMotion = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reducedMotion) return
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_ROLES.length)
    }, HERO_ROLE_CYCLE_MS)
    return () => window.clearInterval(id)
  }, [reducedMotion])

  const role = reducedMotion ? HERO_ROLES[0] : HERO_ROLES[index]

  return (
    <p className="mt-2 w-full text-left min-h-[2.5rem] font-heading text-xl font-medium text-cyan md:min-h-[2.75rem] md:text-2xl">
      {reducedMotion ? (
        role
      ) : (
        <DecryptedText
          key={role}
          text={role}
          animateOn="view"
          sequential
          speed={40}
          className="text-cyan"
          encryptedClassName="text-muted"
        />
      )}
    </p>
  )
}
