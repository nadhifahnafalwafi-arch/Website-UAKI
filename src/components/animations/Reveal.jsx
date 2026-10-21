import { motion } from 'framer-motion'
import { revealVariants } from '@/lib/animations'
import useScrollReveal from './useScrollReveal' 

export default function Reveal({
  as = 'div',
  variant = 'fadeUp',
  delay = 0,
  amount, 
  margin, 
  once, 
  className = '',
  children,
  ...rest
}) {
  const MotionTag = motion[as] ?? motion.div
  const reveal = useScrollReveal({ amount, margin, once, delay }) 

  return (
    <MotionTag
      ref={reveal.ref}
      className={className}
      variants={revealVariants[variant] ?? revealVariants.fadeUp}
      initial={reveal.initial}
      animate={reveal.animate}
      custom={reveal.custom}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
