import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { experience } from '@/data/portfolio'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ExperienceTimelineItem } from '@/sections/ExperienceTimelineItem'

export function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.85', 'end 0.15'],
  })

  const fillScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      id="experience"
      className="relative z-10 scroll-mt-24 py-12 md:py-16"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <h2
          id="experience-heading"
          className="font-heading text-2xl font-semibold text-text"
        >
          Experience
        </h2>

        <div ref={timelineRef} className="relative mt-10 pl-8 md:pl-10">
          <div
            className="experience-timeline-track pointer-events-none absolute bottom-0 left-0 top-0 w-0.5 -translate-x-1/2"
            aria-hidden
          >
            <div className="absolute inset-0 rounded-full bg-white/10" />
            {reducedMotion ? (
              <div className="experience-timeline-fill absolute inset-0 origin-top scale-y-100 rounded-full" />
            ) : (
              <motion.div
                className="experience-timeline-fill absolute inset-0 origin-top rounded-full"
                style={{ scaleY: fillScale }}
              />
            )}
          </div>

          <ol className="relative m-0 list-none p-0">
            {experience.map((entry, index) => (
              <ExperienceTimelineItem
                key={`${entry.company}-${entry.role}-${entry.period}`}
                entry={entry}
                index={index}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
