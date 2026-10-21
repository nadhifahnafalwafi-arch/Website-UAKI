import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { Sparkle } from 'lucide-react'
import LoaderLogo from './LoaderLogo'
import { Loop, TypewriterText } from '@/components/animations'
import { useLoader } from '@/lib/LoaderContext'
import { leafSway, twinkle, floating } from '@/lib/animations'
import {
  CREEP_MAX,
  CREEP_SPEED,
  EXIT_DURATION,
  HOLD_AFTER_COMPLETE,
  LOADER_COLORS,
  MAX_DURATION,
  MIN_DURATION,
  REDUCED,
  getLoaderTasks,
  markLoaderSeen,
} from '@/lib/loaderConfig'
import leaves from '@/assets/img/daun.webp' 

const TAGLINE = 'Bertumbuh dalam iman, bergerak dalam kebersamaan.'
const ease = [0.65, 0, 0.35, 1]

function useLoaderProgress(enabled, minDuration, maxDuration, onComplete, quick = false) {
  const progress = useMotionValue(0)
  const completeRef = useRef(onComplete)
  completeRef.current = onComplete

  useEffect(() => {
    if (!enabled) return undefined
    const tasks = getLoaderTasks()
    let done = 0
    tasks.forEach((t) => {
      Promise.resolve()
        .then(t.run)
        .catch(() => {}) 
        .finally(() => {
          done += 1
        })
    })

    const start = performance.now()
    let last = start
    let creep = 0
    let shown = 0
    let frame = 0
    let finished = false

    const tick = (now) => {
      const elapsed = now - start
      const real = tasks.length ? done / tasks.length : 1
      const forced = elapsed >= maxDuration - (quick ? 0 : 600)
      const dt = (forced || quick ? now - last : Math.min(now - last, 1000 / 60)) / 1000
      last = now
      creep = Math.min(CREEP_MAX, creep + dt * CREEP_SPEED)
      const timeCap = Math.min(1, elapsed / minDuration)
      const target = forced ? 1 : Math.min(Math.max(real, creep), real >= 1 ? timeCap : Math.min(timeCap, 0.99))
      shown += (Math.max(target, shown) - shown) * (1 - Math.exp(-dt * (quick ? 20 : forced ? 8 : 6)))
      if (target >= 1 && 1 - shown < 0.004) shown = 1
      if (elapsed >= maxDuration + 300) shown = 1
      progress.set(shown)
      if (shown >= 1 && !finished) {
        finished = true
        completeRef.current?.()
        return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [enabled, minDuration, maxDuration, progress, quick])

  return progress
}

function ExitWave() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      className="absolute inset-x-0 block w-full"
      style={{ top: 'calc(100% - 1px)', height: 'clamp(48px, 7vw, 110px)' }}
    >
      <path d="M0 0 H1440 V46 C1200 100 960 6 720 46 C480 86 240 12 0 58 Z" fill={LOADER_COLORS.edge} />
    </svg>
  )
}

const STAR_POS = [
  'left-[14%] top-[22%] h-4 w-4',
  'right-[18%] bottom-[26%] h-3.5 w-3.5',
  'left-[22%] bottom-[18%] h-3 w-3',
  'right-[28%] top-[16%] h-3 w-3',
]

function Decorations({ compact }) {
  const stars = compact ? STAR_POS.slice(0, 2) : STAR_POS
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {}
      <Loop
        className="absolute -left-[12%] top-[12%] aspect-square w-[46vw] max-w-[520px]"
        animation={floating.animate}
      >
        <div className="h-full w-full rounded-full bg-leaf/[0.07]" />
      </Loop>
      <Loop
        className="absolute -bottom-[18%] -right-[10%] aspect-square w-[52vw] max-w-[600px]"
        animation={{ y: [0, 10, 0], transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <div className="h-full w-full rounded-full bg-leaf/[0.06]" />
      </Loop>
      {!compact && (
        <Loop
          className="absolute left-[58%] top-[6%] aspect-square w-[16vw] max-w-[200px]"
          animation={floating.animate}
        >
          <div className="h-full w-full rounded-full border border-leaf/20" />
        </Loop>
      )}

      {}
      <motion.div
        className="absolute -right-[60px] -top-[30px] w-[170px] sm:-right-[80px] sm:w-[260px] lg:w-[320px]"
        initial={{ opacity: 0, x: 120, y: -120 }}
        animate={{ opacity: 0.9, x: 0, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <Loop
          as="img"
          src={leaves}
          alt=""
          className="w-full"
          style={{ transformOrigin: '92% 8%' }}
          animation={leafSway.animate}
          draggable={false}
        />
      </motion.div>

      {stars.map((cls, i) => (
        <Loop key={cls} as="span" className={`absolute block text-leaf ${cls}`} animation={twinkle(i * 0.7)}>
          <Sparkle className="h-full w-full" strokeWidth={1.5} fill="currentColor" />
        </Loop>
      ))}
    </div>
  )
}

export default function Loader() {
  const { showLoader, setLoaderDone } = useLoader()
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState(showLoader ? 'loading' : 'gone')
  const [compact] = useState(() => typeof window !== 'undefined' && window.innerWidth < 640)
  const percentRef = useRef(null)
  const barRef = useRef(null)

  const minDuration = reduce ? REDUCED.minDuration : MIN_DURATION
  const maxDuration = reduce ? REDUCED.maxDuration : MAX_DURATION
  const progress = useLoaderProgress(
    phase === 'loading',
    minDuration,
    maxDuration,
    () => setPhase('complete'),
    Boolean(reduce),
  )

  useMotionValueEvent(progress, 'change', (v) => {
    const pct = Math.round(v * 100)
    if (percentRef.current) percentRef.current.textContent = `${pct}%`
    if (barRef.current && barRef.current.getAttribute('aria-valuenow') !== String(pct)) {
      barRef.current.setAttribute('aria-valuenow', String(pct))
    }
  })

  useEffect(() => {
    if (!showLoader) return undefined
    const html = document.documentElement
    const root = document.getElementById('root')
    const prev = { overflow: html.style.overflow, gutter: html.style.scrollbarGutter }
    html.style.scrollbarGutter = 'stable' 
    html.style.overflow = 'hidden'
    if (root) {
      root.inert = true
      root.setAttribute('aria-hidden', 'true')
    }
    return () => {
      html.style.overflow = prev.overflow
      html.style.scrollbarGutter = prev.gutter
      if (root) {
        root.inert = false
        root.removeAttribute('aria-hidden')
      }
    }
  }, [showLoader])

  useEffect(() => {
    if (phase !== 'complete') return undefined
    const t = setTimeout(
      () => {
        markLoaderSeen()
        const root = document.getElementById('root')
        if (root) {
          root.inert = false
          root.removeAttribute('aria-hidden')
        }
        setLoaderDone(true)
        setPhase('exit')
      },
      reduce ? 150 : HOLD_AFTER_COMPLETE,
    )
    return () => clearTimeout(t)
  }, [phase, reduce, setLoaderDone])

  const onExitDone = () => {
    if (phase !== 'exit') return
    setPhase('gone')
    const html = document.documentElement
    html.style.overflow = ''
    html.style.scrollbarGutter = ''
    const main = document.getElementById('konten')
    if (main) {
      if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1')
      main.focus({ preventScroll: true })
    }
  }

  if (phase === 'gone' || typeof document === 'undefined') return null

  const exiting = phase === 'exit'
  const complete = phase === 'complete' || exiting
  const exitDuration = reduce ? REDUCED.exitDuration : EXIT_DURATION

  return createPortal(
    <motion.div
      role="status"
      aria-busy={!complete}
      className="fixed inset-0 z-[3000]"

      variants={{
        shown: { y: 0, opacity: 1 },
        exit: reduce
          ? { opacity: 0, transition: { duration: exitDuration, ease } }
          : { y: '-100%', transition: { duration: exitDuration, ease } },
      }}
      initial={false}
      animate={exiting ? 'exit' : 'shown'}
      onAnimationComplete={(definition) => definition === 'exit' && onExitDone()}
    >
      {}
      <div className="absolute inset-0" style={{ background: LOADER_COLORS.background }} />
      {!reduce && <ExitWave />}
      {!reduce && <Decorations compact={compact} />}

      {}
      <p className="sr-only" aria-live="polite">
        {complete ? 'Website UAKI UB siap.' : 'Memuat website UAKI UB'}
      </p>

      {}
      <motion.div
        className="relative flex h-full flex-col items-center justify-center px-6 text-center"
        animate={exiting ? { opacity: 0, y: reduce ? 0 : -40 } : { opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0.2 : 0.45, ease: 'easeIn' }}
      >
        {}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(90vw,560px)] -translate-x-1/2 -translate-y-[60%] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(166, 180, 101, 0.22) 0%, transparent 65%)' }}
        />

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <LoaderLogo progress={progress} complete={complete} reduce={reduce} compact={compact} />
        </motion.div>

        <motion.p
          className="mt-6 text-2xl font-bold tracking-wide text-cream sm:text-3xl"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.35, ease: 'easeOut' }}
        >
          UAKI UB
        </motion.p>

        <TypewriterText
          as="p"
          text={TAGLINE}
          delay={0.55}
          speed={0.028}
          amount={0}
          waitForLoader={false} 
          className="mt-2 max-w-[22rem] text-body-sm font-medium text-cream/80 sm:max-w-none sm:text-body"
        />

        <motion.div
          className="mt-7 flex w-[clamp(180px,60vw,240px)] flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.75 }}
        >
          <div
            ref={barRef}
            role="progressbar"
            aria-label="Progres memuat website"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={0}
            className="h-1 w-full overflow-hidden rounded-full bg-moss"
          >
            <motion.div className="h-full w-full origin-left rounded-full bg-leaf" style={{ scaleX: progress }} />
          </div>
          <span ref={percentRef} aria-hidden="true" className="text-footer font-semibold tabular-nums text-cream/85">
            0%
          </span>
        </motion.div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}
