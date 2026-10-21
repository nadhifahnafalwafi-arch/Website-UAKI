
export const PHOTO_EXT = 'jpg'

const BASE = `${import.meta.env.BASE_URL}img/departemen/`

const RAW = [
  { slug: 'cm', name: 'CM', fullName: 'Creative Media' },
  { slug: 'kp', name: 'KP', fullName: 'Kaderisasi & Pembinaan' },
  { slug: 'rab', name: 'RAB', fullName: 'Rumah Amal Brawijaya' },
  { slug: 'syiar', name: 'Syiar', fullName: 'Syiar', logoScale: 1.35 },
  { slug: 'humas', name: 'HUMAS', fullName: 'Hubungan Masyarakat' },
  { slug: 'mentoring', name: 'Mentoring', fullName: 'Mentoring', logoScale: 1.1 },
  { slug: 'ekraf', name: 'EKRAF', fullName: 'Ekonomi Kreatif' },
  { slug: 'mucc', name: 'MUCC', fullName: 'Muslimah Center Community' },
  { slug: 'bpi', name: 'BPI', fullName: 'Badan Pengurus Inti' },
  { slug: 'ppm', name: 'PPM', fullName: 'Pengawasan dan Peneguhan Moral' },
]

export const departments = RAW.map((d, i) => ({
  id: i + 1,
  slug: d.slug,
  name: d.name,
  fullName: d.fullName,
  photo: `${BASE}${d.slug}.${PHOTO_EXT}`,
  logoWhite: `${BASE}logo/${d.slug}-putih.png`,
  logoGreen: `${BASE}logo/${d.slug}-hijau.png`,
  logoScale: d.logoScale ?? 1,
}))

export const getDepartmentBySlug = (slug) => departments.find((d) => d.slug === slug) ?? null

export const departmentPath = (slug) => `/tentang-kami/departemen/${slug}`
