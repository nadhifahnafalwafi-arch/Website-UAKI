import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react' 
import Container from '@/components/Container'
import { buildPageList } from '@/lib/gallery' 
import { transitions } from '@/lib/animations'

const COMPACT_QUERY = '(max-width: 639px)' 

function useCompact() {
  const [compact, setCompact] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(COMPACT_QUERY).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(COMPACT_QUERY)
    const onChange = (e) => setCompact(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return compact
}

const circle =
  'flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-body-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-mist sm:h-10 sm:w-10'
const idle = 'border border-leaf/50 bg-white text-brand'
function ArrowButton({ dir, disabled, onClick }) {
  const reduce = useReducedMotion()
  const Icon = dir === 'prev' ? ChevronLeft : ChevronRight
  return (
    <motion.button
      type="button"
      aria-label={dir === 'prev' ? 'Halaman sebelumnya' : 'Halaman berikutnya'}
      aria-disabled={disabled}
      onClick={() => !disabled && onClick()}
      className={`${circle} ${idle} ${disabled ? 'cursor-default opacity-40' : ''}`}
      whileHover={disabled || reduce ? undefined : { y: -2 }}
      whileTap={disabled || reduce ? undefined : { scale: 0.92 }}
      transition={transitions.spring}
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={2.5} aria-hidden="true" />
    </motion.button>
  )
}

export default function PaginasiGaleri({ page, totalPages, onPage }) {
  const reduce = useReducedMotion()
  const compact = useCompact()
  if (totalPages <= 1) return null
  const items = buildPageList(page, totalPages, compact) 

  return (
    <nav aria-label="Paginasi galeri" className="bg-mist pb-section lg:pb-section-lg">
      <Container>
        {}
        <ul className="flex flex-wrap items-center justify-center gap-1 sm:gap-2.5">
          <li>
            <ArrowButton dir="prev" disabled={page <= 1} onClick={() => onPage(page - 1)} />
          </li>
          {items.map((item, k) =>
            item === '…' ? (
              <li
                key={`e${k}`}
                aria-hidden="true"
                className="flex h-11 w-6 items-center justify-center text-brand/60 sm:h-10"
              >
                …
              </li>
            ) : (
              <li key={item}>
                <motion.button
                  type="button"
                  onClick={() => item !== page && onPage(item)}
                  aria-label={`Halaman ${item}`}
                  aria-current={item === page ? 'page' : undefined}
                  className={`${circle} ${item === page ? 'cursor-default bg-moss text-cream shadow-button' : idle}`}
                  whileHover={item === page || reduce ? undefined : { y: -2 }}
                  whileTap={item === page || reduce ? undefined : { scale: 0.92 }}
                  transition={transitions.spring}
                >
                  {item}
                </motion.button>
              </li>
            ),
          )}
          <li>
            <ArrowButton dir="next" disabled={page >= totalPages} onClick={() => onPage(page + 1)} />
          </li>
        </ul>
      </Container>
    </nav>
  )
}
