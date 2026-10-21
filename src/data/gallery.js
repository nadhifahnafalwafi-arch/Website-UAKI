export const GALLERY_FOLDER = `${import.meta.env.BASE_URL}img/galeri/`

export const getPhotoUrl = (file) => (file ? `${GALLERY_FOLDER}${file.replace(/^\//, '')}` : '')

export const photos = [
  // Contoh entri dengan field baru 
  //
  // {
  //   id: 'syiar-2025-03-01',
  //   file: 'syiar-kajian-01.jpg',
  //   width: 1600,
  //   height: 1200,
  //   departemen: 'syiar',
  //   proker: 'Kajian Pekanan',
  //   date: '2025-03-14',
  //   alt: 'Peserta kajian pekanan menyimak materi di serambi Masjid Raden Patah UB',
  // },
  // {
  //   id: 'bpi-2025-01',
  //   file: 'bpi-2025-01.jpg',
  //   width: 1200,
  //   height: 1500,
  //   departemen: 'bpi',
  //   proker: '', // tidak terkait program tertentu
  //   date: '2025-01-18',
  //   // alt tidak diisi -> otomatis: "Dokumentasi kegiatan Departemen Badan Pengurus Inti, 18 Januari 2025"
  // },
]
