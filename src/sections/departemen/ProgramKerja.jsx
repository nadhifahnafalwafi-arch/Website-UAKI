import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { BookOpen, Heart, Image as ImageIcon, Leaf, Moon, Pause, Play, Sparkle, Sparkles, Star } from 'lucide-react'
import Container from '@/components/Container'
import DotGrid from '@/components/DotGrid'
import PhotoWithFallback from '@/components/PhotoWithFallback'
import { CursorGlow, Loop, MouseParallax, Reveal, TypewriterText } from '@/components/animations'
import { MouseFieldProvider } from '@/lib/MouseFieldContext'
import { PROKER_MARQUEE, transitions, twinkle, VIEWPORT_AMOUNT } from '@/lib/animations'

export const PROKER_SECTION_ID = 'program-kerja'

const SEPARATOR_ICONS = [Sparkles, Leaf, Star, BookOpen, Heart, Moon]

const separatorStyle = { width: PROKER_MARQUEE.gap }
const cardStyle = { width: PROKER_MARQUEE.cardWidth }
const iconStyle = { width: PROKER_MARQUEE.iconSize, height: PROKER_MARQUEE.iconSize }

function PhotoPlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-leaf/15 to-leaf/25">
      <ImageIcon className="h-1/3 w-1/3 text-brand/25" strokeWidth={1.25} aria-hidden="true" />
    </div>
  )
}

const ProkerCard = memo(function ProkerCard({ item, eager, onHoverChange, onTap }) {
  const reduce = useReducedMotion()
  return (
    <motion.article
      data-proker-card
      className="relative isolate flex shrink-0 flex-col rounded-2xl border border-leaf/30 bg-white p-2 shadow-stat"
      style={cardStyle}
      whileHover={reduce ? undefined : 'hover'}
      variants={{ hover: { y: -6 } }}
      transition={transitions.spring}
      onPointerEnter={(e) => e.pointerType === 'mouse' && onHoverChange?.(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && onHoverChange?.(false)}
      onPointerUp={(e) => e.pointerType !== 'mouse' && onTap?.()}
    >
      {}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-2xl shadow-photo"
        initial={{ opacity: 0 }}
        variants={{ hover: { opacity: 1 } }}
        transition={{ duration: 0.3 }}
      />
      <div className="overflow-hidden rounded-xl">
        <motion.div variants={{ hover: { scale: 1.05 } }} transition={{ duration: 0.6, ease: 'easeOut' }}>
          <PhotoWithFallback
            src={item.photo}
            alt={`Dokumentasi ${item.name}`}
            eager={eager}
            width={660}
            height={825}
            className="aspect-[4/5] w-full"
            placeholder={<PhotoPlaceholder />}
          />
        </motion.div>
      </div>
      <div className="flex flex-1 flex-col px-2 pb-3 pt-3">
        <h3 className="text-[15px] font-bold leading-snug text-brand">{item.name}</h3>
        <p className="mt-1.5 line-clamp-4 text-footer font-medium text-moss/70">{item.description}</p>
      </div>
    </motion.article>
  )
})

function Separator({ index }) {
  const Icon = SEPARATOR_ICONS[index % SEPARATOR_ICONS.length]
  const spin = index % 2 === 0
  return (
    <div aria-hidden="true" className="flex shrink-0 items-center justify-center" style={separatorStyle}>
      <span
        className={`flex text-leaf ${spin ? 'motion-safe:animate-gentle-spin' : 'motion-safe:animate-gentle-pulse'}`}
        style={{ animationDelay: `${-(index * 0.9)}s` }}
      >
        <Icon style={iconStyle} strokeWidth={1.75} />
      </span>
    </div>
  )
}

const ProkerSet = memo(function ProkerSet({ proker, duplicate, setRef, onHoverChange, onTap }) {
  return (
    <div ref={setRef} aria-hidden={duplicate || undefined} className="flex shrink-0 items-stretch">
      {proker.map((item, i) => (
        <div key={i} className="flex shrink-0 items-stretch">
          <ProkerCard item={item} eager={!duplicate && i < 4} onHoverChange={onHoverChange} onTap={onTap} />
          <Separator index={i} />
        </div>
      ))}
    </div>
  )
})

function Marquee({ proker, userPaused }) {
  const viewportRef = useRef(null)
  const firstSetRef = useRef(null)
  const tapTimer = useRef(0)
  const [size, setSize] = useState({ setW: 0, viewW: 0 })
  const [hovered, setHovered] = useState(false)
  const [tapHold, setTapHold] = useState(false)

  useLayoutEffect(() => {
    const view = viewportRef.current
    const set = firstSetRef.current
    if (!view || !set) return undefined
    const measure = () => {
      const next = { setW: set.getBoundingClientRect().width, viewW: view.clientWidth }
      setSize((prev) => (Math.abs(prev.setW - next.setW) < 0.5 && prev.viewW === next.viewW ? prev : next))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(view)
    ro.observe(set)
    return () => ro.disconnect()
  }, [proker])

  useEffect(() => () => clearTimeout(tapTimer.current), [])

  const onTap = useCallback(() => {
    setTapHold(true)
    clearTimeout(tapTimer.current)
    tapTimer.current = setTimeout(() => setTapHold(false), PROKER_MARQUEE.tapHoldMs)
  }, [])

  const copies = size.setW > 0 ? Math.max(2, 1 + Math.ceil(size.viewW / size.setW)) : 2
  const paused = userPaused || hovered || tapHold
  const duration = size.setW > 0 ? size.setW / PROKER_MARQUEE.speed : 0
  const mask = `linear-gradient(to right, transparent 0, #000 ${PROKER_MARQUEE.fadeEdge}, #000 calc(100% - ${PROKER_MARQUEE.fadeEdge}), transparent 100%)`

  return (
    <div ref={viewportRef} className="w-full overflow-hidden py-8" style={{ maskImage: mask, WebkitMaskImage: mask }}>
      <div
        className={`flex w-max items-stretch will-change-transform ${size.setW > 0 ? 'animate-marquee' : ''}`}
        style={{
          '--set-w': `${size.setW}px`,
          '--marquee-duration': `${duration}s`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {Array.from({ length: copies }, (_, k) => (
          <ProkerSet
            key={k}
            proker={proker}
            duplicate={k > 0}
            setRef={k === 0 ? (el) => (firstSetRef.current = el) : undefined}
            onHoverChange={setHovered}
            onTap={onTap}
          />
        ))}
      </div>
    </div>
  )
}

function StaticRow({ proker }) {
  return (
    <Container>
      <div className="-mx-6 flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto px-6 py-8">
        {proker.map((item, i) => (
          <div key={i} className="flex shrink-0 snap-start">
            <ProkerCard item={item} eager={i < 4} />
          </div>
        ))}
      </div>
    </Container>
  )
}

const sparkles = [
  { className: 'right-[18%] top-[14%] h-4 w-4', delay: 0, depth: 0.8 },
  { className: 'right-[8%] top-[34%] hidden h-3 w-3 sm:block', delay: 1.2, depth: -0.6 },
  { className: 'left-[42%] top-[10%] hidden h-3 w-3 md:block', delay: 2, depth: 0.5 },
].map((s) => ({ ...s, anim: twinkle(s.delay) }))


export default function ProgramKerja({ dept, proker }) {
  const sectionRef = useRef(null)
  const reduce = useReducedMotion()
  const [userPaused, setUserPaused] = useState(false)

  return (
    <section
      ref={sectionRef}
      id={PROKER_SECTION_ID}
      aria-labelledby="program-kerja-title"
      className="relative isolate overflow-hidden bg-cream py-section lg:py-section-lg"
    >
      <MouseFieldProvider targetRef={sectionRef}>
        <CursorGlow tone="light" />

        {}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <MouseParallax depth={0.4} className="absolute right-[5%] top-10">
            <DotGrid className="h-14 w-20 text-brand/15" />
          </MouseParallax>
          <MouseParallax depth={-0.4} className="absolute bottom-8 left-[4%] hidden sm:block">
            <DotGrid className="h-12 w-16 text-brand/10" />
          </MouseParallax>
          {sparkles.map(({ className, anim, depth }) => (
            <MouseParallax key={className} depth={depth} className={`absolute text-leaf ${className}`}>
              <Loop as="span" className="block h-full w-full" animation={anim}>
                <Sparkle className="h-full w-full" strokeWidth={1.75} fill="currentColor" />
              </Loop>
            </MouseParallax>
          ))}
        </div>

        {}
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div className="min-w-0">
              <Reveal variant="slideLeft" amount={VIEWPORT_AMOUNT.small}>
                <span aria-hidden="true" className="block h-1.5 w-16 rounded-full bg-leaf" />
              </Reveal>
              <TypewriterText
                as="h2"
                id="program-kerja-title"
                text="Program Kerja"
                className="mt-4 text-display font-bold text-brand"
              />
              <Reveal as="p" delay={0.25} className="mt-2 text-tagline font-semibold text-moss">
                {dept.fullName}
              </Reveal>
            </div>

            {}
            {!reduce && (
              <motion.button
                type="button"
                onClick={() => setUserPaused((v) => !v)}
                aria-label={userPaused ? 'Jalankan deretan program kerja' : 'Hentikan deretan program kerja'}
                aria-pressed={userPaused}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-leaf/60 bg-white/70 text-brand outline-none focus-visible:ring-2 focus-visible:ring-brand"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                transition={transitions.spring}
              >
                {userPaused ? (
                  <Play className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true" />
                ) : (
                  <Pause className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true" />
                )}
              </motion.button>
            )}
          </div>
        </Container>

        {}
        <Reveal amount={0.1} className="mt-6 lg:mt-8">
          {reduce ? <StaticRow proker={proker} /> : <Marquee proker={proker} userPaused={userPaused} />}
        </Reveal>
      </MouseFieldProvider>
    </section>
  )
}
