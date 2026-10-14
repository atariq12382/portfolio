export function StaticBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 bg-bg"
      style={{
        backgroundImage: [
          'radial-gradient(ellipse 80% 60% at 20% 30%, rgb(182 255 59 / 0.07), transparent 55%)',
          'radial-gradient(ellipse 70% 50% at 85% 70%, rgb(255 43 214 / 0.06), transparent 50%)',
          'linear-gradient(rgb(122 122 144 / 0.08) 1px, transparent 1px)',
          'linear-gradient(90deg, rgb(122 122 144 / 0.08) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: 'auto, auto, 24px 24px, 24px 24px',
      }}
      aria-hidden
    />
  )
}
