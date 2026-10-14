import { DeferredWarpText } from '@/components/DeferredWarpText'
import { LazyInView } from '@/components/LazyInView'
import { SiteFooter } from '@/components/SiteFooter'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ContactSocialLinks } from '@/sections/ContactSocialLinks'
import { ContactTerminalForm } from '@/sections/ContactTerminalForm'

const HEADLINE = "LET'S BUILD SOMETHING"

const headlineClass =
  'font-heading text-[clamp(1.75rem,7vw,4.25rem)] font-bold uppercase leading-[0.95] tracking-tight text-text'

export function ContactSection() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section
      id="contact"
      className="relative z-10 scroll-mt-24 py-12 md:py-16"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <div className="mb-10">
          {reducedMotion ? (
            <h2 id="contact-heading" className={headlineClass}>
              {HEADLINE}
            </h2>
          ) : (
            <LazyInView minHeight="3.5rem">
              <div>
                <h2 id="contact-heading" className="sr-only">
                  {HEADLINE}
                </h2>
                <DeferredWarpText
                  fallbackText={HEADLINE}
                  text={HEADLINE}
                  color="#e8e8f0"
                  fontFamily="var(--font-heading)"
                  fontSize="clamp(1.75rem, 7vw, 4.25rem)"
                  fontWeight={700}
                  letterSpacing="-0.025em"
                  lineHeight={0.95}
                  className="w-full min-h-0 font-heading"
                />
              </div>
            </LazyInView>
          )}
          <p className="mt-4 max-w-xl text-sm text-muted">
            Drop a line — I read every transmission.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start">
          <ContactTerminalForm />
          <div className="flex flex-col gap-3 lg:pt-2">
            <p className="font-mono text-[11px] uppercase tracking-wider text-cyan">
              Elsewhere
            </p>
            <ContactSocialLinks />
          </div>
        </div>

        <SiteFooter />
      </div>
    </section>
  )
}
