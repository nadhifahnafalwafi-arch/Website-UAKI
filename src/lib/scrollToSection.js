// REVISI: FILE BARU
import { animate } from 'framer-motion'
import { easeOut, SECTION_SCROLL } from '@/lib/animations'


let current = null 

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function targetTop(el) {
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
  const max = document.documentElement.scrollHeight - window.innerHeight
  return Math.max(0, Math.min(max, el.getBoundingClientRect().top + window.scrollY - margin))
}

function focusHeading(section) {
  const el = section.querySelector('h1, h2') ?? section
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}

function setHash(id) {
  const hash = `#${id}`
  if (window.location.hash === hash) return
  window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}${hash}`)
}

export function scrollToSection(id, { updateHash = true, focus = true } = {}) {
  const section = document.getElementById(id)
  if (!section) return false

  current?.stop()
  const done = () => {
    current = null
    if (focus) focusHeading(section)
    if (updateHash) setHash(id)
  }

  const start = window.scrollY
  const distance = Math.abs(targetTop(section) - start)

  if (prefersReducedMotion() || distance < 2) {
    window.scrollTo({ top: targetTop(section), behavior: 'instant' })
    done()
    return true
  }

  const duration = Math.min(
    SECTION_SCROLL.maxDuration,
    Math.max(SECTION_SCROLL.minDuration, distance / SECTION_SCROLL.pxPerSecond),
  )

  const cancelEvents = ['wheel', 'touchstart', 'keydown']
  const cancel = () => current?.stop()
  cancelEvents.forEach((ev) => window.addEventListener(ev, cancel, { passive: true, once: true }))
  const cleanup = () => cancelEvents.forEach((ev) => window.removeEventListener(ev, cancel))

  current = animate(0, 1, {
    duration,
    ease: easeOut,
    onUpdate: (p) => {
      window.scrollTo({ top: start + (targetTop(section) - start) * p, behavior: 'instant' })
    },
    onComplete: () => {
      cleanup()
      done()
    },
    onStop: cleanup,
  })
  return true
}

export function handleSectionLinkClick(event) {
  const href = event.currentTarget.getAttribute('href') ?? ''
  if (!href.startsWith('#')) return
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
    return
  if (scrollToSection(href.slice(1))) event.preventDefault()
}
