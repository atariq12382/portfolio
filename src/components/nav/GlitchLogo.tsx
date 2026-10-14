import { useSectionNav } from '@/context/SectionNavContext'

export function GlitchLogo() {
  const { navigateTo } = useSectionNav()

  return (
    <a
      href="#home"
      className="cursor-target glitch-hover font-mono text-sm font-semibold tracking-tight text-acid no-underline"
      data-cursor-label="Home"
      onClick={(event) => {
        event.preventDefault()
        navigateTo('home')
      }}
    >
      AT//DEV
    </a>
  )
}
