// Vercel serverless function — proxy GitHub REST calls so the token never reaches the client bundle.
// GITHUB_TOKEN is set in Vercel Project Settings → Environment Variables (server-side only).
export default async function handler(req, res) {
  const { path, ...query } = req.query

  if (!path || !path.startsWith('/')) {
    res.status(400).json({ error: 'Missing or invalid "path" query param' })
    return
  }

  const url = new URL(`https://api.github.com${path}`)
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) url.searchParams.set(key, value)
  }

  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2026-03-10',
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  try {
    const ghRes = await fetch(url, { headers })
    const data = await ghRes.json()
    res.status(ghRes.status).json(data)
  } catch {
    res.status(502).json({ error: 'GitHub upstream request failed' })
  }
}
