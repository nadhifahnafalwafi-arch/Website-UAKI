import { useMemo, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

export default function Loop({ as = 'div', animation, className = '', children, ...props }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0, margin: '80px' })
  const reduce = useReducedMotion()
  const MotionTag = motion[as] ?? motion.div
  const idle = useMemo(() => {
    const state = { transition: { duration: 0.4 } }
    Object.entries(animation ?? {}).forEach(([key, value]) => {
      if (key !== 'transition') state[key] = Array.isArray(value) ? value[0] : value
    })
    return state
  }, [animation])

  return (
    <MotionTag ref={ref} className={className} animate={inView && !reduce ? animation : idle} {...props}>
      {children}
    </MotionTag>
  )
}
