import type { KeyboardEvent, MouseEvent } from 'react'
import DecryptedText from '@/components/DecryptedText'
import { SkillChip } from '@/components/SkillChip'
import { buttonVariants } from '@/components/ui/button'
import { cn } from 'cn'
import { isProjectUrl } from '@/data/projects'
import type { Project } from '@/data/portfolio'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

function stopCardActivation(event: MouseEvent | KeyboardEvent) {
  event.stopPropagation()
}

type ProjectLinkButtonsProps = {
  project: Project
  className?: string
}

export function ProjectLinkButtons({
  project,
  className = '',
}: ProjectLinkButtonsProps) {
  const showRepo = isProjectUrl(project.repoUrl)
  const showLive = isProjectUrl(project.demoUrl)

  if (!showRepo && !showLive) return null

  return (
    <div
      className={`flex flex-wrap gap-2 ${className}`}
      onClick={stopCardActivation}
      onKeyDown={stopCardActivation}
      role="presentation"
    >
      {showRepo && (
        <a
          href={project.repoUrl!.trim()}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: 'outline', size: 'sm' }),
            'cursor-target',
          )}
        >
          Repo
        </a>
      )}
      {showLive && (
        <a
          href={project.demoUrl!.trim()}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: 'outline', size: 'sm' }),
            'cursor-target',
          )}
        >
          Live
        </a>
      )}
    </div>
  )
}

type ProjectCardContentProps = {
  project: Project
}

export function ProjectCardContent({ project }: ProjectCardContentProps) {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="space-y-1.5">
        <h3 className="font-heading text-base font-semibold leading-snug text-text md:text-lg">
          {reducedMotion ? (
            project.title
          ) : (
            <DecryptedText
              text={project.title}
              animateOn="hover"
              speed={35}
              maxIterations={12}
              useOriginalCharsOnly
              className="text-text"
              encryptedClassName="text-muted"
            />
          )}
        </h3>
        <p className="text-sm leading-snug text-muted">{project.pitch}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((tag) => (
          <SkillChip key={tag} label={tag} />
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-1">
        <ProjectLinkButtons project={project} />
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted/80">
          View case study
        </span>
      </div>
    </div>
  )
}
