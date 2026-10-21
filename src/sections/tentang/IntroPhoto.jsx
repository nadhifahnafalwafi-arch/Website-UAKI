import { motion } from 'framer-motion'
import { Sprout } from 'lucide-react'
import DotGrid from '@/components/DotGrid'
import { MouseParallax, Reveal } from '@/components/animations'
import { frameBack, popIn, VIEWPORT_AMOUNT } from '@/lib/animations'
import photo from '@/assets/img/hero-foto-bersama.jpg'

export default function IntroPhoto({ alt, caption }) {
  return (
    <Reveal
      as="figure"
      variant="scaleIn"
      delay={0.2}
      amount={VIEWPORT_AMOUNT.large}
      className="relative mx-auto w-full max-w-[500px] lg:mx-0 lg:justify-self-end"
    >
      <div className="relative">
        {}
        <motion.div
          aria-hidden="true"
          className="absolute -bottom-3 -right-3 left-3 top-3 rounded-2xl rounded-tl-organic bg-leaf/20 sm:-bottom-4 sm:-right-4 sm:left-4 sm:top-4"
          variants={frameBack}
        />

        {}
        <MouseParallax depth={0.6} className="absolute -bottom-7 -left-6 sm:-left-8">
          <DotGrid className="h-16 w-20 text-brand/20" />
        </MouseParallax>

        {}
        <div className="relative rounded-2xl rounded-tl-organic bg-white p-2 shadow-stat sm:p-2.5">
          <div className="overflow-hidden rounded-xl rounded-tl-organic-inner">
            <motion.img
              src={photo}
              alt={alt}
              width={1000}
              height={1000}
              loading="eager"
              decoding="async"
              className="aspect-[16/10] w-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
        </div>

        {}
        <motion.span
          aria-hidden="true"
          className="absolute -right-3 -top-4 flex h-11 w-11 items-center justify-center rounded-full bg-brand text-cream shadow-button sm:-right-5 sm:-top-5 sm:h-12 sm:w-12"
          variants={popIn}
        >
          <Sprout className="h-5 w-5" strokeWidth={2} />
        </motion.span>
      </div>

      <Reveal
        as="figcaption"
        variant="fadeIn"
        delay={0.5}
        className="mt-6 text-center text-footer font-medium text-brand/70"
      >
        {caption}
      </Reveal>
    </Reveal>
  )
}
