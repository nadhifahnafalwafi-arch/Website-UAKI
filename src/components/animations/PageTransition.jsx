import { motion } from 'framer-motion'
import { pageTransition } from '@/lib/animations'
import { useLoaderDone } from '@/lib/LoaderContext' 

export default function PageTransition({ children }) {
  const loaderDone = useLoaderDone() 
  return (
    <motion.div
      initial={pageTransition.initial}
      animate={loaderDone ? pageTransition.animate : pageTransition.initial} 
      exit={pageTransition.exit}
    >
      {children}
    </motion.div>
  )
}
