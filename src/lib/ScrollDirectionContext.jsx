import { createContext, useContext } from 'react'
import useScrollDirection from '@/lib/useScrollDirection'

const ScrollDirectionContext = createContext('down')

export function ScrollDirectionProvider({ children }) {
  const direction = useScrollDirection()
  return <ScrollDirectionContext.Provider value={direction}>{children}</ScrollDirectionContext.Provider>
}

export function useScrollDirectionContext() {
  return useContext(ScrollDirectionContext)
}
