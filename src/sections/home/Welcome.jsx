import { useRef } from 'react' 
import { Quote, Sparkle } from 'lucide-react'
import Container from '@/components/Container'
import DotGrid from '@/components/DotGrid'
import SectionTitle from '@/components/SectionTitle'
import { CursorGlow, Loop, MouseParallax, Reveal, Stagger, StaggerItem } from '@/components/animations'
import { MouseFieldProvider } from '@/lib/MouseFieldContext' 
import WelcomeCard from '@/sections/home/WelcomeCard'
import ellipse from '@/assets/svg/ellipse-kiri.svg'
import { welcomeContent } from '@/lib/content/home'
import { twinkle, VIEWPORT_AMOUNT } from '@/lib/animations' 

const sparkles = [
  { className: 'left-[8%] top-[14%] h-4 w-4', delay: 0, depth: 1 },
  { className: 'right-[10%] top-[18%] h-5 w-5', delay: 0.8, depth: -0.8 },
  { className: 'right-[6%] bottom-[22%] h-3.5 w-3.5', delay: 1.6, depth: 0.7 },
  { className: 'left-[44%] bottom-[10%] hidden h-3 w-3 lg:block', delay: 2.2, depth: -1 },
].map((s) => ({ ...s, anim: twinkle(s.delay) }))

export default function Welcome() {
  const { title, name, role, photoAlt, paragraphs } = welcomeContent
  const sectionRef = useRef(null) 

  return (
    <section
      ref={sectionRef}
      aria-labelledby="welcome-title"
      className="relative isolate overflow-hidden bg-brand py-section lg:py-section-lg"
    >
      {}
      <MouseFieldProvider targetRef={sectionRef}>
        {}
        <CursorGlow tone="dark" />

        {}
        {}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <MouseParallax depth={-0.6} className="absolute -left-24 -top-24 w-[260px]">
            <img src={ellipse} alt="" className="w-full opacity-80" />
          </MouseParallax>
          <MouseParallax depth={0.5} className="absolute -right-28 top-[45%] w-[300px]">
            <img src={ellipse} alt="" className="w-full opacity-60" />
          </MouseParallax>
          <MouseParallax depth={0.4} className="absolute right-[4%] top-8">
            <DotGrid className="h-14 w-20 text-cream/15" />
          </MouseParallax>
          <MouseParallax depth={-0.4} className="absolute bottom-8 left-[4%] hidden sm:block">
            <DotGrid className="h-14 w-20 text-cream/15" />
          </MouseParallax>
          {sparkles.map(({ className, anim, depth }) => (
            <MouseParallax key={className} depth={depth} className={`absolute ${className}`}>
              <Loop as="span" className="block h-full w-full text-cream" animation={anim}>
                <Sparkle className="h-full w-full" strokeWidth={1.75} fill="currentColor" />
              </Loop>
            </MouseParallax>
          ))}
        </div>

        <Container>
          <SectionTitle id="welcome-title" tone="cream">
            {title}
          </SectionTitle>

          <div className="mt-title-gap grid items-center gap-14 lg:mt-title-gap-lg lg:grid-cols-welcome lg:gap-16">
            <WelcomeCard name={name} role={role} photoAlt={photoAlt} />

            <div className="relative">
              {}
              {}
              <Reveal
                variant="scaleIn"
                amount={VIEWPORT_AMOUNT.small}
                aria-hidden="true"
                className="absolute -left-3 -top-12 text-cream/[0.07] lg:-left-12 lg:-top-14"
              >
                <Quote className="h-24 w-24 lg:h-32 lg:w-32" strokeWidth={0} fill="currentColor" />
              </Reveal>

              {}
              <Stagger
                as="blockquote"
                stagger={0.15}
                delayChildren={0.25}
                amount={VIEWPORT_AMOUNT.tall}
                className="relative max-w-[720px]"
              >
                {paragraphs.map((text) => (
                  <StaggerItem
                    as="p"
                    variant="fadeIn"
                    key={text.slice(0, 24)}
                    className="text-body font-medium text-cream"
                  >
                    {text}
                  </StaggerItem>
                ))}

                {}
                <StaggerItem variant="slideLeft" className="mt-6 flex items-center gap-3" aria-hidden="true">
                  <span className="h-0.5 w-12 rounded-full bg-cream/60" />
                  <span className="h-0.5 w-4 rounded-full bg-cream/30" />
                  <span className="h-1.5 w-1.5 rounded-full bg-cream/30" />
                </StaggerItem>
              </Stagger>
            </div>
          </div>
        </Container>
      </MouseFieldProvider>
    </section>
  )
}
