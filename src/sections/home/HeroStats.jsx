import { motion } from 'framer-motion'
import { Reveal, Stagger, StaggerItem, CountUp } from '@/components/animations'
import { transitions } from '@/lib/animations'

export default function HeroStats({ stats }) {
  return (
    <Reveal
      delay={0.6}
      className="relative mt-14 rounded-2xl border border-leaf/60 bg-gradient-to-b from-snow from-30% to-butter shadow-stat lg:mt-16"
    >
      <Stagger
        as="ul"
        stagger={0.15}
        delayChildren={0.8}
        className="grid grid-cols-1 divide-y divide-brand/25 px-6 py-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:py-6 lg:px-6"
      >
        {stats.map(({ value, suffix, label, icon: Icon }, i) => (
          <StaggerItem
            as="li"
            key={label}
            className={`py-5 sm:py-0 ${i === 0 ? 'sm:pr-6' : 'sm:px-6 lg:px-8'}`}
          >
            <motion.div className="flex items-center gap-4" whileHover="hover">
              <motion.span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-leaf/35 text-brand"
                variants={{ hover: { scale: 1.1, rotate: -6 } }}
                transition={transitions.spring}
              >
                <Icon className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
              </motion.span>
              <div>
                <CountUp to={value} suffix={suffix} delay={0.9 + i * 0.15} className="block text-stat font-bold text-brand" />
                <span className="mt-1 block text-footer font-medium text-brand">{label}</span>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>
    </Reveal>
  )
}
