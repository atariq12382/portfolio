export function BackgroundVignette() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        background: [
          'radial-gradient(ellipse 85% 75% at 50% 45%, transparent 35%, rgb(7 7 11 / 0.55) 100%)',
          'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgb(0 0 0 / 0.65) 100%)',
        ].join(', '),
      }}
      aria-hidden
    />
  )
}
