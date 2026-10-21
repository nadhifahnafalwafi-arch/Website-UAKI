import { useId, useMemo } from 'react'
import { motion, useTransform } from 'framer-motion'
import { LOGO_PATHS, LOGO_VIEWBOX } from '@/components/logo/logoUakiPaths'
import { toGray } from '@/components/logo/logoParts'
import { LOADER_COLORS, SPARKS } from '@/lib/loaderConfig'

const FILL_BOTTOM = 67
const FLAME = { x: '63%', y: '18%' }
function makeSparks(count) {
  return Array.from({ length: count }, (_, i) => {
    const t = (i + 0.5) / count
    return {
      dx: Math.round((t - 0.5) * 70 + Math.sin(i * 2.3) * 10), 
      rise: SPARKS.rise * (0.6 + ((i * 37) % 10) / 25), 
      size: 3 + ((i * 7) % 3), 
      delay: (i % 6) * 0.12,
    }
  })
}

export default function LoaderLogo({ progress, complete, reduce, compact }) {
  const uid = useId().replace(/:/g, '')
  const fillId = `${uid}-fill`
  const shapeId = `${uid}-shape`
  const grays = useMemo(() => LOGO_PATHS.map((p) => toGray(p.fill)), [])
  const sparks = useMemo(() => makeSparks(compact ? SPARKS.countMobile : SPARKS.count), [compact])
  const lineY = useTransform(progress, (v) => FILL_BOTTOM * (1 - v))
  const colorOpacity = useTransform(progress, (v) => (reduce ? v : 1))

  return (
    <motion.div
      className="relative mx-auto"
      style={{ height: 'clamp(120px, 22vw, 180px)', aspectRatio: '43 / 71' }}
      animate={complete && !reduce ? { scale: [1, 1.06, 1] } : { scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: FLAME.x,
          top: FLAME.y,
          background: `radial-gradient(circle, ${LOADER_COLORS.flameGlow} 0%, transparent 65%)`,
        }}
        initial={{ opacity: 0 }}
        animate={
          complete
            ? reduce
              ? { opacity: 0.8 }
              : { opacity: [0.5, 1, 0.6, 0.95], transition: { duration: 1.6, repeat: Infinity, repeatType: 'mirror' } }
            : { opacity: 0 }
        }
      />

      {}
      {complete && !reduce && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-leaf/70"
          initial={{ opacity: 0.7, scale: 0.6 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
      )}

      <svg viewBox={LOGO_VIEWBOX} className="relative block h-full w-full overflow-visible" aria-hidden="true">
        <defs>
          {}
          <clipPath id={fillId}>
            <motion.rect
              x={-2}
              y={0}
              width={47}
              height={FILL_BOTTOM}
              style={{ scaleY: reduce ? 1 : progress, originY: 1, transformBox: 'fill-box' }}
            />
          </clipPath>
          {}
          <clipPath id={shapeId}>
            {LOGO_PATHS.map((p, i) => (
              <path key={i} d={p.d} />
            ))}
          </clipPath>
        </defs>

        {}
        <g opacity={0.35}>
          {LOGO_PATHS.map((p, i) => (
            <path key={i} d={p.d} fill={grays[i]} />
          ))}
        </g>

        {}
        <motion.g clipPath={`url(#${fillId})`} style={{ opacity: colorOpacity }}>
          {LOGO_PATHS.map((p, i) => (
            <path key={i} d={p.d} fill={p.fill} />
          ))}
        </motion.g>

        {}
        {!reduce && (
          <g clipPath={`url(#${shapeId})`}>
            <motion.g style={{ y: lineY }} animate={{ opacity: complete ? 0 : 1 }} transition={{ duration: 0.4 }}>
              <rect x={0} y={-1.6} width={43} height={3.2} fill={LOADER_COLORS.fillLine} opacity={0.35} />
              <rect x={0} y={-0.45} width={43} height={0.9} fill={LOADER_COLORS.fillLine} />
            </motion.g>
          </g>
        )}
      </svg>

      {}
      {complete && !reduce && (
        <div aria-hidden="true" className="pointer-events-none absolute" style={{ left: FLAME.x, top: '8%' }}>
          {sparks.map((s, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{ width: s.size, height: s.size, background: LOADER_COLORS.spark, left: -s.size / 2, top: 0 }}
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], x: s.dx, y: -s.rise }}
              transition={{ duration: SPARKS.duration, delay: s.delay, ease: 'easeOut' }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}
