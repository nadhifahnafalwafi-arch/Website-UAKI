
import { departments, getDepartmentBySlug } from '@/data/departments'

const IS_DEV = Boolean(import.meta.env?.DEV)

export function normalize(text = '') {
  return String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

const MONTH_NAMES = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
]

function parseDate(date = '') {
  const [y, m, d] = String(date).split('-')
  return { year: y ?? '', month: Number(m) || 0, day: Number(d) || 0 }
}

export function formatDate(date) {
  const { year, month, day } = parseDate(date)
  const name = MONTH_NAMES[month - 1]
  return name ? `${day} ${name} ${year}` : ''
}

const warned = new Set()

export function getDepartmentOf(photo) {
  const dept = getDepartmentBySlug(photo.departemen)
  if (!dept && IS_DEV && !warned.has(photo.id)) {
    warned.add(photo.id)
    console.warn(
      `[galeri] Foto "${photo.id}": departemen "${photo.departemen}" tidak ditemukan di src/data/departments.js. ` +
        `Slug yang valid: ${departments.map((d) => d.slug).join(', ')}`,
    )
  }
  return dept
}

export function getPhotoCaption(photo) {
  if (photo.proker) return photo.proker
  return getDepartmentOf(photo)?.fullName ?? photo.departemen ?? ''
}

export function getAlt(photo) {
  if (photo.alt) return photo.alt
  const dept = getDepartmentOf(photo)
  const deptName = dept ? `Departemen ${dept.fullName}` : ''
  const when = formatDate(photo.date)
  const base = photo.proker
    ? `Dokumentasi ${photo.proker}${deptName ? `, ${deptName}` : ''}`
    : `Dokumentasi kegiatan ${deptName || 'UAKI UB'}`
  return when ? `${base}, ${when}` : base
}

export const SEARCH_WEIGHTS = { proker: 3, departemen: 2 }

export function buildSearchIndex(photos) {
  const index = new Map()
  photos.forEach((p) => {
    const dept = getDepartmentOf(p)
    index.set(p.id, {
      departemen: dept ? [...new Set([normalize(dept.name), normalize(dept.fullName)])] : [],
      proker: normalize(p.proker),
    })
  })
  return index
}

function scoreToken(entry, token) {
  let score = 0
  if (entry.proker && entry.proker.includes(token)) score += SEARCH_WEIGHTS.proker
  if (entry.departemen.some((n) => n.includes(token))) score += SEARCH_WEIGHTS.departemen
  return score
}

const byDateDesc = (a, b) => (a.date === b.date ? a.id.localeCompare(b.id) : a.date < b.date ? 1 : -1)
const deptOrder = (slug) => {
  const i = departments.findIndex((d) => d.slug === slug)
  return i === -1 ? departments.length : i
}

export function mixOrder(photos) {
  const groups = new Map()
  ;[...photos].sort(byDateDesc).forEach((p) => {
    if (!groups.has(p.departemen)) groups.set(p.departemen, [])
    groups.get(p.departemen).push(p)
  })
  const queues = [...groups.entries()]
    .sort(([sa, a], [sb, b]) => byDateDesc(a[0], b[0]) || deptOrder(sa) - deptOrder(sb))
    .map(([, list]) => list)

  const out = []
  for (let round = 0, added = true; added; round += 1) {
    added = false
    queues.forEach((list) => {
      if (round < list.length) {
        out.push(list[round])
        added = true
      }
    })
  }
  return out
}

export function searchPhotos(photos, query = '', year = 'semua', index = buildSearchIndex(photos)) {
  const byYear = year && year !== 'semua' ? photos.filter((p) => parseDate(p.date).year === String(year)) : photos
  const tokens = normalize(query).split(' ').filter(Boolean)
  if (tokens.length === 0) return mixOrder(byYear)

  const scored = []
  byYear.forEach((p) => {
    const entry = index.get(p.id)
    if (!entry) return
    let total = 0
    for (const token of tokens) {
      const s = scoreToken(entry, token)
      if (s === 0) return 
      total += s
    }
    scored.push({ p, total })
  })
  return scored.sort((a, b) => b.total - a.total || byDateDesc(a.p, b.p)).map((x) => x.p)
}

export function getSearchSuggestions(photos, query = '', limit = 6) {
  const q = normalize(query)
  const tokens = q.split(' ').filter(Boolean)
  if (tokens.length === 0) return []

  const depts = new Map()
  const prokers = new Map()
  photos.forEach((p) => {
    const dept = getDepartmentOf(p)
    if (dept) {
      const d = depts.get(dept.slug) ?? {
        type: 'departemen',
        label: dept.fullName,
        value: dept.fullName,
        slug: dept.slug,
        count: 0,
        keys: [dept.name, dept.fullName],
      }
      d.count += 1
      depts.set(dept.slug, d)
    }
    if (p.proker) {
      const key = normalize(p.proker)
      const item = prokers.get(key) ?? {
        type: 'proker',
        label: p.proker,
        value: p.proker,
        count: 0,
        keys: [p.proker],
        depts: new Set(),
      }
      item.count += 1
      item.depts.add(dept?.fullName ?? p.departemen)
      prokers.set(key, item)
    }
  })

  const matches = (item) => {
    const hay = item.keys.map(normalize)
    return tokens.every((t) => hay.some((h) => h.includes(t)))
  }
  const startsWith = (item) => item.keys.some((k) => normalize(k).startsWith(q))
  const rank = (a, b) =>
    Number(startsWith(b)) - Number(startsWith(a)) || b.count - a.count || a.label.localeCompare(b.label)
  const strip = ({ keys, depts, ...rest }) => (depts ? { ...rest, departemen: [...depts].join(', ') } : rest)

  return [...[...depts.values()].filter(matches).sort(rank), ...[...prokers.values()].filter(matches).sort(rank)]
    .slice(0, limit)
    .map(strip)
}

export function getYears(photos) {
  return [...new Set(photos.map((p) => parseDate(p.date).year).filter(Boolean))].sort((a, b) => b.localeCompare(a))
}

export function paginate(list, page = 1, perPage = 20) {
  const totalPages = Math.max(1, Math.ceil(list.length / perPage))
  const safe = Math.min(Math.max(1, Math.floor(Number(page)) || 1), totalPages)
  const start = (safe - 1) * perPage
  return { items: list.slice(start, start + perPage), totalPages, page: safe }
}

export function buildPageList(current, total, mobile = false) {
  const t = Math.max(1, Math.floor(total) || 1)
  const p = Math.min(Math.max(1, Math.floor(current) || 1), t)
  const range = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => from + i)
  if (t <= 5) return range(1, t)

  if (p <= 3) return mobile ? [1, 2, 3, '…', t] : [1, 2, 3, 4, '…', t]
  if (p >= t - 2) return mobile ? [1, '…', t - 2, t - 1, t] : [1, '…', t - 3, t - 2, t - 1, t]
  return mobile ? [1, '…', p, '…', t] : [1, '…', p - 1, p, p + 1, '…', t]
}
