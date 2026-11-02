---
name: Porto — Papan Split-Flap
description: Portfolio Kevin Febrian Bimantara sebagai satu papan keberangkatan split-flap mekanis di aula stasiun; nama jatuh ke tempatnya, tiap konten satu baris yang langsung terbaca.
colors:
  signal: "#f0b429"
  signal-hover: "#f7c64c"
  signal-ink: "#161410"
  floor-accent: "#f0b429"
  floor-accent-light: "#7f5300"
  housing: "#111210"
  flap: "#1c1d1a"
  flap-hover: "#2a2b26"
  flap-crease: "#080807"
  flap-ink: "#ece8dc"
  flap-ink-2: "#b5b1a5"
  heat-empty: "#24251f"
  logo-plate: "#ffffff"
  logo-plate-ink: "#161614"
  floor: "#111210"
  floor-deep: "#0b0c0a"
  floor-panel: "#1c1d1a"
  floor-panel-hover: "#262723"
  floor-light: "#e4e2da"
  floor-deep-light: "#d8d6cd"
  floor-panel-light: "#f0eee7"
  floor-panel-hover-light: "#e8e6de"
  text-primary: "#ece8dc"
  text-secondary: "#b5b1a5"
  text-tertiary: "#979488"
  text-primary-light: "#161614"
  text-secondary-light: "#45443d"
  text-tertiary-light: "#5c5b52"
  border-hairline: "rgba(236, 232, 220, 0.16)"
  border-hairline-light: "rgba(22, 22, 20, 0.22)"
  surface-faint: "rgba(236, 232, 220, 0.04)"
  surface-faint-light: "rgba(22, 22, 20, 0.04)"
  surface-subtle: "rgba(236, 232, 220, 0.08)"
  surface-subtle-light: "rgba(22, 22, 20, 0.08)"
typography:
  display:
    fontFamily: "Big Shoulders Display, Barlow Condensed, sans-serif"
    fontSize: "clamp(3rem, 7.4vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.92
  headline:
    fontFamily: "Big Shoulders Display, Barlow Condensed, sans-serif"
    fontSize: "clamp(2rem, 4.2vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 0.98
  title:
    fontFamily: "Big Shoulders Display, Barlow Condensed, sans-serif"
    fontSize: "clamp(1.8rem, 3vw, 2.6rem)"
    fontWeight: 700
    lineHeight: 1.02
  period:
    fontFamily: "Big Shoulders Display, Barlow Condensed, sans-serif"
    fontSize: "clamp(1.25rem, 1.9vw, 1.6rem)"
    fontWeight: 700
    lineHeight: 1.15
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.55
  button:
    fontFamily: "Barlow Condensed, Barlow, sans-serif"
    fontSize: "1.02rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.06em"
  label:
    fontFamily: "Barlow Condensed, Barlow, sans-serif"
    fontSize: "0.98rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.06em"
  field-label:
    fontFamily: "Barlow Condensed, Barlow, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "0.08em"
rounded:
  sm: "2px"
  md: "2px"
  lg: "3px"
  xl: "3px"
  2xl: "3px"
  full: "3px"
spacing:
  container-xl: "1280px"
  container-2xl: "1536px"
  gutter: "24px"
  gutter-mobile: "16px"
  rail-height: "64px"
  section-y: "clamp(56px, 8vw, 112px)"
  section-header-gap: "clamp(28px, 4vw, 48px)"
  record-y: "clamp(22px, 2.6vw, 32px)"
  project-y: "clamp(20px, 2.4vw, 32px)"
  board-pad: "clamp(14px, 2vw, 24px)"
  tile-gap: "4px"
  digit-gap: "3px"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.signal-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.signal-hover}"
    textColor: "{colors.signal-ink}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
    height: "46px"
  button-outline-hover:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.text-primary}"
  filter-chip:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    height: "40px"
  filter-chip-active:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.signal-ink}"
  nav-rail:
    backgroundColor: "{colors.floor}"
    textColor: "{colors.text-secondary}"
    height: "{spacing.rail-height}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  nav-link-active:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.signal-ink}"
  skill-tile:
    backgroundColor: "{colors.flap}"
    textColor: "{colors.flap-ink}"
    rounded: "{rounded.sm}"
    padding: "12px 14px"
    height: "72px"
  skill-tile-hover:
    backgroundColor: "{colors.flap-hover}"
    textColor: "{colors.flap-ink}"
  logo-plate:
    backgroundColor: "{colors.logo-plate}"
    textColor: "{colors.logo-plate-ink}"
    rounded: "{rounded.sm}"
    padding: "4px"
    size: "76px"
  board-panel:
    backgroundColor: "{colors.housing}"
    textColor: "{colors.flap-ink}"
    padding: "{spacing.board-pad}"
---

# Design System: Porto — Papan Split-Flap

## Overview

**Creative North Star: "Papan Keberangkatan Split-Flap"**

Halaman adalah aula stasiun; kontennya adalah papan keberangkatan mekanis. Di bawah rel navigasi, papan three.js selebar layar menjatuhkan nama kandidat ke tempatnya flap demi flap, lalu hanya baris headline yang sesekali berganti. Semua yang di bawahnya meneruskan logika papan: skill berupa blok flap rapat, statistik GitHub berupa angka flap, proyek dan riwayat berupa baris penuh lebar yang bisa dipindai sekali lihat oleh recruiter.

Karakternya tenang, gelap, dan bersuara rambu. Warnanya hampir tanpa warna: hitam matte, krem huruf, dan satu kuning lampu sinyal yang hanya menyala untuk aksi dan status. Hierarki datang dari kontras skala, bukan dari dekorasi. Dunia ini flat di luar hero, dengan sudut hampir tajam dan tanpa bayangan; kedalaman nyata hanya ada di flap 3D dan digambarkan di tempat lain sebagai satu garis lipatan.

Dua tema tidak mengganti papan. Tema terang hanya mengganti lantai aula jadi beton pucat dan teks lantainya; papan, flap, tinta, dan lampu tetap benda fisik yang sama, sehingga di tema terang papan hero dan footer tetap hitam.

**Key Characteristics:**
- Flap hitam matte dengan garis lipatan di tengah sebagai material pembawa identitas.
- Satu warna sinyal, hanya untuk aksi utama dan status aktif.
- Konten sebagai baris penuh lebar dengan garis pemisah; blok flap hanya untuk nilai pendek.
- Tiga suara huruf: rambu kondensed, label kondensed tracked, prosa Barlow; angka tabular di seluruh halaman.
- Radius maksimal 3px, nol bayangan di permukaan publik, tanpa gradien warna, tanpa glow.
- Gerak sedikit dan bermakna: satu jatuhan di hero, satu baris headline tiap 6 detik, judul section jatuh sekali.

## Colors

Netral hangat hampir hitam dengan tinta krem dan satu kuning lampu sinyal; tema terang hanya menukar lantai.

### Primary
- **Lampu Sinyal** (`signal`, tinta `signal-ink`, hover `signal-hover`): tombol primer, nav link aktif, filter dan tahun terpilih, thumbnail galeri aktif, titik galeri aktif, sel heatmap terpilih, penanda aktivitas yang sedang berjalan, serta `::selection`. Tombol kontrol di atas gambar dan tombol ke atas menyala sinyal saat hover karena itu aksi.
- **Aksen Lantai** (`floor-accent` / `floor-accent-light`, token `--color-accent-primary` dan aliasnya `--color-accent-secondary`): nilai untuk teks, ikon, dan focus ring yang duduk di lantai, termasuk tautan artikel dan garis blockquote. Di tema gelap nilainya sama persis dengan sinyal; di tema terang menggelap jadi cokelat amber (5.16:1 di atas lantai terang) karena sinyal sendiri hanya 1.44:1 di sana.

### Neutral

**Benda papan, identik di dua tema:**
- **Rumah Papan** (`housing`): latar kanvas hero, panel heatmap, footer, galeri proyek, bingkai thumbnail sertifikat.
- **Flap Matte** (`flap`, hover `flap-hover`): tile skill, angka flap, logo mark, flap loading, badge jumlah foto, bingkai gambar proyek, tombol ke atas.
- **Garis Lipatan** (`flap-crease`): garis 1px di tengah tiap tile flap.
- **Tinta Krem** (`flap-ink`, sekunder `flap-ink-2`): huruf di atas flap dan rumah papan.
- **Sel Kosong** (`heat-empty`): hari tanpa kontribusi di heatmap, sedikit lebih terang dari flap.
- **Pelat Logo** (`logo-plate`, ikon fallback `logo-plate-ink`): pengecualian palet, lihat The White Plate Rule.

**Lantai aula, berubah per tema (`-light` untuk tema terang):**
- **Lantai** (`floor`): latar halaman dan rel navigasi. Di tema gelap sewarna rumah papan, sehingga papan menyatu dengan aula; di tema terang papan berdiri sebagai benda hitam di atas beton.
- **Lantai Dalam** (`floor-deep`): modal CV, tooltip heatmap, track scrollbar, sidebar admin.
- **Panel Lantai** (`floor-panel`, hover `floor-panel-hover`): skeleton dan kartu admin. Nilai gelapnya kebetulan sama dengan flap, tapi ini token berbeda yang ikut tema; jangan dipakai untuk benda papan.
- **Teks Lantai** (`text-primary` / `text-secondary` / `text-tertiary`): teks yang duduk langsung di lantai.
- **Hairline** (`border-hairline`, surface hover `surface-subtle`): pemisah baris 1px, garis kontrol, dan isi hover halus.

### Named Rules
**The Same Object Rule.** `--flap`, `--flap-crease`, `--flap-ink`, `--flap-ink-2`, `--housing`, `--signal`, dan `--signal-ink` tidak pernah di-override di `[data-theme='light']`. Tema hanya mengganti lantai aula dan teks lantai. Kalau sebuah komponen berubah warna saat tema diganti, ia bukan benda papan.

**The Signal Lamp Rule.** Kuning sinyal hanya untuk aksi utama dan status aktif, selalu sebagai isi atau garis dengan tinta `signal-ink`, tidak pernah sebagai warna teks, hiasan, atau pembeda kategori. Penanda persegi di judul aktivitas lolos karena memang berarti "sedang berjalan"; di tema terang ia diberi outline 1px warna flap supaya terlihat di beton.

**The Floor Accent Rule.** `--color-accent-primary` adalah nilai untuk lantai, bukan untuk papan. Teks dan focus di atas lantai memakai token ini; isi tombol dan status memakai `--signal`. Keduanya sama di tema gelap, jadi kesalahan pilih token baru terlihat di tema terang.

**The White Plate Rule.** Logo perusahaan selalu duduk di atas pelat putih di dua tema, berwarna penuh. Logo transparan bertinta gelap hilang di atas latar gelap, jadi pelat ini pengecualian palet yang disengaja untuk isi buatan pihak lain, bukan warna permukaan baru.

**The Scoped Ink Rule.** Setiap panel berlatar rumah papan di luar hero mendeklarasikan ulang `--color-text-*` ke tinta flap di dalam cakupannya, seperti panel heatmap dan footer. Tanpa itu teks lantai tema terang yang gelap jatuh di atas papan hitam.

## Typography

**Display Font:** Big Shoulders Display (600–800), fallback Barlow Condensed, sans-serif
**Body Font:** Barlow (400–700), fallback system-ui, sans-serif
**Label/Mono Font:** Barlow Condensed (500–700), fallback Barlow. Token `--font-mono` adalah alias ke Barlow, bukan monospace.

**Character:** Big Shoulders Display kondensed dan tebal terbaca seperti rambu stasiun dan juga huruf yang dicetak ke flap 3D; Barlow Condensed uppercase tracked menjadi label papan; Barlow membawa prosa dengan tenang. Seluruh body memakai `tabular-nums` supaya angka berbaris seperti di papan jadwal.

### Hierarchy
- **Display** (800, `{typography.display}`, uppercase, balance): judul section, satu-satunya fragmen paling keras per section. Suara yang sama dipakai di footer (`clamp(3rem, 8.4vw, 6rem)`), fallback nama hero (`clamp(3rem, 9vw, 6rem)`), judul detail proyek (`clamp(2.5rem, 6vw, 4.5rem)`), dan angka flap loading (`clamp(3.6rem, 8.6vw, 6rem)`).
- **Headline** (800, `{typography.headline}`, uppercase): nama proyek di baris proyek.
- **Title** (700, `{typography.title}`, uppercase): judul baris jadwal; judul aktivitas memakai `clamp(1.8rem, 3vw, 2.5rem)`.
- **Period** (700, `{typography.period}`, uppercase, tabular): rentang tanggal di kolom kiri baris jadwal.
- **Body** (400, 1.02–1.1rem, 1.5–1.65): deskripsi dan subjudul, maks 46–68ch. Artikel proyek 1rem dengan line-height 1.8.
- **Button** (700, 1.02rem, tracking 0.06em, uppercase): tombol dan tautan aksi.
- **Label** (600, 0.9–1.05rem, tracking 0.05–0.08em, uppercase): nav, filter, kontrol, tag kategori, `dt` field, statistik, copyright. Di mobile nav link naik ke 1.5rem.

### Named Rules
**The One Loud Fragment Rule.** Tiap section punya satu fragmen paling keras, yaitu judulnya. Hierarki turun lewat skala, bukan lewat warna atau ornamen. Subjudul berada di kolom kanan rata bawah, bukan di atas judul.

**The Readable Label Rule.** Label kondensed tidak turun di bawah 0.9rem; huruf kondensed kecil cepat hilang keterbacaannya.

## Layout

Aula dibagi jadi baris-baris selebar container, dipisah garis. Hero board full-bleed; semua isi lain mengikuti container. Container yang benar-benar dirender berjenjang mengikuti utilitas container Tailwind (640, 768, 1024, `{spacing.container-xl}`, `{spacing.container-2xl}`), dengan gutter `{spacing.gutter}` dan `{spacing.gutter-mobile}` di bawah 768px. Di viewport 1440px lebar isinya 1232px.

Urutan halaman: hero, Skills, Aktivitas Sekarang, GitHub, Project, Pendidikan, Pengalaman, Sertifikasi, footer. Tiap section dipisah hairline dan padding `{spacing.section-y}`. Header section dua kolom 1.5fr / 1fr (judul kiri, subjudul kanan, rata bawah), satu kolom di bawah 768px.

**First viewport.** Rel navigasi fixed `{spacing.rail-height}`, lalu papan, lalu rel info. Tinggi papan `clamp(300px, 100svh - 260px, 62vw)` sengaja menyisakan ruang supaya tombol primer terlihat tanpa scroll; di bawah 1040px jadi `clamp(280px, 100svh - 354px, 62vw)` dan di bawah 720px 74vw. Rel info tiga kolom (foto 124px, deskripsi, aksi + sosial). Di bawah 1040px aksi turun ke baris penuh. Di bawah 720px aksi naik ke urutan pertama, foto 84px, deskripsi terakhir.

**Baris.** Aktivitas 1fr / 1.2fr. Proyek 5fr / 7fr (gambar kiri 16:10, info kanan). Jadwal 2fr / 7fr / 3fr (periode, isi, field). Aktivitas dan proyek menumpuk di bawah 768px, jadwal di bawah 900px. Kumpulan baris dibuka garis 2px warna teks primer, tiap baris ditutup hairline 1px. Skills auto-fill minimal 200px dengan gap `{spacing.tile-gap}`. Statistik GitHub empat kolom, dua di bawah 768px.

Breakpoint yang dipakai: 640, 720, 768, 900, 1024 (nav jadi overlay), 1040, 1280 (sel heatmap membesar). Admin menambah 600px untuk sidebar.

### Named Rules
**The Readable Row Rule.** Proyek dan riwayat selalu baris penuh lebar, bukan grid kartu. Blok flap hanya untuk nilai pendek yang secara alami masuk satu tile: nama skill dan angka.

## Elevation & Depth

Permukaan publik sepenuhnya flat: tidak ada `box-shadow`, `drop-shadow`, blur, atau glow. Kedalaman datang dari tonal layering (lantai, flap, rumah papan) dan dari geometri 3D sungguhan di hero. Di luar hero, kedalaman flap digambarkan hanya oleh garis lipatan. Satu-satunya bayangan di codebase ada di modal crop foto admin, dan tidak dibawa ke permukaan publik.

### Named Rules
**The Crease Is Enough Rule.** Tile flap memberi kesan berengsel lewat satu garis 1px `flap-crease` di tengah, bukan bayangan. Di tile skill garis ini hanya takik 7px di dua tepi supaya label langsung terbaca; di logo mark garisnya lewat di belakang huruf. Hard-stop untuk takik dan bayangan lipatan hitam-transparan di tekstur flap 3D menggambar lipatan, bukan gradien warna.

## Shapes

Sudut hampir tajam: 2px di hampir semua komponen, 3px batas atasnya. Skala radius di `@theme` dipatok, sehingga `rounded-full` pun hanya 3px dan tidak ada pill atau lingkaran, termasuk di admin yang mewarisinya. Penanda aktivitas persegi 1px.

Proporsi flap selalu 1 : 1.62, sama antara sel 3D, angka statistik, dan flap loading. Pemisah adalah garis solid: 1px hairline untuk baris dan kontrol, 2px teks primer untuk pembuka kumpulan baris. Bentuk bingkai gambar mengikuti isi: gambar proyek `contain` di atas flap, thumbnail sertifikat `contain` di atas rumah papan, foto profil `cover`.

### Named Rules
**The 3px Ceiling Rule.** Tidak ada radius di atas 3px. Kebulatan bukan bagian dari benda ini; flap adalah pelat logam yang dipotong.

**The Grayscale At Rest Rule.** Foto profil, ikon skill, dan gambar sertifikat grayscale saat diam dan mendapat warna asli saat hover, supaya halaman tetap tidak warna-warni. Logo perusahaan dan gambar proyek berwarna penuh karena mereka bukti yang harus dikenali.

## Components

### Buttons
Tegas dan bersuara label papan.
- **Shape:** sudut 2px, tinggi minimum 46px, border 1.5px.
- **Primary:** latar sinyal, tinta sinyal, ikon opsional 18px di depan teks. Hanya untuk aksi utama: Lihat CV, Hubungi saya di footer, dan tautan proyek di halaman detail.
- **Hover / Focus:** primer pindah ke `signal-hover`, tanpa geser. Focus global outline 2px `--color-accent-primary`, offset 3px. Transisi warna 150ms.
- **Outline:** transparan, border hairline, teks primer; hover border teks primer + `surface-subtle`.

### Chips (filter proyek)
- **Style:** border hairline 1px, teks sekunder, label uppercase, tinggi minimum 40px, gap 6px.
- **State:** hover menaikkan teks dan border ke teks primer. Aktif diisi sinyal dengan tinta sinyal. Pemilih tahun GitHub mengikuti state aktif yang sama.

### Cards / Containers
Tidak ada kartu generik. Dua panel yang ada:
- **Panel Papan (heatmap, footer):** latar rumah papan, tanpa border dan radius, padding `{spacing.board-pad}`, mengikuti The Scoped Ink Rule.
- **Panel Detail Commit:** `surface-faint` + hairline 1px, muncul setelah sel heatmap dipilih.

### Inputs / Fields
Permukaan publik tidak punya input; input hanya ada di admin, lihat Admin. Field baca-saja di baris jadwal memakai `dt` label tersier dan `dd` 1rem 600; varian nilai besar (IPK) memakai display 2.6rem.

### Navigation
- **Style:** rel fixed setinggi `{spacing.rail-height}`, latar lantai solid dan hairline bawah, selalu solid sejak awal. Logo mark adalah tile flap kecil berisi KFB dengan lipatan di belakang huruf, plus teks PORTFOLIO.
- **Links:** Label, teks sekunder, padding 8px 12px. Hover teks primer + `surface-subtle`. Aktif diisi sinyal.
- **Kontrol bahasa/tema:** tinggi 36px, border hairline; label teks disembunyikan di bawah 640px, hanya ikon.
- **Mobile (<1024px):** overlay layar penuh berlatar lantai, link 1.5rem, kontrol di atas link, toggle ikon di rel.

### Papan Hero (signature)
Satu-satunya three.js di situs, seluruhnya di `src/lib/flapBoard.js`, dimuat lewat dynamic import sebagai chunk terpisah.
- **Struktur:** baris nama selebar 13 kolom (dua baris di desktop), di bawah 720px selebar kata terpanjang (tiga baris), lalu satu baris headline yang diskalakan maksimal 0.72 supaya muat tanpa wrap. Kolom terpisah 1.05 unit, rel logam tipis di antara baris nama, latar belakang hampir hitam di belakang flap.
- **Masuk:** tiap sel berputar 2–4 huruf acak lalu berhenti di huruf akhir, flip 130ms dan 210ms untuk flip terakhir, stagger 26ms, kurva gravitasi (kuadrat) sampai flap menepuk flap di bawahnya.
- **Setelah masuk:** hanya baris headline yang berganti tiap 6 detik kalau headline lebih dari satu. Parallax pointer maksimal 0.035 / 0.022 radian, hanya di perangkat `hover: hover`.
- **Warna:** cahaya ambient 2.45 + directional 1 dari arah (-5, 8, 9) menghasilkan total iradiansi Lambert ≈ 1 pada flap menghadap depan, sehingga warna rendernya sama dengan token. WebGL tidak bisa membaca CSS, jadi nilai rumah, flap, dan tinta disalin sebagai konstanta di file itu.
- **Fallback:** `h1` nama dan headline HTML tampil sampai papan siap atau kalau WebGL gagal, lalu disembunyikan visual tapi tetap dibaca screen reader. Kanvas `aria-hidden`.

**The Render On Demand Rule.** Papan hanya merender saat ada yang bergerak, berhenti saat idle atau di luar layar, pixel ratio maksimal 2, dan rotasi headline dilewati saat tab tersembunyi. Papan idle tidak memakai GPU.

**The Token Light Rule.** Cahaya scene dikalibrasi supaya flap dan tinta yang dirender sama dengan `flap` dan `flap-ink`. Mengubah cahaya atau token tanpa mengkalibrasi ulang keduanya merusak sambungan papan dengan halaman.

**The Three Stops Here Rule.** Three.js tidak keluar dari hero dan tidak diimpor statis di mana pun.

### Tile Flap
Latar flap, tinta flap, sudut 2px, garis lipatan di tengah. Varian: tile skill (tinggi minimum 72px, ikon 36px dalam well, nama Label 700 1.15rem, hover `flap-hover`), angka statistik GitHub (per digit, gap `{spacing.digit-gap}`), logo mark, dan flap loading (tiga digit persentase). Well ikon skill memakai rumah papan untuk logo dominan putih dan tinta krem untuk sisanya, sama di dua tema.

### Baris Jadwal
Pendidikan, Pengalaman, dan Sertifikasi memakai baris yang sama: periode, isi, field. Isi memuat kepala (logo atau thumbnail + judul + sub) dan deskripsi. Logo perusahaan 76px di atas pelat putih, dengan ikon fallback `logo-plate-ink`. Thumbnail sertifikat 112×84px di atas rumah papan. Tautan sertifikat Label 700 bergaris bawah, menebal saat hover. Pendidikan menampilkan nilai sebagai field besar.

### Baris Proyek
Seluruh baris adalah satu tautan. Gambar 16:10 `contain` di atas flap dengan badge jumlah foto, nama Headline, ringkasan 3 baris, lalu kaki berisi "lihat detail" + tag kategori. Hover: gambar skala 1.025 (400ms), nama bergaris bawah, panah geser 5px. Halaman detail mengulang dunia yang sama: galeri di atas rumah papan dengan thumbnail bergaris sinyal saat aktif, judul display, tag kategori di bawah judul, artikel maks 800px, tombol primer.

### Heatmap GitHub
Data live di panel papan. Tiap hari satu sel flap tegak 10×14px (16×22px mulai 1280px), gap 5px. Level 0 memakai `heat-empty`, level 1–4 mencampur tinta ke flap 32%, 55%, 78%, 100%, jadi monokrom tanpa hijau. Hover dan terpilih outline 2px sinyal. Label hari sticky saat matriks digeser. Bar bahasa juga monokrom turunan teks primer, segmen yang di-hover menyala sinyal.

### Overlay
Modal CV dan lightbox di atas hitam 90–92%. Tombol kontrol gambar persegi semi-transparan, jadi sinyal saat hover. Thumbnail aktif dan titik galeri aktif memakai sinyal; titik aktif melebar jadi 24px.

### Footer
Rumah papan di dua tema: nama besar display, tagline, tombol primer, tautan sosial 40px berborder, dan copyright Label di atas hairline.

### Admin
Admin dev-only mewarisi token dan skala radius, tidak di-restyle ke dunia papan. Judulnya sentence case, aksen memakai `--color-accent-primary`, border putus-putus pada kontrol upload, merah pada aksi hapus dan error, dan satu bayangan di modal crop. Semua itu tetap milik admin dan tidak menjadi preseden untuk permukaan publik.

### Motion
- **Judul section:** jatuh sekali dari engsel atas saat section tiba di layar, `rotateX(-68deg)` ke 0 dengan perspective 900px, 560ms `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Respons state:** warna 150ms; overlay dan panel detail commit fade 0.3s (modal CV 0.5s naik 16px) karena muncul sebagai jawaban atas klik.
- **Reduced motion:** semua animasi dan transisi CSS jadi 0.01ms; papan langsung tampil statis tanpa flip, rotasi headline, dan parallax.

**The One Drop Rule.** Satu-satunya gerak saat scroll adalah judul section yang jatuh sekali. Isi section, baris, dan tile tidak punya animasi masuk. Hero menjatuhkan flap sekali, lalu diam kecuali baris headline.

## Do's and Don'ts

### Do:
- **Do** pakai `--flap`, `--housing`, dan tinta flap untuk apa pun yang secara fiksi adalah bagian papan, dan biarkan warnanya sama di dua tema.
- **Do** pakai `--signal` dengan `--signal-ink` hanya untuk aksi utama dan status aktif.
- **Do** pakai `--color-accent-primary` untuk teks, ikon, dan focus di atas lantai.
- **Do** deklarasikan ulang `--color-text-*` ke tinta flap di setiap panel rumah papan baru.
- **Do** taruh riwayat baru di baris jadwal yang sudah ada (periode, isi, field), bukan pola baru.
- **Do** taruh logo perusahaan di atas pelat putih 76px, di dua tema.
- **Do** beri tile flap proporsi 1 : 1.62 kalau ia berisi satu karakter, dengan lipatan 1px di tengah.
- **Do** biarkan judul section baru jatuh sekali lewat hook scroll yang sudah ada.
- **Do** sinkronkan konstanta warna di `src/lib/flapBoard.js` dan kalibrasi cahayanya saat token flap, tinta, atau rumah berubah.
- **Do** pertahankan `h1` HTML di hero sebagai fallback dan untuk screen reader.

### Don't:
- **Don't** override token papan atau sinyal di `[data-theme='light']`.
- **Don't** pakai kuning sinyal sebagai warna teks, hiasan, atau pembeda kategori.
- **Don't** pakai `--color-accent-primary` di atas rumah papan; di tema terang nilainya terlalu gelap untuk latar hitam.
- **Don't** terapkan grayscale ke logo perusahaan atau mengganti pelat putihnya jadi warna palet.
- **Don't** impor three.js di luar `src/lib/flapBoard.js`, atau menjalankan render loop terus-menerus.
- **Don't** tambah animasi masuk pada isi section, stagger baris, atau fade saat scroll.
- **Don't** pakai radius di atas 3px, `box-shadow` di permukaan publik, glow, glassmorphism, atau gradien warna.
- **Don't** taruh eyebrow atau kicker di atas judul; tag kategori dan subjudul berada di bawah atau di samping judul.
- **Don't** susun proyek atau riwayat sebagai grid kartu.
- **Don't** pakai warna hijau atau warna-warni di heatmap dan bar bahasa.
- **Don't** anggap `--font-mono` sebagai monospace, atau memakai token sisa yang tidak dipakai komponen mana pun (`--color-accent-glow`, `--glass-*`).
- **Don't** bawa merah, border putus-putus, atau bayangan admin ke permukaan publik.
