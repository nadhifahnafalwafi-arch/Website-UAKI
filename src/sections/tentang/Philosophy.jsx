import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { Sparkle } from 'lucide-react'
import Container from '@/components/Container'
import DotGrid from '@/components/DotGrid'
import InteractiveLogo from '@/components/logo/InteractiveLogo'
import { buildPartOfPath } from '@/components/logo/logoParts'
import { CursorGlow, Floating, Loop, MouseParallax, Reveal, TypewriterText } from '@/components/animations'
import { MouseFieldProvider } from '@/lib/MouseFieldContext'
import PhilosophyPoints from '@/sections/tentang/PhilosophyPoints'
import bigCircle from '@/assets/svg/lingkaran-besar.svg'
import { philosophyContent } from '@/lib/content/tentang'
import { CURSOR_EFFECTS, PHILOSOPHY, twinkle, VIEWPORT_AMOUNT } from '@/lib/animations'

const sparkles = [
  { className: 'left-[24%] top-[9%] h-4 w-4 text-cream', delay: 0, depth: 0.8, hideSm: true },
  { className: 'right-[14%] top-[16%] h-3 w-3 text-leaf', delay: 0.9, depth: -0.6, hideSm: false },
  { className: 'left-[44%] bottom-[10%] h-3.5 w-3.5 text-cream', delay: 1.7, depth: 0.6, hideSm: true },
].map((s) => ({ ...s, anim: twinkle(s.delay) }))

export default function Philosophy() {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const reduce = useReducedMotion()
  const { title, subtitle, cardLabel, points } = philosophyContent
  const partOfPath = useMemo(() => buildPartOfPath(points), [points])

  const [userPart, setUserPart] = useState(null)
  const [demoPart, setDemoPart] = useState(null)
  const activePart = userPart ?? demoPart

  const interacted = useRef(false)
  const demoTimers = useRef([])
  const pointerType = useRef('mouse')
  const lastPointerAt = useRef(0)

  const stopDemo = useCallback(() => {
    demoTimers.current.forEach(clearTimeout)
    demoTimers.current = []
    setDemoPart(null)
  }, [])

  const markInteracted = useCallback(() => {
    if (interacted.current) return
    interacted.current = true
    stopDemo()
  }, [stopDemo])

  const controller = useMemo(
    () => ({
      pointerType,
      hover: (part) => {
        markInteracted()
        setUserPart(part)
      },
      leave: () => setUserPart(null),
      toggle: (part) => {
        markInteracted()
        setUserPart((cur) => (cur === part ? null : part))
      },
      focus: (part) => {
        if (performance.now() - lastPointerAt.current < 600) return
        markInteracted()
        setUserPart(part)
      },
      blur: (e) => {
        if (e.relatedTarget?.closest?.('[data-philosophy-part]')) return
        setUserPart(null)
      },
    }),
    [markInteracted],
  )
  const cardInView = useInView(cardRef, { once: true, amount: 0.6 })
  useEffect(() => {
    if (!cardInView || reduce || !PHILOSOPHY.demo || interacted.current) return undefined
    const step = PHILOSOPHY.demoStep * 1000
    const start = 700 
    demoTimers.current = [0, 1, 2, null].map((part, k) => setTimeout(() => setDemoPart(part), start + k * step))
    return () => demoTimers.current.forEach(clearTimeout)
  }, [cardInView, reduce])

  return (
    <section
      ref={sectionRef}
      id="filosofi-logo"
      aria-labelledby="filosofi-title"
      className="relative isolate overflow-hidden bg-brand py-section lg:py-section-lg"
      onPointerDownCapture={() => {
        lastPointerAt.current = performance.now()
      }}
    >
      <MouseFieldProvider targetRef={sectionRef}>
        <CursorGlow tone="dark" />

        {}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {}
          <MouseParallax
            depth={-0.5}
            className="absolute -left-[120px] -top-[130px] w-[230px] sm:-left-[150px] sm:-top-[150px] sm:w-[322px]"
          >
            <Floating>
              <img src={bigCircle} alt="" className="w-full -scale-x-100" draggable={false} />
            </Floating>
          </MouseParallax>
          {}
          <MouseParallax
            depth={0.5}
            className="absolute -bottom-[110px] -right-[130px] w-[230px] sm:-bottom-[135px] sm:-right-[143px] sm:w-[322px]"
          >
            <Floating>
              <img src={bigCircle} alt="" className="w-full" draggable={false} />
            </Floating>
          </MouseParallax>

          {}
          <MouseParallax depth={0.4} className="absolute right-[5%] top-10 hidden sm:block">
            <DotGrid className="h-14 w-20 text-cream/15" />
          </MouseParallax>

          {}
          <MouseParallax depth={0.7} className="absolute right-[9%] top-[46%] hidden md:block">
            <div className="h-16 w-16 rounded-full border border-cream/15" />
          </MouseParallax>
          <MouseParallax depth={-0.7} className="absolute bottom-[14%] left-[3%] hidden sm:block">
            <div className="h-10 w-10 rounded-full border border-leaf/30" />
          </MouseParallax>
          <MouseParallax depth={0.9} className="absolute left-[40%] top-[22%] hidden lg:block">
            <div className="h-2.5 w-2.5 rounded-full bg-leaf/40" />
          </MouseParallax>
          <MouseParallax depth={-0.5} className="absolute bottom-[22%] right-[30%] hidden lg:block">
            <div className="h-2 w-2 rounded-full bg-cream/25" />
          </MouseParallax>

          {sparkles.map(({ className, anim, depth, hideSm }) => (
            <MouseParallax
              key={className}
              depth={depth}
              className={`absolute ${className} ${hideSm ? 'hidden sm:block' : ''}`}
            >
              <Loop as="span" className="block h-full w-full" animation={anim}>
                <Sparkle className="h-full w-full" strokeWidth={1.75} fill="currentColor" />
              </Loop>
            </MouseParallax>
          ))}
        </div>

        <Container>
          {}
          {CURSOR_EFFECTS.typewriter ? (
            <TypewriterText as="h2" id="filosofi-title" text={title} className="text-heading font-bold text-cream" />
          ) : (
            <Reveal as="h2" id="filosofi-title" className="text-heading font-bold text-cream">
              {title}
            </Reveal>
          )}
          <Reveal as="p" variant="fadeIn" delay={0.3} className="mt-3 text-body font-medium text-cream">
            {subtitle}
          </Reveal>

          <div className="mt-title-gap grid items-center gap-12 lg:mt-title-gap-lg lg:grid-cols-philosophy lg:gap-16">
            {}
            <Reveal
              variant="scaleIn"
              amount={VIEWPORT_AMOUNT.large}
              className="relative mx-auto w-[72%] max-w-[382px] sm:w-[58%] lg:mx-0 lg:w-full"
            >
              <div
                ref={cardRef}
                className="flex aspect-[4/5] flex-col items-center justify-center rounded-showcase bg-ivory px-6 pb-8 pt-10 shadow-card-dark"
              >
                <InteractiveLogo
                  points={points}
                  partOfPath={partOfPath}
                  activePart={activePart}
                  controller={controller}
                  className="w-[54%]"
                />
                <p className="mt-6 text-2xl font-bold text-brand">{cardLabel}</p>
              </div>

              {}
              <Loop
                as="span"
                aria-hidden="true"
                className="absolute -right-3 -top-3 block h-6 w-6 text-leaf"
                animation={twinkle(0.4)}
              >
                <Sparkle className="h-full w-full" strokeWidth={1.75} fill="currentColor" />
              </Loop>
              <Loop
                as="span"
                aria-hidden="true"
                className="absolute -bottom-2 -left-2 hidden h-4 w-4 text-cream sm:block"
                animation={twinkle(1.3)}
              >
                <Sparkle className="h-full w-full" strokeWidth={1.75} fill="currentColor" />
              </Loop>
            </Reveal>

            {}
            <PhilosophyPoints points={points} activePart={activePart} controller={controller} />
          </div>
        </Container>
      </MouseFieldProvider>
    </section>
  )
}
