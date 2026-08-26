# Porto — Design System

Panduan visual untuk portfolio gelap premium. **Implementasi tunggal:** `src/index.css` (Tailwind v4 `@theme` + `@layer components`). Jangan duplikasi token di file CSS lain.

## Tema (dark / light)

- Default: **dark** (`data-theme="dark"` pada `<html>`).
- Light: selector `[data-theme='light']` di `src/index.css` menimpa token `@theme`.
- Preferensi user: `localStorage` key `porto-theme`; script inline di `index.html` mencegah flash saat reload.
- Navbar: `.navbar-control-btn`, `.navbar-actions` — toggle bahasa (ID/EN) dan tema (Sun/Moon).

### Token glass & surface (theme-aware)

| Variabel | Dark | Light |
|----------|------|-------|
| `--glass-bg` | ungu gelap semi-transparan | putih ~90% opacity |
| `--glass-border` | putih 8% | ungu tipis |
| `--surface-faint` / `--surface-subtle` | overlay putih halus | ungu sangat halus |
| `--skill-icon-well-dark` | plate gelap untuk logo putih |
| `--skill-icon-well-light` | plate terang untuk logo hitam |
| `--skill-icon-well-color` | plate netral untuk logo multi-warna |

Kelas: `skill-flat-icon--on-dark`, `--on-light`, `--color` (deteksi di `techIcons.js`).

Kelas: `.glass-card` memakai variabel di atas; GitHub stats memakai `.bg-surface-subtle`, `.bg-surface-faint`, `.bg-surface-raised` (bukan `bg-white/[0.03]`).

## Prinsip

- **Dark glassmorphism**: latar gelap, kartu semi-transparan, blur, border halus.
- **Aksen ungu–lavender**: gradien `accent-primary` → `accent-secondary` → `accent-tertiary`.
- **Satu bahasa visual**: section memakai pola yang sama (label pill → judul gradien → subtitle).
- **Animasi halus**: fade/slide on reveal, hover lift pada kartu, tidak berlebihan.

## Token warna (`@theme`)

| Token | Nilai | Pemakaian |
|-------|-------|-----------|
| `bg-primary` | `#0a0a0f` | Body, loading |
| `bg-secondary` | `#12121a` | Footer |
| `bg-card` | `#1a1a2e` | Kartu, scrollbar thumb |
| `bg-card-hover` | `#1f1f35` | Hover kartu |
| `accent-primary` | `#6c63ff` | CTA, glow, link aktif |
| `accent-secondary` | `#a78bfa` | Label section, ikon skill |
| `accent-tertiary` | `#818cf8` | Gradien teks |
| `text-primary` | `#f1f1f7` | Judul, isi utama |
| `text-secondary` | `#a0a0b8` | Subtitle, nav |
| `text-tertiary` | `#6b6b80` | Meta, tanggal |
| `border-primary` | `rgba(255,255,255,0.06)` | Border default |
| `border-hover` | `rgba(108,99,255,0.3)` | Hover kartu |
| `accent-glow` | `rgba(108,99,255,0.3)` | Shadow tombol |

Utility Tailwind: `bg-bg-primary`, `text-accent-secondary`, `border-border-primary`, dll.

## Tipografi

| Peran | Font | Kelas / pemakaian |
|-------|------|-------------------|
| UI / body | Plus Jakarta Sans (`--font-sans`) | `font-sans` di `body` |
| Serif aksen | Lora (`--font-serif`) | Hero atau kutipan jika dipakai |
| Section title | — | `.section-title` — clamp 2rem–3rem, gradient clip |
| Section label | — | `.section-label` — uppercase, tracking lebar, pill |
| Gradient highlight | — | `.gradient-text` |

## Radius & spacing

| Token | Nilai |
|-------|-------|
| `radius-sm` … `radius-xl` | 8px – 24px |
| `radius-full` | pill / tombol bulat |
| `.container` | max-width 1200px, px-6 (md: px-4) |
| `.section` | py 100px (md: 60px) |
| `.section-header` | mb-16 (md: mb-10), center |

## Latar dekoratif

- `.bg-grid` — grid halus fixed full viewport.
- `.bg-glow` + `.bg-glow-1` / `.bg-glow-2` — orbs blur di sudut (Hero/Home).

## Komponen inti

### Layout & section

| Kelas | Peran |
|-------|--------|
| `.container` | Wrapper konten |
| `.section` | Padding vertikal section |
| `.section-header` | Blok judul section |
| `.section-label` | Badge kecil di atas judul |
| `.section-title` | Judul section |
| `.section-subtitle` | Deskripsi di bawah judul |

### Kartu & tombol

| Kelas | Peran |
|-------|--------|
| `.glass-card` | Kartu utama — blur, border, hover lift + glow |
| `.btn` | Base tombol |
| `.btn-primary` | CTA gradien + shadow |
| `.btn-outline` | Outline dengan hover accent |

### Loading (progress %)

| Kelas | Peran |
|-------|--------|
| `.loading-progress-card` | Kartu glass pusat layar |
| `.loading-progress-ring` | Ring SVG + angka persen di tengah |
| `.loading-progress-track` | Bar horizontal di bawah ring |
| `.loading-progress-bar` | Fill bar gradien accent |
| `.loading-percent` | Teks persen besar di ring |
| `.loading-subtext` | Label persen monospace |

Komponen: `src/components/LoadingScreen.jsx`; logika progress: `src/hooks/usePortfolioLoader.js`.

### Animasi entrance

| Kelas | Efek |
|-------|------|
| `.animate-fadeInUp` | Fade + translateY |
| `.animate-fadeIn` | Fade saja |
| `.animate-slideInLeft` / `.animate-slideInRight` | Slide horizontal |
| `.delay-1` … `.delay-6` | Stagger animation-delay |

Hook `useScrollReveal` menambahkan kelas visible saat elemen masuk viewport.

### Navigasi

| Kelas | Peran |
|-------|--------|
| `.navbar` / `.navbar-scrolled` / `.navbar-solid` | Fixed top, blur saat scroll |
| `.nav-link` / `.nav-link.active` | Link + indikator aktif |
| `.navbar-links.active` | Menu mobile terbuka |

### Skills (flat premium)

Tidak ada grouping kategori di UI — daftar datar:

| Kelas | Peran |
|-------|--------|
| `.skills-flat-list` | Flex wrap center |
| `.skill-flat-badge` | Badge kaca per skill |
| `.skill-flat-icon` | SVG 24×24, hover scale + rotate |
| `.skill-flat-name` | Label skill |

Ikon: cocokkan nama di `src/lib/techIcons.js`; SVG kustom dari admin. Logo SVG hitam (`#000`, `black`) harus tetap terbaca di dark bg — gunakan override CSS atribut di `index.css` jika menambah aturan baru (lihat CONTEXT.md).

### Section lain (ringkas)

| Blok CSS | Komponen |
|----------|----------|
| Hero | `.hero-*` — avatar, typewriter, CTA |
| Activities | `.activity-*` |
| Projects | `.project-*`, filter kategori |
| Project detail | `.project-detail-*`, `.project-article` (HTML rich) |
| Lightbox | `.lightbox-*` |
| Education / Experience / Certifications | `.education-*`, `.experience-*`, `.cert-*` |
| GitHub Stats | `.github-*` — heatmap, modal commit |
| Footer | `.footer-*` |
| Scroll to top | `.scroll-to-top-btn` — fixed `bottom-20 right-8`, class `.visible` saat scroll |
| CV modal | `.cv-modal-*` |

## Admin UI

Gaya admin juga di `index.css` (bukan file terpisah):

| Prefix | Contoh |
|--------|--------|
| `.admin-layout` | Sidebar + main |
| `.admin-nav-link` | Nav section editor |
| `.admin-message.success` / `.error` | Feedback simpan |
| `.file-input-*` | Upload aset |
| `.rich-text-*` | Editor artikel proyek (`RichTextEditor.jsx`) |
| `.crop-*` | Preview crop foto profil |

Admin memakai palet yang sama (`bg-bg-primary`, `text-text-secondary`) agar konsisten dengan situs.

## Responsif

- Breakpoint utama via Tailwind: `max-md:`, `max-[600px]:`, dll. di `@apply`.
- Navbar: desktop inline links; mobile fullscreen overlay (`.navbar-links`).
- Section padding dan font size mengecil di `max-md`.

## Konten rich text (proyek)

Artikel proyek disimpan sebagai HTML di `portfolio.json` (`artikel`). Render di detail dengan kelas `.project-article` — pastikan gaya heading/list/link konsisten di `index.css`, bukan inline style baru di komponen.

## Checklist perubahan UI

1. Butuh token baru? → tambah di `@theme`, pakai sebagai utility (`bg-*`, `text-*`).
2. Pola berulang ≥2 tempat? → kelas di `@layer components`.
3. Satu-off layout? → utility Tailwind di JSX, hindari inline style kecuali z-index/position yang sudah ada (mis. `Home.jsx` main `zIndex: 1`).
4. Jalankan `npm run build` setelah edit `index.css`.

## Referensi

- Implementasi lengkap: `src/index.css`
- Alur data & deploy: [CONTEXT.md](./CONTEXT.md)
- Aturan agent: [AGENTS.md](./AGENTS.md)
