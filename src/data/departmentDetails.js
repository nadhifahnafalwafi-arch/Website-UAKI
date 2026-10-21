/* Isi halaman detail tiap departemen (/tentang-kami/departemen/:slug).*/
import { departments, getDepartmentBySlug } from './departments'

export const DETAIL_PHOTO_EXT = 'jpg'

const BASE = `${import.meta.env.BASE_URL}img/departemen/`

export const getKegiatanPhoto = (slug) => `${BASE}kegiatan/${slug}.${DETAIL_PHOTO_EXT}`

export const getProkerPhoto = (slug, index, photo) => {
  if (photo) return /^https?:\/\//.test(photo) ? photo : `${import.meta.env.BASE_URL}${photo.replace(/^\//, '')}`
  return `${BASE}proker/${slug}/${String(index + 1).padStart(2, '0')}.${DETAIL_PHOTO_EXT}`
}

export const departmentDetails = {
  cm: {
    about: 'Departemen Creative Media merupakan departemen yang bertanggung jawab membangun identitas visual, komunikasi digital, dan strategi pemasaran organisasi melalui konten kreatif yang edukatif, inspiratif, dan relevan. Departemen ini berperan dalam memperkuat branding organisasi, mengoptimalkan penyebaran pesan dakwah, serta menghadirkan citra UAKI UB yang profesional, inovatif, dan dekat dengan mahasiswa.',
    proker: [
      { name: 'LABORATORIUM', description: 'Pusat Produksi kreativitas para staff Creative Media' },
      { name: 'COMPANY PROFILE', description: 'Memproduksi video profesional serta website yang digunakan untuk memperkenalkan UAKI UB.' },
      { name: 'UPSKILL WORKSHOP', description: 'Memberikan kelas Pembelajaran untuk para staf internal CM tentang peningkatan hard skill.' },
    ],
  },
  kp: {
    about: 'Departemen Kaderisasi dan Pembinaan merupakan departemen yang berperan sebagai pusat pengembangan sumber daya kader melalui proses kaderisasi yang sistematis, pembinaan yang berkelanjutan, serta penguatan kapasitas kepemimpinan. Departemen ini bertanggung jawab memastikan setiap kader mengalami proses pertumbuhan yang utuh, baik dari aspek ruhiyah, intelektual, kepemimpinan, maupun keterampilan organisasi sehingga mampu menjadi kader dai yang berkarakter, berdaya saing, dan siap melanjutkan estafet perjuangan dakwah kampus.',
    proker: [
      { name: 'OPREC', description: 'Program tahunan untuk menjaring mahasiswa UB yang berminat terhadap pengembangan berbasis nilai islami.' },
      { name: 'UAKI SCHOOL 1', description: 'Pengkaderan tahap awal yang dirancang untuk membentuk kader UAKI menjadi pemimpin berpengetahuan luas.' },
      { name: 'UAKI SCHOOL 2', description: 'Rangkaian pengkaderan lanjutan tingkat dua kepada seluruh kader UAKI UB yang telah dinyatakan lulus UAKI School 1' },
      { name: 'SAMA KAHFI', description: 'Program membaca Al-Kahfi berjamaah yang dilaksanakan di hari kamis setiap keannya.' },
      { name: 'SYNERGY', description: 'Agenda Bersama seluruh kader UAKI dalam rangka menjaga dan menjalin hubungan dekat dengan sesama.' },
      { name: 'MANTUBA', description: 'Program yang bertujuan untuk meningkatkan kesadaran mahasiswa terhadap literasi individu.' },
      { name: 'FORUM KADERISASI', description: 'Program pembagian penanggung jawab pada setiap LDF di lingkunan UAKI UB.' },
      { name: 'TRAINING JEJAK TUMBUH', description: 'Program pengembangan soft skill berfokus pada lingkungan UAKI UB.' },
      { name: 'FAREWELL UAKI/ROT', description: 'Acara Bonding bagi para anggota dan pengurus karena telah menyelesaikan masa baktinya di organisasi UAKI' },
      { name: 'OPREC STAF AHLI', description: 'Memastikan regenerasi anggota UAKI dan memperkuat eksistensi UKM di Universitas Brawijaya.' },
    ],
  },
  rab: {
    about: 'Departemen Rumah Amal Brawijaya merupakan departemen yang menjadi pusat pengelolaan program sosial, kemanusiaan, serta penghimpunan dan penyaluran dana zakat, infak, sedekah, dan donasi. Departemen ini berupaya menghadirkan dakwah yang tidak hanya tersampaikan melalui lisan, tetapi juga diwujudkan dalam aksi nyata yang memberikan manfaat langsung bagi masyarakat dan sivitas akademika. ',
  
    proker: [
      { name: 'TEBAR QURAN', description: 'Kegiatan pengelolaan dan pendistribusian hewan Qurban pada momentum Idul Adha' },
      { name: 'MEDIA SYIAR', description: 'Pengelolaan dan pengembangan media informasi sebagai sarana dakwah melalui platform media sosial.' },
      { name: 'RAB BERBAGI', description: 'Penyaluran dana kepada masyarakat yang membutuhkan serta untuk respon tanggap bencana secara cepat.' },
      { name: 'TANGGAP INSANI', description: 'Aksi kemanusiaan secara langsung melalui kegiatan kunjungan ke panti asuhan' },
      { name: 'GEMA RAB', description: 'Gerakan Mengajar RAB : Kegiatan sosial yang berfokus pada kegiatan mengajar dan pendampingan belajar di TPQ.' },
    ],
  },
  syiar: {
    about: 'Departemen Syiar merupakan departemen yang berperan dalam menyebarluaskan nilai-nilai Islam melalui berbagai media dakwah, kajian keislaman, kampanye isu strategis, serta kegiatan yang mampu menjangkau sivitas akademika secara luas. Departemen ini menjadi wajah dakwah organisasi dalam menghadirkan Islam yang relevan, solutif, dan dekat dengan kehidupan mahasiswa.',
  
    proker: [
      { name: 'ISLAMIC YOUTH FESTIVAL', description: 'Festival kepemudaan Islam dengan berbagai rangkaian kegiatan inspiratif, edukatif, dan kompetitif.' },
      { name: 'SAMBA : Sambut Maba', description: ' Pengenalan organisasi dan pemberian informasi seputar departemen serta event UAKI kepada mahasiswa baru.' },
      { name: 'ISLAMIC INSIGHT', description: 'penulisan dan publikasi artikel keislaman di website UAKI.' },
      { name: 'TERAS', description: 'Forum diskusi yang membahas isu-isu aktual secara sederhana dan berbasis nilai-nilai islam.' },
      { name: 'INSIGHT VISUAL', description: 'Distribusi konten literasi keislaman dalam bentuk visual melalui instagram.' },
    ],
  },
  humas: {
    about: 'Departemen Hubungan Masyarakat merupakan departemen yang bertugas membangun, memperkuat, dan memelihara hubungan strategis antara organisasi dengan berbagai pihak, baik internal maupun eksternal kampus. Departemen ini menjadi jembatan kolaborasi yang memperluas jejaring kemitraan, memperkuat citra organisasi, serta membuka peluang sinergi dalam mendukung pengembangan dakwah kampus.',
  
    proker: [
      { name: 'PRIME', description: ' Kegiatan untuk mengingkatkan keterampilan Public Relations di kalangan anggota internal Humas UAKI.' },
      { name: 'SILATURAHMI', description: 'Kegiatan talkshow yang ditujukan untuk membangun hubungan dengan alumni UAKI dan LDF di UB.' },
      { name: 'PRIDE', description: 'Kunjungan dengan LDK di perguruan tinggi lain untuk melakukan studi komparasi antar Lembaga.' },
      { name: 'FLOW', description: 'Kegiatan yang merangkul teman teman akhwat di lingkungan FSLD UB dengan akhwat UAKI UB.' },
      { name: 'CIKAL', description: 'Penyampaian konten edukatif berbasis dakwah melalui media sosial, seperti Instagram an TikTok.' },
      { name: 'UFO', description: 'Penyampaian informasi sangat krusial baik eksternal maupun internal sehingga perlu disampaikan secara jelas dan satu pintu.' },
      { name: 'FSLD CUP', description: 'Kompetisi futsal antar LDF di Universitas Brawijaya dengan UAKI sebagai penyelenggara.' },
    ],
  },
  mentoring: {
    about: 'Departemen Mentoring merupakan departemen yang bertanggung jawab mengelola sistem mentoring Islam sebagai instrumen utama pembinaan ruhiyah, intelektual, dan karakter kader. Departemen ini memastikan proses mentoring berjalan secara terstruktur, berkualitas, serta mampu membentuk lingkungan belajar yang mendukung lahirnya pribadi muslim yang berilmu, berakhlak, dan memiliki komitmen dakwah.',

    proker: [
      { name: 'JEJARING MENTOR', description: 'Forum pertemuan perwakilan LDF dan FSLD untuk memaparkan kondisi mentoring masing masing fakulatas.' },
      { name: 'MENTOR EDU', description: 'Pembentukan tim kurikulum untuk memperbarui kurikulum yang sudah ada sebagai panduan mentor ' },
      { name: 'JEJAK MENTOR 1 DAN 2', description: 'Kegiatan untuk memenuhi kebutuhan para mentor dan memastikan materi yang diberikan kepada mentee berjalan efektif.' },
      { name: 'MENTORING INTERNAL', description: 'Program kerja pekanan dengan tujuan menyampaikan nilai-nilai islam kepada seluruh elemen anggota UAKI.' },
      { name: 'AMALI : MUTABAAH YAUMI', description: ' Membaca dan mengamalkan amalan yang diberikan untuk dikumpulkan dalam bentuk G-Form.' },
      { name: 'FORUM MENTOR', description: 'Wadah pertemuan antar mentor sebagai bentuk pemantauan mentoring yang selama ini dilakukan.' },
      { name: 'STADIUM GENERAL', description: 'Forum mentoring akbar yang memperluas dan memperdalam materi yang telah diterima mentee.' },
    ],
  },
  ekraf: {
    about: 'Departemen Ekonomi Kreatif merupakan departemen yang bertanggung jawab mengembangkan kemandirian finansial organisasi melalui inovasi usaha, pengembangan produk, dan optimalisasi potensi kewirausahaan. Selain menopang keberlangsungan organisasi, departemen ini juga menjadi wadah kader dalam mengembangkan kreativitas, jiwa bisnis, serta kemampuan mengelola peluang ekonomi secara profesional dan beretika.',
  
    proker: [
     { name: 'MAQSHAF', description: 'Unit usaha penjualan snack dan minuman ringan di Sekretariat UAKI UB.' },
     { name: 'IDENTIKA', description: 'Pengadaan atribut resmi UAKI UB berupa PDH, outer / jaket, dan lanyard.' },
     { name: 'EKRAF GROWTH SESSION', description: 'Pembekalan internal anggota Ekraf melalui mini class kewirausahaan, penugasan kelompok, presentasi, dan feedback.' },
     { name: 'INVENTARIS', description: 'Kegiatan pendataan ulang, pengecekan kondisi, dan pengelolaan sistem peminjaman inventaris UAKI UB.' },
     { name: 'SYNERGY', description: 'Program pencarian, pengelolaan, dan pemeliharaan kerja sama dengan pihak internal maupun eksternal.' },
     { name: 'ECOSIGHT', description: 'Konten edukasi ekonomi kreatif dan literasi finansial islami yang dipublikasikan melalui Instagram UAKI UB.' },
     { name: 'MERCHANDISE', description: 'Penjualan merchandise kreatif UAKI UB, seperti stiker, gantungan kunci, dan produk relevan lainnya.' },
    ],
  },
  mucc: {
    about: 'Departemen Muslimah Centre Community merupakan departemen yang berfokus pada pengembangan, pemberdayaan, dan penguatan peran muslimah dalam kehidupan kampus. Departemen ini menjadi ruang tumbuh yang aman, suportif, dan inspiratif bagi muslimah untuk meningkatkan kualitas keilmuan, kepemimpinan, serta kontribusinya dalam dakwah dan peradaban.',
  
    proker: [
      { name: 'LAUNASA ', description: 'Pembinaan kemuslimahan untuk memperkuat nilai-nilai Islam bagi anggota MUCC sebagai mahasiswi muslimah.' },
      { name: 'SANGKAR BUNYI', description: 'Wadah pendampingan berupa konseling dan ruang aman bagi anggota internal MUCC untuk berbagi cerita.' },
      { name: 'HEALING MUCC', description: 'Kegiatan untuk memperkuat bonding dan keakraban internal anggota serta BPH MUCC melalui agenda healing bersama.' },
      { name: 'LUNALY', description: 'Dakwah kemuslimahan melalui akun Instagram Muslimah Center Community.' },
      { name: 'FLOURISH 2026', description: 'Wadah untuk saling mengenal antarakhwat LDF dan LDK UB guna menjalin silaturahmi dan memperkuat kebersamaan.' },
      { name: 'BLOOM 1', description: 'Kajian kemuslimahan yang membahas isu perempuan dan kehidupan mahasiswa secara kontekstual.' },
      { name: 'BLOOM 2', description: 'Kajian kemuslimahan yang membahas isu perempuan dan kehidupan mahasiswa secara kontekstual.' },
    ],
  },
  bpi: {
    about: '[ISI] Dskripsi departemen Badan Pngurus Inti.',
  
    proker: [
      { name: 'ARAH JEJAK WARNA', description: 'Syura rutin BPI untuk memonitor dan mengevaluasi kinerja serta menyampaikan rencana dan arahan strategis organisasi.' },
      { name: 'SAPA LDF', description: 'Silaturahmi dan konsolidasi antarketua umum LDF se-FSLD UB untuk membahas dan membantu menyelesaikan permasalahan lembaga.' },
      { name: 'KLINIK PROGRAM KERJA', description: 'Pendampingan penyusunan proposal program kerja BPI dan pengajuan kepada pihak rektorat.' },
      { name: 'FSLDKN XXII MALANG', description: 'Penyelenggaraan Musyawarah Nasional FSLDKN XXII 2026 di Malang sebagai tuan rumah.' },
      { name: 'UAKI SCHOOL 3', description: 'Kaderisasi tingkat akhir untuk mencetak calon pemimpin lembaga dakwah kampus yang kompeten.' },
      { name: 'PENGUIN CONNECTION', description: 'Syura rutin untuk meningkatkan produktivitas dan mempererat ukhuwah antarfungsionaris inti.' },
      { name: 'SIGAP', description: 'Monitoring dan pengawalan realisasi setiap program kerja sejak tahap perencanaan hingga pelaksanaan melalui laporan progres.' },
      { name: 'GEMILANG', description: 'Pemberian motivasi dan apresiasi bulanan kepada staf, departemen, dan penguin atas kinerja yang baik.' },
      { name: 'KILAS KINERJA', description: 'Publikasi laporan capaian dan pelaksanaan program kerja UAKI UB secara berkala setiap triwulan.' },
      { name: 'RITME', description: 'Monitoring dan evaluasi rapat departemen untuk meningkatkan ketertiban dan akuntabilitas pelaksanaan program kerja.' },
      { name: 'MUCC CONNECT', description: 'Pendampingan dengan Departemen MUCC untuk mengoptimalkan program kemuslimahan dan pembinaan kader akhwat.' },
      { name: 'PENGUIN AKHWAT CONNECT', description: 'Penguatan ukhuwah antarpenguin akhwat melalui pertemuan informal, sharing, dan evaluasi.' },
      { name: 'KAPUT FSLD CONNECT', description: 'Silaturahmi dan penguatan hubungan antarketua keputrian LDF se-UB melalui kegiatan bersama.' },
      { name: 'KOMISI C CONNECT', description: 'Partisipasi Ketua Keputrian dalam kegiatan yang diselenggarakan oleh Puskomda Komisi C.' },
      { name: 'PENGELOLAAN DAN PENGARSIPAN ADMINISTRASI', description: 'Pengelolaan dan penyimpanan dokumen organisasi secara terstruktur serta mudah diakses.' },
      { name: 'ADMINISTRASI SURAT MASUK DAN KELUAR', description: 'Pencatatan, pengelolaan, dan pengarsipan surat masuk serta keluar secara sistematis.' },
      { name: 'PENDAMPINGAN PROPOSAL DAN LPJ PROGRAM KERJA', description: 'Pendampingan penyusunan proposal dan laporan pertanggungjawaban agar sesuai dengan standar administrasi.' },
      { name: 'MUSYAWARAH KERJA', description: 'Perencanaan dan penetapan program kerja organisasi melalui forum musyawarah yang terstruktur dan terdokumentasi.' },
      { name: 'JEJAK RAPAT BPI DAN PENGUIN', description: 'Pendokumentasian hasil rapat melalui notulensi dan pemantauan tindak lanjut keputusan rapat.' },
      { name: 'PIKET SEKRETARIAT', description: 'Pemeliharaan kebersihan dan kerapian sekretariat sekaligus mempererat ukhuwah antaranggota melalui piket terjadwal.' },
      { name: 'LPJTT', description: 'Pemaparan capaian, kendala, dan evaluasi pelaksanaan program kerja selama enam bulan pertama kepengurusan.' },
      { name: 'LPJAT & MUKTAMAR XXXIX', description: 'Evaluasi dan penyampaian laporan pertanggungjawaban akhir periode serta penyelenggaraan Muktamar.' },
      { name: 'INVENTRACK', description: 'Pendataan dan penataan seluruh barang inventaris UAKI UB melalui database digital yang sistematis dan terdokumentasi.' },
      { name: 'SOSIALISASI ADMINISTRASI', description: 'Sosialisasi prosedur surat-menyurat, penyusunan proposal, dan LPJ sesuai ketentuan.' },
      { name: 'BANK UAKI', description: 'Pengelolaan dan pengalokasian dana kas serta anggaran organisasi untuk mendukung pelaksanaan program kerja.' },
      { name: 'PENDAMPINGAN KE REKTORAT', description: 'Pendampingan bendahara program kerja dalam konsultasi RAB dan pengajuan pendanaan dari pihak rektorat.' },
      { name: 'SOSIALISASI KEBENDAHARAAN', description: 'Sosialisasi SOP dan ketentuan kebendaharaan kepada BPH serta bendahara departemen.' },
      { name: 'MONEF (MONITORING EKRAF)', description: 'Pendampingan, pemantauan, dan evaluasi program kerja Departemen Ekonomi Kreatif untuk mendukung pendanaan UAKI UB.' },
    ],
  },
  ppm: {
    about: 'Biro Pengawasan dan Peneguhan Moral merupakan penanggung jawab dalam menjaga integritas, budaya organisasi, serta implementasi nilai-nilai Islam dan nilai organisasi di seluruh lini kepengurusan. Biro PPM berfungsi sebagai penjaga marwah organisasi melalui pengawasan, pembinaan, evaluasi moral, serta penguatan budaya organisasi yang berlandaskan adab, amanah, dan profesionalisme.',
  
    proker: [
      { name: 'PENDEKATAN KADER', description: 'Pengawasan penerapan dhawabit kader UAKI di lingkup internal organisasi.' },
      { name: 'MEDIASI INTERNAL', description: 'Mediasi dan penyelesaian permasalahan internal UAKI UB.' },
      { name: 'MUTABAAH PENGUIN', description: 'Monitoring pelaksanaan amal yaumi para pengurus inti UAKI UB setiap pekan.' },
    ],
  },
}

export function getDepartmentDetail(slug) {
  const base = getDepartmentBySlug(slug)
  if (!base) return null

  const detail = departmentDetails[slug] ?? { about: '', proker: [] }
  if (import.meta.env.DEV && !departmentDetails[slug]) console.warn(`[departemen] detail untuk "${slug}" belum ada`)

  const index = departments.findIndex((d) => d.slug === slug)
  const proker = (detail.proker ?? []).map((p, i) => ({ ...p, photo: getProkerPhoto(slug, i, p.photo) }))

  return {
    ...base,
    about: detail.about,
    proker,
    hasProker: proker.length > 0,
    kegiatanPhoto: getKegiatanPhoto(slug),
    prev: departments[index - 1] ?? null,
    next: departments[index + 1] ?? null,
  }
}
