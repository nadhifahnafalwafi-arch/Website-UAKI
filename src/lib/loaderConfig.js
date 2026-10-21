
import heroPhoto from '@/assets/img/hero-foto-bersama.jpg'
import logoUrl from '@/assets/svg/logoUAKI.svg'

export const LOADER_MODE = 'session'

export const SESSION_KEY = 'uaki-loader-seen'

export const MIN_DURATION = 2200 
export const MAX_DURATION = 5000 
export const HOLD_AFTER_COMPLETE = 500 
export const EXIT_DURATION = 0.9 

export const REDUCED = { minDuration: 500, maxDuration: 900, exitDuration: 0.3 }

export const CREEP_MAX = 0.9
export const CREEP_SPEED = 0.18

export const SPARKS = { count: 12, countMobile: 6, duration: 1.6, rise: 80 }

export const LOADER_COLORS = {
  background: 'radial-gradient(60% 55% at 50% 45%, #626F44 0%, #4C5735 60%, #404A2E 100%)',
  edge: '#404A2E', 
  fillLine: '#A6B465',
  flameGlow: 'rgba(240, 173, 63, 0.55)',
  spark: '#FFBD52',
}

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => (img.decode ? img.decode().then(resolve, resolve) : resolve())
    img.onerror = resolve
    img.src = src
  })
}

export function getLoaderTasks() {
  return [
    { label: 'font', run: () => document.fonts?.ready ?? Promise.resolve() },
    {
      label: 'halaman dimuat',
      run: () =>
        document.readyState === 'complete'
          ? Promise.resolve()
          : new Promise((r) => window.addEventListener('load', r, { once: true })),
    },
    { label: 'foto bersama (Hero)', run: () => preloadImage(heroPhoto) },
    { label: 'logo', run: () => preloadImage(logoUrl) },
  ]
}

export function shouldShowLoader() {
  try {
    if (new URLSearchParams(window.location.search).get('loader') === '1') return true
    if (LOADER_MODE === 'always') return true
    return !window.sessionStorage.getItem(SESSION_KEY)
  } catch {
    return true 
  }
}

export function markLoaderSeen() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, '1')
  } catch {
  }
}
