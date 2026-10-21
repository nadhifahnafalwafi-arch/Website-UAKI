import { useRef } from 'react'
import { ArrowDown, Sparkle } from 'lucide-react'
import Container from '@/components/Container'
import Button from '@/components/Button'
import { CursorGlow, Loop, MouseParallax, Reveal, Stagger, StaggerItem, TypewriterText } from '@/components/animations'
import { MouseFieldProvider } from '@/lib/MouseFieldContext'
import IntroPhoto from '@/sections/tentang/IntroPhoto'
import organicAccent from '@/assets/svg/aksen-organik.svg'
import { introContent } from '@/lib/content/tentang'
import { handleSectionLinkClick } from '@/lib/scrollToSection' 
import { blobBreath, twinkle, CURSOR_EFFECTS } from '@/lib/animations'

const sparkles = [
  { className: 'left-[46%] top-[14%] hidden h-4 w-4 lg:block', delay: 0, depth: 0.9 },
  { className: 'right-[6%] bottom-[18%] h-3.5 w-3.5', delay: 1.1, depth: -0.7 },
  { className: 'left-[3%] bottom-[12%] h-3 w-3', delay: 2, depth: 0.6 },
].map((s) => ({ ...s, anim: twinkle(s.delay) }))

export default function Intro() {
  const sectionRef = useRef(null)
  const { title, tagline, description, actions, photoAlt, caption } = introContent

  return (
    <section
      ref={sectionRef}
      aria-labelledby="tentang-title"
      className="relative isolate overflow-hidden bg-ivory pb-16 pt-12 sm:pt-14 lg:pb-20 lg:pt-16"
    >
      <MouseFieldProvider targetRef={sectionRef}>
        <CursorGlow tone="light" />

        {}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {}
          <MouseParallax depth={-0.4} className="absolute right-0 top-0 w-[200px] sm:w-[260px] lg:w-[330px]">
            <Loop
              as="img"
              src={organicAccent}
              alt=""
              className="w-full origin-top-right"
              animation={blobBreath.animate}
              draggable={false}
            />
          </MouseParallax>

          {}
          <MouseParallax depth={0.5} className="absolute -bottom-16 -left-16 hidden sm:block">
            <div className="h-44 w-44 rounded-full border-2 border-dashed border-leaf/40" />
          </MouseParallax>

          {sparkles.map(({ className, anim, depth }) => (
            <MouseParallax key={className} depth={depth} className={`absolute ${className}`}>
              <Loop as="span" className="block h-full w-full text-leaf" animation={anim}>
                <Sparkle className="h-full w-full" strokeWidth={1.75} fill="currentColor" />
              </Loop>
            </MouseParallax>
          ))}
        </div>

        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-intro lg:gap-12">
            {}
            <div>
              {CURSOR_EFFECTS.typewriter ? (
                <TypewriterText
                  as="h1"
                  id="tentang-title"
                  text={title}
                  delay={0.25}
                  className="text-display font-bold text-brand"
                />
              ) : (
                <Reveal as="h1" id="tentang-title" className="text-display font-bold text-brand">
                  {title}
                </Reveal>
              )}

              <Stagger stagger={0.12} delayChildren={0.45}>
                <StaggerItem as="p" className="mt-4 text-tagline font-bold text-brand">
                  {tagline}
                </StaggerItem>
                <StaggerItem as="p" variant="fadeIn" className="mt-4 max-w-[600px] text-body font-medium text-brand">
                  {description}
                </StaggerItem>
                <StaggerItem className="mt-7 flex flex-wrap gap-3">
                  {actions.map(({ label, href, variant }) => (
        
                    <Button
                      key={href}
                      href={href}
                      onClick={handleSectionLinkClick}
                      variant={variant}
                      icon={ArrowDown}
                      iconDirection="down"
                    >
                      {label}
                    </Button>
                  ))}
                </StaggerItem>
              </Stagger>
            </div>

            {}
            <IntroPhoto alt={photoAlt} caption={caption} />
          </div>
        </Container>
      </MouseFieldProvider>
    </section>
  )
}
