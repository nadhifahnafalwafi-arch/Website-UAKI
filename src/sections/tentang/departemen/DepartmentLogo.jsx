import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { DEPARTMENT_CAROUSEL } from '@/lib/animations'

export default function DepartmentLogo({ dept, active, height, eager = false }) {
  const reduce = useReducedMotion()
  const [whiteOk, setWhiteOk] = useState(true)
  const [greenOk, setGreenOk] = useState(true)
  const t = { duration: reduce ? 0 : DEPARTMENT_CAROUSEL.logoFade, ease: 'easeOut' }
  const loading = eager ? 'eager' : 'lazy'

  if (!whiteOk) {
    return (
      <motion.div
        className="flex items-center justify-center rounded-full border-2 border-cream/40 font-bold text-cream"
        style={{ height, width: height, fontSize: Math.max(11, height * 0.22) }}
        animate={{ scale: active && !reduce ? 1.08 : 1 }}
        transition={t}
      >
        {dept.name}
      </motion.div>
    )
  }

  return (
    <div className="relative" style={{ height, width: height * 1.7 }}>
      {}
      <motion.span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[150%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(166, 180, 101, 0.35), transparent)' }}
        initial={false}
        animate={{ opacity: active ? 1 : 0 }}
        transition={t}
      />
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ scale: active && !reduce ? 1.08 : 1 }}
        transition={t}
      >
        {}
        <div
          className="absolute inset-0"
          style={dept.logoScale !== 1 ? { transform: `scale(${dept.logoScale})` } : undefined}
        >
          <motion.img
            src={dept.logoWhite}
            alt=""
            loading={loading}
            decoding="async"
            className="absolute inset-0 h-full w-full object-contain"
            initial={false}
            animate={{ opacity: active && greenOk ? 0 : 1 }}
            transition={t}
            onError={() => setWhiteOk(false)}
            draggable={false}
          />
          {greenOk && (
            <motion.img
              src={dept.logoGreen}
              alt=""
              loading={loading}
              decoding="async"
              className="absolute inset-0 h-full w-full object-contain"
              initial={{ opacity: 0 }}
              animate={{ opacity: active ? 1 : 0 }}
              transition={t}
              onError={() => setGreenOk(false)}
              draggable={false}
            />
          )}
        </div>
      </motion.div>
    </div>
  )
}
