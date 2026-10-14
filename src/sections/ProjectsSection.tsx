import { lazy, Suspense, useCallback, useMemo, useState } from 'react'
import type { MagicBentoItem } from '@/components/MagicBento'
import { projects } from '@/data/portfolio'
import { findProjectById, toProjectBentoItems } from '@/data/projects'
import { ProjectCardContent } from '@/sections/ProjectCardContent'
import { ProjectCaseStudyModal } from '@/sections/ProjectCaseStudyModal'
import { useMinMd } from '@/hooks/useMinMd'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const MagicBento = lazy(() => import('@/components/MagicBento'))

export function ProjectsSection() {
  const reducedMotion = usePrefersReducedMotion()
  const minMd = useMinMd()
  const [activeId, setActiveId] = useState<string | null>(null)

  const activeProject = useMemo(
    () => (activeId ? findProjectById(projects, activeId) : null),
    [activeId],
  )

  const bentoItems = useMemo(
    () =>
      toProjectBentoItems(projects, (project) => (
        <ProjectCardContent project={project} />
      )),
    [],
  )

  const handleItemClick = useCallback((item: MagicBentoItem) => {
    if (item.id !== undefined) setActiveId(String(item.id))
  }, [])

  const handleCloseModal = useCallback(() => {
    setActiveId(null)
  }, [])

  return (
    <section
      id="projects"
      className="relative z-10 scroll-mt-24 py-12 md:py-16"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <h2
          id="projects-heading"
          className="font-heading text-2xl font-semibold text-text"
        >
          Projects
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Featured work — hover to decode titles, click a card for the full case
          study.
        </p>

        <div className="mt-10 min-h-[220px]">
          <Suspense fallback={null}>
            <MagicBento
              items={bentoItems}
              columns={minMd ? 2 : 1}
            rowHeight={220}
            gap={12}
            radius={16}
            theme="dark"
            glowColor="#b6ff3b"
            textAutoHide={false}
            enableBorderGlow
            enableSpotlight
            spotlightRadius={280}
            enableStars={false}
            enableTilt={!reducedMotion}
            enableMagnetism={false}
            clickEffect={!reducedMotion}
            intro={!reducedMotion}
            disableAnimations={reducedMotion}
            onItemClick={handleItemClick}
              className="w-full"
            />
          </Suspense>
        </div>
      </div>

      <ProjectCaseStudyModal
        project={activeProject}
        onClose={handleCloseModal}
      />
    </section>
  )
}
