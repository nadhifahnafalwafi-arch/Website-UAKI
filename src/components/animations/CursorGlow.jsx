import { motion, useMotionValueEvent, useSpring, useTransform } from 'framer-motion'
import { useMouseField } from '@/lib/MouseFieldContext'
import { CURSOR_EFFECTS, GLOW } from '@/lib/animations'

function Glow({ field, color, size }) {
  const sx = useSpring(field.px, GLOW.follow)
  const sy = useSpring(field.py, GLOW.follow)
  const opacity = useSpring(field.active, GLOW.fade)
  const x = useTransform(sx, (v) => v - size / 2)
  const y = useTransform(sy, (v) => v - size / 2)

  useMotionValueEvent(field.active, 'change', (v) => {
    if (v === 1) {
      sx.jump(field.px.get())
      sy.jump(field.py.get())
    }
  })

  return (
    <motion.div
      className="absolute left-0 top-0 rounded-full will-change-transform"
      style={{
        x,
        y,
        opacity,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
    />
  )
}

export default function CursorGlow({ tone = 'light', color, size = GLOW.size, className = '' }) {
  const field = useMouseField()
  if (!field || !CURSOR_EFFECTS.glow) return null

  const glowColor = color ?? (tone === 'dark' ? GLOW.colorOnDark : GLOW.colorOnLight)

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <Glow field={field} color={glowColor} size={size} />
    </div>
  )
}
