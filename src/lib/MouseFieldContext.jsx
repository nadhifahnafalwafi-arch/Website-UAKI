// ANIMASI BARU: FILE BARU
import { createContext, useContext, useEffect } from 'react'
import { useMotionValue } from 'framer-motion'
import { useCursorEffectsEnabled } from '@/lib/useFinePointer'
import { CURSOR_EFFECTS } from '@/lib/animations'
import { useLoaderDone } from '@/lib/LoaderContext' 

const MouseFieldContext = createContext(null)

export function MouseFieldProvider({ targetRef, children }) {
  const loaderDone = useLoaderDone() 
  const enabled = useCursorEffectsEnabled() && loaderDone && (CURSOR_EFFECTS.glow || CURSOR_EFFECTS.parallax)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const nx = useMotionValue(0)
  const ny = useMotionValue(0)
  const active = useMotionValue(0)

  useEffect(() => {
    const el = targetRef.current
    if (!enabled || !el) return undefined

    let frame = 0
    let cx = 0
    let cy = 0

    const apply = () => {
      frame = 0
      const r = el.getBoundingClientRect()
      const x = cx - r.left
      const y = cy - r.top
      px.set(x)
      py.set(y)
      nx.set((x / r.width) * 2 - 1)
      ny.set((y / r.height) * 2 - 1)
    }
    const onMove = (e) => {
      cx = e.clientX
      cy = e.clientY
      if (!frame) frame = requestAnimationFrame(apply)
    }
    const onEnter = (e) => {
      cx = e.clientX
      cy = e.clientY
      apply() 
      active.set(1)
    }
    const onLeave = () => {
      active.set(0)
      nx.set(0) 
      ny.set(0)
    }

    el.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseenter', onEnter, { passive: true })
    el.addEventListener('mouseleave', onLeave, { passive: true })
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [enabled, targetRef, px, py, nx, ny, active])

  return (
    <MouseFieldContext.Provider value={enabled ? { px, py, nx, ny, active } : null}>
      {children}
    </MouseFieldContext.Provider>
  )
}

export function useMouseField() {
  return useContext(MouseFieldContext)
}
