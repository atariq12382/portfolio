import CountUp from '@/components/CountUp'
import { ABOUT_STATS } from '@/data/about'

export function AboutStatsRow() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {ABOUT_STATS.map(stat => (
        <div
          key={stat.id}
          className="rounded-xl border border-white/5 bg-surface/80 px-4 py-5 text-center backdrop-blur-sm"
        >
          <p className="font-heading text-3xl font-semibold tabular-nums text-text md:text-4xl">
            {stat.prefix}
            <CountUp to={stat.value} duration={2.2} className="text-acid" />
            {stat.suffix}
          </p>
          <p className="mt-2 text-[11px] font-medium uppercase tracking-wider text-muted">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}
