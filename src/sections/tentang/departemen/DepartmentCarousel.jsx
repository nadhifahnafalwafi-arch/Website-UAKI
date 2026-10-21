import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Stagger, StaggerItem } from '@/components/animations' 
import DepartmentColumn from './DepartmentColumn'
import { DEPARTMENT_CAROUSEL, DEPARTMENT_LINES, easeOut, fadedLine, transitions } from '@/lib/animations' 

const pickLayout = (viewportW) => DEPARTMENT_CAROUSEL.columns.find((c) => viewportW >= c.minWidth)

function ArrowButton({ dir, disabled, onClick, label, top }) {
  const reduce = useReducedMotion()
  const Icon = dir === 'prev' ? ChevronLeft : ChevronRight
  return (
    <motion.button
      type="button"
      aria-label={label}
      aria-disabled={disabled}
      onClick={() => !disabled && onClick()}
      className={`absolute z-20 flex h-11 w-11 items-center justify-center rounded-full bg-leaf text-moss shadow-lift outline-none focus-visible:ring-2 focus-visible:ring-cream ${
        dir === 'prev' ? 'left-4 sm:left-5 lg:left-6' : 'right-4 sm:right-5 lg:right-6' 
      } ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
      style={{ top, y: '-50%' }} 
      initial={false}
      animate={{ opacity: disabled ? 0.4 : 1 }}
      whileHover={disabled || reduce ? undefined : 'hover'}
      whileTap={disabled || reduce ? undefined : { scale: 0.92 }}
      variants={{ hover: { scale: 1.1 } }}
      transition={transitions.spring}
    >
      {}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-white/25"
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
      />
      <motion.span
        className="relative flex"
        variants={{ hover: { x: dir === 'prev' ? -2 : 2 } }}
        transition={transitions.spring}
      >
        <Icon className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
      </motion.span>
    </motion.button>
  )
}

export default function DepartmentCarousel({ items, prevLabel, nextLabel }) {
  const reduce = useReducedMotion()
  const viewportRef = useRef(null)
  const instant = useRef(true)
  const [layout, setLayout] = useState({ cardW: 0, cols: 1, peek: 0 })
  const [page, setPage] = useState(0)
  const layoutRef = useRef(layout)
  const pageRef = useRef(page)
  layoutRef.current = layout
  pageRef.current = page

  const total = items.length
  const { cardW, cols, peek } = layout
  const colW = cardW ? (peek ? cardW * (1 - peek) : cardW / cols) : 0
  const maxStart = Math.max(0, total - cols)
  const pageCount = Math.floor((maxStart + cols - 1) / cols) + 1
  const start = Math.min(page * cols, maxStart)
  const maxOffset = Math.max(0, total * colW - cardW)
  const offset = Math.min(start * colW, maxOffset)

  useLayoutEffect(() => {
    const el = viewportRef.current
    if (!el) return undefined
    const measure = () => {
      const rule = pickLayout(window.innerWidth)
      const next = { cardW: el.clientWidth, cols: rule.cols, peek: rule.peek ?? 0 }
      const prev = layoutRef.current
      if (prev.cardW === next.cardW && prev.cols === next.cols && prev.peek === next.peek) return
      instant.current = true 
      const firstVisible = Math.min(pageRef.current * prev.cols, Math.max(0, total - prev.cols))
      const nextMax = Math.max(0, total - next.cols)
      const nextPages = Math.floor((nextMax + next.cols - 1) / next.cols) + 1
      setLayout(next)
      setPage(Math.min(Math.floor(firstVisible / next.cols), nextPages - 1))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [total])

  const [litIndex, setLitIndex] = useState(null)
  const onHighlight = useCallback((i, on) => setLitIndex((cur) => (on ? i : cur === i ? null : cur)), [])
  const { divider, frame } = DEPARTMENT_LINES
  const dividerW = cardW && cardW < divider.mobileBelow ? divider.widthMobile : divider.width
  const dividerBase = fadedLine('to bottom', divider.color, divider.fadeEnd)
  const dividerLit = fadedLine('to bottom', divider.hoverColor, divider.fadeEnd)

  const go = useCallback(
    (p) => {
      instant.current = false
      setPage(Math.max(0, Math.min(pageCount - 1, p)))
    },
    [pageCount],
  )

  const isInView = useCallback(
    (i) => colW > 0 && i * colW >= offset - 1 && (i + 1) * colW <= offset + cardW + 1,
    [colW, offset, cardW],
  )

  const slideTransition = useMemo(
    () =>
      instant.current || reduce ? { duration: 0 } : { duration: DEPARTMENT_CAROUSEL.slideDuration, ease: easeOut },
    [offset, cardW, reduce],
  )

  const photoH = `min(${((colW * 4) / 3).toFixed(2)}px, ${DEPARTMENT_CAROUSEL.photoMaxVh}vh)`

  return (
    <div>
      {}
      <div className="relative w-full overflow-hidden bg-moss" ref={viewportRef} data-carousel-viewport>
        {}
        <motion.div
          className="relative flex w-max"
          initial={false}
          animate={{ x: -offset }}
          transition={slideTransition}
        >
          {}
          <Stagger className="relative flex" stagger={0.08} amount={0}>
            {' '}
            {}
            {items.map((dept, i) => (
              <DepartmentColumn
                key={dept.slug}
                dept={dept}
                width={colW}
                photoHeight={photoH} 
                inView={isInView(i)}
                eager={i < cols + 1}
                index={i} 
                onHighlight={onHighlight} 
              />
            ))}
            {}
            {colW > 0 && (
              <StaggerItem variant="fadeIn" aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
                {items.slice(1).map((dept, k) => {
                  const boundary = k + 1 
                  const lit = !reduce && litIndex !== null && (boundary === litIndex || boundary === litIndex + 1)
                  return (
                    <span
                      key={dept.slug}
                      className="absolute inset-y-0"
                      style={{ left: boundary * colW - dividerW / 2, width: dividerW }}
                    >
                      <span className="absolute inset-0" style={{ background: dividerBase, filter: divider.shadow }} />
                      <motion.span
                        className="absolute inset-0"
                        style={{ background: dividerLit }}
                        initial={false}
                        animate={{ opacity: lit ? 1 : 0 }}
                        transition={{ duration: divider.hoverFade, ease: 'easeOut' }}
                      />
                    </span>
                  )
                })}
              </StaggerItem>
            )}
          </Stagger>
        </motion.div>

        {}
        {['top-0', 'bottom-0'].map((pos) => (
          <span
            key={pos}
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 ${pos} z-10`}
            style={{ height: frame.height, background: fadedLine('to right', frame.color, frame.fadeSide) }}
          />
        ))}

        {colW > 0 && (
          <>
            <ArrowButton dir="prev" label={prevLabel} disabled={page === 0} onClick={() => go(page - 1)} top={photoH} />
            <ArrowButton
              dir="next"
              label={nextLabel}
              disabled={page >= pageCount - 1}
              onClick={() => go(page + 1)}
              top={photoH}
            />
          </>
        )}
      </div>

      {}
      {pageCount > 1 && (
        <div className="mt-5 flex items-center justify-center" role="group" aria-label="Halaman departemen">
          {Array.from({ length: pageCount }, (_, k) => (
            <button
              key={k}
              type="button"
              aria-label={`Halaman ${k + 1} dari ${pageCount}`}
              aria-current={k === page ? 'true' : undefined}
              onClick={() => go(k)}
              className="group flex h-11 w-7 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <motion.span
                className="block h-2 w-5 rounded-full bg-brand"
                initial={false}
                animate={{ scaleX: k === page ? 1 : 0.4, opacity: k === page ? 1 : 0.3 }}
                transition={{ duration: reduce ? 0 : 0.3 }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
