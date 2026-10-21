import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Image as ImageIcon, Loader2, X } from 'lucide-react'
import { getPhotoUrl } from '@/data/gallery'
import { GALLERY_LIGHTBOX } from '@/data/galleryConfig'
import { getAlt, getPhotoCaption } from '@/lib/gallery'


function lockScroll() {
  const html = document.documentElement
  const y = window.scrollY
  const scrollbar = window.innerWidth - html.clientWidth
  const prev = { overflow: html.style.overflow, paddingRight: html.style.paddingRight }
  html.style.overflow = 'hidden'
  if (scrollbar > 0) html.style.paddingRight = `${scrollbar}px`
  return () => {
    html.style.overflow = prev.overflow
    html.style.paddingRight = prev.paddingRight
    window.scrollTo({ top: y, behavior: 'instant' })
  }
}

const FOCUSABLE = 'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'


function LightboxPhoto({ photo }) {
  const src = getPhotoUrl(photo.file)
  const [status, setStatus] = useState(src ? 'loading' : 'error') 
  const imgRef = useRef(null)

  useEffect(() => {
    const img = imgRef.current
    if (img?.complete) setStatus(img.naturalWidth > 0 ? 'loaded' : 'error')
  }, [])

  return (
    <div className="relative h-full w-full">
      {}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-leaf/50 to-sage/70"
      >
        {status === 'loading' ? (
          <Loader2 className="h-8 w-8 text-cream/80 motion-safe:animate-spin" aria-hidden="true" />
        ) : (
          status === 'error' && <ImageIcon className="h-14 w-14 text-cream/50" strokeWidth={1.25} />
        )}
      </div>
      {status !== 'error' && (
        <img
          ref={imgRef}
          src={src}
          alt={getAlt(photo)}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          draggable={false}
        />
      )}
    </div>
  )
}


function RoundButton({ label, onClick, className = '', children, buttonRef }) {
  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`fixed z-[2] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-cream outline-none backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-cream ${className}`}
    >
      {children}
    </button>
  )
}

export default function LightboxGaleri({ photos, index, onIndex, onClose }) {
  const reduce = useReducedMotion()
  const open = index !== null && index >= 0 && index < photos.length
  const photo = open ? photos[index] : null
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const [direction, setDirection] = useState(0) 
  const lastIndex = useRef(index)
  if (open) lastIndex.current = index

  const hasPrev = open && index > 0
  const hasNext = open && index < photos.length - 1
  const { duration, swipeThreshold } = GALLERY_LIGHTBOX

  const go = useCallback(
    (step) => {
      if (!open) return
      const next = index + step
      if (next < 0 || next >= photos.length) return
      setDirection(step)
      onIndex(next)
    },
    [open, index, photos.length, onIndex],
  )
  const close = useCallback(() => onClose(lastIndex.current), [onClose])

  useEffect(() => {
    if (!open) return undefined
    const unlock = lockScroll()
    const root = document.getElementById('root')
    root?.setAttribute('aria-hidden', 'true')
    if (root) root.inert = true
    requestAnimationFrame(() => closeRef.current?.focus())
    return () => {
      if (root) root.inert = false
      root?.removeAttribute('aria-hidden')
      unlock()
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'Tab') {
        const items = [...(dialogRef.current?.querySelectorAll(FOCUSABLE) ?? [])]
        if (!items.length) return
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        } else if (!dialogRef.current.contains(document.activeElement)) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, go, close])

  useEffect(() => {
    if (!open) return
    ;[photos[index - 1], photos[index + 1]].forEach((p) => {
      const src = p && getPhotoUrl(p.file)
      if (src) {
        const img = new Image()
        img.decoding = 'async'
        img.src = src
      }
    })
  }, [open, index, photos])

  if (typeof document === 'undefined') return null

  const caption = photo ? getPhotoCaption(photo) : ''
  const ratio = photo && photo.width > 0 && photo.height > 0 ? photo.width / photo.height : 1
  const t = reduce ? { duration: 0.15 } : { duration, ease: [0.22, 1, 0.36, 1] }
  const slide = reduce ? 0 : 48

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Foto: ${caption}`}
          className="fixed inset-0 z-[1200]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={t}
        >
          {}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: GALLERY_LIGHTBOX.overlay,
              backdropFilter: `blur(${GALLERY_LIGHTBOX.blur})`,
              WebkitBackdropFilter: `blur(${GALLERY_LIGHTBOX.blur})`,
            }}
          />

          {}
          <p className="sr-only" aria-live="polite">
            Foto {index + 1} dari {photos.length}: {caption}
          </p>

          {}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-4 pb-24 pt-16 sm:px-24 sm:pb-10 sm:pt-16"
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            <motion.div
              className="flex flex-col items-center"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={t}
            >
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.figure
                  key={photo.id}
                  custom={direction}
                  className="m-0 flex flex-col items-center"
                  initial={{ opacity: 0, x: direction * slide }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * slide, transition: { ...t, duration: t.duration * 0.7 } }}
                  transition={t}
                >
                  {}
                  <motion.div
                    className="relative overflow-hidden bg-night shadow-photo [--lb-reserve:14rem] [--lb-side:2rem] sm:[--lb-reserve:10.5rem] sm:[--lb-side:12rem]"
                    style={{
                      aspectRatio: `${photo.width || 1} / ${photo.height || 1}`,
                      width: `min(calc(100vw - var(--lb-side)), calc((100dvh - var(--lb-reserve)) * ${ratio}))`,
                      border: `${GALLERY_LIGHTBOX.frameWidth}px solid #FFFAE2`,
                      borderRadius: GALLERY_LIGHTBOX.frameRadius,
                    }}
                    drag={photos.length > 1 ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.35}
                    dragSnapToOrigin
                    onDragEnd={(_, info) => {
                      const dx = info.offset.x
                      const v = info.velocity.x
                      if (dx < -swipeThreshold || v < -600) go(1)
                      else if (dx > swipeThreshold || v > 600) go(-1)
                    }}
                  >
                    <LightboxPhoto photo={photo} />
                  </motion.div>
                  <figcaption className="mt-4 max-w-[min(90vw,48rem)] text-center text-tagline font-semibold text-cream">
                    {caption}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </motion.div>
          </div>

          {}
          <RoundButton label="Tutup" onClick={close} buttonRef={closeRef} className="right-4 top-4 sm:right-6 sm:top-6">
            <X className="h-6 w-6" aria-hidden="true" />
          </RoundButton>
          {hasPrev && (
            <RoundButton
              label="Foto sebelumnya"
              onClick={() => go(-1)}
              className="bottom-6 left-6 sm:bottom-auto sm:left-6 sm:top-1/2 sm:-translate-y-1/2"
            >
              <ChevronLeft className="h-7 w-7" aria-hidden="true" />
            </RoundButton>
          )}
          {hasNext && (
            <RoundButton
              label="Foto berikutnya"
              onClick={() => go(1)}
              className="bottom-6 right-6 sm:bottom-auto sm:right-6 sm:top-1/2 sm:-translate-y-1/2"
            >
              <ChevronRight className="h-7 w-7" aria-hidden="true" />
            </RoundButton>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
