import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const QUERY = '(hover: hover) and (pointer: fine)'

export default function useFinePointer() {
  const [fine, setFine] = useState(() => typeof window !== 'undefined' && window.matchMedia(QUERY).matches)

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const onChange = (e) => setFine(e.matches)
    setFine(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return fine
}

export function useCursorEffectsEnabled() {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  return fine && !reduce
}
