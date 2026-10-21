import { useEffect, useRef } from 'react'
import { animate } from 'framer-motion'
import { Sparkle } from 'lucide-react'
import { useCursorEffectsEnabled } from '@/lib/useFinePointer'
import { CURSOR_EFFECTS, TRAIL } from '@/lib/animations'

export default function CursorTrail() {
  const enabled = useCursorEffectsEnabled() && CURSOR_EFFECTS.trail
  const holders = useRef([])
  const dots = useRef([])

  useEffect(() => {
    if (!enabled) return undefined
    let next = 0
    let lastTime = 0
    let lastX = -999
    let lastY = -999

    const onMove = (e) => {
      const now = performance.now()
      const far = Math.hypot(e.clientX - lastX, e.clientY - lastY) >= TRAIL.minDistance
      if (now - lastTime < TRAIL.interval && !far) return
      lastTime = now
      lastX = e.clientX
      lastY = e.clientY

      const holder = holders.current[next]
      const dot = dots.current[next]
      next = (next + 1) % TRAIL.count
      if (!holder || !dot) return

      holder.style.transform = `translate3d(${lastX}px, ${lastY}px, 0)`
      animate(dot, { opacity: [0.85, 0], scale: [1, 0.3] }, { duration: TRAIL.life, ease: 'easeOut' })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [enabled])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-trail overflow-hidden">
      {Array.from({ length: TRAIL.count }, (_, i) => (
        <div key={i} ref={(el) => (holders.current[i] = el)} className="absolute left-0 top-0 will-change-transform">
          <span ref={(el) => (dots.current[i] = el)} className="-ml-1.5 -mt-1.5 block h-3 w-3 text-leaf opacity-0">
            {TRAIL.shape === 'star' ? (
              <Sparkle className="h-full w-full" fill="currentColor" strokeWidth={0} />
            ) : (
              <span className="block h-full w-full scale-75 rounded-full bg-current" />
            )}
          </span>
        </div>
      ))}
    </div>
  )
}
