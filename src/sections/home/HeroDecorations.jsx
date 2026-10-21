import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import DotGrid from '@/components/DotGrid'
import { useEntrance } from '@/lib/LoaderContext' 
import { Loop, MouseParallax } from '@/components/animations' 
import blobTopRight from '@/assets/svg/blob-kanan-atas.svg'
import blobBottomRight from '@/assets/svg/blob-kanan-bawah.svg'
import ellipseLeft from '@/assets/svg/ellipse-kiri.svg'
import leaves from '@/assets/img/daun.webp'
import { decorReveal, leafSway, blobBreath } from '@/lib/animations'

const leafSwayLeft = { ...leafSway.animate, transition: { ...leafSway.animate.transition, delay: 1.2 } }

export default function HeroDecorations({ sectionRef }) {
  const reduce = useReducedMotion()
  const entrance = useEntrance() 
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })

  const range = (px) => (reduce ? [0, 0] : [0, px])
  const yLeavesTop = useTransform(scrollYProgress, [0, 1], range(90))
  const yLeavesLeft = useTransform(scrollYProgress, [0, 1], range(-60))
  const yBlobTop = useTransform(scrollYProgress, [0, 1], range(50))
  const yBlobBottom = useTransform(scrollYProgress, [0, 1], range(-40))
  const yEllipse = useTransform(scrollYProgress, [0, 1], range(-25))

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 select-none">
      {}
      <motion.div
        className="absolute -top-2 left-[5%]"
        variants={decorReveal}
        custom={0.2}
        initial="hidden"
        animate={entrance}
      >
        <MouseParallax depth={0.4}>
          {}
          <DotGrid className="h-14 w-[62px] text-brand/15" />
        </MouseParallax>
      </motion.div>

      {}
      <motion.div
        style={{ y: yBlobTop }}
        className="absolute -right-[140px] -top-[250px] w-[460px] sm:-right-[60px] lg:w-[560px]"
      >
        <MouseParallax depth={-0.5}>
          {}
          <motion.div variants={decorReveal} custom={0.1} initial="hidden" animate={entrance}>
            <Loop
              as="img"
              src={blobTopRight}
              alt=""
              className="w-full"
              animation={blobBreath.animate}
              draggable={false}
            />
          </motion.div>
        </MouseParallax>
      </motion.div>

      {}
      <motion.div
        style={{ y: yBlobBottom }}
        className="absolute -right-6 top-[46%] hidden w-[150px] sm:block lg:w-[170px]"
      >
        <MouseParallax depth={-0.4}>
          {}
          <motion.div variants={decorReveal} custom={0.3} initial="hidden" animate={entrance}>
            <Loop
              as="img"
              src={blobBottomRight}
              alt=""
              className="w-full"
              animation={blobBreath.animate}
              draggable={false}
            />
          </motion.div>
        </MouseParallax>
      </motion.div>

      {}
      <motion.div
        style={{ y: yEllipse }}
        className="absolute -left-[130px] top-[54%] w-[200px] lg:-left-[110px] lg:w-[220px]"
      >
        <MouseParallax depth={0.6}>
          {}
          <motion.img
            src={ellipseLeft}
            alt=""
            className="w-full"
            variants={decorReveal}
            custom={0.25}
            initial="hidden"
            animate={entrance}
            draggable={false}
          />
        </MouseParallax>
      </motion.div>

      {}
      <motion.div
        style={{ y: yLeavesTop }}
        className="absolute -right-[95px] -top-[30px] w-[190px] opacity-70 sm:-right-[110px] sm:w-[280px] sm:opacity-100 lg:-right-[120px] lg:w-[360px]"
      >
        <MouseParallax depth={1}>
          {}
          <motion.div variants={decorReveal} custom={0.5} initial="hidden" animate={entrance}>
            <Loop
              as="img"
              src={leaves}
              alt=""
              className="w-full"
              style={{ transformOrigin: '92% 8%' }}
              animation={leafSway.animate}
              draggable={false}
            />
          </motion.div>
        </MouseParallax>
      </motion.div>

      {}
      <motion.div
        style={{ y: yLeavesLeft }}
        className="absolute -left-[150px] top-[44%] w-[220px] opacity-60 sm:opacity-100 lg:-left-[165px] lg:top-[34%] lg:w-[300px]"
      >
        {}
        <MouseParallax depth={0.9}>
          <div className="rotate-180">
            <motion.div variants={decorReveal} custom={0.6} initial="hidden" animate={entrance}>
              <Loop
                as="img"
                src={leaves}
                alt=""
                className="w-full"
                style={{ transformOrigin: '92% 8%' }}
                animation={leafSwayLeft}
                draggable={false}
              />
            </motion.div>
          </div>
        </MouseParallax>
      </motion.div>
    </div>
  )
}
