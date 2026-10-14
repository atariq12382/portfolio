import { ArrowUp } from 'lucide-react'
import ClickSpark from '@/components/ClickSpark'
import { useSectionNav } from '@/context/SectionNavContext'
import { profile } from '@/data/portfolio'
import { useFinePointer } from '@/hooks/useFinePointer'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const MARQUEE_TEXT = 'SHIPPED WITH REACT + COFFEE'
const MARQUEE_REPEATS = 10
const ACID = '#b6ff3b'

function MarqueeStrip() {
  return (
    <>
      {Array.from({ length: MARQUEE_REPEATS }, (_, i) => (
        <span key={i} className="footer-marquee-item">
          {MARQUEE_TEXT}
        </span>
      ))}
    </>
  )
}

export function SiteFooter() {
  const { navigateTo } = useSectionNav()
  const finePointer = useFinePointer()
  const reducedMotion = usePrefersReducedMotion()
  const year = new Date().getFullYear()

  return (
    <footer
      className="mt-16 border-t border-white/5 pt-8 pb-[max(6rem,calc(88px+env(safe-area-inset-bottom)))] md:pb-0"
    >
      <div
        className="footer-marquee full-bleed mb-8 overflow-hidden border-y border-white/5 bg-surface/30 py-2"
        aria-hidden={!reducedMotion}
      >
        {reducedMotion ? (
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
            {MARQUEE_TEXT}
          </p>
        ) : (
          <div className="footer-marquee-track font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
            <div className="footer-marquee-group">
              <MarqueeStrip />
            </div>
            <div className="footer-marquee-group" aria-hidden>
              <MarqueeStrip />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-center text-xs text-muted sm:text-left">
          © {year} {profile.name}
        </p>

        <ClickSpark
          sparkColor={ACID}
          glow={0.4}
          disabled={!finePointer}
          className="hidden md:inline-flex"
        >
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="cursor-target inline-flex items-center gap-2 rounded-lg border border-white/10 bg-surface/60 px-3 py-2 font-mono text-xs uppercase tracking-wider text-text transition-colors hover:border-acid/40 hover:text-acid"
          >
            <ArrowUp className="size-3.5" aria-hidden />
            back to top
          </button>
        </ClickSpark>
      </div>
    </footer>
  )
}
