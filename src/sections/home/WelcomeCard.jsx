import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { TiltCard } from '@/components/animations'
import { photoRise, popIn, slideLeft, defaultViewport } from '@/lib/animations'

import leaderPhoto from '@/assets/img/sambutan-ketua.png'
export default function WelcomeCard({ name, role, photoAlt }) {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[270px] sm:max-w-[290px] lg:mx-0 lg:max-w-[300px]"
      variants={slideLeft}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
    >
      {}
      <div aria-hidden="true" className="absolute inset-0 rotate-[4deg] rounded-card bg-leaf/35" />
      {}
      <div
        aria-hidden="true"
        className="absolute -bottom-3 -left-3 right-3 top-3 rounded-card border-2 border-dashed border-cream/30"
      />

      <TiltCard className="relative">
        <div className="relative overflow-hidden rounded-card bg-white px-5 pb-6 pt-7 shadow-card-dark">
          {}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-10 h-48 w-48 -translate-x-1/2 rounded-full bg-cream"
          />

          <div className="relative">
            <motion.img
              src={leaderPhoto}
              alt={photoAlt}
              width={239}
              height={261}
              loading="lazy"
              decoding="async"
              className="mx-auto h-auto w-[78%] origin-bottom select-none"
              variants={photoRise}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              whileHover={{ scale: 1.04 }}
              draggable={false}
            />
            {}
            <div aria-hidden="true" className="h-px w-full bg-brand/15" />
          </div>

          <p className="mt-4 text-center text-lg font-bold text-brand">{name}</p>
          <p className="mt-1 text-center text-footer font-semibold text-brand/80">{role}</p>
        </div>
      </TiltCard>

      {}
      <motion.span
        aria-hidden="true"
        className="absolute -right-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-brand shadow-stat"
        variants={popIn}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
      >
        <Quote className="h-5 w-5" strokeWidth={2.25} fill="currentColor" />
      </motion.span>
    </motion.div>
  )
}
