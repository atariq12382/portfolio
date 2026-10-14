import DecryptedText from '@/components/DecryptedText'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type SkillChipProps = {
  label: string
  className?: string
}

export function SkillChip({ label, className = '' }: SkillChipProps) {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <span
      className={`glitch-hover inline-flex cursor-target rounded-full border border-white/10 bg-surface/60 px-2.5 py-1 text-xs text-text ${className}`}
    >
      {reducedMotion ? (
        label
      ) : (
        <DecryptedText
          text={label}
          animateOn="hover"
          speed={35}
          maxIterations={12}
          useOriginalCharsOnly
          className="text-text"
          encryptedClassName="text-muted"
        />
      )}
    </span>
  )
}
