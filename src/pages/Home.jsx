import Hero from '@/sections/home/Hero'
import About from '@/sections/home/About'
import Welcome from '@/sections/home/Welcome'
import CompanyProfile from '@/sections/home/CompanyProfile'
import usePageMeta from '@/lib/usePageMeta'
import { pageMeta } from '@/lib/siteData'

export default function Home() {
  usePageMeta(pageMeta.home)

  return (
    <>
      <Hero />
      <About />
      <Welcome />
      <CompanyProfile />
    </>
  )
}
