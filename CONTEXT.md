# Porto — Project Context

Dokumen ini menjelaskan struktur proyek, cara styling, admin panel, dan deploy ke GitHub Pages **tanpa** admin di production.

| Dokumen | Untuk siapa | Isi |
|---------|-------------|-----|
| [AGENTS.md](./AGENTS.md) | AI agent (Cursor, dll.) | Perintah, aturan kode, do/don't |
| [DESIGN.md](./DESIGN.md) | UI & styling | Token warna, kelas komponen, pola visual |
| CONTEXT.md (ini) | Maintainer | Arsitektur, deploy, fitur khusus |

## Ringkasan

| Item | Detail |
|------|--------|
| Stack | React 19, Vite 8, React Router 7 (HashRouter), Tailwind CSS v4 |
| Data | `public/data/portfolio.json` |
| Dev | `npm run dev` → http://localhost:5173 |
| Admin (dev only) | http://localhost:5173/#/admin |
| Production | Hanya halaman portfolio; admin tidak di-build |

## Struktur folder

```
Porto/
├── public/
│   └── data/portfolio.json    # Sumber data portfolio
├── src/
│   ├── admin/                 # Editor per section (hanya dipakai admin)
│   ├── components/            # UI section (Hero, Projects, dll.)
│   ├── hooks/                 # useScrollReveal
│   ├── pages/
│   │   ├── Home.jsx           # Halaman utama
│   │   └── Admin.jsx          # Panel admin (dev only)
│   ├── App.jsx                # Routing + lazy admin
│   ├── main.jsx               # HashRouter + entry
│   └── index.css              # Tailwind + @theme + komponen @apply
├── vite.config.js             # base: './', plugin Tailwind
└── package.json               # script deploy → gh-pages
```

## Styling (Tailwind)

- **Jangan** tambah file `.css` per komponen.
- Semua gaya ada di `src/index.css`:
  - `@import 'tailwindcss'`
  - `@theme` — token warna/font (mis. `bg-bg-primary`, `text-accent-secondary`)
  - `@layer components` — kelas semantik (`glass-card`, `section-title`, `admin-nav-link`, dll.) memakai `@apply`
- Komponen JSX memakai **nama kelas semantik** yang sudah didefinisikan di `index.css`, atau utility Tailwind langsung (`text-text-secondary`, `flex`, dll.).

### Menambah section baru

1. Tambah field di `portfolio.json`.
2. Buat komponen di `src/components/`.
3. Tambah kelas di `@layer components` di `index.css` jika perlu pola baru.
4. (Opsional) Tambah editor di `src/admin/` + route di `Admin.jsx`.

## Admin panel

### Akses

- Hanya saat `npm run dev` (`import.meta.env.DEV === true`).
- URL: `/#/admin`, `/#/admin/projects`, dll.
- Di production build, route admin **tidak diregister** dan chunk Admin **tidak di-bundle** (lazy + conditional di `App.jsx`).

### Alur edit konten

1. Jalankan `npm run dev`.
2. Buka `/#/admin`.
3. Edit section → **Download JSON** atau **Copy JSON**.
4. Ganti file `public/data/portfolio.json` dengan hasil download.
5. Commit & deploy (lihat bawah).

### Perbaikan error umum

| Masalah | Solusi |
|---------|--------|
| Halaman admin kosong / error | Pastikan `public/data/portfolio.json` valid JSON |
| `require is not defined` | Sudah diperbaiki: pakai `lazy()` ESM di `App.jsx` |
| Crash saat data null | Admin menampilkan pesan error, tombol save disabled |
| Route admin 404 di production | Normal — admin sengaja tidak ada di GitHub Pages |

## Deploy ke GitHub Pages (tanpa admin)

### Repo tujuan

Situs user GitHub Pages: **[kfblogic/kfblogic.github.io](https://github.com/kfblogic/kfblogic.github.io)**  
URL live: **https://kfblogic.github.io/**

Repo jenis `username.github.io` harus di-deploy ke branch `gh-pages`.

### Prasyarat

1. Folder proyek Porto **tidak wajib** punya `git init` — script deploy sudah menyertakan URL repo.
2. Di `package.json`:
   - `"homepage": "."`
   - `"deploy"` → push ke `https://github.com/kfblogic/kfblogic.github.io.git` branch `gh-pages`
3. `vite.config.js`: `base: './'`
4. `HashRouter` di `main.jsx`
5. Hak push ke repo `kfblogic.github.io` (SSH key atau GitHub login saat deploy).

### Langkah deploy

```bash
# 1. Pastikan data & aset terbaru di public/
#    (edit via admin dev → simpan portfolio.json + upload file)

# 2. Build + push isi folder dist ke branch main repo GitHub Pages
npm run deploy
```

Perintah di atas: `predeploy` → `vite build` → push isi `dist/` ke branch `main` di `kfblogic.github.io`.

**Deploy pertama** ke repo yang sudah berisi commit lama: jika gagal karena history berbeda, jalankan sekali:

```bash
npm run build
npx gh-pages -d dist --repo https://github.com/kfblogic/kfblogic.github.io.git --branch gh-pages -f
```

### URL production

- Beranda: `https://kfblogic.github.io/#/`
- Proyek: `https://kfblogic.github.io/#/project/nama-slug`
- **Tidak ada** `/#/admin` di production.

### Deploy manual (alternatif)

```bash
npm run build
npx gh-pages -d dist --repo https://github.com/kfblogic/kfblogic.github.io.git --branch gh-pages
```

### (Opsional) Git lokal di folder Porto

Untuk version control proyek sumber (bukan wajib untuk deploy):

```bash
git init
git remote add origin https://github.com/kfblogic/kfblogic.github.io.git
# atau repo terpisah jika sumber & Pages dipisah
```

## Scripts npm

| Script | Fungsi |
|--------|--------|
| `npm run dev` | Development + admin |
| `npm run build` | Build production (tanpa admin) |
| `npm run preview` | Preview build lokal |
| `npm run deploy` | Build + push `dist` ke `kfblogic.github.io` branch `gh-pages` |

## Bahasa (ID / EN) & tema (gelap / terang)

- Toggle di **navbar** (tombol ID/EN dan Light/Dark).
- State disimpan di browser: `porto-locale`, `porto-theme`.
- Teks UI: `src/lib/i18n.js` (`translations.id` / `translations.en`).
- Konten dari `portfolio.json`: field opsional dengan suffix `_en` (mis. `description_en`, `heading_en`). Helper: `src/lib/localized.js`.
- Provider React: `src/context/AppSettingsContext.jsx` (bungkus di `main.jsx`).

## Loading dengan persentase

- Saat memuat `portfolio.json` (Home & halaman detail proyek), tampil `LoadingScreen` dengan progress 0–100% (simulasi + 100% saat data siap).
- File: `src/components/LoadingScreen.jsx`, `src/hooks/usePortfolioLoader.js`.

## Environment & routing

- **HashRouter**: path seperti `/#/admin` — cocok untuk static hosting.
- **Data fetch**: `fetch('./data/portfolio.json')` — relatif ke `base: './'`.

## Fitur Khusus & Kustomisasi

### 1. Tech Stack (Skills) & Desain Flat Premium
- **Reorganisasi Section**: Bagian **Skills & Technologies** telah dipindahkan ke posisi atas (tepat di bawah Hero dan di atas Activities) untuk alur visual yang lebih premium.
- **Flat Layout & Custom SVG**: Pengelompokan berdasarkan kategori (Frontend/Backend dll) telah dihapus sepenuhnya di halaman portfolio maupun halaman Admin. Seluruh skill kini dirender sebagai grid/flex badge kaca datar (`skill-flat-badge`) yang bersih, modern, didukung animasi scale-up dan rotasi micro-hover yang dinamis.
- **Deteksi Icon Otomatis & Custom Input**: Sistem mencocokkan nama skill secara case-insensitive dengan koleksi SVG beresolusi tinggi di `src/lib/techIcons.js`. Jika tidak ada, pengguna bisa memasukkan SVG kustom via Skills Editor di admin panel.
- **Kontras ikon (dark & light mode)**: `getSkillIconData()` di `techIcons.js` menganalisis warna `fill`/`style:fill` pada SVG, lalu memilih plate: `on-dark` (logo putih, mis. Next.js), `on-light` (logo hitam), atau `color` (multi-warna, mis. Expo/Java/Haskell). Warna asli SVG **tidak** ditimpa; kontras lewat `--skill-icon-well-*` di `index.css`.

### 2. Floating Scroll-to-Top
- Tombol scroll-to-top diposisikan melayang (fixed floating) di pojok kanan bawah (`bottom: 80px`, `right: 32px`).
- Tombol ini tersembunyi (fade-out) saat berada di bagian paling atas halaman, dan secara dinamis muncul (fade-in) ketika discroll ke bawah.

### 3. Detail Commit & Integrasi GitHub REST API (PAT)
- **Integrasi API Mutakhir**: Selain GitHub Events Stream publik, sistem kini terintegrasi langsung dengan **GitHub Search Commits REST API** (`https://api.github.com/search/commits`) menggunakan `@octokit/core` untuk mencari log commit secara komprehensif.
- **Pengamanan dengan Token & Fallback Otomatis**: Request API dikirimkan dengan header `'X-GitHub-Api-Version': '2026-03-10'`. Jika personal token yang disediakan di component invalid/expired (menyebabkan error 401), sistem secara cerdas mendeteksi error tersebut, beralih ke mode anonymous fallback, dan langsung mengulangi pencarian tanpa mengunci status cache activity.
- **Interaksi Klik Sel**: Mengklik kotak/sel kontribusi pada diagram aktivitas tahunan akan memicu query pencarian untuk menampilkan pesan commit riil, nama repositori, tautan commit SHA, dan waktu detail commit pada tanggal tersebut.
- **Fallback URL**: Jika commit stream tidak tersedia atau bersifat privat, tombol dialihkan otomatis ke GitHub overview aktivitas user pada rentang tanggal tersebut (`https://github.com/username?tab=overview&from=YYYY-MM-DD&to=YYYY-MM-DD`).

## Deploy setelah selesai

1. `npm run build` harus sukses.
2. Tanya apakah lanjut deploy → `npm run deploy` (push `dist/` ke branch `gh-pages` di `kfblogic.github.io`).
3. Commit repo sumber (jika ada git): Conventional Commits, pesan bahasa Inggris.

Cursor rules: `.cursor/rules/deploy-gh-pages.mdc`, `.cursor/rules/sync-project-docs.mdc`.

## Dokumentasi & aturan agent

Perubahan kode/UI/logika harus disertai update dokumen terkait (CONTEXT, AGENTS, DESIGN).

## Maintainer notes

- Jangan commit secret/API key tambahan; gunakan PAT yang disediakan secara aman dalam komponen.
- Setelah mengubah `index.css` (@theme/@apply), jalankan `npm run build` untuk memastikan tidak ada utility Tailwind yang invalid.
- Admin hanya alat bantu lokal; pengunjung GitHub Pages hanya melihat portfolio.
