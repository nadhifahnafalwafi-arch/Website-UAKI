import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { User } from 'lucide-react'
import DotGrid from '@/components/DotGrid'
import { DEPARTMENT_CAROUSEL } from '@/lib/animations'

/*Foto ketua departemen */
export default function DepartmentPhoto({ dept, height, eager = false }) {
  const reduce = useReducedMotion()
  const imgRef = useRef(null)
  const [status, setStatus] = useState('loading') 
  const alt = `Ketua Departemen ${dept.name}`
  useEffect(() => {
    const img = imgRef.current
    if (img?.complete) setStatus(img.naturalWidth > 0 ? 'loaded' : 'error')
  }, [])

  return (
    <div className="relative w-full overflow-hidden bg-sage" style={{ height }} data-dept-photo>
      <motion.div
        className="absolute inset-0"
        variants={{ rest: { scale: 1 }, hover: { scale: reduce ? 1 : DEPARTMENT_CAROUSEL.photoZoom } }}
        transition={{ duration: reduce ? 0 : 0.8, ease: 'easeOut' }}
      >
        {}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-leaf to-sage text-ivory"
          {...(status === 'error' ? { role: 'img', 'aria-label': alt } : { 'aria-hidden': true })}
        >
          <DotGrid className="absolute left-4 top-4 h-12 w-16 text-ivory/20" gap={12} size={1.6} />
          <span
            aria-hidden="true"
            className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full border border-ivory/20"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full border border-ivory/15"
          />
          <User className="h-[38%] w-[38%] opacity-50" strokeWidth={1.5} aria-hidden="true" />
          <span className="px-3 text-center text-xs font-semibold opacity-80">Foto Ketua {dept.name}</span>
        </div>

        {}
        {status !== 'error' && (
          <motion.img
            ref={imgRef}
            src={dept.photo}
            alt={alt}
            width={600}
            height={800}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top"
            initial={false}
            animate={{ opacity: status === 'loaded' ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.5 }}
            onLoad={() => setStatus('loaded')}
            onError={() => setStatus('error')}
            draggable={false}
          />
        )}
      </motion.div>
    </div>
  )
}
