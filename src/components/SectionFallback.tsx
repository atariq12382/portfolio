export function SectionFallback({ minHeight = '40vh' }: { minHeight?: string }) {
  return (
    <div
      className="relative z-10 mx-auto max-w-5xl px-6 py-12 md:px-8 md:py-16"
      style={{ minHeight }}
      aria-hidden
    />
  )
}
