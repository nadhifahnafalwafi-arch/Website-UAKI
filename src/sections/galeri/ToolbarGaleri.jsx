import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, ClipboardList, Info, Search, Users, X } from 'lucide-react'
import Container from '@/components/Container'
import { Reveal, TypewriterText } from '@/components/animations' 
import { getSearchSuggestions } from '@/lib/gallery'
import { DEFAULT_YEAR } from '@/data/galleryConfig'
import { GALLERY_EXPLORE_ID, GALLERY_SUBTITLE, GALLERY_TITLE } from '@/lib/content/galeri' 

const MIN_CHARS = 2 
const MAX_SUGGESTIONS = 6

const TYPE_META = {
  departemen: { icon: Users, label: 'Departemen' },
  proker: { icon: ClipboardList, label: 'Program kerja' },
}

export default function ToolbarGaleri({
  photos,
  input,
  onInput,
  onQueryNow,
  onClear,
  year,
  years,
  onYear,
  resultCount,
  isFiltered,
  onReset,
}) {
  const reduce = useReducedMotion()
  const uid = useId().replace(/:/g, '')
  const ids = { input: `${uid}-q`, hint: `${uid}-hint`, list: `${uid}-list`, year: `${uid}-year` }
  const inputRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)

  const suggestions = useMemo(
    () => (input.trim().length >= MIN_CHARS ? getSearchSuggestions(photos, input, MAX_SUGGESTIONS) : []),
    [photos, input],
  )
  const showList = open && suggestions.length > 0

  useEffect(() => setActive(-1), [suggestions])

  const choose = (s) => {
    onQueryNow(s.value)
    setOpen(false)
    setActive(-1)
    inputRef.current?.focus()
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      if (!suggestions.length) return
      e.preventDefault()
      setOpen(true)
      setActive((i) => (i + 1) % suggestions.length)
    } else if (e.key === 'ArrowUp') {
      if (!suggestions.length) return
      e.preventDefault()
      setOpen(true)
      setActive((i) => (i <= 0 ? suggestions.length - 1 : i - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (showList && active >= 0) choose(suggestions[active])
      else {
        onQueryNow(input) 
        setOpen(false)
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      if (showList) setOpen(false)
      else if (input) onClear()
    }
  }

  return (
    <section
      id={GALLERY_EXPLORE_ID}
      aria-label="Cari foto"
      className="relative z-20 bg-mist pb-6 pt-12 lg:pb-8 lg:pt-16" 
    >
      <Container>
        {}
        <div className="mb-7 text-center">
          <TypewriterText as="h2" text={GALLERY_TITLE} className="text-display font-bold text-brand" />
          <Reveal as="p" delay={0.2} className="mx-auto mt-3 max-w-[640px] text-body font-medium text-moss">
            {GALLERY_SUBTITLE}
          </Reveal>
        </div>

        <Reveal>
          <div
            role="search"
            className="flex flex-col gap-3 md:grid md:grid-cols-[minmax(0,1fr)_11rem] md:gap-x-3 md:gap-y-2.5"
          >
            {}
            <div className="relative md:col-start-1 md:row-start-1">
              <label htmlFor={ids.input} className="sr-only">
                Cari foto
              </label>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-brand/60"
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                id={ids.input}
                type="text"
                inputMode="search"
                autoComplete="off"
                role="combobox"
                aria-expanded={showList}
                aria-controls={ids.list}
                aria-autocomplete="list"
                aria-activedescendant={showList && active >= 0 ? `${ids.list}-${active}` : undefined}
                aria-describedby={ids.hint}
                value={input}
                onChange={(e) => {
                  onInput(e.target.value)
                  setOpen(true)
                }}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                onKeyDown={onKeyDown}
                placeholder="Cari nama departemen atau program kerja..."
                className="min-h-12 w-full rounded-xl border border-leaf/40 bg-white pl-11 pr-12 text-body-sm font-medium text-brand placeholder:text-brand/50 focus:border-leaf focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf/50"
              />
              {input && (
                <button
                  type="button"
                  onClick={() => {
                    onClear()
                    inputRef.current?.focus()
                  }}
                  aria-label="Hapus pencarian"
                  className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg text-brand/60 outline-none hover:text-brand focus-visible:ring-2 focus-visible:ring-leaf"
                >
                  <X className="h-[18px] w-[18px]" aria-hidden="true" />
                </button>
              )}

              {}
              <AnimatePresence>
                {showList && (
                  <motion.ul
                    id={ids.list}
                    role="listbox"
                    aria-label="Saran pencarian"
                    className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-leaf/30 bg-white py-1.5 shadow-photo"
                    initial={reduce ? false : { opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                  >
                    {suggestions.map((s, i) => {
                      const meta = TYPE_META[s.type]
                      const Icon = meta.icon
                      return (
                        <li
                          key={`${s.type}-${s.value}`}
                          id={`${ids.list}-${i}`}
                          role="option"
                          aria-selected={i === active}
                          onMouseDown={(e) => {
                            e.preventDefault()
                            choose(s)
                          }}
                          onMouseMove={() => setActive(i)}
                          className={`flex min-h-11 cursor-pointer items-center gap-3 px-4 py-2 ${
                            i === active ? 'bg-mist' : ''
                          }`}
                        >
                          <Icon className="h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-body-sm font-semibold text-brand">{s.label}</span>
                            {s.type === 'proker' && s.departemen && (
                              <span className="block truncate text-footer text-brand/60">{s.departemen}</span>
                            )}
                          </span>
                          <span className="shrink-0 rounded-full bg-mist px-2 py-0.5 text-[11px] font-semibold text-brand/70">
                            {meta.label}
                          </span>
                        </li>
                      )
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {}
            <div className="flex flex-col gap-1.5 md:col-span-2 md:row-start-2 md:flex-row md:items-start md:justify-between md:gap-4">
              <p id={ids.hint} className="flex items-start gap-1.5 text-footer font-medium text-brand/70">
                <Info className="mt-[3px] h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Kata kunci yang bisa dicari hanya nama departemen dan nama program kerja.</span>
              </p>
              <p aria-live="polite" className="text-footer font-semibold text-brand md:shrink-0 md:text-right">
                {isFiltered && (
                  <>
                    {resultCount} foto ditemukan
                    <span aria-hidden="true" className="mx-1.5 text-brand/40">
                      &middot;
                    </span>
                    <button
                      type="button"
                      onClick={onReset}
                      className="rounded font-semibold text-brand underline decoration-leaf underline-offset-2 outline-none hover:decoration-brand focus-visible:ring-2 focus-visible:ring-leaf"
                    >
                      Reset
                    </button>
                  </>
                )}
              </p>
            </div>

            {}
            <div className="relative md:col-start-2 md:row-start-1">
              <label htmlFor={ids.year} className="sr-only">
                Tahun
              </label>
              <select
                id={ids.year}
                value={year}
                onChange={(e) => onYear(e.target.value)}
                className="min-h-12 w-full cursor-pointer appearance-none rounded-xl border border-leaf/40 bg-white pl-4 pr-10 text-body-sm font-semibold text-brand focus:border-leaf focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf/50"
              >
                <option value={DEFAULT_YEAR}>Semua tahun</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    Tahun {y}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand/70"
                aria-hidden="true"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
