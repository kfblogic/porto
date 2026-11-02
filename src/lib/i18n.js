export const STORAGE_KEYS = {
  locale: 'porto-locale',
  theme: 'porto-theme',
}

export const LOCALES = ['id', 'en']
export const THEMES = ['dark', 'light']

export const translations = {
  id: {
    nav: {
      home: 'Home',
      skills: 'Skills',
      activities: 'Aktivitas',
      projects: 'Project',
      education: 'Pendidikan',
      experience: 'Pengalaman',
      certifications: 'Sertifikasi',
      toggleMenu: 'Buka/tutup menu',
      lang: 'Ganti ke English',
      themeLight: 'Pakai tema terang',
      themeDark: 'Pakai tema gelap',
    },
    hero: {
      greeting: 'Halo, saya',
      viewCv: 'Lihat CV',
      contact: 'Hubungi saya',
      scrollDown: 'Scroll ke bawah',
    },
    sections: {
      skills: {
        label: 'Tech Stack',
        title: 'Skills & teknologi',
        subtitle: 'Tools yang biasa dipakai buat ngoding',
      },
      activities: {
        label: 'Kegiatan Saat Ini',
        title: 'Aktivitas sekarang',
        subtitle: 'Kerjaan & peran yang lagi saya pegang',
      },
      github: {
        title: 'Aktivitas GitHub',
        subtitle: 'Statistik repo saya (update dari API)',
        viewOnGithub: 'Buka di GitHub',
        loadingCommits: 'Lagi ambil log commit…',
        heading: 'Kontribusi GitHub',
        desc: 'Data kontribusi asli dari GitHub per tahun',
        total: 'Total kontribusi',
        streak: 'Streak terpanjang',
        activeDays: 'Hari aktif',
        maxDaily: 'Commit harian terbanyak',
        days: 'hari',
        matrix: 'Matriks kontribusi',
        mon: 'Sen',
        wed: 'Rab',
        fri: 'Jum',
        less: 'Sedikit',
        more: 'Banyak',
        details: 'Detail aktivitas commit',
        clear: 'Hapus pilihan',
        hint: 'Klik salah satu kotak di matriks untuk melihat detail commit pada hari itu.',
        scrollHint: 'Geser buat lihat bulan lain',
        recorded: '{count} kontribusi tercatat',
        notAvailable: 'Detail commit untuk tanggal ini tidak tersedia di public events GitHub.',
        notAvailableNote: 'Public events GitHub hanya mencakup 90 hari terakhir. Kontribusi di hari ini bisa juga berupa issue, diskusi PR, atau aktivitas repo privat.',
        zeroNote: 'Tidak ada log untuk hari tanpa kontribusi.',
        languages: 'Bahasa terbanyak di GitHub',
        contributions: 'kontribusi',
      },
      projects: {
        label: 'Portofolio',
        title: 'Project unggulan',
        subtitle: 'Beberapa project yang pernah kubuat',
        all: 'Semua',
        photos: 'foto',
        viewDetail: 'Lihat detail',
        emptyTitle: 'Belum ada project di filter "{category}"',
        emptyDesc: 'Coba kategori lain atau tampilkan semuanya.',
        showAll: 'Tampilkan semua',
      },
      education: {
        label: 'Pendidikan',
        title: 'Riwayat kuliah',
        subtitle: 'Jenjang pendidikan yang pernah saya tempuh',
        period: 'Periode',
        grade: 'IPK',
      },
      experience: {
        label: 'Pengalaman',
        title: 'Pengalaman kerja',
        subtitle: 'Track record kerjaanku sampai sekarang',
        present: 'Sekarang',
        type: 'Tipe',
        period: 'Periode',
        location: 'Lokasi',
      },
      certifications: {
        label: 'Sertifikat',
        title: 'Sertifikasi & lisensi',
        subtitle: 'Sertifikat profesional yang sudah saya punya',
        viewCredential: 'Lihat sertifikat',
        openPdf: 'Buka PDF',
        issued: 'Terbit',
        validUntil: 'berlaku sampai',
      },
    },
    footer: {
      tagline: 'Suka bikin hal digital yang enak dipakai.',
      rights: 'Semua hak dilindungi',
    },
    loading: {
      portfolio: 'Lagi muat portofolio…',
      project: 'Lagi muat project…',
      failed: 'Gagal ambil data — coba refresh ya',
    },
    projectDetail: {
      back: 'Balik ke home',
      zoom: 'Perbesar gambar',
      clickZoom: 'Klik buat perbesar',
      prevImage: 'Gambar sebelumnya',
      nextImage: 'Gambar berikutnya',
      pickImage: 'Pilih gambar',
      visit: 'Buka project-nya',
      imageOf: 'gambar',
    },
    cvModal: {
      title: 'Curriculum Vitae',
      subtitle: 'Lihat atau unduh CV Kevin Febrian Bimantara',
      close: 'Tutup',
      openTab: 'Buka tab baru',
      download: 'Unduh',
    },
    scrollTop: 'Balik ke atas',
  },
  en: {
    nav: {
      home: 'Home',
      skills: 'Skills',
      activities: 'Activities',
      projects: 'Projects',
      education: 'Education',
      experience: 'Experience',
      certifications: 'Certifications',
      toggleMenu: 'Toggle navigation',
      lang: 'Switch to Indonesian',
      themeLight: 'Light mode',
      themeDark: 'Dark mode',
    },
    hero: {
      greeting: "Hello, I'm",
      viewCv: 'View CV',
      contact: 'Contact Me',
      scrollDown: 'Scroll Down',
    },
    sections: {
      skills: {
        label: 'Tech Stack',
        title: 'Skills & Technologies',
        subtitle: 'Technologies and tools I work with',
      },
      activities: {
        label: 'Current Activities',
        title: "What I'm Doing Now",
        subtitle: 'Roles and activities I am currently focused on',
      },
      github: {
        title: 'GitHub Activity',
        subtitle: 'Real-time statistics from my repositories',
        viewOnGithub: 'View on GitHub',
        loadingCommits: 'Loading live git log entries…',
        heading: 'GitHub Contributions',
        desc: 'Real contribution data from GitHub, per year',
        total: 'Total contributions',
        streak: 'Longest streak',
        activeDays: 'Active days',
        maxDaily: 'Max daily commits',
        days: 'days',
        matrix: 'Contribution matrix',
        mon: 'Mon',
        wed: 'Wed',
        fri: 'Fri',
        less: 'Less',
        more: 'More',
        details: 'Commit activity details',
        clear: 'Clear selection',
        hint: 'Click any square in the matrix to inspect commit activity for that day.',
        scrollHint: 'Swipe to see other months',
        recorded: '{count} contributions recorded',
        notAvailable: 'Commit details for this date are not available in the public events stream.',
        notAvailableNote: 'GitHub public events only cover the last 90 days. Contributions on this day may also be issues, PR discussions, or private repository activity.',
        zeroNote: 'No logs for days with zero contributions.',
        languages: 'Top languages on GitHub',
        contributions: 'contributions',
      },
      projects: {
        label: 'Portfolio',
        title: 'Featured Projects',
        subtitle: 'A selection of projects I have built',
        all: 'All',
        photos: 'photos',
        viewDetail: 'View details',
        emptyTitle: 'No projects for filter "{category}"',
        emptyDesc: 'Try another category or show all projects.',
        showAll: 'Show all',
      },
      education: {
        label: 'Education',
        title: 'Academic Background',
        subtitle: 'My formal education history',
        period: 'Period',
        grade: 'GPA',
      },
      experience: {
        label: 'Experience',
        title: 'Work Experience',
        subtitle: 'My professional journey and career highlights',
        present: 'Present',
        type: 'Type',
        period: 'Period',
        location: 'Location',
      },
      certifications: {
        label: 'Certifications',
        title: 'Licenses & Certifications',
        subtitle: 'Professional credentials I have earned',
        viewCredential: 'View Credential',
        openPdf: 'Open PDF',
        issued: 'Issued',
        validUntil: 'valid until',
      },
    },
    footer: {
      tagline: 'Building digital experiences with passion.',
      rights: 'All rights reserved',
    },
    loading: {
      portfolio: 'Loading portfolio',
      project: 'Loading project',
      failed: 'Failed to load data',
    },
    projectDetail: {
      back: 'Back to home',
      zoom: 'Enlarge image',
      clickZoom: 'Click to enlarge',
      prevImage: 'Previous image',
      nextImage: 'Next image',
      pickImage: 'Pick image',
      visit: 'Visit project',
      imageOf: 'image',
    },
    cvModal: {
      title: 'My CV',
      subtitle: 'View or download my curriculum vitae',
      close: 'Close modal',
      openTab: 'Open in new tab',
      download: 'Download',
    },
    scrollTop: 'Scroll to top',
  },
}

export function translate(locale, key, vars = {}) {
  const parts = key.split('.')
  let value = translations[locale]
  for (const part of parts) {
    value = value?.[part]
  }
  if (value == null) {
    value = translations.id
    for (const part of parts) {
      value = value?.[part]
    }
  }
  if (typeof value !== 'string') return key
  return Object.entries(vars).reduce(
    (str, [k, v]) => str.replaceAll(`{${k}}`, String(v)),
    value,
  )
}
