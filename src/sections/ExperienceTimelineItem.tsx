import type { CSSProperties } from 'react'
import { motion } from 'motion/react'
import SpotlightCard from '@/components/SpotlightCard'
import { ExperienceHighlights } from '@/components/ExperienceHighlights'
import type { Experience } from '@/data/portfolio'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/utils'

const ACCENTS = [
  {
    spotlight: 'rgba(182, 255, 59, 0.5)',
    node: 'bg-acid shadow-[0_0_12px_rgb(182_255_59_/_0.7)]',
    label: 'text-acid',
  },
  {
    spotlight: 'rgba(255, 43, 214, 0.5)',
    node: 'bg-magenta shadow-[0_0_12px_rgb(255_43_214_/_0.7)]',
    label: 'text-magenta',
  },
  {
    spotlight: 'rgba(34, 228, 255, 0.55)',
    node: 'bg-cyan shadow-[0_0_12px_rgb(34_228_255_/_0.7)]',
    label: 'text-cyan',
  },
] as const

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

type ExperienceTimelineItemProps = {
  entry: Experience
  index: number
}

export function ExperienceTimelineItem({
  entry,
  index,
}: ExperienceTimelineItemProps) {
  const reducedMotion = usePrefersReducedMotion()
  const accent = ACCENTS[index % ACCENTS.length]
  const isCurrent = entry.period.includes('Present')

  return (
    <motion.li
      className="relative pb-12 last:pb-0"
      variants={itemVariants}
      custom={index}
      initial={reducedMotion ? false : 'hidden'}
      whileInView={reducedMotion ? undefined : 'visible'}
      viewport={{ once: true, margin: '-10%' }}
    >
      <span
        className={cn(
          'experience-timeline-node absolute left-0 top-8 z-10 size-3 -translate-x-1/2 rounded-full ring-2 ring-bg',
          accent.node,
        )}
        aria-hidden
      />

      <div
        className="experience-border-cycle rounded-[1.35rem] p-px"
        style={{ animationDelay: `${index * -1.4}s` } as CSSProperties}
      >
        <SpotlightCard
          className="!rounded-[1.3rem] !p-5 md:!p-7"
          spotlightColor={accent.spotlight}
          intensity={0.22}
          spotlightSize={280}
          borderGlow={0.55}
          proximity={120}
          ambient
          theme="dark"
          style={
            {
              '--spotlight-card-surface': '#0f0f17',
            } as CSSProperties
          }
        >
          <div className="relative z-[2]">
            <div className="flex flex-wrap items-start justify-between gap-2 gap-y-1">
              <div>
                <p
                  className={cn(
                    'text-[11px] font-medium uppercase tracking-wider',
                    accent.label,
                  )}
                >
                  {entry.company}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <h3 className="font-heading text-lg font-semibold text-text md:text-xl">
                    {entry.role}
                  </h3>
                  {isCurrent ? (
                    <span className="experience-current-badge rounded border border-acid/40 bg-acid/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-acid">
                      CURRENT
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="text-left text-sm text-muted sm:text-right">
                <p className="tabular-nums">{entry.period}</p>
                <p>{entry.location}</p>
              </div>
            </div>

            <ExperienceHighlights highlights={entry.highlights} />
          </div>
        </SpotlightCard>
      </div>
    </motion.li>
  )
}
