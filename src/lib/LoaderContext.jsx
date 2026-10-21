import { createContext, useContext, useLayoutEffect, useMemo, useState } from 'react'
import { shouldShowLoader } from '@/lib/loaderConfig'

const LoaderContext = createContext({ showLoader: false, isLoaderDone: true, setLoaderDone: () => {} })

export function LoaderProvider({ children }) {
  const [showLoader] = useState(() => (typeof window === 'undefined' ? false : shouldShowLoader()))
  const [isLoaderDone, setLoaderDone] = useState(!showLoader)

  useLayoutEffect(() => {
    document.getElementById('uaki-preloader')?.remove()
  }, [])

  const value = useMemo(() => ({ showLoader, isLoaderDone, setLoaderDone }), [showLoader, isLoaderDone])
  return <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
}

export const useLoader = () => useContext(LoaderContext)

export const useLoaderDone = () => useContext(LoaderContext).isLoaderDone

export function useEntrance(visible = 'visible', hidden = 'hidden') {
  return useLoaderDone() ? visible : hidden
}
