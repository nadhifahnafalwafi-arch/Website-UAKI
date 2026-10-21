import { memo, useEffect, useRef, useState } from 'react' 
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Sparkle } from 'lucide-react'
import DotGrid from '@/components/DotGrid'
import { StaggerItem } from '@/components/animations'
import DepartmentPhoto from './DepartmentPhoto'
import DepartmentLogo from './DepartmentLogo'
import { departmentPath } from '@/data/departments'
import { DEPARTMENT_CAROUSEL, DEPARTMENT_LINES, easeOut, fadedLine } from '@/lib/animations' 

const clamp = (min, v, max) => Math.min(max, Math.max(min, v))

function DepartmentColumn({ dept, index, width, photoHeight, inView, eager, onHighlight }) {
  const reduce = useReducedMotion()
  const wrapRef = useRef(null)
  const pointerType = useRef('mouse')
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [tapped, setTapped] = useState(false)
  const active = hovered || focused || tapped

  const highlighted = hovered || focused
  useEffect(() => {
    onHighlight?.(index, highlighted)
  }, [highlighted, index, onHighlight])

  useEffect(() => {
    if (wrapRef.current) wrapRef.current.inert = !inView
    if (!inView) setTapped(false)
  }, [inView])

  const { panelMin, panelMax, panelRatio } = DEPARTMENT_CAROUSEL
  const panelH = `clamp(${panelMin}px, calc(${photoHeight} * ${panelRatio}), ${panelMax}px)`
  const logoH = clamp(48, width * 0.26, 72)
  const nameSize = clamp(14, width * 0.068, 17)
  const inset = clamp(8, width * 0.04, 18)
  const sideSpace = (width - logoH * 1.7) / 2 
  const gridW = Math.min(sideSpace - inset * 2, width * 0.17)
  const showGrid = gridW >= 28
  const dotGap = clamp(8, width * 0.034, 13)
  const sparkSize = clamp(10, width * 0.04, 16)
  const showSpark = sideSpace - inset * 2 >= sparkSize
  const t = { duration: reduce ? 0 : DEPARTMENT_CAROUSEL.logoFade, ease: 'easeOut' }

  return (
    <StaggerItem className="relative shrink-0" style={{ width }}>
      {}

      <motion.div
        ref={wrapRef}
        style={{ originX: 0, originY: 0 }}
        initial={false}
        animate={{ opacity: inView ? 1 : 0.45, scale: inView || reduce ? 1 : 0.97 }}
        transition={{ duration: reduce ? 0 : 0.5, ease: easeOut }}
      >
        <motion.div
          className="relative"
          initial={false}
          animate={active ? 'hover' : 'rest'}
          onPointerDown={(e) => {
            pointerType.current = e.pointerType
          }}
          onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
          onPointerLeave={(e) => e.pointerType === 'mouse' && setHovered(false)}
          onClick={() => pointerType.current !== 'mouse' && setTapped((v) => !v)}
        >
          <DepartmentPhoto dept={dept} height={photoHeight} eager={eager} /> {}
          {}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 z-[5] -translate-y-1/2"
            style={{
              top: photoHeight,
              height: DEPARTMENT_LINES.seam.height,
              background: fadedLine('to right', DEPARTMENT_LINES.seam.color, DEPARTMENT_LINES.seam.fadeSide),
              filter: DEPARTMENT_LINES.seam.glow,
            }}
          />
          {}
          <div
            className="relative flex flex-col items-center justify-center overflow-hidden bg-moss px-3 py-4"
            style={{ height: panelH }}
          >
            {}
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 bg-white/[0.05]"
              variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
              transition={t}
            />
            {}
            {}
            {showGrid && (
              <div
                aria-hidden="true"
                className="absolute"
                style={{ right: inset, top: inset, width: gridW, height: gridW * 0.75 }}
              >
                <DotGrid className="h-full w-full text-cream/[0.07]" gap={dotGap} size={1.3} />
              </div>
            )}
            {showSpark && (
              <Sparkle
                aria-hidden="true"
                className="absolute text-cream/10"
                style={{ left: inset, top: inset + 4, width: sparkSize, height: sparkSize }}
                fill="currentColor"
                strokeWidth={0}
              />
            )}

            {}
            <motion.div whileTap={reduce ? undefined : { scale: 0.97 }} className="relative">
              <Link
                to={departmentPath(dept.slug)}
                aria-label={`Lihat departemen ${dept.fullName}`}
                className="flex min-h-11 flex-col items-center rounded-xl px-2 py-2 text-center outline-none focus-visible:ring-2 focus-visible:ring-leaf"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              >
                <DepartmentLogo dept={dept} active={active} height={logoH} eager={eager} />

                {}
                <span className="relative mt-2 font-bold leading-tight text-cream" style={{ fontSize: nameSize }}>
                  {dept.name}
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 text-leaf"
                    variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                    transition={t}
                  >
                    {dept.name}
                  </motion.span>
                </span>

                {}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </StaggerItem>
  )
}
export default memo(DepartmentColumn)
