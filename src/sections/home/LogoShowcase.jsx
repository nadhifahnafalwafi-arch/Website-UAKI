import { lazy, Suspense, useEffect, useState } from 'react' 
import { motion } from 'framer-motion'
import { Rotate3d } from 'lucide-react'
import DotGrid from '@/components/DotGrid'
import { Loop } from '@/components/animations'
import logoFlat from '@/assets/svg/logo-uaki-3d.svg'
import { glowPulse, crossFade } from '@/lib/animations'
import { useLoaderDone } from '@/lib/LoaderContext' 
import { EXIT_DURATION } from '@/lib/loaderConfig' 

const Logo3D = lazy(() => import('@/components/Logo3D'))

export default function LogoShowcase({ label, hint }) {
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const loaderDone = useLoaderDone()
  const [mount3D, setMount3D] = useState(false)
  useEffect(() => {
    if (!loaderDone) return undefined
    let idle = 0
    const timer = setTimeout(
      () => {
        if ('requestIdleCallback' in window)
          idle = window.requestIdleCallback(() => setMount3D(true), { timeout: 1500 })
        else setMount3D(true)
      },
      EXIT_DURATION * 1000 + 100,
    )
    return () => {
      clearTimeout(timer)
      if (idle) window.cancelIdleCallback?.(idle)
    }
  }, [loaderDone])

  return (
    <div className="mx-auto w-full max-w-[290px] sm:max-w-[320px] lg:max-w-[340px]">
      <div className="relative">
        {}
        <div aria-hidden="true" className="absolute inset-0 -rotate-[5deg] rounded-showcase bg-leaf/20" />

        {}
        <div className="relative overflow-hidden rounded-showcase border border-leaf/50 bg-gradient-to-b from-cream via-cream to-leaf/30 shadow-stat">
          <Loop
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 50% 42%, rgba(255,255,254,0.95) 0%, rgba(255,255,254,0) 62%)',
            }}
            animation={glowPulse.animate}
          />
          <DotGrid className="absolute left-4 top-4 h-10 w-12 text-brand/15" />
          <DotGrid className="absolute bottom-4 right-4 h-10 w-12 text-brand/15" />

          <div className="relative">
            {}
            <motion.img
              src={logoFlat}
              alt={failed ? 'Logo UAKI' : ''}
              aria-hidden={failed ? undefined : true}
              className="pointer-events-none absolute inset-x-0 top-[17%] mx-auto h-[60%] w-auto"
              initial={false}
              animate={{ opacity: ready && !failed ? 0 : 1 }}
              transition={crossFade}
              draggable={false}
            />

            {failed || !mount3D ? ( 
              <div className="aspect-[4/5] w-full" />
            ) : (
              <Suspense fallback={<div className="aspect-[4/5] w-full" />}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={crossFade}>
                  <Logo3D label={label} onReady={() => setReady(true)} onError={() => setFailed(true)} />
                </motion.div>
              </Suspense>
            )}
          </div>
        </div>
      </div>

      {hint && !failed && (
        <p className="mt-6 flex items-center justify-center gap-2 text-footer font-medium text-brand/80">
          <Rotate3d className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          {hint}
        </p>
      )}
    </div>
  )
}
