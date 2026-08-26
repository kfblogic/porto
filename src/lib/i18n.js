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
      },
      experience: {
        label: 'Pengalaman',
        title: 'Pengalaman kerja',
        subtitle: 'Track record kerjaanku sampai sekarang',
        present: 'Sekarang',
      },
      certifications: {
        label: 'Sertifikat',
        title: 'Sertifikasi & lisensi',
        subtitle: 'Sertifikat profesional yang sudah saya punya',
        viewCredential: 'Lihat sertifikat',
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
      title: 'CV-ku',
      subtitle: 'Bisa dilihat atau diunduh di sini',
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
      },
      experience: {
        label: 'Experience',
        title: 'Work Experience',
        subtitle: 'My professional journey and career highlights',
        present: 'Present',
      },
      certifications: {
        label: 'Certifications',
        title: 'Licenses & Certifications',
        subtitle: 'Professional credentials I have earned',
        viewCredential: 'View Credential',
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
