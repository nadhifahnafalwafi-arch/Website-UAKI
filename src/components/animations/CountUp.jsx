import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { easeOut } from '@/lib/animations'
import { useLoaderDone } from '@/lib/LoaderContext' 


export default function CountUp({ to, suffix = '', duration = 1.8, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const loaderDone = useLoaderDone() 

  useEffect(() => {
    const node = ref.current
    if (!inView || !node || !loaderDone) return undefined 

    if (reduce) {
      node.textContent = `${to}${suffix}`
      return undefined
    }

    const controls = animate(0, to, {
      duration,
      delay,
      ease: easeOut,
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, reduce, to, suffix, duration, delay, loaderDone]) 

  return (
    <span className={className}>
      <span className="sr-only">{`${to}${suffix}`}</span>
      <span ref={ref} aria-hidden="true">{`0${suffix}`}</span>
    </span>
  )
}
