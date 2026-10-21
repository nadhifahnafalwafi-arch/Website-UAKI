import { motion, useReducedMotion } from 'framer-motion'
import { Stagger, StaggerItem } from '@/components/animations'
import { easeOut, PHILOSOPHY, transitions, VIEWPORT_AMOUNT } from '@/lib/animations'

function Point({ point, index, activePart, controller, isLast }) {
  const reduce = useReducedMotion()
  const isActive = activePart === index
  const dimmed = activePart !== null && !isActive
  const t = reduce ? { duration: 0 } : { duration: PHILOSOPHY.colorDuration, ease: easeOut }

  return (
    <StaggerItem as="li">
      <motion.div
        role="button"
        tabIndex={0}
        data-philosophy-part={index}
        aria-pressed={isActive}
        aria-label={`${point.number}. ${point.title}. Sorot bagian ${point.partLabel} pada logo.`}
        className="relative -mx-3 flex min-h-11 cursor-pointer gap-4 rounded-2xl p-3 outline-none focus-visible:ring-2 focus-visible:ring-cream sm:-mx-4 sm:gap-5 sm:p-4"
        initial={false}
        animate={
          reduce
            ? { opacity: dimmed ? PHILOSOPHY.dimOpacity : 1 }
            : {
                opacity: dimmed ? PHILOSOPHY.dimOpacity : 1,
                y: isActive ? PHILOSOPHY.lift.y : 0,
                scale: isActive ? PHILOSOPHY.lift.scale : 1,
              }
        }
        transition={t}
        onPointerDown={(e) => {
          controller.pointerType.current = e.pointerType
        }}
        onPointerEnter={(e) => e.pointerType === 'mouse' && controller.hover(index)}
        onClick={() => controller.pointerType.current !== 'mouse' && controller.toggle(index)}
        onFocus={() => controller.focus(index)}
        onBlur={controller.blur}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            controller.toggle(index)
          }
        }}
      >
        {}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-white/[0.08] shadow-lift ring-1 ring-white/10"
          initial={false}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={t}
        />

        {}
        <motion.span
          aria-hidden="true"
          className="relative mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-leaf text-xs font-bold text-moss"
          initial={false}
          animate={reduce ? {} : { scale: isActive ? PHILOSOPHY.numberScale : 1 }}
          transition={reduce ? { duration: 0 } : transitions.spring}
        >
          {}
          <motion.span
            className="absolute inset-0 bg-cream/40"
            initial={false}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={t}
          />
          <span className="relative">{point.number}</span>
        </motion.span>

        <div className="min-w-0">
          <h3 className="relative text-xl font-bold text-cream">
            {point.title}
            {}
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 text-butter"
              initial={false}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={t}
            >
              {point.title}
            </motion.span>
          </h3>
          <p className="mt-2 text-body font-medium text-cream">{point.description}</p>
        </div>
      </motion.div>

      {}
      {!isLast && (
        <div aria-hidden="true" className="ml-[52px] mt-1 flex items-center gap-1.5 sm:ml-[56px]">
          <span className="h-1 w-1 rounded-full bg-leaf/50" />
          <span className="h-px flex-1 bg-gradient-to-r from-cream/15 to-transparent" />
        </div>
      )}
    </StaggerItem>
  )
}

export default function PhilosophyPoints({ points, activePart, controller }) {
  return (
    <Stagger
      as="ul"
      stagger={0.14}
      delayChildren={0.15}
      amount={VIEWPORT_AMOUNT.tall}
      className="flex flex-col gap-2"
      onPointerLeave={(e) => e.pointerType === 'mouse' && controller.leave()}
    >
      {points.map((point, i) => (
        <Point
          key={point.number}
          point={point}
          index={i}
          activePart={activePart}
          controller={controller}
          isLast={i === points.length - 1}
        />
      ))}
    </Stagger>
  )
}
