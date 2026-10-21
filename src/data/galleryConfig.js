import { photos as realPhotos } from './gallery'
import { demoPhotos } from './galleryDemo'

export const USE_DEMO_DATA = true

export const PHOTOS_PER_PAGE = 20

export const DEFAULT_YEAR = 'semua'

export const galleryPhotos = USE_DEMO_DATA ? demoPhotos : realPhotos

export const GALLERY_GRID = {
  columns: [
    { minWidth: 1024, cols: 4 },
    { minWidth: 768, cols: 3 },
    { minWidth: 0, cols: 2 },
  ],
  gap: 16,
  gapMobile: 10,
  mobileBelow: 768,
  tones: ['#D9DEC4', '#AEBB88'],
  eager: 4,
}

export const GALLERY_LIGHTBOX = {
  overlay: 'rgba(31, 38, 22, 0.88)',
  blur: '6px',
  frameWidth: 3,
  frameRadius: 12,
  duration: 0.28,
  swipeThreshold: 80,
}
