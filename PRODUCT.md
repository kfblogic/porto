# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiter/HR teknis yang sedang screening kandidat kerja atau magang. Mereka cek skill, proyek, dan pengalaman Kevin Febrian Bimantara secara cepat sebelum keputusan lanjut (interview/lamaran).

## Product Purpose

Portfolio statis pribadi Kevin Febrian Bimantara. Menyajikan skill, proyek, aktivitas GitHub, pendidikan, pengalaman, dan sertifikasi dalam satu halaman agar recruiter bisa menilai kelayakan kandidat dengan cepat.

## Positioning

Breadth teknis: full-stack, banyak stack/skill sekaligus. Daftar skill flat (tanpa grouping kategori) + GitHub activity heatmap/commit log jadi bukti produktivitas nyata, bukan klaim kosong.

## Operating Context

- Konten dikelola lewat admin panel lokal (`npm run dev` → `/#/admin`, dev-only, tidak ikut production build).
- Alur edit: admin → Download/Copy JSON → replace `public/data/portfolio.json` → commit → `npm run deploy` (push `dist/` ke `kfblogic.github.io` branch `gh-pages`).
- Bilingual ID/EN (toggle navbar, `src/lib/i18n.js` + field `_en` di JSON) dan dark/light theme (toggle navbar, `localStorage`).
- Activities section fetch GitHub REST/Events API real-time (`@octokit/core`), fallback anonymous saat token invalid.

## Capabilities and Constraints

- React 19 + Vite 8 + HashRouter + Tailwind v4, base `./`, cocok GitHub Pages static hosting.
- Semua gaya di satu file `src/index.css` (`@theme` + `@layer components`) — tidak ada CSS per komponen.
- Admin hanya jalan saat `import.meta.env.DEV`; tidak boleh ikut bundle production.
- Tidak boleh hardcode token/secret GitHub di `src/` (client-side bundle publik).

## Brand Commitments

Nama: Kevin Febrian Bimantara. Visual identity 2026-08: "Commit Log" world — portfolio dibaca kayak `git log --graph` (branch rail, commit-styled section, flat GitHub-dark palette, monospace meta). Menggantikan identitas dark-glassmorphism/ungu-lavender sebelumnya, yang secara eksplisit dianggap user terlalu identik "AI slop" default. Lihat DESIGN.md untuk token & komponen.

## Evidence on Hand

- `public/data/portfolio.json` — sumber kebenaran proyek, skill, pendidikan, pengalaman, sertifikasi. Harus tetap faktual, tidak boleh diisi data rekaan.
- GitHub activity/commit log — diambil live dari GitHub API, bukan data mock/hardcode.
- CV asli (diunggah via admin/CV modal) — dokumen faktual, tidak boleh diubah kontennya oleh AI.

## Product Principles

1. Breadth teknis dan bukti nyata (GitHub activity, proyek riil) mengalahkan klaim/copy generik.
2. Recruiter harus bisa menilai kandidat cepat — hierarki informasi (skill → proyek → pengalaman) harus scannable, bukan cuma indah.
3. Data portfolio (JSON, CV, GitHub) adalah kebenaran tunggal — desain ulang apa pun tidak boleh mengarang atau mengganti fakta ini.
4. Admin adalah alat internal saja — pengunjung publik (recruiter) hanya pernah lihat halaman portfolio, tidak pernah admin.
