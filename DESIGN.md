---
name: Porto — Dek Kartu Punch
description: Portfolio Kevin Febrian Bimantara sebagai satu dek kartu punch 80-kolom berwarna di atas meja; nama dipunch beneran dalam kode Hollerith.
colors:
  desk: "#161714"
  desk-deep: "#0e0f0d"
  desk-panel: "#1f201d"
  desk-panel-hover: "#282925"
  desk-light: "#d7dad3"
  desk-deep-light: "#c9ccc4"
  desk-panel-light: "#eceee8"
  desk-accent: "#ef6a4f"
  desk-accent-light: "#b8361f"
  desk-signal: "#f2c230"
  desk-signal-light: "#1f4fa3"
  text-primary: "#f1f0ea"
  text-secondary: "#b3b2a9"
  text-tertiary: "#8a8980"
  text-primary-light: "#161714"
  text-secondary-light: "#45463f"
  text-tertiary-light: "#5d5e56"
  border-hairline: "rgba(241, 240, 234, 0.14)"
  border-hairline-light: "rgba(22, 23, 20, 0.2)"
  stock-red: "#e9573f"
  ink-red: "#1a0f0b"
  stock-yellow: "#f2c230"
  ink-yellow: "#1d1704"
  stock-blue: "#1f4fa3"
  ink-blue: "#f4f6fb"
  stock-green: "#2f7d5b"
  ink-green: "#f3f7f2"
  stock-white: "#f6f6f3"
  ink-white: "#161714"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 4.9vw, 4.6rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 118"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4.6vw, 4rem)"
    fontWeight: 850
    lineHeight: 0.95
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 2.6vw, 2.1rem)"
    fontWeight: 800
    lineHeight: 1.1
    fontVariation: "'wdth' 112"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 750
    letterSpacing: "0.07em"
    fontVariation: "'wdth' 87"
  dot:
    fontFamily: "Doto, Archivo, monospace"
    fontSize: "0.72rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.08em"
rounded:
  none: "0px"
spacing:
  container: "1240px"
  gutter: "24px"
  gutter-mobile: "12px"
  section-y: "24px"
  card-pad: "clamp(28px, 4.5vw, 64px)"
  card-pad-x: "clamp(20px, 4.5vw, 64px)"
  card-cut: "clamp(22px, 3vw, 40px)"
  grid-gap: "22px"
components:
  button-primary:
    backgroundColor: "{colors.desk-accent}"
    textColor: "{colors.desk}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
    typography: "{typography.label}"
  button-primary-on-card:
    backgroundColor: "{colors.ink-red}"
    textColor: "{colors.stock-red}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
    typography: "{typography.label}"
  filter-chip:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.none}"
    padding: "9px 16px 8px"
    typography: "{typography.label}"
  filter-chip-active:
    backgroundColor: "{colors.desk-accent}"
    textColor: "{colors.desk}"
    rounded: "{rounded.none}"
    padding: "9px 16px 8px"
  nav-link-active:
    backgroundColor: "{colors.desk-accent}"
    textColor: "{colors.desk}"
    rounded: "{rounded.none}"
    padding: "8px 12px 7px"
  card-section:
    backgroundColor: "{colors.stock-yellow}"
    textColor: "{colors.ink-yellow}"
    rounded: "{rounded.none}"
    padding: "clamp(28px, 4.5vw, 64px) clamp(20px, 4.5vw, 64px) clamp(52px, 5.5vw, 76px)"
  card-project:
    backgroundColor: "{colors.stock-white}"
    textColor: "{colors.ink-white}"
    rounded: "{rounded.none}"
    padding: "34px 22px 20px"
---

# Design System: Porto — Dek Kartu Punch

## Overview

**Creative North Star: "Dek Kartu Punch 80-Kolom"**

Halaman adalah meja; tiap section adalah satu kartu punch IBM berwarna yang diletakkan di atasnya. Kartu (salmon, kuning, kobalt, hijau, putih) menguasai region penuh, bukan jadi aksen kecil di atas latar gelap. Hero adalah kartu raksasa yang benar-benar dipunch: nama dan headline di-encode ke kode Hollerith 12-baris, lubangnya tembus ke warna meja, dan hover tiap kolom menampilkan karakter + kode lubangnya. Bahasa visual diambil dari benda aslinya: pojok kiri-atas terpotong, baris tick 80-kolom di tepi bawah, nomor urut kartu di pojok kanan bawah, baris interpretasi dot-matrix, sobekan stub bergaris putus-putus.

Hierarki dibangun dari ukuran dan lebar huruf, bukan dari label tambahan. Archivo variabel dipakai super-lebar dan super-tebal untuk judul, menyempit dan uppercase-tracked untuk label tercetak; Doto (dot-matrix) cuma untuk string yang "dicetak mesin". Dunia ini flat: tanpa radius bulat, tanpa glass, tanpa glow, tanpa gradient warna. Satu-satunya kedalaman adalah bayangan lembut kartu di atas meja.

Sistem dua tema mengganti warna meja saja (gelap `desk` / terang `desk-light`); warna kartu identik di dua tema, karena kartu adalah benda fisik yang sama.

**Key Characteristics:**
- Kartu berwarna penuh sebagai material utama; meja sebagai satu-satunya latar.
- Pojok kiri-atas terpotong (clip-path) di setiap kartu dan elemen bertanda, nol radius di mana pun di permukaan publik.
- Lubang punch = persegi tegak berwarna meja; dipakai di grid Hollerith, penanda skill, dan heatmap GitHub.
- Solid = terpilih/primer, putus-putus = belum terpilih/sekunder, konsisten di tombol, filter, kontrol nav, dan tautan sosial footer.
- Archivo variabel (lebar 87%–125%) untuk semua teks; Doto khusus string mesin.
- Nomor urut kartu (`KFB 0001`…, `P001`…) di tepi, seperti kolom 73-80.

## Colors

Meja netral hangat yang hampir hitam (atau abu-hijau pucat di tema terang) dengan lima card stock jenuh yang masing-masing membawa ink-nya sendiri.

### Primary
- **Salmon Card Stock** (`stock-red`): kartu hero dan kartu loading; warna pertama yang dilihat recruiter. Ink-nya `ink-red`, cokelat-hitam hangat.
- **Desk Salmon** (`desk-accent` / `desk-accent-light`): aksen di level meja, di luar kartu. Tombol primer, nav link aktif, filter aktif, logo mark, scrollbar thumb, focus ring 2px. Di tema terang menggelap jadi merah bata agar kontras di meja terang.

### Secondary
- **Mustard Card Stock** (`stock-yellow`): kartu Skills dan Experience; juga warna `::selection` di seluruh situs. Ink `ink-yellow`.
- **Desk Signal** (`desk-signal` / `desk-signal-light`): sinyal kedua di level meja (kuning di gelap, kobalt di terang). Outline hover/terpilih pada lubang heatmap, tautan kecil GitHub.

### Tertiary
- **Cobalt Card Stock** (`stock-blue`): kartu Activities, strip default kartu proyek, strip sertifikat. Ink terang `ink-blue`.
- **Ledger Green Card Stock** (`stock-green`): kartu Education, strip sertifikat pertama. Ink terang `ink-green`.

### Neutral
- **Desk** (`desk` / `desk-light`): latar halaman, dan warna yang terlihat lewat setiap lubang punch.
- **Deep Desk** (`desk-deep` / `desk-deep-light`): footer, scrollbar track; meja yang sedikit lebih dalam.
- **Desk Panel** (`desk-panel`, hover `desk-panel-hover`): permukaan sekunder di meja (skeleton, panel admin).
- **Manila White Card Stock** (`stock-white`, ink `ink-white`): kartu GitHub, kartu proyek, kartu sertifikat. Di dalam kartu putih, `desk-signal` dipaksa jadi kobalt.
- **Teks meja** (`text-primary` / `text-secondary` / `text-tertiary`, versi `-light` untuk tema terang): hanya dipakai untuk teks yang duduk langsung di meja (judul section Projects/Certifications, footer, nav).
- **Hairline** (`border-hairline`): garis 1-1.5px untuk pemisah di meja.

### Named Rules
**The Stock Owns Its Ink Rule.** Di dalam kartu, semua warna turunan (teks sekunder 80%, tersier 70%, garis 24%, surface 5-10%, tombol primer) diturunkan dengan `color-mix` dari `--ink` dan `--stock` kartu itu. Jangan pakai token warna meja di dalam kartu; kartu baru cukup mendeklarasikan pasangan stock + ink.

**The Holes Show The Desk Rule.** Lubang punch selalu diisi warna meja (`--desk`), bukan hitam atau warna aksen. Lubang adalah tembusan, bukan cat.

**The Same Deck Both Themes Rule.** Tema terang hanya mengganti meja, teks meja, dan aksen meja. Warna kartu dan ink tidak pernah berubah per tema.

## Typography

**Display Font:** Archivo variabel (`wdth` 62–125, `wght` 100–900), fallback system-ui
**Body Font:** Archivo (sama)
**Label/Mono Font:** Doto (dot-matrix, 500/800), fallback Archivo, monospace. Token `--font-mono` adalah alias ke Archivo, bukan monospace.

**Character:** Satu keluarga grotesk yang direntang ke dua ekstrem: lebar-ekstra-tebal untuk judul yang terasa dicetak di kartu, sempit-uppercase-tracked untuk label field. Doto meniru printer interpretasi mesin punch dan hanya muncul di string yang "dicetak mesin". Angka memakai `tabular-nums` di seluruh body.

### Hierarchy
- **Display** (900, lebar 118%, `clamp(2.4rem, 4.9vw, 4.6rem)`, 0.9, uppercase, max 9ch): nama di hero. Footer logo memakai resep yang sama di skala `clamp(1.8rem, 4vw, 3rem)`.
- **Headline** (850, lebar 125%, `clamp(2.1rem, 4.6vw, 4rem)`, 0.95, uppercase, balance): judul section. Subjudul di kolom kanan, rata kanan, 1.05rem, maks 42ch.
- **Title** (800, lebar 108–112%, `clamp(1.4rem, 2.6vw, 2.1rem)`, 1.1): judul record pendidikan/pengalaman, heading aktivitas; nama proyek di 1.35rem lebar 108%.
- **Body** (400, 1rem–1.05rem, 1.55–1.7): prosa deskripsi, maks 46–62ch.
- **Label** (700–750, lebar 87%, 0.68–0.8rem, tracking 0.06–0.09em, uppercase): tombol, filter, nav link, `dt` field, tag kategori, copyright.
- **Dot** (Doto 800, 0.68–1.25rem, tracking 0.03–0.08em, uppercase): baris interpretasi grid punch, nomor urut kartu, strip headline hero (ink box), baris statistik GitHub, badge hitungan foto/sertifikat, logo mark.

### Named Rules
**The Width Is Hierarchy Rule.** Peringkat dibedakan oleh ukuran dan `font-stretch`, bukan oleh warna atau label pengantar: 125% judul section, 118% nama, 108–112% judul item, 100% prosa, 87% label.

**The Machine Print Rule.** Doto hanya untuk string yang secara fiksi dicetak mesin (interpretasi, nomor urut, hitungan, statistik). Prosa dan judul tidak pernah memakai Doto.

## Layout

Container maks 1240px dengan gutter 24px (12px di bawah 768px). Section vertikal rapat (24px, 12px di mobile) karena jarak antar-kartu dibawa oleh bayangan kartu dan perbedaan warna stock, bukan whitespace. Section bertipe kartu tunggal (Skills, Activities, GitHub, Education, Experience) membungkus seluruh isi dalam satu kartu dengan padding `clamp(28px, 4.5vw, 64px)` dan padding bawah ekstra (52–76px) untuk strip tick + nomor urut. Section dek (Projects, Certifications) duduk langsung di meja dan menyusun banyak kartu kecil.

Header section adalah grid dua kolom 1.4fr / 1fr: judul kiri, subjudul kanan rata kanan, sejajar baseline bawah; satu kolom di bawah 768px. Isi kartu memakai grid "field tercetak": sel bergaris 1.5px kiri-atas + kanan-bawah yang membentuk tabel tanpa garis dobel (skills auto-fill min 150px, field record auto-fit min 140px). Record dan aktivitas dua kolom (kiri judul/deskripsi, kanan fields), ditumpuk di bawah 768px.

Hero: kartu raksasa dua kolom (konten / stub minimal 300px 33%) setinggi `min(100svh - 112px, 700px)`. Band atas adalah grid Hollerith 80 kolom × (1 baris interpretasi + 12 baris lubang), tinggi `clamp(240px, 26vw, 370px)`; nama besar di bawahnya. Stub kanan dipisah garis putus-putus 2px. Di bawah 900px stub pindah ke bawah dengan perforasi horizontal; di bawah 720px grid dipotong ke 24 kolom pertama.

Proyek: 2 kolom (1 kolom di bawah 900px), gap 22px; tiap kartu 42% gambar / info, ditumpuk di bawah 560px. Sertifikat: auto-fill min 210px, gap 16px.

Breakpoint yang dipakai: 560px, 720px, 768px (Tailwind `md`), 900px.

## Elevation & Depth

Sistem flat dengan satu lapisan fisik: kartu terletak di atas meja. Kedalaman kartu datang dari `filter: drop-shadow` lembut berwarna `--desk-shadow` (hitam 45% di gelap, abu-hijau 28% di terang), dipakai lewat pembungkus kartu agar bayangan mengikuti siluet pojok terpotong. Tidak ada shadow lain di permukaan publik. Lubang punch memberi kedalaman negatif: tembusan ke meja.

### Shadow Vocabulary
- **Card on Desk** (`filter: drop-shadow(0 14px 22px var(--desk-shadow))`): pembungkus setiap kartu section dan hero.

### Named Rules
**The One Layer Rule.** Hanya kartu yang terangkat dari meja, dan hanya dengan bayangan Card on Desk. Hover menggeser (translateY -2px tombol, -4px kartu proyek), tidak menambah bayangan atau glow.

## Shapes

Nol radius di seluruh permukaan publik. Bentuk khas sistem ini adalah **pojok kiri-atas terpotong** 45°, `clip-path: polygon(cut 0, 100% 0, 100% 100%, 0 100%, 0 cut)`, diskalakan per ukuran benda: kartu section `clamp(22px, 3vw, 40px)`, kartu proyek 26px, kartu sertifikat 20px, tombol scroll-to-top 10px, nav link 7px, logo mark 6px. Lubang punch persegi tegak (lebar 60% × tinggi 52% sel; heatmap 10×14px; penanda skill 7×16px). Garis terbagi dua bahasa: solid 1.5px untuk struktur (grid field, pemisah record) dan putus-putus 1.5–2px untuk perforasi/sobekan (stub hero, kaki kartu proyek, baris statistik) serta state belum-terpilih.

Kartu proyek dan sertifikat membawa **strip warna atas** (12px proyek, 8px sertifikat) dari keempat card stock, seperti kartu berstrip pemisah jenis data. Tepi bawah setiap kartu section membawa **strip tick 80-kolom** (1px tiap 1.25%, tinggi 7px, opasitas 0.3).

## Components

### Buttons
Label tercetak di kartu: tegas, kotak, tanpa dekorasi.
- **Shape:** sudut tajam (`{rounded.none}`), border 2px.
- **Primary:** latar `--btn-bg`, teks `--btn-fg`, padding 12px 20px, Label type (0.8rem, 750, lebar 87%, uppercase, 0.07em). Di meja: `desk-accent` dengan teks `desk` (putih di tema terang). Di dalam kartu: ink kartu dengan teks stock kartu, otomatis.
- **Hover / Focus:** primer naik `translateY(-2px)` dalam 150ms. Focus global: outline 2px `desk-accent`, offset 3px.
- **Outline:** latar transparan, border 2px putus-putus `currentColor`; hover menjadi solid + surface 10%.

### Chips (filter proyek)
- **Style:** Label type 0.78rem, padding 9px 16px 8px, border 2px putus-putus hairline, teks sekunder.
- **State:** hover menebalkan border ke warna teks primer; aktif = border solid + latar `--btn-bg`, teks `--btn-fg`. Persis aturan sorter: kolom terpilih dipunch solid, sisanya putus-putus.

### Cards / Containers
- **Corner Style:** pojok kiri-atas terpotong, sisanya tajam.
- **Background:** satu card stock penuh (`card--red/yellow/blue/green/white`), ink pasangannya untuk semua teks dan garis.
- **Shadow Strategy:** Card on Desk lewat pembungkus (lihat Elevation & Depth).
- **Border:** tidak ada border luar; kartu proyek/sertifikat memakai strip warna atas.
- **Internal Padding:** `clamp(28px, 4.5vw, 64px)` atas, `clamp(20px, 4.5vw, 64px)` sisi, `clamp(52px, 5.5vw, 76px)` bawah.
- **Signature edge:** strip tick 80-kolom di bawah + nomor urut Doto (`data-seq`) di kanan bawah. Kartu proyek menaruh nomor urut (`P001`) di kanan atas dan kaki dengan garis putus-putus berisi "lihat detail" + tag kategori.

### Navigation
- **Style:** bar fixed, transparan di atas hero, menjadi latar meja + hairline bawah saat di-scroll. Logo mark Doto di kotak terpotong 6px berwarna `--btn-bg`, nama logo 800 lebar 112% uppercase.
- **Links:** Label type 0.76rem, teks sekunder, bentuk tab indeks terpotong 7px. Hover: teks primer + surface 8%. Aktif: tab solid `--btn-bg` / `--btn-fg`.
- **Kontrol bahasa/tema:** 36px tinggi, border 1.5px putus-putus, Label 0.72rem; hover menjadi solid.
- **Mobile (<768px):** overlay layar penuh berlatar meja, link 1.1rem, kontrol di bawah.

### Hollerith Punch Grid (signature)
Grid N kolom (80 di hero, 40 di loading, 24 di hero mobile), tiap kolom: baris interpretasi Doto + 12 posisi (12, 11, 0–9). Angka baris tercetak di ink 38% dengan lebar 75%; posisi berlubang menjadi persegi berwarna meja yang "dipunch" (`scaleY` 0→1, 160ms, berurutan 18ms per kolom setelah 650ms). Hover kolom: latar ink 12%, lubang berubah ink, tooltip Doto `kolom · kode`. Encoding mengikuti tabel Hollerith IBM asli (`src/lib/hollerith.js`); teks dari data profil, bukan hiasan acak. Grid `aria-hidden`; nama asli tetap dirender sebagai `h1`.

### Hero Stub
Kolom kanan kartu hero, latar stock +9% putih, dipisah perforasi 2px putus-putus ink 45%. Berisi foto ID persegi 112px berbingkai ink 2px, deskripsi, tombol primer + outline, ikon sosial kotak 40px (border ink 40%, hover terisi ink).

### Printed Field Grid
Tabel sel bergaris 1.5px (garis kiri-atas di wadah, kanan-bawah di sel). `dt` = Label 0.68rem tersier; `dd` = 1rem 650. Varian angka besar 2.2rem 850 lebar 112%. Dipakai di skills (tiap sel diawali lubang 7×16px berwarna meja) dan fields record.

### GitHub Heatmap Holes
Tiap hari satu posisi lubang 10×14px. Level 0 = outline ink 22%; level 1–4 = isi warna meja 35% / 60% / 82% / 100% (makin penuh makin dipunch). Hover/terpilih: outline 2px `desk-signal`. Di kartu putih tema terang, meja lubang dipaksa `#161714` agar terbaca. Statistik ringkas = satu baris Doto uppercase di antara dua garis putus-putus, bukan grid kartu stat.

### Motion
Kartu hero masuk sekali dari kanan seperti card reader (`translateX(14vw)` → 0, 0.9s `cubic-bezier(0.16, 1, 0.3, 1)`), lalu lubang dipunch kolom demi kolom. Semua animasi dimatikan pada `prefers-reduced-motion`.

## Do's and Don'ts

### Do:
- **Do** bungkus section baru dalam satu kartu stock (`card--*` + `data-seq` berikutnya) atau letakkan dek kartu kecil langsung di meja; pilih stock yang belum dipakai section tetangga.
- **Do** turunkan semua warna di dalam kartu dari `--ink` / `--stock` lewat `color-mix`.
- **Do** pakai pojok kiri-atas terpotong untuk setiap benda berbentuk kartu atau tab, dengan ukuran cut yang sebanding dengan bendanya.
- **Do** tandai state: solid = terpilih/primer, putus-putus = belum terpilih/sekunder.
- **Do** isi setiap lubang dengan warna meja (`--desk`).
- **Do** bangun hierarki lewat ukuran + `font-stretch` Archivo; Doto hanya untuk string mesin.
- **Do** pakai `repeating-linear-gradient` 1px hanya untuk menggambar tick/garis cetak kartu; itu goresan cetak, bukan gradien warna.

### Don't:
- **Don't** pakai `border-radius` di permukaan publik, termasuk pill, lingkaran, atau squircle.
- **Don't** pakai gradien warna, glassmorphism, backdrop-blur, atau glow berwarna; satu-satunya bayangan adalah Card on Desk.
- **Don't** taruh eyebrow/kicker/label kecil di atas judul; judul membawa bobotnya sendiri lewat ukuran dan lebar.
- **Don't** ubah warna card stock per tema; yang berubah hanya meja.
- **Don't** pakai Doto untuk prosa atau judul, dan jangan anggap `--font-mono` sebagai monospace sungguhan.
- **Don't** pakai punch grid sebagai pola hiasan acak; lubang selalu meng-encode teks nyata.
