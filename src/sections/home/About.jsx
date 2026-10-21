import { useRef } from 'react' 
import Container from '@/components/Container'
import SectionTitle from '@/components/SectionTitle'
import { CursorGlow, Reveal, Stagger, StaggerItem } from '@/components/animations'
import { MouseFieldProvider } from '@/lib/MouseFieldContext'
import { VIEWPORT_AMOUNT } from '@/lib/animations' 
import LogoShowcase from '@/sections/home/LogoShowcase'
import { aboutContent } from '@/lib/content/home'

export default function About() {
  const { title, subtitle, body, logoLabel, logoHint } = aboutContent
  const sectionRef = useRef(null) 

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-title"
      className="relative isolate overflow-hidden bg-ivory py-section lg:py-section-lg"
    >
      <MouseFieldProvider targetRef={sectionRef}>
        {}
        <CursorGlow tone="light" />
        <Container>
          <SectionTitle id="about-title">{title}</SectionTitle>

          <div className="mt-title-gap grid items-center gap-12 lg:mt-title-gap-lg lg:grid-cols-about lg:gap-20">
            {}
            <Reveal variant="slideLeft" delay={0.1} amount={VIEWPORT_AMOUNT.large}>
              <LogoShowcase label={logoLabel} hint={logoHint} />
            </Reveal>

            <Stagger stagger={0.15} delayChildren={0.2} className="mx-auto max-w-[640px] lg:mx-0">
              <StaggerItem as="h3" variant="slideRight" className="text-subheading font-bold text-brand">
                {subtitle}
              </StaggerItem>
              {}
              <StaggerItem as="p" variant="fadeIn" className="mt-4 text-body font-medium text-brand">
                {body}
              </StaggerItem>
            </Stagger>
          </div>
        </Container>
      </MouseFieldProvider>
    </section>
  )
}
