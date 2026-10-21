import { Fragment, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import useScrollReveal from './useScrollReveal'
import { TYPEWRITER } from '@/lib/animations'

const charVariants = {
  initial: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
  hidden: { opacity: 0, transition: { duration: 0.15 } },
}

const makeCursorVariants = (speed) => ({
  initial: { opacity: 0 },
  hidden: { opacity: 0, transition: { duration: 0.1 } },
  visible: { opacity: [1, 1, 0], transition: { duration: speed, times: [0, 0.9, 1] } },
})

const lastCursorVariants = {
  initial: { opacity: 0 },
  hidden: { opacity: 0, transition: { duration: 0.1 } },
  visible: {
    opacity: [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0],
    transition: { duration: TYPEWRITER.cursorLinger, ease: 'linear' },
  },
}

const cursorClass =
  'pointer-events-none absolute bottom-[0.1em] left-full top-[0.12em] ml-[0.04em] w-[0.07em] min-w-[2px] rounded-full bg-current'
export default function TypewriterText({
  text,
  as = 'span',
  speed = TYPEWRITER.speed,
  delay = 0,
  amount = TYPEWRITER.amount,
  waitForLoader = true, 
  className = '',
  ...rest
}) {
  const reduce = useReducedMotion()
  const reveal = useScrollReveal({ amount, delay, waitForLoader }) 
  const lines = Array.isArray(text) ? text : [text]
  const multiLine = lines.length > 1
  const label = lines.join(' ')

  const container = useMemo(
    () => ({
      initial: {},
      visible: (c = {}) => ({
        transition: { staggerChildren: speed, delayChildren: c.first === false ? 0.1 : (c.delay ?? 0) },
      }),
      hidden: { transition: { staggerChildren: 0 } },
    }),
    [speed],
  )
  const cursorVariants = useMemo(() => makeCursorVariants(speed), [speed])

  const Tag = as
  if (reduce) {
    return (
      <Tag className={className} {...rest}>
        {multiLine
          ? lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))
          : label}
      </Tag>
    )
  }

  const total = lines.reduce((n, line) => n + line.replace(/ /g, '').length, 0)
  let index = 0
  const MotionTag = motion[as] ?? motion.span

  return (
    <MotionTag
      ref={reveal.ref}
      className={className}
      aria-label={label}
      variants={container}
      initial={reveal.initial}
      animate={reveal.animate}
      custom={reveal.custom}
      {...rest}
    >
      {lines.map((line, li) => (
        <span key={li} aria-hidden="true" className={multiLine ? 'block' : undefined}>
          {line.split(' ').map((word, wi, words) => (
            <Fragment key={wi}>
              {}
              <span className="whitespace-nowrap">
                {[...word].map((ch, ci) => {
                  index += 1
                  const isLast = index === total
                  return (
                    <motion.span key={ci} className="relative" variants={charVariants}>
                      {ch}
                      <motion.span className={cursorClass} variants={isLast ? lastCursorVariants : cursorVariants} />
                    </motion.span>
                  )
                })}
              </span>
              {wi < words.length - 1 && ' '}
            </Fragment>
          ))}
        </span>
      ))}
    </MotionTag>
  )
}
