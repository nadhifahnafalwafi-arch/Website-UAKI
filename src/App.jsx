import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import MainLayout from '@/components/MainLayout'
import Loader from '@/components/loader/Loader' 
import { LoaderProvider } from '@/lib/LoaderContext' 

const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Galeri = lazy(() => import('@/pages/Galeri')) 
const News = lazy(() => import('@/pages/News'))
const DepartmentDetail = lazy(() => import('@/pages/DepartmentDetail')) 

export default function App() {
  return (
    <LoaderProvider>
      <MotionConfig reducedMotion="user">
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="tentang-kami" element={<About />} />
            {}
            <Route path="tentang-kami/departemen/:slug" element={<DepartmentDetail />} />
            <Route path="galeri" element={<Galeri />} />
            <Route path="berita" element={<News />} />
          </Route>
        </Routes>
        {}
        <Loader />
      </MotionConfig>
    </LoaderProvider>
  )
}
