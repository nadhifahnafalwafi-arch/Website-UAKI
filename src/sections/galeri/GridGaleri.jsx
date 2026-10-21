import { memo, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Image as ImageIcon, RotateCcw, SearchX } from 'lucide-react'
import Container from '@/components/Container'
import PhotoWithFallback from '@/components/PhotoWithFallback'
import { getPhotoUrl } from '@/data/gallery'
import { GALLERY_GRID } from '@/data/galleryConfig'
import { getAlt, getPhotoCaption } from '@/lib/gallery'
import { transitions } from '@/lib/animations'

const hexToRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
const [TONE_A, TONE_B] = GALLERY_GRID.tones.map(hexToRgb)

function toneFor(id) {
  let h = 0x811c9dc5
  for (let i = 0; i < id.length; i += 1) h = Math.imul(h ^ id.charCodeAt(i), 0x01000193)
  h ^= h >>> 16
  h = Math.imul(h, 0x45d9f3b)
  h ^= h >>> 16
  const t = (h >>> 0) / 4294967295
  const [r, g, b] = TONE_A.map((a, i) => Math.round(a + (TONE_B[i] - a) * t))
  return `rgb(${r}, ${g}, ${b})`
}

function PhotoPlaceholder({ id }) {
  return (
    <div className="flex h-full w-full items-center justify-center" style={{ background: toneFor(id) }}>
      <ImageIcon className="h-8 w-8 text-white/45" strokeWidth={1.5} aria-hidden="true" />
    </div>
  )
}

const pickCols = (viewportW) => GALLERY_GRID.columns.find((c) => viewportW >= c.minWidth)?.cols ?? 2

function distribute(items, cols, colWidth, gap) {
  const columns = Array.from({ length: cols }, () => [])
  const heights = new Array(cols).fill(0)
  items.forEach((photo, i) => {
    const ratio = photo.width > 0 && photo.height > 0 ? photo.width / photo.height : 1
    let target = 0
    for (let c = 1; c < cols; c += 1) if (heights[c] < heights[target] - 0.5) target = c
    columns[target].push({ photo, i })
    heights[target] += colWidth / ratio + gap
  })
  return columns
}

const GridItem = memo(function GridItem({ photo, index, order, eager, onOpen }) {
  const reduce = useReducedMotion()
  const caption = getPhotoCaption(photo)
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`Buka foto: ${caption}`}
      data-photo-index={index} 
      className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl outline-none focus-visible:ring-4 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-mist"
      style={{ aspectRatio: `${photo.width || 1} / ${photo.height || 1}` }}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: reduce ? 0 : Math.min(order * 0.035, 0.45) }}
      whileHover={reduce ? undefined : 'hover'}
      whileTap={reduce ? undefined : { scale: 0.98 }}
    >
      <motion.div
        className="h-full w-full"
        variants={{ hover: { scale: 1.04 } }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <PhotoWithFallback
          src={getPhotoUrl(photo.file)}
          alt={getAlt(photo)}
          eager={eager}
          width={photo.width}
          height={photo.height}
          className="h-full w-full"
          placeholder={<PhotoPlaceholder id={photo.id} />}
        />
      </motion.div>
      {}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/15"
        initial={{ opacity: 0 }}
        variants={{ hover: { opacity: 1 } }}
        transition={transitions.fast}
      />
    </motion.button>
  )
})

function EmptyState({ query, dataEmpty, onReset }) {
  if (dataEmpty) {
    return <p className="py-16 text-center text-tagline font-semibold text-brand">Foto akan segera hadir.</p>
  }
  return (
    <div className="flex flex-col items-center py-14 text-center">
      <SearchX className="h-12 w-12 text-leaf" strokeWidth={1.5} aria-hidden="true" />
      <p className="mt-4 text-tagline font-bold text-brand">
        {query ? <>Tidak ada foto untuk &ldquo;{query}&rdquo;</> : 'Tidak ada foto yang cocok'}
      </p>
      <p className="mt-2 text-body-sm font-medium text-brand/70">
        Coba nama departemen atau nama program kerja yang lain.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg border border-leaf/60 bg-white px-5 text-nav font-semibold text-brand outline-none hover:bg-white/70 focus-visible:ring-2 focus-visible:ring-brand"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Reset pencarian
      </button>
    </div>
  )
}

export default function GridGaleri({ items, startIndex, onOpen, animKey, query, dataEmpty, onReset }) {
  const reduce = useReducedMotion()
  const wrapRef = useRef(null)
  const [layout, setLayout] = useState(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1280
    return {
      width: 0,
      cols: pickCols(w),
      gap: w < GALLERY_GRID.mobileBelow ? GALLERY_GRID.gapMobile : GALLERY_GRID.gap,
    }
  })

  useLayoutEffect(() => {
    const el = wrapRef.current
    if (!el) return undefined
    const measure = () => {
      const vw = window.innerWidth
      const next = {
        width: el.clientWidth,
        cols: pickCols(vw),
        gap: vw < GALLERY_GRID.mobileBelow ? GALLERY_GRID.gapMobile : GALLERY_GRID.gap,
      }
      setLayout((prev) => (prev.width === next.width && prev.cols === next.cols && prev.gap === next.gap ? prev : next))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const { width, cols, gap } = layout
  const colWidth = width > 0 ? (width - gap * (cols - 1)) / cols : 0
  const columns = useMemo(() => distribute(items, cols, colWidth || 1, gap), [items, cols, colWidth, gap])

  return (
    <section aria-label="Foto kegiatan" className="bg-mist pb-10">
      <Container>
        <div ref={wrapRef}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={animKey}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {items.length === 0 ? (
                <EmptyState query={query} dataEmpty={dataEmpty} onReset={onReset} />
              ) : (
                <div className="flex items-start" style={{ gap }}>
                  {columns.map((col, c) => (
                    <div key={c} className="flex min-w-0 flex-1 flex-col" style={{ gap }}>
                      {col.map(({ photo, i }) => (
                        <GridItem
                          key={photo.id}
                          photo={photo}
                          index={startIndex + i}
                          order={i}
                          eager={i < GALLERY_GRID.eager}
                          onOpen={onOpen}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}
