import { useId, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Sparkle } from 'lucide-react'
import Container from '@/components/Container'
import DotGrid from '@/components/DotGrid'
import PhotoWithFallback from '@/components/PhotoWithFallback'
import { getKegiatanPosition } from '@/data/kegiatanPhotoPosition' 
import { CursorGlow, Floating, Loop, MouseParallax, Reveal, TypewriterText } from '@/components/animations'
import { MouseFieldProvider } from '@/lib/MouseFieldContext'
import { ABOUT_CENTER_SHADE, ABOUT_EDGE_SHADE, DEPT_ABOUT, twinkle, VIEWPORT_AMOUNT } from '@/lib/animations' 

export const ABOUT_SECTION_ID = 'tentang-departemen'

const FEATHER_MASK =
  'linear-gradient(to right, transparent, #000 15%, #000 85%, transparent), linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)'
const FEATHER_COMPOSITE = { maskComposite: 'intersect', WebkitMaskComposite: 'source-in' }

const FADE_TOP_MASK = `linear-gradient(to bottom, transparent 0, #000 ${DEPT_ABOUT.topFade}px)`

const sparkles = [
  { className: 'left-[12%] top-[18%] h-4 w-4 text-leaf/70', delay: 0, depth: 0.8 },
  { className: 'right-[14%] top-[30%] h-3 w-3 text-cream/50', delay: 1.1, depth: -0.7 },
  { className: 'left-[20%] bottom-[16%] hidden h-3.5 w-3.5 text-cream/40 sm:block', delay: 1.9, depth: 0.6 },
  { className: 'right-[22%] bottom-[10%] hidden h-3 w-3 text-leaf/60 md:block', delay: 2.5, depth: -0.5 },
].map((s) => ({ ...s, anim: twinkle(s.delay) }))

function GradientRing({ className = '' }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A6B465" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#FFFAE2" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#A6B465" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="49"
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="0.6"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

function BigLogo({ dept }) {
  const [ok, setOk] = useState(true)
  const h = DEPT_ABOUT.logoHeight
  return (

    <div className="relative mx-auto flex w-fit items-center justify-center" style={{ height: h }}>
      {}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 aspect-square w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(166, 180, 101, 0.22), transparent)' }}
      />
      {ok ? (
        <img
          src={dept.logoGreen}
          alt={`Logo departemen ${dept.fullName}`}
          loading="lazy"
          decoding="async"
          className="relative h-full w-auto max-w-[80vw] object-contain"
          style={dept.logoScale !== 1 ? { transform: `scale(${dept.logoScale})` } : undefined}
          onError={() => setOk(false)}
          draggable={false}
        />
      ) : (
        <span
          role="img"
          aria-label={`Logo departemen ${dept.fullName}`}
          className="relative flex aspect-square h-full items-center justify-center rounded-full border-2 border-leaf/50 text-3xl font-bold text-leaf"
        >
          {dept.name}
        </span>
      )}
    </div>
  )
}

export default function AboutDepartemen({ dept }) {
  const sectionRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const shift = DEPT_ABOUT.photoParallax
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-shift, shift])

  return (
    <section
      ref={sectionRef}
      id={ABOUT_SECTION_ID}
      aria-labelledby="tentang-departemen-title"
      className="relative isolate overflow-hidden bg-moss pb-section pt-14 sm:pt-16 lg:pb-section-lg lg:pt-20"
    >
      <MouseFieldProvider targetRef={sectionRef}>
        {}
        {}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20"
          style={{ maskImage: FADE_TOP_MASK, WebkitMaskImage: FADE_TOP_MASK }}
        >
          {}
          <motion.div className="absolute inset-x-0" style={{ y: photoY, top: -shift, bottom: -shift }}>
            <PhotoWithFallback
              src={dept.kegiatanPhoto}
              alt=""
              className="h-full w-full"
              imgStyle={{ objectPosition: getKegiatanPosition(dept.slug) }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-moss" style={{ opacity: DEPT_ABOUT.overlayOpacity }} />
          {}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 120% 100% at 50% 50%, transparent 55%, rgba(64, 74, 46, ${ABOUT_EDGE_SHADE}) 100%)`,
            }}
          />
        </div>

        <CursorGlow tone="dark" />

        {}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <MouseParallax depth={-0.5} className="absolute -left-[140px] top-[10%] w-[300px] sm:w-[380px]">
            <Floating>
              <GradientRing className="w-full" />
            </Floating>
          </MouseParallax>
          <MouseParallax depth={0.5} className="absolute -bottom-[120px] -right-[100px] w-[320px] sm:w-[440px]">
            <Floating>
              <GradientRing className="w-full rotate-180" />
            </Floating>
          </MouseParallax>
          <MouseParallax depth={0.4} className="absolute right-[6%] top-10 hidden sm:block">
            <DotGrid className="h-14 w-20 text-cream/10" />
          </MouseParallax>
          <MouseParallax depth={-0.4} className="absolute bottom-10 left-[5%]">
            <DotGrid className="h-12 w-16 text-cream/10" />
          </MouseParallax>
          {sparkles.map(({ className, anim, depth }) => (
            <MouseParallax key={className} depth={depth} className={`absolute ${className}`}>
              <Loop as="span" className="block h-full w-full" animation={anim}>
                <Sparkle className="h-full w-full" strokeWidth={1.75} fill="currentColor" />
              </Loop>
            </MouseParallax>
          ))}
        </div>

        <Container className="relative text-center">
          {}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-6 -inset-y-10 -z-10 bg-moss sm:-inset-x-20 sm:-inset-y-16"
            style={{
              opacity: ABOUT_CENTER_SHADE,
              maskImage: FEATHER_MASK,
              WebkitMaskImage: FEATHER_MASK,
              ...FEATHER_COMPOSITE,
            }}
          />
          {}
          <Reveal variant="scaleIn" amount={VIEWPORT_AMOUNT.small}>
            <Floating>
              <BigLogo dept={dept} />
            </Floating>
          </Reveal>

          <TypewriterText
            as="h2"
            id="tentang-departemen-title"
            text={dept.fullName}
            className="mt-8 text-display font-bold text-leaf [text-shadow:0_1px_3px_rgba(20,24,12,0.45)]" 
          />

          <Reveal
            as="p"
            amount={VIEWPORT_AMOUNT.tall}
            className="mx-auto mt-6 max-w-[960px] text-left text-about-dept font-medium text-cream [text-shadow:0_1px_2px_rgba(20,24,12,0.5)] sm:text-center" // REVISI: + bayangan teks halus
          >
            {dept.about}
          </Reveal>
        </Container>
      </MouseFieldProvider>
    </section>
  )
}
