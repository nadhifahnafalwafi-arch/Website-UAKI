src/pages

`Home.jsx` = Beranda: Hero, Apa itu UAKI, Sambutan, Company Profile. 
`About.jsx` = Tentang Kami: Intro, Filosofi Logo, Departemen. 
`DepartmentDetail.jsx` = Detail satu departemen berdasarkan slug di URL. 
`Galeri.jsx` = Galeri foto: Hero, pencarian, grid, paginasi, lightbox. Mengatur state di URL. 

src/sections

**Beranda** (`src/sections/home/`)

`Hero.jsx` + `HeroDecorations.jsx`, `HeroPhoto.jsx`, `HeroStats.jsx` = Judul utama, foto bersama berbingkai, hiasan, dan 3 kotak statistik. 
`About.jsx` + `LogoShowcase.jsx` = "Apa itu UAKI?" dengan logo 3D yang bisa diputar (`src/components/Logo3D.jsx`). 
`Welcome.jsx` + `WelcomeCard.jsx` = Sambutan Ketua Umum dengan foto. 
`CompanyProfile.jsx` = Video profil YouTube (`src/components/VideoEmbed.jsx`). 

**Tentang Kami** (`src/sections/tentang/`)

`Intro.jsx` + `IntroPhoto.jsx` = Judul "Tentang Kami", tagline, tombol ke Filosofi Logo & Struktur organisasi. 
`Philosophy.jsx` + `PhilosophyPoints.jsx` = Filosofi logo interaktif (`src/components/logo/InteractiveLogo.jsx`), 3 poin makna. 
`departemen/DepartmentsSection.jsx` + `DepartmentCarousel.jsx`, `DepartmentColumn.jsx`, `DepartmentPhoto.jsx`, `DepartmentLogo.jsx` = Carousel 10 departemen. Klik kolom membuka halaman detail. 

**Detail Departemen** (`src/sections/departemen/`)

`HeroDepartemen.jsx` + `HeroWave.jsx`, `BackToDepartments.jsx` = Hero berfoto, nama lengkap departemen, tombol "Program kerja", gelombang pembatas. 
`AboutDepartemen.jsx` = Logo hijau, nama, dan deskripsi di atas foto kegiatan. 
`ProgramKerja.jsx` = Deretan kartu program kerja yang berjalan. Tidak tampil jika proker kosong. 
`DepartmentPager.jsx` = Tombol ke departemen sebelumnya / berikutnya. 


**Galeri** (`src/sections/galeri/`)

`HeroGaleri.jsx` = Hero hijau berfoto, tombol "Jelajahi foto". 
`ToolbarGaleri.jsx` = Judul "Album Kegiatan", kotak pencarian dengan saran, dropdown tahun. 
`GridGaleri.jsx` = Grid foto ala Pinterest, placeholder hijau untuk foto yang belum ada. 
`PaginasiGaleri.jsx` = Tombol halaman bernomor dengan elipsis dan panah. 
`LightboxGaleri.jsx` = Tampilan foto besar saat foto diklik. 

src/components

`Navbar.jsx`, `MenuToggle.jsx`, `Logo.jsx` = Navbar (tersembunyi saat gulir ke bawah), menu HP, logo UAKI. 
`Footer.jsx` = Footer di semua halaman: tautan, media sosial, alamat, baris credit. 
`Button.jsx`, `Container.jsx`, `SectionTitle.jsx`, `DotGrid.jsx` = Tombol, pembatas lebar konten, judul section, hiasan titik-titik. 
`PhotoWithFallback.jsx` = Gambar yang otomatis menampilkan placeholder jika file belum ada atau gagal dimuat. 
`Logo3D.jsx` = Logo 3D di Beranda. 
`PagePlaceholder.jsx` = Halaman sementara, dipakai Berita. 
`animations/` = Pembungkus animasi yang dipakai di seluruh website: `Reveal`, `Stagger`, `TypewriterText`, `CountUp`, `Floating`, `Loop`, `MouseParallax`, `CursorGlow`, `CursorTrail`, `TiltCard`, `PageTransition`, `useScrollReveal`. 
`loader/Loader.jsx`, `loader/LoaderLogo.jsx` = Loading screen saat website pertama dibuka. 
`logo/InteractiveLogo.jsx`, `logo/logoParts.js`, `logo/logoUakiPaths.js` = Logo SVG interaktif. `logoUakiPaths.js` berisi bentuk logo yang juga dipakai loader. 

src/lib

`animations.js` = **Semua pengaturan animasi** dan beberapa pengaturan tampilan 
`loaderConfig.js` = Pengaturan loading screen dan daftar tugas yang ditunggu loader. 
`LoaderContext.jsx` = Status "loader sudah selesai" yang ditunggu semua animasi masuk. 
`gallery.js` = Logika galeri: pencarian, saran pencarian, urutan campur, tahun, paginasi 
`useGalleryParams.js` = Menyimpan pencarian, tahun, dan halaman galeri 
`siteData.js` = Info situs: nama, tagline, alamat, credit, menu navbar, tautan footer, media sosial, judul & deskripsi halaman. 
`content/home.js` = Teks Beranda: Hero, statistik, Apa itu UAKI, Sambutan, video. 
`content/tentang.js` = Teks Tentang Kami: Intro, Filosofi Logo, judul Departemen. 
`content/departemen.js` = Teks tetap halaman detail departemen. 
`content/galeri.js` = Teks Galeri: Hero, judul "Album Kegiatan", meta halaman. 
`scrollToSection.js` = Gulir halus ke section dengan memperhitungkan tinggi navbar. 
`usePageMeta.js` = Mengganti judul tab dan meta description per halaman. 
`MouseFieldContext.jsx`, `useMouseParallax.js`, `useFinePointer.js` = Efek kursor (glow & parallax), hanya di perangkat bermouse. 
`ScrollDirectionContext.jsx`, `useScrollDirection.js` = Arah gulir (naik/turun) untuk animasi navbar & animasi berulang. 

src/data (paling penting untuk pengurus)

`departments.js` = Alamat foto ketua & logo. 
`departmentDetails.js` = Pola alamat foto kegiatan & foto proker. 
`kegiatanPhotoPosition.js` = Posisi vertikal foto kegiatan per departemen. 
`gallery.js` = Alamat foldernya. Saat ini kosong. 
`galleryDemo.js` = 130 foto contoh tanpa file. 
`galleryConfig.js` = `USE_DEMO_DATA`, `PHOTOS_PER_PAGE`, `DEFAULT_YEAR`, `GALLERY_GRID`, `GALLERY_LIGHTBOX`. 

Aset
`public/logoUAKI.svg` = Favicon tetap 
`public/img/departemen/` = Foto ketua departemen 
`public/img/departemen/logo/` = Logo departemen  
`public/img/departemen/kegiatan/` = Foto kegiatan (latar section Tentang) 
`public/img/departemen/proker/[slug]/` = Foto program kerja 
`public/img/galeri/` = Foto galeri | bebas, ditulis di 
`src/assets/img/` = `hero-foto-bersama.jpg` (Hero Beranda, Intro, Hero departemen & galeri).
`src/assets/svg/` = Logo UAKI, logo 3D, ornamen 
