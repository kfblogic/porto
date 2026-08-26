# Porto — Instruksi untuk AI Agent

Dokumen ini untuk **Cursor / Codex / agent lain**. Detail arsitektur & deploy ada di [CONTEXT.md](./CONTEXT.md); token visual & kelas CSS ada di [DESIGN.md](./DESIGN.md).

## Ringkasan

Portfolio statis Kevin Febrian Bimantara: React 19 + Vite 8 + HashRouter + Tailwind v4. Data dari `public/data/portfolio.json`. Production di GitHub Pages **tanpa** admin bundle.

## Perintah

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Dev server + admin di `/#/admin` |
| `npm run build` | Build production (admin tidak ikut) |
| `npm run preview` | Preview build lokal |
| `npm run lint` | ESLint |
| `npm run deploy` | Build + push `dist` ke `kfblogic.github.io` branch `gh-pages` |

Setelah mengubah `src/index.css` (@theme / @apply), jalankan `npm run build` untuk memastikan utility Tailwind valid.

## Struktur kode

```
src/
  components/     # Section portfolio (Hero, Projects, …)
  pages/          # Home, ProjectDetail, Admin (dev only)
  admin/          # Editor per section — jangan impor ke komponen publik
  lib/            # portfolioData, techIcons, upload, slug, crop, …
  hooks/          # useScrollReveal
  index.css       # Satu-satunya sumber gaya (@theme + @layer components)
public/data/portfolio.json
```

Urutan section di `Home.jsx`: Hero → Skills → Activities → GitHubStats → Projects → Education → Experience → Certifications.

## Aturan wajib

### Sinkronkan dokumentasi

Saat mengubah script, tampilan, atau logika: perbarui [CONTEXT.md](./CONTEXT.md), [AGENTS.md](./AGENTS.md), dan/atau [DESIGN.md](./DESIGN.md) yang relevan. Aturan Cursor: `.cursor/rules/sync-project-docs.mdc` (always apply).

### Preferensi situs (i18n & tema)

- Context: `src/context/AppSettingsContext.jsx` — `locale` (`id` | `en`), `theme` (`dark` | `light`), disimpan di `localStorage` (`porto-locale`, `porto-theme`).
- UI string: `src/lib/i18n.js` — tambah key di `translations.id` dan `translations.en`.
- Konten JSON: field opsional `{field}_en` (lihat `src/lib/localized.js`).
- Tema terang: override token di `src/index.css` pada `[data-theme='light']`; flash prevention di `index.html` (script inline).
- Glass/surface: `--glass-bg`, `--surface-subtle`, dll. — jangan hardcode `rgba(26,26,46,0.6)` di light mode.
- Ikon skill: `getSkillIconData()` → variant `on-dark` | `on-light` | `color` + plate CSS. Override nama skill (mis. Next.js → `on-dark`) **hanya** untuk ikon bawaan library; SVG custom di `portfolio.json` pakai deteksi warna + `sanitizeSkillSvg()` (hapus `fill` hitam/putih di tag `<svg>`).

### Styling

- **Jangan** buat file `.css` per komponen.
- Tambah gaya di `src/index.css` (`@theme` atau `@layer components`).
- JSX memakai kelas semantik yang sudah ada (`glass-card`, `section-title`, …) atau utility Tailwind dari token `@theme`.
- Ikuti [DESIGN.md](./DESIGN.md) untuk warna, tipografi, dan pola UI.

### Data & aset

- Sumber kebenaran konten: `public/data/portfolio.json`.
- Path aset relatif: `./assets/portfolio/...` (cocok dengan `base: './'`).
- Admin hanya alat lokal: edit → Download/Copy JSON → ganti `portfolio.json` → commit/deploy.

### Admin (dev only)

- Route admin hanya jika `import.meta.env.DEV` (`App.jsx` lazy + conditional).
- Jangan mengubah pola ini agar admin ikut production build.
- Editor baru: tambah di `src/admin/` + route di `Admin.jsx`.

### GitHub API (Activities)

- Pakai `@octokit/core`; header `X-GitHub-Api-Version: 2026-03-10`.
- Jangan commit PAT/token baru; jangan hardcode secret di repo.
- 401 → fallback anonymous, jangan cache error permanen.

### Bahasa Indonesia (UI)

- `translations.id` di `src/lib/i18n.js`: gunakan bahasa **sehari-hari**, hindari bahasa baku/formal (mis. hindari “dengan ini”, “perihal”, “gulir”, “memuat portofolio”).
- `translations.en` tetap natural English.

### Deploy & commit (gh-pages)

- Setelah pekerjaan selesai dan `npm run build` sukses: **tanya user** mau deploy ke gh-pages atau tidak (lihat `.cursor/rules/deploy-gh-pages.mdc`).
- Jika ya: `npm run deploy`.
- Commit repo sumber (jika ada git): **Conventional Commits**, pesan **bahasa Inggris**. Branch `gh-pages` hanya dari `npm run deploy`, bukan commit manual kode React.

### Perubahan umum

- Perubahan kecil, ikuti konvensi file sekitar.
- Functional components + hooks; tidak perlu abstraksi baru untuk satu pemakaian.
- Jangan restore kode yang dihapus user tanpa konteks.
- Jangan commit/deploy kecuali user setuju (deploy) atau meminta commit.

## Menambah fitur

1. Field di `portfolio.json` (+ contoh data valid).
2. Komponen di `src/components/` (props dari data JSON).
3. Kelas di `index.css` jika pola UI baru.
4. (Opsional) Editor di `src/admin/` + route admin.

Proyek baru: slug via `src/lib/projectSlug.js`; gambar via `projectImages` / `ImageGalleryInput`.

Loading halaman: `LoadingScreen` + `usePortfolioLoader` (progress 0–100% simulasi saat fetch `portfolio.json`).

## Verifikasi

- `npm run build` — wajib sebelum deploy.
- `npm run dev` — uji section yang diubah + admin jika menyentuh editor.
- Production: tidak ada `/#/admin`; cek HashRouter path `/#/project/:slug`.

## Dokumen terkait

| File | Isi |
|------|-----|
| [CONTEXT.md](./CONTEXT.md) | Deploy GitHub Pages, admin workflow, fitur khusus |
| [DESIGN.md](./DESIGN.md) | Design system, token, kelas komponen |
