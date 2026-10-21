import { useRef } from 'react' 
import { Sparkle } from 'lucide-react'
import Container from '@/components/Container'
import SectionTitle from '@/components/SectionTitle'
import { CursorGlow, Loop, MouseParallax, Reveal } from '@/components/animations' 
import { MouseFieldProvider } from '@/lib/MouseFieldContext'
import DepartmentCarousel from './DepartmentCarousel'
import { departments } from '@/data/departments'
import { departmentsContent } from '@/lib/content/tentang'
import { twinkle, VIEWPORT_AMOUNT } from '@/lib/animations'

export const DEPARTMENTS_SECTION_ID = 'departemen'

const sparkles = [
  { className: 'left-[8%] top-[14%] h-4 w-4 opacity-50', delay: 0, depth: 0.8, hideSm: false },
  { className: 'right-[12%] top-[10%] h-3 w-3 opacity-40', delay: 1, depth: -0.7, hideSm: true },
  { className: 'right-[5%] bottom-[16%] h-3.5 w-3.5 opacity-50', delay: 1.8, depth: 0.6, hideSm: false },
  { className: 'left-[30%] bottom-[6%] h-3 w-3 opacity-40', delay: 2.4, depth: -0.5, hideSm: true },
].map((s) => ({ ...s, anim: twinkle(s.delay) }))

export default function DepartmentsSection() {
  const sectionRef = useRef(null)
  const { title, regionLabel, prevLabel, nextLabel } = departmentsContent

  return (
    <section
      ref={sectionRef}
      id={DEPARTMENTS_SECTION_ID}
      role="region"
      aria-label={regionLabel}
      className="relative isolate overflow-hidden bg-cream py-section lg:py-section-lg"
    >
      <MouseFieldProvider targetRef={sectionRef}>
        <CursorGlow tone="light" />

        {}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {}
          {sparkles.map(({ className, anim, depth, hideSm }) => (
            <MouseParallax
              key={className}
              depth={depth}
              className={`absolute text-leaf ${className} ${hideSm ? 'hidden sm:block' : ''}`}
            >
              <Loop as="span" className="block h-full w-full" animation={anim}>
                <Sparkle className="h-full w-full" strokeWidth={1.75} fill="currentColor" />
              </Loop>
            </MouseParallax>
          ))}
        </div>

        <Container>
          <SectionTitle>{title}</SectionTitle>
        </Container>

        {}
        <Reveal variant="fadeUp" amount={VIEWPORT_AMOUNT.large} className="mt-title-gap w-full lg:mt-title-gap-lg">
          <DepartmentCarousel items={departments} prevLabel={prevLabel} nextLabel={nextLabel} />
        </Reveal>
      </MouseFieldProvider>
    </section>
  )
}
