import { useEffect, useRef, useState, type ReactNode } from 'react'

type LazyInViewProps = {
  children: ReactNode
  rootMargin?: string
  minHeight?: string
}

export function LazyInView({
  children,
  rootMargin = '200px',
  minHeight = '1px',
}: LazyInViewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || visible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin, visible])

  return (
    <div ref={ref} style={{ minHeight: visible ? undefined : minHeight }}>
      {visible ? children : null}
    </div>
  )
}
