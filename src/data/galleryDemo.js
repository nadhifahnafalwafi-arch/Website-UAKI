function seeded(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const RATIOS = [
  [1200, 1600], 
  [1200, 1500], 
  [1200, 1200], 
  [1600, 1200], 
  [1600, 900], 
  [1200, 1800], 
]


const DEPARTMENTS = [
  {
    slug: 'cm',
    proker: [
      ['Kelas Desain', ['2024-03-09', '2025-02-22']],
      ['Podcast Kampus', ['2024-08-17', '2025-07-26']],
    ],
    free: ['2024-11-02', '2025-10-18'],
  },
  {
    slug: 'kp',
    proker: [
      ['Sekolah Kader', ['2024-02-24', '2025-02-15']],
      ['Pembinaan Pekanan', ['2024-05-04', '2025-05-10']],
      ['Upgrading Pengurus', ['2024-09-28', '2025-09-13']],
    ],
    free: ['2025-12-06'],
  },
  {
    slug: 'rab',
    proker: [
      ['Santunan Yatim', ['2024-03-31', '2025-03-16']],
      ['Sedekah Subuh', ['2024-07-12', '2025-06-20']],
    ],
    free: ['2024-12-14', '2025-11-29'],
  },
  {
    slug: 'syiar',
    proker: [
      ['Kajian Pekanan', ['2024-04-19', '2025-04-25']],
      ['Syiar Ramadan', ['2024-03-22', '2025-03-07']],
    ],
    free: ['2024-10-25'],
  },
  {
    slug: 'humas',
    proker: [
      ['Kunjungan Lembaga', ['2024-06-08', '2025-05-24']],
      ['Media Partner', ['2024-10-05', '2025-09-27']],
    ],
    free: ['2025-01-11'],
  },
  {
    slug: 'mentoring',
    proker: [
      ['Sekolah Mentor', ['2024-02-10', '2025-02-01']],
      ['Mentoring Akbar', ['2024-09-21', '2025-09-06']],
      ['Sertifikasi Mentor', ['2024-12-07', '2025-11-22']],
    ],
    free: [],
  },
  {
    slug: 'ekraf',
    proker: [
      ['Bazar Kreatif', ['2024-05-18', '2025-05-03']],
      ['Pelatihan Wirausaha', ['2024-11-16', '2025-10-11']],
    ],
    free: ['2025-08-09'],
  },
  {
    slug: 'mucc',
    proker: [
      ['Kajian Muslimah', ['2024-04-06', '2025-04-12']],
      ['Muslimah Gathering', ['2024-10-19', '2025-10-25']],
    ],
    free: ['2024-07-20'],
  },
  {
    slug: 'bpi',
    proker: [
      ['Rapat Kerja', ['2024-01-20', '2025-01-18']],
      ['Musyawarah Besar', ['2024-12-21', '2025-12-13']],
      ['Evaluasi Tengah Periode', ['2024-07-06', '2025-07-05']],
    ],
    free: ['2025-03-29'],
  },
  {
    slug: 'ppm',
    proker: [
      ['Pekan Muhasabah', ['2024-03-15', '2025-03-21']],
      ['Forum Adab', ['2024-08-31', '2025-08-23']],
    ],
    free: ['2024-12-28'],
  },
]

const PER_DEPARTMENT = 13 

function generateDemoPhotos() {
  const rand = seeded(20250101)
  const pick = (arr) => arr[Math.floor(rand() * arr.length)]
  const out = []
  let n = 0

  DEPARTMENTS.forEach(({ slug, proker, free }) => {
    const slots = [
      ...proker.flatMap(([name, dates]) => dates.map((date) => [name, date])),
      ...free.map((date) => ['', date]),
    ]
    for (let i = 0; i < PER_DEPARTMENT; i += 1) {
      n += 1
      const [name, date] = slots[i % slots.length]
      const [width, height] = pick(RATIOS)
      out.push({
        id: `demo-${String(n).padStart(3, '0')}`,
        file: '', 
        width,
        height,
        departemen: slug,
        proker: name,
        date,
        alt: '',
      })
    }
  })
  return out
}

export const demoPhotos = generateDemoPhotos()
