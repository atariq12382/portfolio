import TextType from '@/components/TextType'
import { ABOUT_BIO } from '@/data/about'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function AboutTerminalCard() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <div className="neon-border flex h-full flex-col overflow-hidden rounded-xl border border-cyan/20 bg-surface shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)]">
      <div
        className="flex items-center gap-2 border-b border-white/5 bg-bg/80 px-4 py-2.5"
        aria-hidden
      >
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate font-mono text-[11px] text-muted">
          abdullah@portfolio — zsh
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 font-mono text-sm leading-relaxed text-text md:p-5">
        <p className="text-muted">
          <span className="text-acid/90">&gt;</span> cat bio.txt
        </p>
        <div className="min-h-[10rem] text-muted md:min-h-[9rem]">
          {reducedMotion ? (
            <p>{ABOUT_BIO}</p>
          ) : (
            <TextType
              text={ABOUT_BIO}
              as="p"
              className="!whitespace-normal text-muted"
              typingSpeed={18}
              initialDelay={400}
              loop={false}
              showCursor
              cursorCharacter="▌"
              cursorClassName="text-acid"
              startOnVisible
            />
          )}
        </div>
      </div>
    </div>
  )
}
