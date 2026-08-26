/**
 * Upload file ke public/assets/portfolio/ (hanya saat npm run dev).
 * Path relatif (./assets/...) ikut ke dist setelah build → cocok GitHub Pages.
 */
export async function uploadAsset(file, folder, filename) {
  if (!import.meta.env.DEV) {
    throw new Error('Upload file hanya tersedia saat npm run dev')
  }

  const name = filename || file.name || 'file.bin'
  const res = await fetch('/__admin/upload', {
    method: 'POST',
    headers: {
      'X-Asset-Folder': folder,
      'X-Asset-Filename': name,
      'Content-Type': file.type || 'application/octet-stream',
    },
    body: file,
  })

  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(json.error || `Upload gagal (${res.status})`)
  }
  return json.path
}

export async function savePortfolioJson(data) {
  if (!import.meta.env.DEV) {
    throw new Error('Simpan otomatis hanya tersedia saat npm run dev')
  }

  const res = await fetch('/__admin/save-portfolio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data, null, 2),
  })

  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(json.error || `Simpan gagal (${res.status})`)
  }
}

/** URL absolut/relatif yang benar untuk aset di public (dev + production). */
export function assetUrl(path) {
  if (!path) return ''
  if (path.startsWith('data:') || path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  const clean = path.replace(/^\.\//, '')
  if (import.meta.env.DEV) {
    return `/${clean}`
  }
  const base = import.meta.env.BASE_URL || './'
  return `${base}${clean}`
}
