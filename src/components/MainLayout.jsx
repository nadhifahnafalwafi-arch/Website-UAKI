import { Suspense, useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CursorTrail, PageTransition } from '@/components/animations'
import { ScrollDirectionProvider } from '@/lib/ScrollDirectionContext' 

function FrozenOutlet() {
  const outlet = useOutlet()
  const [frozen] = useState(outlet)
  return frozen
}

function PageFallback() {
  return <div className="min-h-[60vh]" aria-busy="true" />
}

export default function MainLayout() {
  const { pathname } = useLocation()

  return (
    <ScrollDirectionProvider>
      <div className="flex min-h-dvh flex-col">
        <Navbar />

        {}
        <main id="konten" className="flex-1 overflow-x-clip">
          <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
            <PageTransition key={pathname}>
              <Suspense fallback={<PageFallback />}>
                <FrozenOutlet />
              </Suspense>
            </PageTransition>
          </AnimatePresence>
        </main>

        <Footer />
      </div>

      {}
      <CursorTrail />
    </ScrollDirectionProvider>
  )
}
