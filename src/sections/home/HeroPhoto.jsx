import { motion } from 'framer-motion'
import { useEntrance } from '@/lib/LoaderContext' 
import DotGrid from '@/components/DotGrid'
import { Floating } from '@/components/animations'
import { heroPhoto, frameBack, frameFront } from '@/lib/animations'
import photo from '@/assets/img/hero-foto-bersama.jpg'

export default function HeroPhoto({ alt }) {
  const entrance = useEntrance() 
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[400px] lg:mx-0 lg:max-w-[420px] lg:justify-self-end"
      variants={heroPhoto}
      initial="hidden"
      animate={entrance} 
    >
      {}
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-4 -left-4 right-4 top-4 sm:-bottom-5 sm:-left-5 sm:right-5 sm:top-5"
        variants={frameBack}
      >
        <Floating className="h-full w-full">
          <div className="h-full w-full rounded-card bg-leaf/30" />
        </Floating>
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute -right-3 -top-3 bottom-3 left-3 rounded-card border-2 border-dashed border-brand/30 sm:-right-4 sm:-top-4 sm:bottom-4 sm:left-4"
        variants={frameFront}
      />

      <motion.div
        aria-hidden="true"
        className="absolute -bottom-7 -right-5 sm:-bottom-8 sm:-right-7"
        variants={frameFront}
      >
        <DotGrid className="h-16 w-20 text-brand/25" />
      </motion.div>

      <div className="relative rounded-card bg-white p-2 shadow-photo">
        <div className="overflow-hidden rounded-photo">
          <motion.img
            src={photo}
            alt={alt}
            width={1000}
            height={1000}
            loading="eager"
            decoding="async"
            className="aspect-square w-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  )
}
