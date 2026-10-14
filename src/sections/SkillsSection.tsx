import { lazy, Suspense, useMemo } from 'react'
import ScrollVelocity from '@/components/ScrollVelocity'
import { SkillChip } from '@/components/SkillChip'
import {
  formatMarqueeLine,
  getMarqueeRows,
  toMagicBentoItems,
} from '@/data/skills'
import { skills, type SkillGroup } from '@/data/portfolio'
import { useMinMd } from '@/hooks/useMinMd'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const MagicBento = lazy(() => import('@/components/MagicBento'))

function SkillCategoryContent({ group }: { group: SkillGroup }) {
  const featured = group.id === 'ai-llm'

  return (
    <div
      className={
        featured
          ? 'flex h-full min-h-0 flex-col gap-4 rounded-xl border border-acid/35 bg-acid/[0.04] p-4 sm:p-5'
          : 'flex h-full min-h-0 flex-col gap-3'
      }
    >
      <div>
        <p
          className={
            featured
              ? 'text-[11px] font-medium uppercase tracking-wider text-acid'
              : 'text-[11px] font-medium uppercase tracking-wider text-cyan'
          }
        >
          {group.label}
        </p>
        {featured && (
          <p className="mt-1 text-xs text-muted">Current focus</p>
        )}
      </div>
      <div
        className={`flex flex-wrap gap-2 ${featured ? 'content-start' : ''}`}
      >
        {group.skills.map((skill) => (
          <SkillChip
            key={skill}
            label={skill}
            className={featured ? 'text-sm px-3 py-1.5' : undefined}
          />
        ))}
      </div>
    </div>
  )
}

export function SkillsSection() {
  const reducedMotion = usePrefersReducedMotion()
  const minMd = useMinMd()
  const [rowA, rowB] = getMarqueeRows(skills)

  const marqueeTexts = useMemo(
    () => [formatMarqueeLine(rowA), formatMarqueeLine(rowB)],
    [rowA, rowB],
  )

  const bentoItems = useMemo(
    () =>
      toMagicBentoItems(skills, (group) => (
        <SkillCategoryContent group={group} />
      )),
    [],
  )

  return (
    <section
      id="skills"
      className="relative z-10 scroll-mt-24 py-12 md:py-16"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <h2
          id="skills-heading"
          className="font-heading text-2xl font-semibold text-text"
        >
          Skills
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Stacks I ship with — scroll to speed the ticker, hover chips to
          decode.
        </p>
      </div>

      <div
        className="full-bleed mt-8 overflow-hidden border-y border-white/5 bg-surface/40 py-3 md:py-4"
        aria-hidden
      >
        <ScrollVelocity
          texts={marqueeTexts}
          velocity={reducedMotion ? 0.8 : 2.5}
          damping={55}
          stiffness={380}
          numCopies={4}
          velocityMapping={
            reducedMotion
              ? { input: [0, 1000], output: [0, 0] }
              : { input: [0, 1200], output: [0, 4] }
          }
          parallaxClassName="relative overflow-hidden py-1"
          scrollerClassName="flex whitespace-nowrap !text-sm md:!text-base !font-mono !font-normal !tracking-normal text-muted !drop-shadow-none"
          className="text-muted"
        />
      </div>

      <div className="mx-auto mt-10 max-w-5xl px-6 md:px-8 min-h-[168px]">
        <Suspense fallback={null}>
          <MagicBento
            items={bentoItems}
            columns={minMd ? 3 : 1}
          rowHeight={168}
          gap={12}
          radius={16}
          theme="dark"
          glowColor="#b6ff3b"
          textAutoHide={false}
          enableBorderGlow
          enableSpotlight
          spotlightRadius={280}
          enableStars={!reducedMotion}
          particleCount={14}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect={false}
          intro={!reducedMotion}
          disableAnimations={reducedMotion}
            className="w-full"
          />
        </Suspense>
      </div>
    </section>
  )
}
