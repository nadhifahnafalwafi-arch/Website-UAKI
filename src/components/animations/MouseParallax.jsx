import { motion } from 'framer-motion'
import useMouseParallax from '@/lib/useMouseParallax'

export default function MouseParallax({ depth = 1, className = '', children }) {
  const { x, y, enabled } = useMouseParallax(depth)

  if (!enabled) return <div className={className}>{children}</div>

  return (
    <motion.div className={className} style={{ x, y }}>
      {children}
    </motion.div>
  )
}
