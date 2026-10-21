import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import usePageMeta from '@/lib/usePageMeta'
import useGalleryParams from '@/lib/useGalleryParams'
import { scrollToSection } from '@/lib/scrollToSection' 
import { buildSearchIndex, getYears, paginate, searchPhotos } from '@/lib/gallery'
import { galleryPhotos, PHOTOS_PER_PAGE, DEFAULT_YEAR } from '@/data/galleryConfig'
import { galleryMeta, GALLERY_EXPLORE_ID } from '@/lib/content/galeri' 
import HeroGaleri from '@/sections/galeri/HeroGaleri'
import ToolbarGaleri from '@/sections/galeri/ToolbarGaleri'
import GridGaleri from '@/sections/galeri/GridGaleri'
import PaginasiGaleri from '@/sections/galeri/PaginasiGaleri'
import LightboxGaleri from '@/sections/galeri/LightboxGaleri'

export default function Galeri() {
  usePageMeta(galleryMeta)
  const { q, year, page, input, setInput, setQueryNow, clearQuery, resetAll, setYear, setPage, fixPage, fixYear } =
    useGalleryParams() 

  const index = useMemo(() => buildSearchIndex(galleryPhotos), [])
  const years = useMemo(() => getYears(galleryPhotos), [])

  const validYear = year === DEFAULT_YEAR || years.includes(year) ? year : DEFAULT_YEAR
  useEffect(() => {
    if (validYear !== year) fixYear(validYear)
  }, [validYear, year, fixYear])

  const results = useMemo(() => searchPhotos(galleryPhotos, q, validYear, index), [q, validYear, index])
  const { items, totalPages, page: safePage } = paginate(results, page, PHOTOS_PER_PAGE)
  const startIndex = (safePage - 1) * PHOTOS_PER_PAGE
  const isFiltered = Boolean(q) || validYear !== DEFAULT_YEAR 

  useEffect(() => {
    if (safePage !== page) fixPage(safePage)
  }, [safePage, page, fixPage])

  const goToPage = useCallback(
    (p) => {
      setPage(p)
      requestAnimationFrame(() => scrollToSection(GALLERY_EXPLORE_ID, { updateHash: false }))
    },
    [setPage],
  )

  const [openIndex, setOpenIndex] = useState(null)
  useEffect(() => setOpenIndex(null), [q, validYear])

  const openerIndex = useRef(null) 
  const pendingFocus = useRef(null)

  const openLightbox = useCallback((i) => {
    openerIndex.current = i
    setOpenIndex(i)
  }, [])

  const closeLightbox = useCallback(
    (lastIndex) => {
      setOpenIndex(null)
      const lastPage = Math.floor(lastIndex / PHOTOS_PER_PAGE) + 1
      if (lastPage !== safePage) {
        setPage(lastPage)
        pendingFocus.current = { index: lastIndex, scroll: true }
      } else {
        pendingFocus.current = { index: openerIndex.current ?? lastIndex, scroll: false }
      }
    },
    [safePage, setPage],
  )

  useEffect(() => {
    if (openIndex !== null || !pendingFocus.current) return undefined
    const { index: target, scroll } = pendingFocus.current
    let tries = 0
    let frame = 0
    const attempt = () => {
      const el = document.querySelector(`[data-photo-index="${target}"]`)
      if (el) {
        pendingFocus.current = null
        el.focus({ preventScroll: true })
        if (scroll) el.scrollIntoView({ block: 'center', behavior: 'instant' })
      } else if (tries < 60) {
        tries += 1
        frame = requestAnimationFrame(attempt)
      }
    }
    frame = requestAnimationFrame(attempt)
    return () => cancelAnimationFrame(frame)
  }, [openIndex, safePage])

  return (
    <>
      <HeroGaleri />
      <ToolbarGaleri
        photos={galleryPhotos}
        input={input}
        onInput={setInput}
        onQueryNow={setQueryNow}
        onClear={clearQuery}
        year={validYear}
        years={years}
        onYear={setYear}
        resultCount={results.length}
        isFiltered={isFiltered}
        onReset={resetAll}
      />
      <GridGaleri
        items={items}
        startIndex={startIndex}
        onOpen={openLightbox}
        animKey={`${q}|${validYear}|${safePage}`}
        query={q}
        dataEmpty={galleryPhotos.length === 0}
        onReset={resetAll}
      />
      <PaginasiGaleri page={safePage} totalPages={totalPages} onPage={goToPage} />
      {}
      <LightboxGaleri photos={results} index={openIndex} onIndex={setOpenIndex} onClose={closeLightbox} />
    </>
  )
}
