import fs from 'node:fs'
import path from 'node:path'

const ALLOWED_FOLDERS = new Set(['profile', 'projects', 'experience', 'certifications', 'cv'])

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

function sanitizeFilename(name) {
  return name
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 120) || 'file'
}

/**
 * Dev-only: simpan file ke public/assets/portfolio/ dan portfolio.json.
 * File ikut ter-copy ke dist saat build → aman untuk GitHub Pages.
 */
export function portfolioAdminPlugin() {
  let publicDir = ''

  return {
    name: 'portfolio-admin',
    configResolved(config) {
      publicDir = path.resolve(config.root, 'public')
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/__admin/')) return next()

        try {
          if (req.method === 'POST' && req.url === '/__admin/upload') {
            const folder = sanitizeFilename(String(req.headers['x-asset-folder'] || ''))
            if (!ALLOWED_FOLDERS.has(folder)) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'Folder tidak valid' }))
              return
            }

            const filename = sanitizeFilename(String(req.headers['x-asset-filename'] || 'file.bin'))
            const dir = path.join(publicDir, 'assets', 'portfolio', folder)
            fs.mkdirSync(dir, { recursive: true })

            // Nama file tetap → upload baru menimpa file lama (tanpa timestamp)
            const absPath = path.join(dir, filename)
            const buffer = await readBody(req)
            fs.writeFileSync(absPath, buffer)

            const webPath = `./assets/portfolio/${folder}/${filename}`
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ path: webPath }))
            return
          }

          if (req.method === 'POST' && req.url === '/__admin/save-portfolio') {
            const body = await readBody(req)
            const jsonPath = path.join(publicDir, 'data', 'portfolio.json')
            fs.mkdirSync(path.dirname(jsonPath), { recursive: true })
            fs.writeFileSync(jsonPath, body)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true }))
            return
          }
        } catch (err) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: err.message || 'Server error' }))
          return
        }

        next()
      })
    },
  }
}
