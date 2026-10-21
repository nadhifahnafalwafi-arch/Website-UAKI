import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { iconSwap, tapScale } from '@/lib/animations'

export default function MenuToggle({ open, onToggle, controls, className = '' }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-label={open ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
      aria-expanded={open}
      aria-controls={controls}
      className={`relative flex h-11 w-11 items-center justify-center rounded-lg text-white ${className}`}
      {...tapScale}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={open ? 'close' : 'open'}
          className="flex"
          initial={iconSwap.initial}
          animate={iconSwap.animate}
          exit={iconSwap.exit}
        >
          {open ? <X className="h-6 w-6" strokeWidth={2.25} /> : <Menu className="h-6 w-6" strokeWidth={2.25} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
