import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion' 
import { ArrowDown, Sparkle } from 'lucide-react'
import Container from '@/components/Container'
import Button from '@/components/Button'
import DotGrid from '@/components/DotGrid'
import PhotoWithFallback from '@/components/PhotoWithFallback' 
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
import { handleSectionLinkClick } from '@/lib/scrollToSection'
import { galleryHero, GALLERY_EXPLORE_ID } from '@/lib/content/galeri'
import { DEPT_HERO, twinkle } from '@/lib/animations' 
import photo from '@/assets/img/hero-foto-bersama.jpg'

const sparkles = [
  { className: 'right-[34%] top-[18%] h-4 w-4 text-cream/80', delay: 0, depth: 0.9 },
  { className: 'right-[10%] bottom-[22%] h-3 w-3 text-leaf', delay: 1.1, depth: -0.7 },
  { className: 'left-[52%] bottom-[14%] hidden h-3 w-3 text-cream/60 md:block', delay: 2, depth: 0.6 },
].map((s) => ({ ...s, anim: twinkle(s.delay) }))

export default function HeroGaleri() {
  const sectionRef = useRef(null)
  const reduce = useReducedMotion()
  const { title, tagline, description, cta } = galleryHero

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 60])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="galeri-title"
      className="relative isolate overflow-hidden bg-brand pb-16 pt-14 text-cream sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20"
    >
      <MouseFieldProvider targetRef={sectionRef}>
        {}
        <motion.div aria-hidden="true" className="absolute -inset-[6%] -z-20" style={{ y: photoY }}>
          <MouseParallax depth={-0.3} className="h-full w-full">
            <Loop className="h-full w-full" animation={DEPT_HERO.photoZoom}>
              <PhotoWithFallback src={photo} alt="" eager className="h-full w-full" imgClassName="object-cover" />
            </Loop>
          </MouseParallax>
        </motion.div>

        {}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-brand/[0.82]" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand/70 via-brand/30 to-transparent" />
        </div>

        <CursorGlow tone="dark" />

        {}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {}
          <MouseParallax
            depth={-0.5}
            className="absolute -right-[38%] -top-[55%] aspect-square w-[90vw] sm:-right-[22%] sm:-top-[70%] sm:w-[62vw] lg:w-[min(48vw,640px)] lg:-right-[8%] lg:-top-[60%]"
          >
            <Floating className="h-full w-full">
              <div className="h-full w-full rounded-full bg-leaf/[0.18]" />{' '}
              {}
            </Floating>
          </MouseParallax>
          {}
          <MouseParallax depth={0.5} className="absolute -bottom-24 -left-20 hidden sm:block">
            {}
            <div className="h-56 w-56 rounded-full border border-leaf/40" />
          </MouseParallax>
          <MouseParallax depth={0.4} className="absolute right-[6%] top-10 hidden sm:block">
            {}
            <DotGrid className="h-14 w-20 text-cream/20" />
          </MouseParallax>
          {sparkles.map(({ className, anim, depth }) => (
            <MouseParallax key={className} depth={depth} className={`absolute ${className}`}>
              <Loop as="span" className="block h-full w-full" animation={anim}>
                <Sparkle className="h-full w-full" strokeWidth={1.75} fill="currentColor" />
              </Loop>
            </MouseParallax>
          ))}
        </div>

        <Container>
          <TypewriterText
            as="h1"
            id="galeri-title"
            text={title}
            delay={0.2}
            className="text-hero-dept font-bold text-cream"
          />

          <Stagger stagger={0.12} delayChildren={0.35}>
            <StaggerItem as="p" className="mt-4 text-tagline font-bold text-cream">
              {tagline}
            </StaggerItem>
            <StaggerItem as="p" variant="fadeIn" className="mt-3 max-w-[600px] text-body font-medium text-cream/85">
              {description}
            </StaggerItem>
            <StaggerItem className="mt-7">
              {}
              <motion.div className="relative inline-flex" whileHover="hover">
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-2 rounded-xl bg-leaf/40 blur-md"
                  initial={{ opacity: 0 }}
                  variants={{ hover: { opacity: reduce ? 0 : 1 } }}
                  transition={{ duration: 0.3 }}
                />
                <Button
                  href={`#${GALLERY_EXPLORE_ID}`}
                  onClick={handleSectionLinkClick}
                  variant="dark"
                  icon={ArrowDown}
                  iconDirection="down"
                  className="relative ring-1 ring-cream/35" 
                >
                  {cta}
                </Button>
              </motion.div>
            </StaggerItem>
          </Stagger>
        </Container>
      </MouseFieldProvider>
    </section>
  )
}
