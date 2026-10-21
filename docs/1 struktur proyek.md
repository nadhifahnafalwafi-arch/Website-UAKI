
Website UAKI 2.0/
├── index.html            Kerangka HTML utama
├── package.json          Daftar library 
├── vite.config.js        Pengaturan Vite 
├── tailwind.config.js    Design token
├── postcss.config.js     Pengaturan bawaan Tailwind 
├── public/               
│   └── img/
│       ├── departemen/   Foto ketua, logo, foto kegiatan, foto program kerja
│       └── galeri/       Foto galeri 
└── src/                  Seluruh kode website
    ├── main.jsx          Titik awal aplikasi
    ├── App.jsx           Daftar halaman + loading screen
    ├── pages/            Satu file per halaman
    ├── sections/         Bagian-bagian halaman, dikelompokkan per halaman
    ├── components/       Potongan tampilan yang dipakai ulang (navbar, footer, tombol, animasi, loader)
    ├── data/             Data: departemen, program kerja, foto galeri, pengaturan galeri
    ├── lib/              Logika & pengaturan: animasi, pencarian galeri, loader, teks halaman
    ├── assets/           Gambar & SVG yang dipakai langsung oleh kode (img/, svg/)
    └── styles/           CSS global (index.css)

1. Isi (teks, daftar departemen, program kerja, foto galeri) disimpan di `src/data/` dan `src/lib/content/`.
2. Tampilan tiap bagian halaman ada di `src/sections/`. Bagian ini membaca isi dari langkah 1.
3. Halaman di `src/pages/` menyusun beberapa section menjadi satu halaman utuh.
4. `src/App.jsx` menentukan halaman mana yang muncul di alamat URL mana.
5. Navbar dan Footer dipasang sekali di `src/components/MainLayout.jsx`, jadi otomatis ada di semua halaman.
