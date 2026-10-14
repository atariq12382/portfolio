import { lazy, Suspense } from 'react'
import { SectionFallback } from '@/components/SectionFallback'
import { HeroSection } from '@/sections/HeroSection'

const AboutSection = lazy(() =>
  import('@/sections/AboutSection').then((m) => ({ default: m.AboutSection })),
)
const ExperienceSection = lazy(() =>
  import('@/sections/ExperienceSection').then((m) => ({
    default: m.ExperienceSection,
  })),
)
const SkillsSection = lazy(() =>
  import('@/sections/SkillsSection').then((m) => ({ default: m.SkillsSection })),
)
const ProjectsSection = lazy(() =>
  import('@/sections/ProjectsSection').then((m) => ({
    default: m.ProjectsSection,
  })),
)
const ContactSection = lazy(() =>
  import('@/sections/ContactSection').then((m) => ({
    default: m.ContactSection,
  })),
)

function App() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<SectionFallback minHeight="50vh" />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight="55vh" />}>
        <ExperienceSection />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight="45vh" />}>
        <SkillsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight="50vh" />}>
        <ProjectsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight="55vh" />}>
        <ContactSection />
      </Suspense>
    </>
  )
}

export default App
