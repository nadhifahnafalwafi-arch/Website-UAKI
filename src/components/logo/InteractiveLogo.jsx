import { memo, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { LOGO_PATHS, LOGO_VIEWBOX } from './logoUakiPaths'
import { LOGO_PART_STYLE, partBounds, toGray } from './logoParts'
import { easeOut, PHILOSOPHY } from '@/lib/animations'

const LogoPath = memo(function LogoPath({ path, part, active, reduce }) {
  const meta = LOGO_PART_STYLE[part]
  const gray = useMemo(() => toGray(path.fill, PHILOSOPHY.grayLift), [path.fill])

  const [bx, by, bw, bh] = path.bbox
  const [ox, oy] = meta.origin
  const style = { originX: bw ? (ox - bx) / bw : 0.5, originY: bh ? (oy - by) / bh : 0.5 }

  if (reduce) {
    return (
      <motion.path
        d={path.d}
        style={style}
        initial={false}
        animate={{ fill: active ? path.fill : gray }}
        transition={{ duration: 0 }}
      />
    )
  }

  const d = PHILOSOPHY.colorDuration
  const loop = { repeat: Infinity, ease: 'easeInOut' }
  const target = active
    ? {
        fill: path.fill,
        scale: PHILOSOPHY.activeScale,
        rotate: meta.effect === 'sway' ? [0, 2.5, -2, 0] : 0, // api bergoyang
        x: meta.effect === 'flow' ? [0, 0.45, -0.2, 0] : 0, // pita mengalir
      }
    : { fill: gray, scale: 1, rotate: 0, x: 0 }

  return (
    <motion.path
      d={path.d}
      style={style}
      initial={{ fill: gray }}
      animate={target}
      transition={{
        fill: { duration: d, ease: 'easeOut' },
        scale: { duration: d, ease: easeOut },
        rotate: active && meta.effect === 'sway' ? { duration: 2.6, ...loop } : { duration: 0.4 },
        x: active && meta.effect === 'flow' ? { duration: 2.8, ...loop } : { duration: 0.4 },
      }}
    />
  )
})

export default function InteractiveLogo({ points, partOfPath, activePart, controller, className = '' }) {
  const reduce = useReducedMotion()
  const bounds = useMemo(() => points.map((pt) => partBounds(pt.paths)), [points])

  const onPointerDown = (e) => {
    controller.pointerType.current = e.pointerType
  }

  return (
    <div className={`relative ${className}`}>
      {}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {LOGO_PART_STYLE.map((meta, part) => (
          <motion.span
            key={part}
            className="absolute aspect-square w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: meta.glow.x,
              top: meta.glow.y,
              background: `radial-gradient(circle, ${meta.glow.color} 0%, transparent 65%)`,
            }}
            initial={false}
            animate={{ opacity: activePart === part ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : PHILOSOPHY.colorDuration }}
          />
        ))}
        {}
        {LOGO_PART_STYLE.map(
          (meta, part) =>
            meta.shimmer && (
              <motion.span
                key={`s${part}`}
                className="absolute aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  left: meta.shimmer.x,
                  top: meta.shimmer.y,
                  background: `radial-gradient(circle, ${meta.shimmer.color} 0%, transparent 70%)`,
                }}
                initial={false}
                animate={activePart === part ? { opacity: reduce ? 0.8 : [0.35, 0.95, 0.35] } : { opacity: 0 }}
                transition={
                  activePart === part && !reduce
                    ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
                    : { duration: reduce ? 0 : 0.4 }
                }
              />
            ),
        )}
      </div>

      <svg
        viewBox={LOGO_VIEWBOX}
        className="relative block h-auto w-full overflow-visible"
        role="group"
        aria-label="Logo UAKI interaktif. Pilih salah satu bagian untuk melihat maknanya."
        onPointerDown={onPointerDown}
        onPointerLeave={(e) => e.pointerType === 'mouse' && controller.leave()}
      >
        {}
        <g aria-hidden="true">
          {LOGO_PATHS.map((path, i) => (
            <LogoPath key={i} path={path} part={partOfPath[i]} active={activePart === partOfPath[i]} reduce={reduce} />
          ))}
        </g>

        {}
        <g
          aria-hidden="true"
          fill="transparent"
          stroke="transparent"
          strokeWidth={PHILOSOPHY.hitStroke}
          strokeLinejoin="round"
        >
          {LOGO_PATHS.map((path, i) => (
            <path
              key={i}
              d={path.d}
              pointerEvents="all"
              className="cursor-pointer"
              onPointerEnter={(e) => e.pointerType === 'mouse' && controller.hover(partOfPath[i])}
              onClick={() => controller.pointerType.current !== 'mouse' && controller.toggle(partOfPath[i])}
            />
          ))}
        </g>

        {}
        {points.map((pt, part) => (
          <g
            key={part}
            role="button"
            tabIndex={0}
            data-philosophy-part={part}
            aria-pressed={activePart === part}
            aria-label={`Bagian ${pt.partLabel} pada logo: ${pt.title}`}
            className="group outline-none"
            pointerEvents="none"
            onFocus={() => controller.focus(part)}
            onBlur={controller.blur}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                controller.toggle(part)
              }
            }}
          >
            <rect
              {...bounds[part]}
              rx={2.5}
              fill="none"
              strokeWidth={0.45}
              strokeDasharray="1.2 0.9"
              className="stroke-brand opacity-0 transition-opacity group-focus-visible:opacity-100"
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
