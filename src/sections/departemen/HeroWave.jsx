import { useEffect, useState } from 'react'
import { Loop } from '@/components/animations'
import { DEPT_HERO } from '@/lib/animations'

const FRONT =
  'M0 60 C240 20 480 100 720 60 C960 20 1200 100 1440 60 C1680 20 1920 100 2160 60 C2400 20 2640 100 2880 60 L2880 120 L0 120 Z'
const BACK =
  'M0 40 C240 90 480 0 720 40 C960 90 1200 0 1440 40 C1680 90 1920 0 2160 40 C2400 90 2640 0 2880 40 L2880 120 L0 120 Z'

const drift = (from, to, duration) => ({ x: [from, to], transition: { duration, repeat: Infinity, ease: 'linear' } })
const FRONT_DRIFT = drift('0%', '-50%', DEPT_HERO.waveFrontDuration)
const BACK_DRIFT = drift('-50%', '0%', DEPT_HERO.waveBackDuration) 

function useWide() {
  const query = `(min-width: ${DEPT_HERO.waveMinWidth}px)`
  const [wide, setWide] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (e) => setWide(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return wide
}

function Layer({ d, className, drift: anim, animate }) {
  const svg = (
    <svg viewBox="0 0 2880 120" preserveAspectRatio="none" className={`block h-full w-full ${className}`}>
      <path d={d} fill="currentColor" />
    </svg>
  )
  return animate ? (
    <Loop className="absolute inset-y-0 left-0 w-[200%]" animation={anim}>
      {svg}
    </Loop>
  ) : (
    <div className="absolute inset-y-0 left-0 w-[200%]">{svg}</div>
  )
}

export default function HeroWave() {
  const wide = useWide()
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] overflow-hidden"
      style={{ height: DEPT_HERO.waveHeight }}
    >
      <Layer d={BACK} className="text-leaf/40" drift={BACK_DRIFT} animate={wide} />
      <Layer d={FRONT} className="text-moss" drift={FRONT_DRIFT} animate={wide} />
    </div>
  )
}
