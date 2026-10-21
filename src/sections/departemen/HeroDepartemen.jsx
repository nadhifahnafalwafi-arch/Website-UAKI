import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronRight, Sparkle } from 'lucide-react'
import Container from '@/components/Container'
import Button from '@/components/Button'
import DotGrid from '@/components/DotGrid'
import {
  CursorGlow,
  Floating,
  Loop,
  MouseParallax,
  Stagger,
  StaggerItem,
  TypewriterText,
} from '@/components/animations'
import { MouseFieldProvider } from '@/lib/MouseFieldContext'
import BackToDepartments from './BackToDepartments'
import HeroWave from './HeroWave'
import { PROKER_SECTION_ID } from './ProgramKerja'
import { handleSectionLinkClick } from '@/lib/scrollToSection'
import { departmentDetailUi } from '@/lib/content/departemen'
import { DEPT_HERO, twinkle } from '@/lib/animations'
import photo from '@/assets/img/hero-foto-bersama.jpg'

const sparkles = [
  { className: 'right-[30%] top-[16%] h-4 w-4', delay: 0, depth: 0.9 },
  { className: 'right-[12%] top-[46%] h-3 w-3', delay: 1.2, depth: -0.7 },
  { className: 'right-[22%] top-[8%] hidden h-2.5 w-2.5 sm:block', delay: 2, depth: 0.6 },
].map((s) => ({ ...s, anim: twinkle(s.delay) }))

export default function HeroDepartemen({ dept, hasProker }) {
  const sectionRef = useRef(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 70])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="departemen-title"
      className="relative isolate z-[1] -mb-px flex flex-col overflow-hidden bg-moss text-cream"
      style={{
        minHeight: `clamp(${DEPT_HERO.minHeight}px, ${DEPT_HERO.heightVh}vh, ${DEPT_HERO.maxHeight}px)`,
        '--wave-h': DEPT_HERO.waveHeight,
      }}
    >
      <MouseFieldProvider targetRef={sectionRef}>
        {}
        <motion.div aria-hidden="true" className="absolute -inset-[6%] -z-20" style={{ y: photoY }}>
          <MouseParallax depth={-0.35} className="h-full w-full">
            <Loop className="h-full w-full" animation={DEPT_HERO.photoZoom}>
              <img
                src={photo}
                alt=""
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover"
                draggable={false}
              />
            </Loop>
          </MouseParallax>
        </motion.div>

        {}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-brand/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-moss/80 via-moss/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-moss/75 via-transparent to-transparent" />
        </div>

        <CursorGlow tone="dark" />

        {}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <MouseParallax
            depth={-0.5}
            className="absolute -right-[22%] -top-[30%] aspect-square w-[78vw] sm:-right-[12%] sm:-top-[38%] sm:w-[52vw] lg:w-[min(46vw,620px)]"
          >
            <Floating className="h-full w-full">
              <div className="h-full w-full rounded-full bg-leaf/25" />
            </Floating>
          </MouseParallax>
          <MouseParallax depth={0.5} className="absolute right-[6%] top-[22%] hidden md:block">
            <DotGrid className="h-14 w-20 text-cream/20" />
          </MouseParallax>
          {sparkles.map(({ className, anim, depth }) => (
            <MouseParallax key={className} depth={depth} className={`absolute ${className}`}>
              <Loop as="span" className="block h-full w-full text-cream/70" animation={anim}>
                <Sparkle className="h-full w-full" strokeWidth={1.75} fill="currentColor" />
              </Loop>
            </MouseParallax>
          ))}
        </div>

        {}
        <Container className="relative flex flex-1 flex-col pt-6 sm:pt-8">
          <div>
            <BackToDepartments />
          </div>

          {}
          <div className="mt-auto pt-12" style={{ paddingBottom: 'calc(var(--wave-h) + 2rem)' }}>
            <TypewriterText
              as="h1"
              id="departemen-title"
              text={dept.fullName}
              delay={0.25}
              className="max-w-[15ch] text-hero-dept font-bold text-cream sm:max-w-[18ch]"
            />

            <Stagger stagger={0.12} delayChildren={0.35}>
              <StaggerItem as="p" className="mt-4 max-w-[680px] text-tagline font-medium text-cream/90">
                {departmentDetailUi.tagline}
              </StaggerItem>

              {hasProker && (
                <StaggerItem className="mt-6">
                  {}
                  <motion.div className="relative inline-flex" whileHover="hover">
                    <motion.span
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-2 rounded-xl bg-leaf/45 blur-md"
                      initial={{ opacity: 0 }}
                      variants={{ hover: { opacity: reduce ? 0 : 1 } }}
                      transition={{ duration: 0.3 }}
                    />
                    <Button
                      href={`#${PROKER_SECTION_ID}`}
                      onClick={handleSectionLinkClick}
                      variant="solid"
                      icon={ChevronRight}
                      className="relative border border-cream/30"
                    >
                      {departmentDetailUi.prokerButton}
                    </Button>
                  </motion.div>
                </StaggerItem>
              )}
            </Stagger>
          </div>
        </Container>

        <HeroWave />
      </MouseFieldProvider>
    </section>
  )
}
