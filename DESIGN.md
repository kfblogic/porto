---
name: Porto — Commit Log
description: Portfolio Kevin Febrian Bimantara dibaca kayak git log --graph — flat, GitHub-dark, monospace, tanpa glass/gradient.
colors:
  canvas: "#0d1117"
  canvas-inset: "#010409"
  card: "#161b22"
  card-hover: "#1c2129"
  text-primary: "#e6edf3"
  text-secondary: "#8b949e"
  text-tertiary: "#6e7681"
  link-primary: "#58a6ff"
  add-secondary: "#3fb950"
  border-hairline: "rgba(240,246,252,0.1)"
  border-hover: "rgba(88,166,255,0.4)"
  selection-text: "#ffffff"
typography:
  heading:
    fontFamily: "IBM Plex Sans, -apple-system, BlinkMacSystemFont, sans-serif"
    fontWeight: 700
    fontSize: "clamp(2rem, 4vw, 3rem)"
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "IBM Plex Sans, -apple-system, BlinkMacSystemFont, sans-serif"
    fontWeight: 400
    fontSize: "1.05rem"
    lineHeight: 1.8
  meta-mono:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontWeight: 500
    fontSize: "0.85rem"
    letterSpacing: "0"
  # Inherited micro-scale: dozens of near-neighbor steps accumulated pre-redesign
  # across badges/tags/meta text (see Typography > Inherited Micro-Scale below).
  # Recorded as ground truth, not re-consolidated in this pass.
  scale:
    micro-9: "9px"
    micro-10: "10px"
    micro-11: "11px"
    2xs-a: "0.65rem"
    2xs-b: "0.68rem"
    2xs-c: "0.7rem"
    2xs-d: "0.72rem"
    xs-a: "0.75rem"
    xs-b: "0.78rem"
    xs-c: "0.8rem"
    sm-a: "0.9rem"
    sm-b: "0.95rem"
    md-a: "1.1rem"
    md-b: "1.15rem"
    md-c: "1.2rem"
    md-d: "1.25rem"
    md-e: "1.3rem"
    md-f: "1.35rem"
    lg: "1.75rem"
    display-avatar: "6rem"
rounded:
  node: "2px"
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  section-y: "100px"
components:
  button-primary:
    backgroundColor: "{colors.link-primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  skill-chip:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
---

# Design System: Porto — Commit Log

## Overview

**Creative North Star: "git log --graph"**

Portfolio ini dibaca kayak riwayat commit asli, bukan mood board. Satu branch line (hairline) turun di kiri tiap section, tiap section adalah "commit" dengan node bulat di titik potongnya. Skill dibaca sebagai daftar file yang berubah (`+` hijau di depan tiap nama), GitHub activity dibiarkan jadi dirinya sendiri — heatmap hijau asli, bukan didekorasi ulang. Dunia ini sengaja menolak default "AI portfolio": tidak ada glassmorphism, tidak ada blur orb, tidak ada gradient-text, tidak ada glow ungu. Flat, GitHub-dark, monospace buat data/meta, sans buat prosa.

Ditolak secara eksplisit sebagai anti-referensi: identitas lama situs ini sendiri (dark glassmorphism + aksen ungu-lavender + blur orbs) — persis pola yang bikin portfolio kelihatan "generik AI".

**Key Characteristics:**
- Flat surfaces, hairline border 1px, nyaris tanpa shadow berwarna.
- Branch rail + commit node sebagai motif struktural berulang di tiap section.
- Monospace (IBM Plex Mono) khusus buat data/meta/label — bukan kostum "keliatan teknis".
- Dua warna sinyal yang di-rasio ketat: biru (`#58a6ff`, interaktif/link/selected) dan hijau (`#3fb950`, add/positive/GitHub activity asli). Merah dipakai sesekali buat danger/error (Tailwind `red-500`), bukan bagian dari palet utama.

## Colors

Palet flat GitHub-dark (dark) / GitHub-light (light theme), dua aksen sinyal saja.

### Primary
- **Link Blue** (`#58a6ff` dark / `#0969da` light): interaksi utama — tombol primer, link, tab terpilih, state aktif, commit-dot pada branch rail.

### Secondary
- **Add Green** (`#3fb950` dark / `#1a7f37` light): sinyal "ditambahkan/nyata" — skill list (`+` marker), GitHub heatmap (asli, bukan re-skin biru), section-title node, badge kategori.

### Neutral
- **Canvas** (`#0d1117` dark / `#ffffff` light): latar halaman.
- **Canvas Inset** (`#010409` dark / `#f6f8fa` light): footer, area yang perlu terasa "sedikit lebih dalam".
- **Card** (`#161b22` dark / `#ffffff` light): permukaan kartu — flat, border hairline, tanpa blur.
- **Text Primary/Secondary/Tertiary**: `#e6edf3`/`#8b949e`/`#6e7681` (dark), `#1f2328`/`#59636e`/`#6e7781` (light).

### Named Rules
**The Rationed Signal Rule.** Cuma dua warna sinyal (biru + hijau) yang boleh membawa makna di seluruh situs. Tidak ada warna ketiga buat "variasi" — kalau butuh state baru, pakai bobot/skala, bukan warna baru.

## Typography

**Heading & Body Font:** IBM Plex Sans (dengan fallback system sans)
**Meta/Data Font:** IBM Plex Mono

**Character:** IBM Plex adalah keluarga tipografi teknis-dokumentasi asli (bukan pilihan "kelihatan techy" semata) — sans buat judul/prosa, mono HANYA buat konten yang benar-benar data: tanggal, hash-style label, tag kategori, nav, commit meta. Prosa (deskripsi, body text) selalu sans, tidak pernah mono.

### Hierarchy
- **Section Title** (700, `clamp(2rem,4vw,3rem)`, 1.2): satu node kotak kecil hijau nempel di depan teks, tanpa eyebrow/kicker terpisah di atasnya.
- **Body** (400, 1.05rem, 1.8): 60-70ch pada kolom deskripsi.
- **Meta/Label** (mono, 500, 0.75-0.9rem): tanggal, tag, nav link, commit meta — satu-satunya tempat monospace boleh muncul.

### Named Rules
**The No-Eyebrow Rule.** Tidak ada pill/badge label di atas heading manapun. Heading membawa bobotnya sendiri; identitas commit-log ada di node inline + branch rail, bukan di baris label terpisah.

### Inherited Micro-Scale

Badge/tag/meta text di seluruh situs (proyek, sertifikasi, pengalaman, admin) memakai ~20 ukuran mikro yang saling berdekatan (`0.65rem`–`1.35rem`, lihat frontmatter `typography.scale`) — warisan sebelum redesign ini, direkam apa adanya (ground truth), bukan dikonsolidasi ulang di pass ini karena menyentuh puluhan titik pemakaian di luar cakupan permintaan. Kalau ada kerja tipografi lanjutan, ini kandidat pertama buat disederhanakan ke 5-6 step yang jelas.

## Layout

Container 1200px max-width, section padding vertikal 100px (60px di mobile). Setiap section top-level (`.section`, `.hero`, `#github-activity`) punya hairline `border-left` di tepi kolom konten + node bulat di titik awalnya — branch rail yang menyambung dari Hero sampai Certifications. Skills dirender sebagai grid changed-files (2-4 kolom responsif), bukan cloud pill yang center-aligned.

## Elevation & Depth

**The Flat-By-Default Rule.** Tidak ada glassmorphism, tidak ada backdrop-blur dekoratif, tidak ada glow shadow berwarna zero-offset. Kartu dibedakan lewat border hairline + warna bg, bukan shadow. Modal/dropdown boleh pakai shadow netral (hitam, offset+blur nyata, mis. `0 8px 40px rgba(0,0,0,0.5)`) buat elevasi fungsional — itu satu-satunya konteks shadow diizinkan.

## Shapes

Radius kecil dan konsisten: 6-14px buat card/button (bukan 8-24px lama yang lebih membulat/glassy), pill (`9999px`) cuma buat filter/tag. Avatar hero: rounded-2xl (squircle ala avatar GitHub), bukan lingkaran penuh.

## Components

### Buttons
- **Shape:** rounded-md (8px), monospace label.
- **Primary:** solid `link-primary`, teks putih, hover `brightness-110` + translate-y tipis — tanpa glow shadow.
- **Outline:** border hairline, hover border+text jadi `link-primary`.

### Skill / Tech Chips
- **Style:** border hairline, bg canvas-faint, prefix `+` hijau, font mono — dibaca sebagai baris diff "file ditambahkan", bukan pill dekoratif.

### Cards (Activity/Project/Cert/Experience)
- **Corner:** rounded-lg (10px).
- **Border:** hairline 1px, hover jadi `border-hover` (biru transparan).
- **Shadow:** tidak ada.

### Branch Rail + Commit Node
- Elemen signature situs: garis hairline vertikal di kiri tiap section + node bulat (hollow → filled saat section masuk viewport). GitHub Activity section nodenya selalu hijau solid (bukan animasi masuk-viewport) — melambangkan "data asli, bukan mood".

### Navigation
- Navbar flat, monospace, underline biru tipis buat link aktif. Kontrol bahasa/tema jadi tombol flat bordered, tanpa pill gradient.

## Do's and Don'ts

### Do:
- **Do** pakai monospace cuma buat data/meta/label (tanggal, tag, nav, commit info) — kalau isinya prosa, pakai sans.
- **Do** pertahankan branch rail + commit node sebagai motif satu-satunya buat "struktur/urutan", jangan tambah motif dekoratif kedua yang bersaing.
- **Do** biarkan GitHub heatmap pakai hijau asli — itu satu-satunya tempat "data nyata" harus terlihat sebagai data nyata, bukan re-skin warna brand.

### Don't:
- **Don't** pakai gradient-text, backdrop-blur dekoratif, atau glow shadow zero-offset — itu identitas lama yang sengaja ditinggalkan.
- **Don't** tambah pill/eyebrow label di atas heading manapun.
- **Don't** tambah warna sinyal ketiga di luar biru (interaktif) dan hijau (add/positive); merah cuma buat error/danger, bukan bagian palet dekoratif.
