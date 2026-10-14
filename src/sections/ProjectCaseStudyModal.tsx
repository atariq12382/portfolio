import { Dialog } from '@base-ui/react/dialog'
import { ProjectLinkButtons } from '@/sections/ProjectCardContent'
import type { Project } from '@/data/portfolio'

type ProjectCaseStudyModalProps = {
  project: Project | null
  onClose: () => void
}

const SECTIONS: { key: keyof Project['caseStudy']; label: string }[] = [
  { key: 'problem', label: 'Problem' },
  { key: 'approach', label: 'Approach' },
  { key: 'architecture', label: 'Architecture' },
  { key: 'outcome', label: 'Outcome' },
]

export function ProjectCaseStudyModal({
  project,
  onClose,
}: ProjectCaseStudyModalProps) {
  const open = project !== null

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose()
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop
          className="fixed inset-0 z-50 bg-bg/80 backdrop-blur-sm data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 transition-opacity duration-200"
        />
        <Dialog.Viewport className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          <Dialog.Popup
            className="neon-border flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-cyan/20 bg-surface shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)] data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 transition-[opacity,transform] duration-200"
          >
            {project && (
              <>
                <div
                  className="flex items-center gap-2 border-b border-white/5 bg-bg/80 px-4 py-2.5"
                >
                  <Dialog.Close
                    className="size-2.5 shrink-0 rounded-full bg-[#ff5f57] transition-opacity hover:opacity-90"
                    aria-label="Close case study"
                  />
                  <span
                    className="size-2.5 shrink-0 rounded-full bg-[#febc2e]"
                    aria-hidden
                  />
                  <span
                    className="size-2.5 shrink-0 rounded-full bg-[#28c840]"
                    aria-hidden
                  />
                  <Dialog.Title className="ml-2 truncate font-mono text-[11px] text-muted">
                    case-study — {project.id}.md
                  </Dialog.Title>
                </div>

                <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4 md:p-5">
                  <Dialog.Description className="sr-only">
                    Case study for {project.title}
                  </Dialog.Description>

                  <p className="font-mono text-sm text-muted">
                    <span className="text-acid/90">&gt;</span> cat{' '}
                    {project.id}.md
                  </p>

                  <h2 className="mt-3 font-heading text-lg font-semibold text-text">
                    {project.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted">{project.pitch}</p>

                  <div className="mt-6 space-y-6">
                    {SECTIONS.map(({ key, label }) => (
                      <section key={key}>
                        <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-acid">
                          ## {label}
                        </h3>
                        <p className="mt-2 font-mono text-sm leading-relaxed text-muted">
                          {project.caseStudy[key]}
                        </p>
                      </section>
                    ))}
                  </div>

                  <ProjectLinkButtons
                    project={project}
                    className="mt-8 border-t border-white/5 pt-4"
                  />
                </div>
              </>
            )}
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
