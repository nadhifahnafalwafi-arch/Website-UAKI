import { LOGO_PATHS } from './logoUakiPaths'

export const LOGO_PART_STYLE = [
  {
    origin: [25.5, 28.5], 
    effect: 'sway',
    glow: { x: '63%', y: '21%', color: 'rgba(240, 173, 63, 0.45)' },
  },
  {
    origin: [23, 40],
    effect: 'flow',
    glow: { x: '54%', y: '56%', color: 'rgba(189, 216, 80, 0.42)' },
  },
  {
    origin: [22.5, 46],
    effect: 'warm',
    glow: { x: '52%', y: '62%', color: 'rgba(126, 144, 65, 0.32)' },
    shimmer: { x: '61%', y: '43%', color: 'rgba(255, 189, 82, 0.75)' },
  },
]

export function toGray(hex, lift = 0) {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  const y = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b + lift)
  const v = Math.max(0, Math.min(255, y)).toString(16).padStart(2, '0')
  return `#${v}${v}${v}`.toUpperCase()
}

export function buildPartOfPath(points) {
  const map = new Array(LOGO_PATHS.length).fill(null)
  points.forEach((pt, part) =>
    pt.paths.forEach((i) => {
      if (import.meta.env.DEV && map[i] !== null) console.warn(`[logo] path ${i} masuk lebih dari satu bagian`)
      map[i] = part
    }),
  )
  if (import.meta.env.DEV) {
    const missing = map.map((p, i) => (p === null ? i : null)).filter((i) => i !== null)
    if (missing.length) console.warn(`[logo] path tanpa bagian: ${missing.join(', ')}`)
  }
  return map
}

export function partBounds(pathIndexes, pad = 1.2) {
  let x1 = Infinity
  let y1 = Infinity
  let x2 = -Infinity
  let y2 = -Infinity
  pathIndexes.forEach((i) => {
    const [x, y, w, h] = LOGO_PATHS[i].bbox
    x1 = Math.min(x1, x)
    y1 = Math.min(y1, y)
    x2 = Math.max(x2, x + w)
    y2 = Math.max(y2, y + h)
  })
  return { x: x1 - pad, y: y1 - pad, width: x2 - x1 + pad * 2, height: y2 - y1 + pad * 2 }
}
