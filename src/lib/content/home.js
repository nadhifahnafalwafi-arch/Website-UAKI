
import { User, Square, PanelsTopLeft } from 'lucide-react'

export const heroContent = {
  titleLines: ['Unit Aktivitas', 'Kerohanian Islam', 'Universitas Brawijaya'],
  description:
    'Ruang untuk mahasiswa Muslim UB agar lebih dekat dengan iman, lebih siap berkontribusi, dan lebih nyaman berbagi pengalaman bersama.',
  cta: { label: 'Kenalan lebih dekat', to: '/tentang-kami' },
  photoAlt: 'Foto bersama pengurus dan anggota UAKI Universitas Brawijaya',
  stats: [
    { value: 200, suffix: '+', label: 'Alumni Staff Muda', icon: User },
    { value: 10, suffix: '+', label: 'Program Kerja', icon: Square },
    { value: 7, suffix: '', label: 'Departemen', icon: PanelsTopLeft },
  ],
}

export const aboutContent = {
  title: 'APA ITU UAKI?',
  subtitle: 'Unit Aktivitas Kerohanian Islam',
  body:
    'UAKI UB adalah wadah untuk mahasiswa Muslim UB agar lebih dekat dengan iman, lebih siap berkontribusi, dan lebih nyaman berbagi pengalaman bersama. Lewat pembinaan karakter, pelayanan spiritual, dan pengembangan potensi, UAKI UB ingin mencetak generasi muda yang memiliki ketahanan spiritual, berakhlak mulia, unggul secara akademis, serta aktif memberikan kontribusi nyata bagi masyarakat dan peradaban.',
  logoLabel: 'Logo UAKI 3D, geser untuk memutar',
  logoHint: '',
}

export const welcomeContent = {
  title: 'SAMBUTAN',
  name: 'Muhammad Nugraha Al-Afghani',
  role: 'Ketua Umum',
  photoAlt: 'Foto Ketua Umum UAKI UB',
  paragraphs: [
    'Assalamu’alaikum warahmatullahi wabarakatuh.',
    'Alhamdulillahirabbil’alamin, segala puji bagi Allah Swt. atas rahmat dan karunia-Nya sehingga website UAKI UB dapat diluncurkan sebagai salah satu langkah untuk menghadirkan dakwah kampus yang lebih terbuka, adaptif, dan mudah dijangkau.',
    'Kami berharap website ini tidak sekadar menjadi ruang informasi, tetapi juga menjadi jendela untuk mengenal lebih dekat perjalanan, gerakan, dan kontribusi UAKI UB dalam mewujudkan dakwah yang menghidupkan serta membawa kebermanfaatan bagi seluruh ekosistem kampus.',
    'Melalui semangat Kabinet Jejak Warna, kami ingin terus menanamkan nilai, memperluas kolaborasi, dan menghadirkan inovasi yang relevan dengan perkembangan zaman. Semoga website ini menjadi bagian dari ikhtiar tersebut dan mampu meninggalkan jejak kebaikan yang lebih luas.',
    'Terima kasih kepada seluruh pihak yang telah berkontribusi dalam proses pengembangannya. Semoga setiap upaya ini menjadi amal jariyah dan membawa keberkahan bagi perjalanan dakwah UAKI UB.',
    'Wassalamu’alaikum warahmatullahi wabarakatuh.',
    'Semaikan Jejak, Warnai Brawijaya.',
  ],
}

export const profileContent = {
  title: 'COMPANY PROFILE',
  caption: 'Video Profil UAKI UB',
  videoId: '',
  fallbackUrl: 'https://www.youtube.com/@uakiub',
}
