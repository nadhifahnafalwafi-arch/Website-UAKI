
import { useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useMouseField } from '@/lib/MouseFieldContext'
import { CURSOR_EFFECTS, PARALLAX } from '@/lib/animations'

export default function useMouseParallax(depth = 1) {
  const field = useMouseField()
  const zero = useMotionValue(0)
  const on = Boolean(field) && CURSOR_EFFECTS.parallax
  const shift = depth * PARALLAX.maxShift

  const tx = useTransform(on ? field.nx : zero, (v) => v * shift)
  const ty = useTransform(on ? field.ny : zero, (v) => v * shift)
  const x = useSpring(tx, PARALLAX.spring)
  const y = useSpring(ty, PARALLAX.spring)

  return { x, y, enabled: on }
}
