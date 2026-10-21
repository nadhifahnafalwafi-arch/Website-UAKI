// PERUBAHAN: FILE BARU
import { createContext, useEffect, useRef } from 'react'
import { useAnimationControls, useInView, useReducedMotion } from 'framer-motion'
import { useScrollDirectionContext } from '@/lib/ScrollDirectionContext'
import { SCROLL_ANIMATION } from '@/lib/animations'
import { useLoaderDone } from '@/lib/LoaderContext' 

export const RevealCustomContext = createContext({ direction: 'down', first: true, delay: 0 })

const sideOf = (el) => {
  const r = el.getBoundingClientRect()
  return r.top + r.height / 2 < window.innerHeight / 2 ? 'top' : 'bottom'
}

export default function useScrollReveal({
  amount = SCROLL_ANIMATION.amount,
  margin = SCROLL_ANIMATION.margin,
  once = !SCROLL_ANIMATION.repeat,
  delay = 0,
  waitForLoader = true, 
} = {}) {
  const ref = useRef(null)
  const controls = useAnimationControls()
  const reduce = useReducedMotion()
  const inView = useInView(ref, { amount, margin, once })
  const loaderDone = useLoaderDone() 
  const ready = !waitForLoader || loaderDone 

  const direction = useScrollDirectionContext()
  const directionRef = useRef(direction)
  directionRef.current = direction

  const custom = useRef({ direction: 'down', first: true, delay }).current
  custom.delay = delay

  const hasShown = useRef(false)
  const pose = useRef('bottom') 

  useEffect(() => {
    const el = ref.current
    if (reduce || !el) return 
    if (!ready) return 

    const { directional } = SCROLL_ANIMATION

    if (inView) {
      if (directional && pose.current !== 'visible') {
        const side = sideOf(el)
        if (pose.current !== side) {
          custom.direction = side === 'top' ? 'down' : 'up'
          controls.set('hidden')
        }
      }
      custom.first = !hasShown.current
      controls.start('visible')
      pose.current = 'visible'
      hasShown.current = true
    } else if (hasShown.current && !once) {
      let dir = directional ? directionRef.current : 'down'
      if (directional) {
        const side = sideOf(el)
        if (side === 'top') dir = 'down' 
        if (side === 'bottom') dir = 'up' 
        pose.current = side
      }
      custom.direction = dir
      custom.first = false
      controls.start('hidden')
    }
  }, [inView, once, reduce, controls, custom, ready]) 

  return {
    ref,
    initial: reduce ? 'visible' : 'initial',
    animate: controls,
    custom,
  }
}
