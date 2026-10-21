import { useContext, useMemo } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, revealVariants } from '@/lib/animations'
import useScrollReveal, { RevealCustomContext } from './useScrollReveal' 

export function Stagger({
  as = 'div',
  stagger = 0.12,
  delayChildren = 0,
  amount, 
  margin, 
  once, 
  className = '',
  children,
  ...rest
}) {
  const MotionTag = motion[as] ?? motion.div
  const variants = useMemo(() => staggerContainer(stagger, delayChildren), [stagger, delayChildren])
  const reveal = useScrollReveal({ amount, margin, once }) 

  return (
    <RevealCustomContext.Provider value={reveal.custom}>
      <MotionTag
        ref={reveal.ref}
        className={className}
        variants={variants}
        initial={reveal.initial}
        animate={reveal.animate}
        custom={reveal.custom}
        {...rest}
      >
        {children}
      </MotionTag>
    </RevealCustomContext.Provider>
  )
}

export function StaggerItem({ as = 'div', variant = 'fadeUp', className = '', children, ...rest }) {
  const MotionTag = motion[as] ?? motion.div
  const custom = useContext(RevealCustomContext)

  return (
    <MotionTag
      className={className}
      variants={revealVariants[variant] ?? revealVariants.fadeUp}
      custom={custom}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
