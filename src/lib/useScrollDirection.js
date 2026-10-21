import { useEffect, useState } from 'react'

export default function useScrollDirection({ threshold = 6 } = {}) {
  const [direction, setDirection] = useState('down')

  useEffect(() => {
    let lastY = window.scrollY
    let current = 'down'
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY
      const diff = y - lastY
      if (Math.abs(diff) < threshold) return

      const next = diff > 0 ? 'down' : 'up'
      if (next !== current) {
        current = next
        setDirection(next)
      }
      lastY = y
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [threshold])

  return direction
}
