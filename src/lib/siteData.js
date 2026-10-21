
import { House, User, Camera, FileText, CircleAlert, Instagram, Youtube, MessageCircle } from 'lucide-react'

export const siteInfo = {
  name: 'UAKI UB',
  taglineLines: [
    'United for All Knowledge and Innovation\u00A0-',
    'Membangun generasi muslim yang berilmu dan berinovasi.',
  ],
  address: 'Jl. Veteran No.8, Ketawanggede, Kec. Lowokwaru, Kota Malang, Jawa Timur 65145',
  credit: 'Made With love By UAKI Development Team',
}

// Menu navbar
export const navLinks = [
  { label: 'Beranda', to: '/' },
  { label: 'Tentang Kami', to: '/tentang-kami' },
  { label: 'Galeri', to: '/galeri' },
  { label: 'Berita', to: '/berita' },
]

export const footerHeadings = {
  links: 'Tautan',
  social: 'Media Sosial',
  address: 'Alamat',
}

export const footerLinks = [
  { label: 'Beranda', to: '/', icon: House },
  { label: 'Tentang kami', to: '/tentang-kami', icon: User },
  { label: 'Galeri', to: '/galeri', icon: Camera },
  { label: 'Artikel', to: '/berita', icon: FileText },
  { label: 'Informasi', to: '#', icon: CircleAlert },
]

export const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/uakiub/', icon: Instagram },
  { label: 'YouTube', href: 'https://www.youtube.com/@uakiub', icon: Youtube },
  { label: 'WhatsApp', href: '#', icon: MessageCircle },
]

export const pageMeta = {
  home: {
    title: 'Beranda | UAKI UB',
    description: 'UAKI UB, United for All Knowledge and Innovation. Membangun generasi muslim yang berilmu dan berinovasi.',
  },
  about: {
    title: 'Tentang Kami | UAKI UB',
    description: 'Kenali UAKI Universitas Brawijaya, visi, misi, dan perjalanannya.',
  },
  gallery: {
    title: 'Galeri | UAKI UB',
    description: 'Dokumentasi kegiatan UAKI Universitas Brawijaya.',
  },
  news: {
    title: 'Berita | UAKI UB',
    description: 'Berita dan artikel terbaru dari UAKI Universitas Brawijaya.',
  },
}
