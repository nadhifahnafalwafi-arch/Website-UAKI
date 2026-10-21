import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/Container'
import Button from '@/components/Button'
import { CursorGlow, TypewriterText } from '@/components/animations' 
import { MouseFieldProvider } from '@/lib/MouseFieldContext'
import { useEntrance } from '@/lib/LoaderContext'
import HeroDecorations from '@/sections/home/HeroDecorations'
import HeroPhoto from '@/sections/home/HeroPhoto'
import HeroStats from '@/sections/home/HeroStats'
import { heroContent } from '@/lib/content/home'
import { heroText, fadeUp, CURSOR_EFFECTS } from '@/lib/animations'

export default function Hero() {
  const sectionRef = useRef(null)
  const entrance = useEntrance('visible', 'initial') 
  const { titleLines, description, cta, photoAlt, stats } = heroContent

  return (
    <section ref={sectionRef} aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-cream">
      {}
      <MouseFieldProvider targetRef={sectionRef}>
        {}
        <CursorGlow tone="light" />
        <HeroDecorations sectionRef={sectionRef} />
        <Container className="relative pb-section pt-12 sm:pt-16 lg:pb-section-lg lg:pt-20">
          <div className="grid items-center gap-14 lg:grid-cols-hero lg:gap-16">
            {}
            {}
            <motion.div variants={heroText} initial="initial" animate={entrance}>
              {}
              {CURSOR_EFFECTS.typewriter ? (
                <TypewriterText
                  as="h1"
                  id="hero-title"
                  text={titleLines}
                  delay={0.35}
                  className="text-display font-bold text-brand"
                />
              ) : (
                <h1 id="hero-title" className="text-display font-bold text-brand">
                  {titleLines.map((line) => (
                    <motion.span key={line} variants={fadeUp} className="block">
                      {line}
                    </motion.span>
                  ))}
                </h1>
              )}

              <motion.p variants={fadeUp} className="mt-5 max-w-[540px] text-lead font-medium text-brand">
                {description}
              </motion.p>

              <motion.div variants={fadeUp} className="mt-7">
                <Button to={cta.to} icon={ArrowRight}>
                  {cta.label}
                </Button>
              </motion.div>
            </motion.div>

            {}
            <HeroPhoto alt={photoAlt} />
          </div>

          <HeroStats stats={stats} />
        </Container>
      </MouseFieldProvider>
    </section>
  )
}
