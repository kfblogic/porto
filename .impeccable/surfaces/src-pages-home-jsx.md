---
version: 1
slug: "src-pages-home-jsx"
primary_target: "src/pages/Home.jsx"
related_targets: ["src/pages/ProjectDetail.jsx"]
---

# Surface brief — Home (portfolio)

Scope: halaman publik `/` (Home) + ProjectDetail mewarisi dunia. Mode: Experience. Audiens: recruiter teknis screening cepat. Aksi: Lihat CV / kontak. Bukti: GitHub heatmap live, proyek riil dari portfolio.json. Batasan dari user: animasi ada tapi tidak ramai, three.js hanya di hero, jangan terlalu warna-warni; toggle ID/EN + dark/light tetap, GitHub heatmap live tetap, admin dev-only tetap jalan (tidak di-restyle). Gagal kalau gimmick-sulit-discan ATAU generik.

## Direction contract

THESIS: Portfolio adalah satu papan keberangkatan split-flap mekanis; tiap skill, proyek, dan pengalaman satu baris yang langsung terbaca. Menolak hero split teks-kiri-objek-kanan dan grid kartu.

OWN-WORLD: Rumah papan hampir hitam #111210, flap hitam matte #1c1d1a dengan garis lipatan di tengah, huruf krem #ece8dc, satu kuning lampu sinyal #f0b429 untuk aksi utama dan status aktif saja. Tema terang hanya mengganti lantai aula jadi beton pucat; papan dan flap tetap benda yang sama. Grotesk condensed bergaya rambu, tabular, radius maksimal 3px, tanpa gradien warna, tanpa glow.

STORY: Recruiter melihat nama kandidat jatuh ke tempatnya di papan, membaca peran, lalu scan skill (blok flap), bukti GitHub, proyek (baris besar bergambar), jadwal pendidikan/pengalaman, sertifikat, lalu buka CV atau kontak.

FIRST VIEWPORT: Di bawah rel nav, papan three.js selebar layar: dua baris flap besar mengeja nama (tiga baris di mobile) dan satu baris flap kecil mengeja headline. Di bawahnya satu rel info: foto ID kecil, deskripsi, tombol kuning Lihat CV + Hubungi saya, ikon sosial. Tombol primer terlihat tanpa scroll.

FORM: Papan keberangkatan split-flap, posisi #4 di list grounded; seed:ff199fd3b080a25b. Signature interaction: flap 3D jatuh sekali saat masuk, lalu hanya baris headline yang berganti tiap 6 detik; parallax pointer sangat halus; render berhenti saat idle atau di luar layar. Motion di luar hero: judul section jatuh sekali saat tiba. Reduced-motion: papan statis tanpa flip.

Raises: cape → satu aksen untuk satu kendali; specimen → hierarki dari kontras skala saja; flyer wall → riwayat tetap jadi baris terbaca; ray gun → satu fragmen paling keras per section.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
