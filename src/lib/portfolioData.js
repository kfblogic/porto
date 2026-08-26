/**
 * URL ke portfolio.json di folder public.
 * Path relatif (./data/...) gagal saat pathname bukan root (mis. /admin) — server mengembalikan index.html.
 */
export function getPortfolioDataUrl() {
  if (import.meta.env.DEV) {
    return '/data/portfolio.json'
  }

  const base = import.meta.env.BASE_URL
  if (base.startsWith('http://') || base.startsWith('https://')) {
    return new URL('data/portfolio.json', base.endsWith('/') ? base : `${base}/`).href
  }

  let basePath = window.location.pathname
  if (!basePath.endsWith('/')) {
    basePath = basePath.replace(/\/[^/]+$/, '/') || '/'
  }

  return `${window.location.origin}${basePath}data/portfolio.json`
}

export async function loadPortfolioData() {
  const url = getPortfolioDataUrl()
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} saat memuat ${url}`)
  }

  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    const preview = text.trimStart().slice(0, 40)
    throw new Error(
      `Respons bukan JSON (awal: "${preview}…"). Periksa path: ${url}`
    )
  }
}
