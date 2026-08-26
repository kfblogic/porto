# Porto — CLAUDE.md

Portfolio statis Kevin Febrian Bimantara. React 19 + Vite 8 + HashRouter + Tailwind v4. Data dari `public/data/portfolio.json`.

**Baca dulu sebelum kerja**, ini sumber kebenaran (jangan duplikasi isinya di sini):

| Dokumen | Isi |
|---------|-----|
| [AGENTS.md](./AGENTS.md) | Perintah, struktur kode, aturan wajib (styling, i18n, admin, GitHub API) |
| [CONTEXT.md](./CONTEXT.md) | Arsitektur, admin workflow, deploy GitHub Pages, fitur khusus |
| [DESIGN.md](./DESIGN.md) | Token warna, kelas CSS, pola UI |

## Perintah cepat

```bash
npm run dev      # dev server + admin di /#/admin
npm run build    # build production (admin tidak ikut)
npm run lint      # ESLint
npm run deploy    # build + push dist/ ke gh-pages (kfblogic.github.io)
```

## Aturan inti (ringkas — detail di AGENTS.md)

- Jangan bikin file `.css` per komponen — semua gaya di `src/index.css`.
- Admin (`src/admin/`, `src/pages/Admin.jsx`) hanya jalan saat `import.meta.env.DEV` — jangan ubah pola ini.
- **Jangan pernah hardcode token/secret di `src/`** — kode client-side ke-bundle ke JS publik, siapa saja bisa baca lewat DevTools/view-source. Kalau butuh GitHub API terautentikasi, taruh di server/edge function, bukan komponen React.
- Konten portfolio: edit lewat admin dev → download JSON → replace `public/data/portfolio.json`. Jangan tulis manual tanpa lewat admin kecuali perubahan kecil.
- Commit (jika ada git): Conventional Commits, pesan bahasa Inggris. Branch `gh-pages` cuma dari `npm run deploy`, bukan commit manual.
- Setelah ubah script/tampilan/logika: sinkronkan AGENTS.md / CONTEXT.md / DESIGN.md yang relevan (lihat `.cursor/rules/sync-project-docs.mdc`).
- Sebelum deploy: tanya user dulu (lihat `.cursor/rules/deploy-gh-pages.mdc`).

## Verifikasi sebelum selesai

- `npm run build` wajib sukses sebelum deploy.
- `npm run dev` — cek section yang diubah + admin kalau nyentuh editor.
- Production tidak ada `/#/admin`.
