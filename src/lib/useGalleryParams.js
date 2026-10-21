import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DEFAULT_YEAR } from '@/data/galleryConfig'

const DEBOUNCE_MS = 300

export default function useGalleryParams() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const year = params.get('tahun') ?? DEFAULT_YEAR
  const page = Math.max(1, Number.parseInt(params.get('halaman') ?? '1', 10) || 1)

  const [input, setInputState] = useState(q)
  const timer = useRef(0)

  useEffect(() => {
    setInputState(q)
  }, [q])
  useEffect(() => () => clearTimeout(timer.current), [])

  const update = useCallback(
    (changes, { replace = false } = {}) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          Object.entries(changes).forEach(([key, value]) => {
            const isDefault =
              value === '' ||
              value == null ||
              (key === 'tahun' && value === DEFAULT_YEAR) ||
              (key === 'halaman' && Number(value) <= 1)
            if (isDefault) next.delete(key)
            else next.set(key, String(value))
          })
          return next
        },
        { replace },
      )
    },
    [setParams],
  )

  const setInput = useCallback(
    (value) => {
      setInputState(value)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => update({ q: value.trim(), halaman: 1 }, { replace: true }), DEBOUNCE_MS)
    },
    [update],
  )

  const clearQuery = useCallback(() => {
    clearTimeout(timer.current)
    setInputState('')
    update({ q: '', halaman: 1 }, { replace: true })
  }, [update])

  const setQueryNow = useCallback(
    (value) => {
      clearTimeout(timer.current)
      setInputState(value)
      update({ q: value.trim(), halaman: 1 }, { replace: true })
    },
    [update],
  )

  const resetAll = useCallback(() => {
    clearTimeout(timer.current)
    setInputState('')
    update({ q: '', tahun: DEFAULT_YEAR, halaman: 1 })
  }, [update])

  const setYear = useCallback((value) => update({ tahun: value, halaman: 1 }), [update])
  const setPage = useCallback((value) => update({ halaman: value }), [update])
  const fixPage = useCallback((value) => update({ halaman: value }, { replace: true }), [update])
  const fixYear = useCallback((value) => update({ tahun: value }, { replace: true }), [update])

  return { q, year, page, input, setInput, setQueryNow, clearQuery, resetAll, setYear, setPage, fixPage, fixYear } 
}
