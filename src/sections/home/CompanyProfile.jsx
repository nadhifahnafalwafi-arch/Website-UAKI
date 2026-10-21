import { useRef } from 'react' 
import { motion } from 'framer-motion'
import { Clapperboard, Sparkle } from 'lucide-react'
import Container from '@/components/Container'
import DotGrid from '@/components/DotGrid'
import VideoEmbed from '@/components/VideoEmbed'
import SectionTitle from '@/components/SectionTitle'
import { CursorGlow, Loop, MouseParallax, Reveal } from '@/components/animations'
import { MouseFieldProvider } from '@/lib/MouseFieldContext' 
import leaves from '@/assets/img/daun.webp'
import { profileContent } from '@/lib/content/home'
import { frameBack, frameFront, popIn, leafSway, twinkle, VIEWPORT_AMOUNT } from '@/lib/animations'

const sparkles = [
  { className: 'left-[7%] top-[22%] h-4 w-4', delay: 0, depth: 1 },
  { className: 'right-[8%] top-[30%] h-5 w-5', delay: 1, depth: -0.8 },
  { className: 'left-[12%] bottom-[34%] hidden h-3 w-3 md:block', delay: 1.8, depth: 0.7 },
].map((s) => ({ ...s, anim: twinkle(s.delay) }))

const swayLeft = leafSway.animate
const swayRight = { ...leafSway.animate, transition: { ...leafSway.animate.transition, delay: 1.5 } }

function CornerLeaves({ side }) {
  const isLeft = side === 'left'
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -bottom-6 hidden w-[220px] sm:block lg:w-[290px] ${
        isLeft ? '-left-[70px] lg:-left-[80px]' : '-right-[70px] lg:-right-[80px]'
      }`}
    >
      {}
      {}
      <MouseParallax depth={isLeft ? 0.6 : -0.6}>
        {}
        <Reveal variant="fadeIn" amount={VIEWPORT_AMOUNT.large} className={isLeft ? 'rotate-180' : '-scale-y-100'}>
          <Loop
            as="img"
            src={leaves}
            alt=""
            loading="lazy"
            className="w-full opacity-90"
            style={{ transformOrigin: '92% 8%' }}
            animation={isLeft ? swayLeft : swayRight}
            draggable={false}
          />
        </Reveal>
      </MouseParallax>
    </div>
  )
}

export default function CompanyProfile() {
  const { title, caption, videoId, fallbackUrl } = profileContent
  const sectionRef = useRef(null) 

  return (
    <section
      ref={sectionRef}
      aria-labelledby="profile-title"
      className="relative isolate overflow-hidden bg-ivory pb-16 pt-section sm:pb-24 lg:pb-32 lg:pt-section-lg"
    >
      {}
      <MouseFieldProvider targetRef={sectionRef}>
        <CursorGlow tone="light" />

        {}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {}
          <MouseParallax depth={0.5} className="absolute left-[5%] top-10">
            <DotGrid className="h-14 w-20 text-brand/15" />
          </MouseParallax>
          <MouseParallax depth={-0.5} className="absolute right-[5%] top-[45%] hidden md:block">
            <DotGrid className="h-20 w-14 text-brand/15" />
          </MouseParallax>
          {sparkles.map(({ className, anim, depth }) => (
            <MouseParallax key={className} depth={depth} className={`absolute ${className}`}>
              <Loop as="span" className="block h-full w-full text-leaf" animation={anim}>
                <Sparkle className="h-full w-full" strokeWidth={1.75} fill="currentColor" />
              </Loop>
            </MouseParallax>
          ))}
          {}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-leaf/15" />
        </div>
        <CornerLeaves side="left" />
        <CornerLeaves side="right" />

        <Container>
          <SectionTitle id="profile-title">{title}</SectionTitle>

          {}
          <Reveal
            as="figure"
            variant="scaleIn"
            amount={VIEWPORT_AMOUNT.large}
            className="relative mx-auto mt-title-gap max-w-[860px] lg:mt-title-gap-lg"
          >
            <div className="relative">
              {}
              <motion.div
                aria-hidden="true"
                className="absolute -bottom-3 -left-3 right-3 top-3 rounded-2xl bg-leaf/25 sm:-bottom-5 sm:-left-5 sm:right-5 sm:top-5 sm:rounded-showcase"
                variants={frameBack}
              />
              {}
              <motion.div
                aria-hidden="true"
                className="absolute -right-3 -top-3 bottom-3 left-3 rounded-2xl border-2 border-dashed border-brand/25 sm:-right-5 sm:-top-5 sm:bottom-5 sm:left-5 sm:rounded-showcase"
                variants={frameFront}
              />

              <VideoEmbed
                videoId={videoId}
                title={caption}
                fallbackUrl={fallbackUrl}
                className="relative rounded-2xl shadow-photo sm:rounded-showcase"
              />

              {}
              <motion.span
                aria-hidden="true"
                className="absolute -left-4 -top-4 flex h-11 w-11 items-center justify-center rounded-full bg-brand text-cream shadow-button sm:-left-6 sm:-top-6 sm:h-14 sm:w-14"
                variants={popIn}
              >
                <Clapperboard className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
              </motion.span>
            </div>

            <Reveal
              as="figcaption"
              variant="fadeIn"
              delay={0.4}
              className="mt-8 text-center text-footer font-bold text-brand sm:mt-10"
            >
              {caption}
            </Reveal>
          </Reveal>
        </Container>
      </MouseFieldProvider>
    </section>
  )
}
