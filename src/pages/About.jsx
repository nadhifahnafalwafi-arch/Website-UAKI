
import { useEffect } from 'react' 
import { useLocation } from 'react-router-dom' 
import Intro from '@/sections/tentang/Intro'
import Philosophy from '@/sections/tentang/Philosophy'
import DepartmentsSection from '@/sections/tentang/departemen/DepartmentsSection'
import usePageMeta from '@/lib/usePageMeta'
import { scrollToSection } from '@/lib/scrollToSection' 
import { pageMeta } from '@/lib/siteData'

export default function About() {
  usePageMeta(pageMeta.about)

  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return undefined
    const frame = requestAnimationFrame(() => scrollToSection(hash.slice(1), { updateHash: false }))
    return () => cancelAnimationFrame(frame)
  }, [hash])

  return (
    <>
      <Intro />
      <Philosophy />
      <DepartmentsSection />
      {}
    </>
  )
}
