import { ChevronDown } from 'lucide-react'
import GlareHover from '@/components/GlareHover'
import { DeferredWarpText } from '@/components/DeferredWarpText'
import Magnet from '@/components/Magnet'
import { profile } from '@/data/portfolio'
import { useSectionNav } from '@/context/SectionNavContext'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { HeroRoleCycler } from '@/sections/HeroRoleCycler'

const headlineClass =
  'mx-0 w-full text-left font-heading text-[clamp(2.5rem,12vw,6.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-text cursor-default'

function HeroHeadline({ name }: { name: string }) {
  const reducedMotion = usePrefersReducedMotion()
  const displayName = name.toUpperCase()

  if (reducedMotion) {
    return <h1 className={headlineClass}>{displayName}</h1>
  }

  return (
    <div className="w-full">
      <h1 className="sr-only">{displayName}</h1>
      <DeferredWarpText
        fallbackText={displayName}
        text={displayName}
        color="#e8e8f0"
        fontFamily="var(--font-heading)"
        fontSize="clamp(2.5rem, 12vw, 6.5rem)"
        fontWeight={700}
        letterSpacing="-0.025em"
        lineHeight={0.95}
        className="mx-0 w-full min-h-0 font-heading"
      />
    </div>
  )
}

function HeroCta({
  label,
  onClick,
  href,
  download,
  variant,
}: {
  label: string
  variant: 'primary' | 'outline'
  onClick?: () => void
  href?: string
  download?: boolean
}) {
  const base =
    'cursor-target inline-flex min-h-11 items-center justify-center rounded-lg px-6 py-2.5 text-sm font-medium tracking-wide transition-colors'

  const styles =
    variant === 'primary'
      ? `${base} bg-acid text-bg hover:bg-acid/90`
      : `${base} neon-border border-cyan bg-transparent text-cyan hover:bg-cyan/10`

  const inner = href ? (
    <a
      href={href}
      download={download}
      className={styles}
      data-cursor-label={label}
    >
      {label}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={styles} data-cursor-label={label}>
      {label}
    </button>
  )

  return (
    <Magnet padding={80} magnetStrength={2.5} maxOffset={12}>
      <GlareHover
        width="auto"
        height="auto"
        borderRadius="0.5rem"
        borderColor="transparent"
        glareColor={variant === 'primary' ? '#e8e8f0' : '#22e4ff'}
        glareOpacity={0.45}
        className="rounded-lg"
      >
        {inner}
      </GlareHover>
    </Magnet>
  )
}

export function HeroSection() {
  const { navigateTo } = useSectionNav()

  return (
    <section
      id="home"
      className="relative z-10 scroll-mt-24 min-h-svh"
      aria-label="Introduction"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/85 via-bg/55 to-bg/90 backdrop-blur-[2px]"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-svh max-w-5xl flex-col justify-center px-6 pb-20 pt-24 md:px-8 md:pb-24">
        <div className="flex flex-col items-stretch">
          <HeroHeadline name={profile.name} />
          <HeroRoleCycler />
        </div>

        <p className="mt-6 font-mono text-sm text-muted md:text-base">
          <span className="text-acid/90">&gt;</span>{' '}
          status: shipping AI-powered products @ QBatch
          <span className="hero-terminal-cursor text-acid" aria-hidden>
            ▌
          </span>
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <HeroCta
            label="View Projects"
            variant="primary"
            onClick={() => navigateTo('projects')}
          />
          {/* Add public/cv.pdf when ready */}
          <HeroCta
            label="Download CV"
            variant="outline"
            href="/cv.pdf"
            download
          />
        </div>
      </div>

      <button
        type="button"
        className="hero-scroll-indicator absolute bottom-8 left-1/2 flex -translate-x-1/2 cursor-target flex-col items-center gap-1 border-0 bg-transparent font-mono text-xs uppercase tracking-[0.25em] text-muted transition-colors hover:text-text"
        onClick={() => navigateTo('about')}
        aria-label="Scroll to about section"
      >
        Scroll
        <ChevronDown className="size-4 text-acid" aria-hidden />
      </button>
    </section>
  )
}
