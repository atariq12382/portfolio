import { SECTIONS, type SectionId } from '@/config/sections'

const MOBILE_DOCK_HEIGHT_PX = 88
const SITE_HEADER_SELECTOR = 'header[aria-label="Site"]'

let cachedSafeAreaBottom: number | null = null

function safeAreaBottom(): number {
  if (cachedSafeAreaBottom !== null) return cachedSafeAreaBottom
  const probe = document.createElement('div')
  probe.style.paddingBottom = 'env(safe-area-inset-bottom)'
  document.body.appendChild(probe)
  cachedSafeAreaBottom = parseFloat(getComputedStyle(probe).paddingBottom) || 0
  probe.remove()
  return cachedSafeAreaBottom
}

/** Section id at the scroll “probe” line (between fixed header and mobile dock). */
export function resolveActiveSection(): SectionId | null {
  const ids = SECTIONS.map((s) => s.id)
  const isMobile = window.matchMedia('(max-width: 767px)').matches

  const headerBottom =
    document.querySelector(SITE_HEADER_SELECTOR)?.getBoundingClientRect().bottom ??
    56

  const dockInset = isMobile ? MOBILE_DOCK_HEIGHT_PX + safeAreaBottom() : 0
  const visibleTop = headerBottom
  const visibleBottom = window.innerHeight - dockInset
  const probeY = visibleTop + (visibleBottom - visibleTop) * 0.35

  let fallback: { id: SectionId; distance: number } | null = null

  for (const id of ids) {
    const el = document.getElementById(id)
    if (!el) continue

    const { top, bottom } = el.getBoundingClientRect()
    if (top <= probeY && bottom > probeY) {
      return id
    }

    const mid = (top + bottom) / 2
    const distance = Math.abs(mid - probeY)
    if (!fallback || distance < fallback.distance) {
      fallback = { id, distance }
    }
  }

  return fallback?.id ?? null
}
