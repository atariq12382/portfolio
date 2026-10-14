import type { CSSProperties } from 'react'
import ProfileCard from '@/components/ProfileCard'
import SpotlightCard from '@/components/SpotlightCard'
import {
  ABOUT_EDUCATION,
  AVATAR_PLACEHOLDER_PATH,
} from '@/data/about'
import { profile } from '@/data/portfolio'
import { AboutStatsRow } from '@/sections/AboutStatsRow'
import { AboutTerminalCard } from '@/sections/AboutTerminalCard'

export function AboutSection() {
  const handle = profile.email.split('@')[0]

  return (
    <section
      id="about"
      className="relative z-10 scroll-mt-24 py-12 md:py-16"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <h2
          id="about-heading"
          className="font-heading text-2xl font-semibold text-text"
        >
          About
        </h2>

        <div className="mt-8 grid items-start gap-8 md:grid-cols-2 md:gap-10">
          <AboutTerminalCard />

          <div className="flex justify-center md:justify-end">
            <ProfileCard
              className="cursor-target"
              avatarUrl={AVATAR_PLACEHOLDER_PATH}
              name={profile.name}
              title={profile.title}
              handle={handle}
              status={`${profile.location} · Open to work`}
              statusColor="#b6ff3b"
              contactText="Email"
              onContactClick={() => {
                window.location.href = `mailto:${profile.email}`
              }}
              theme="dark"
              backdropColor="#0f0f17"
              radius={14}
              holo={0.85}
              glare={0.55}
              enableTilt
              tiltStrength={10}
              parallax={6}
            />
          </div>
        </div>

        <div className="mt-10">
          <AboutStatsRow />
        </div>

        <SpotlightCard
          className="mt-6 !rounded-2xl !p-6 md:!p-8"
          spotlightColor="rgba(34, 228, 255, 0.55)"
          intensity={0.22}
          spotlightSize={280}
          borderGlow={0.5}
          proximity={120}
          ambient
          theme="dark"
          style={
            {
              '--spotlight-card-surface': '#0f0f17',
            } as CSSProperties
          }
        >
          <div className="relative z-[2] flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-cyan">
                Education
              </p>
              <h3 className="mt-1 font-heading text-lg font-semibold text-text">
                {ABOUT_EDUCATION.institution}
              </h3>
              <p className="mt-0.5 text-sm text-muted">
                {ABOUT_EDUCATION.degree}
                {ABOUT_EDUCATION.location
                  ? ` · ${ABOUT_EDUCATION.location}`
                  : ''}
              </p>
            </div>
            <div className="sm:text-right">
              <p className="font-heading text-2xl font-semibold text-acid">
                {ABOUT_EDUCATION.cgpa}
              </p>
              <p className="text-xs uppercase tracking-wider text-muted">CGPA</p>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  )
}
