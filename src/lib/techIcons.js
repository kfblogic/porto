// Native brand colored SVG icons for popular technology stacks.
const LIGHT_FILLS = new Set([
  '#fff',
  '#ffffff',
  'white',
  '#fefefe',
  '#f5f5f5',
  '#fafafa',
])

const DARK_FILLS = new Set([
  '#000',
  '#000000',
  'black',
  '#111',
  '#111111',
  '#121212',
  '#1a1a1a',
])

/** Hanya untuk ikon bawaan library (bukan SVG custom di portfolio.json) */
const ICON_VARIANT_BY_SKILL = {
  'next js': 'on-dark',
  nextjs: 'on-dark',
  next: 'on-dark',
}

/**
 * @typedef {'on-dark' | 'on-light' | 'color'} SkillIconVariant
 * - on-dark: logo dominan putih → plate gelap
 * - on-light: logo dominan hitam → plate terang
 * - color: logo multi-warna (React, Expo, Java, …) → plate netral
 */

function normalizeColor(value) {
  if (!value) return ''
  const c = value.trim().toLowerCase().replace(/\s+/g, '')
  if (c.startsWith('rgb')) return c
  if (/^#[0-9a-f]{3}$/i.test(c)) {
    return `#${c[1]}${c[1]}${c[2]}${c[2]}${c[3]}${c[3]}`
  }
  return c
}

/** Ambil semua nilai fill dari atribut fill= dan style="fill:…" */
export function extractSvgFills(svg) {
  if (!svg) return []

  const fills = []
  const attrRe = /fill\s*=\s*(?:"([^"]*)"|'([^']*)')/gi
  const styleRe = /style\s*=\s*(?:"([^"]*)"|'([^']*)')/gi
  const styleFillRe = /fill\s*:\s*([^;"')\s]+)/gi

  let match
  while ((match = attrRe.exec(svg))) {
    fills.push(normalizeColor(match[1] || match[2]))
  }
  while ((match = styleRe.exec(svg))) {
    const style = match[1] || match[2]
    let fillMatch
    while ((fillMatch = styleFillRe.exec(style))) {
      fills.push(normalizeColor(fillMatch[1]))
    }
  }

  return fills.filter((f) => f && f !== 'none' && f !== 'currentcolor')
}

/**
 * @param {string} svg
 * @param {string} [skillName]
 * @returns {SkillIconVariant}
 */
export function getSkillIconVariant(svg, skillName = '', options = {}) {
  const { allowSkillOverride = true } = options
  const key = skillName.toLowerCase().trim()

  if (allowSkillOverride && key && ICON_VARIANT_BY_SKILL[key]) {
    return ICON_VARIANT_BY_SKILL[key]
  }

  const fills = extractSvgFills(svg)
  if (!fills.length) return 'color'

  const brand = fills.filter((f) => !LIGHT_FILLS.has(f) && !DARK_FILLS.has(f))
  const light = fills.filter((f) => LIGHT_FILLS.has(f))
  const dark = fills.filter((f) => DARK_FILLS.has(f))

  if (brand.length >= 1) return 'color'

  if (light.length > 0 && dark.length === 0) return 'on-dark'
  if (dark.length > 0 && light.length === 0) return 'on-light'
  if (light.length > 0 && dark.length > 0) return 'color'

  return 'color'
}

export const techIcons = {
  react: `<svg viewBox="-11.5 -10.23 23 20.46" width="100%" height="100%"><circle cx="0" cy="0" r="2.05" fill="#61dafb"/><g stroke="#61dafb" stroke-width="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>`,

  'vue js': `<svg viewBox="0 0 256 221" width="100%" height="100%"><path fill="#41B883" d="M204.8 0H256L128 220.8L0 0h51.2L128 132.4L204.8 0z"/><path fill="#35495E" d="M51.2 0h40L128 64.6L164.8 0h40L128 127.4L51.2 0z"/></svg>`,
  vue: `<svg viewBox="0 0 256 221" width="100%" height="100%"><path fill="#41B883" d="M204.8 0H256L128 220.8L0 0h51.2L128 132.4L204.8 0z"/><path fill="#35495E" d="M51.2 0h40L128 64.6L164.8 0h40L128 127.4L51.2 0z"/></svg>`,

  laravel: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#FF2D20" d="M22.04 15.34l-5.61 3.23-5.59-3.23V8.89l5.59-3.23 5.61 3.23v6.45zm-6.2-7.39l-4.14 2.39v4.77l4.14-2.39V7.95zm-6.66 9.47L3.57 20.65l-2.03-1.18V8.12l2.03-1.18 5.61 3.24V14.1l-4.14-2.39v2.38l4.14 2.39v.94z"/></svg>`,

  'node js': `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#339933" d="M12 2L3 7v10l9 5 9-5V7l-9-5zm1 16.5l-5-2.8V11l5 2.8v4.7zm0-6.2L8 9.5l5-2.8 5 2.8-5 2.8zm5 6.2l-5-2.8V11l5 2.8v4.7z"/></svg>`,
  nodejs: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#339933" d="M12 2L3 7v10l9 5 9-5V7l-9-5zm1 16.5l-5-2.8V11l5 2.8v4.7zm0-6.2L8 9.5l5-2.8 5 2.8-5 2.8zm5 6.2l-5-2.8V11l5 2.8v4.7z"/></svg>`,
  node: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#339933" d="M12 2L3 7v10l9 5 9-5V7l-9-5zm1 16.5l-5-2.8V11l5 2.8v4.7zm0-6.2L8 9.5l5-2.8 5 2.8-5 2.8zm5 6.2l-5-2.8V11l5 2.8v4.7z"/></svg>`,

  mysql: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#00758F" d="M19 12H5V5h14v7zm-2-5H7v3h10V7zm2 7H5v7h14v-7zm-2 5H7v-3h10v3z"/></svg>`,

  mongodb: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#47A248" d="M12 1.5C11.5 3 7.5 10 7.5 13.5c0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5C16.5 10 12.5 3 12 1.5zm0 18.5c-.3 0-.5.2-.5.5v2c0 .3.2.5.5.5s.5-.2.5-.5v-2c0-.3-.2-.5-.5-.5z"/></svg>`,

  python: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#3776AB" d="M12.003 2.003c-2.76 0-5 2.24-5 5h3v1h-4c-1.66 0-3 1.34-3 3v4c0 1.66 1.34 3 3 3h1.5v-2.25c0-1.24 1.01-2.25 2.25-2.25h4.5c1.24 0 2.25-1.01 2.25-2.25V7.003c0-2.76-2.24-5-5-5zm-2.25 2.5a.75.75 0 110 1.5.75.75 0 010-1.5z"/><path fill="#FFD43B" d="M11.997 21.997c2.76 0 5-2.24 5-5h-3v-1h4c1.66 0 3-1.34 3-3v-4c0-1.66-1.34-3-3-3H16.5v2.25c0 1.24-1.01 2.25-2.25 2.25h-4.5c-1.24 0-2.25 1.01-2.25 2.25v4.5c0 2.76 2.24 5 5 5zm2.25-2.5a.75.75 0 110-1.5.75.75 0 010-1.5z"/></svg>`,

  javascript: `<svg viewBox="0 0 24 24" width="100%" height="100%"><rect width="24" height="24" rx="3" fill="#F7DF1E"/><path d="M18.7 18.5c-.3.8-1 1.3-2 1.3-1.3 0-1.8-.8-1.8-1.7h-1.5c0 1.6 1.1 3 3.3 3 2 0 3.4-1.2 3.4-3.1 0-2.1-1.3-2.7-2.6-3.2l-.6-.2c-1-.4-1.5-.7-1.5-1.5 0-.7.6-1.2 1.3-1.2.9 0 1.3.5 1.4 1.2h1.5c-.1-1.5-1.2-2.5-2.9-2.5-1.9 0-3 1.1-3 2.8 0 1.9 1.1 2.5 2.5 3l.6.2c1.2.5 1.7.8 1.7 1.7zm-6.2-4.6c0-1.3-.7-1.7-1.7-1.7-.8 0-1.2.4-1.2 1.1 0 .7.4.9 1 .1l1 .3c1.3.4 1.9 1 1.9 2.2 0 1.6-1.3 2.5-3.2 2.5-2 0-3.1-1-3.1-2.5h1.5c0 1 .7 1.2 1.6 1.2.8 0 1.2-.4 1.2-1.1 0-.6-.3-.9-1-.1l-1-.3c-1.3-.4-1.9-1-1.9-2.2 0-1.5 1.3-2.5 3.2-2.5 1.9 0 3 1.1 3 2.5h-1.5z" fill="#000000"/></svg>`,
  js: `<svg viewBox="0 0 24 24" width="100%" height="100%"><rect width="24" height="24" rx="3" fill="#F7DF1E"/><path d="M18.7 18.5c-.3.8-1 1.3-2 1.3-1.3 0-1.8-.8-1.8-1.7h-1.5c0 1.6 1.1 3 3.3 3 2 0 3.4-1.2 3.4-3.1 0-2.1-1.3-2.7-2.6-3.2l-.6-.2c-1-.4-1.5-.7-1.5-1.5 0-.7.6-1.2 1.3-1.2.9 0 1.3.5 1.4 1.2h1.5c-.1-1.5-1.2-2.5-2.9-2.5-1.9 0-3 1.1-3 2.8 0 1.9 1.1 2.5 2.5 3l.6.2c1.2.5 1.7.8 1.7 1.7zm-6.2-4.6c0-1.3-.7-1.7-1.7-1.7-.8 0-1.2.4-1.2 1.1 0 .7.4.9 1 .1l1 .3c1.3.4 1.9 1 1.9 2.2 0 1.6-1.3 2.5-3.2 2.5-2 0-3.1-1-3.1-2.5h1.5c0 1 .7 1.2 1.6 1.2.8 0 1.2-.4 1.2-1.1 0-.6-.3-.9-1-.1l-1-.3c-1.3-.4-1.9-1-1.9-2.2 0-1.5 1.3-2.5 3.2-2.5 1.9 0 3 1.1 3 2.5h-1.5z" fill="#000000"/></svg>`,

  tailwind: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#06B6D4" d="M12 6.094c-2.766 0-4.304 1.383-4.612 4.148 1.23-1.537 2.615-2.152 4.153-1.845 1.229.246 2.107 1.14 3.078 2.137C16.19 12.18 17.9 13.9 21.23 13.9c2.766 0 4.305-1.383 4.612-4.148-1.23 1.537-2.615 2.152-4.153 1.845-1.229-.246-2.107-1.14-3.078-2.137C17.042 7.82 15.33 6.094 12 6.094zM6.462 12.246C3.696 12.246 2.158 13.63 1.85 16.395c1.23-1.538 2.615-2.153 4.153-1.846 1.229.246 2.107 1.14 3.078 2.137C10.652 18.33 12.36 20.05 15.7 20.05c2.766 0 4.304-1.383 4.612-4.148-1.23 1.538-2.615-2.153-4.153-1.846-1.229-.246-2.107-1.14-3.078-2.137-1.572-1.646-3.28-3.37-6.62-3.37z"/></svg>`,
  tailwindcss: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#06B6D4" d="M12 6.094c-2.766 0-4.304 1.383-4.612 4.148 1.23-1.537 2.615-2.152 4.153-1.845 1.229.246 2.107 1.14 3.078 2.137C16.19 12.18 17.9 13.9 21.23 13.9c2.766 0 4.305-1.383 4.612-4.148-1.23 1.537-2.615 2.152-4.153 1.845-1.229-.246-2.107-1.14-3.078-2.137C17.042 7.82 15.33 6.094 12 6.094zM6.462 12.246C3.696 12.246 2.158 13.63 1.85 16.395c1.23-1.538 2.615-2.153 4.153-1.846 1.229.246 2.107 1.14 3.078 2.137C10.652 18.33 12.36 20.05 15.7 20.05c2.766 0 4.304-1.383 4.612-4.148-1.23 1.538-2.615-2.153-4.153-1.846-1.229-.246-2.107-1.14-3.078-2.137-1.572-1.646-3.28-3.37-6.62-3.37z"/></svg>`,

  git: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#F05032" d="M23.27 11.58L12.42.73a1.53 1.53 0 00-2.17 0L8.03 2.95l2.76 2.76a2.22 2.22 0 011.66-.2c.54.14.97.52 1.18 1.04a2.23 2.23 0 01-1.34 2.87c-.52.2-1.12.06-1.5-.37L8.03 6.3l-.03 9.4c.03.48.27.9.67 1.15.4.25.92.29 1.37.1a2.24 2.24 0 011.1-2.9 2.2 2.2 0 012.26.23l2.84-2.84a2.22 2.22 0 011.83 1.1c.25.48.25 1.05 0 1.53a2.22 2.22 0 01-2.73 1.13l-2.68 2.68a2.24 2.24 0 01-1.1 2.9 2.23 2.23 0 01-2.83-1.2c-.22-.52-.16-1.13.16-1.6l.03-9.5-2.6-2.6L.73 10.42a1.53 1.53 0 000 2.17l10.85 10.85a1.53 1.53 0 002.17 0l9.52-9.52a1.53 1.53 0 000-2.17v-.17z"/></svg>`,

  'next js': `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#ffffff" d="M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm5.955 18.23l-7.39-9.526V18.23H9.176V5.77h1.389l7.39 9.526V5.77h1.389v12.46z"/></svg>`,
  nextjs: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#ffffff" d="M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm5.955 18.23l-7.39-9.526V18.23H9.176V5.77h1.389l7.39 9.526V5.77h1.389v12.46z"/></svg>`,
  next: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#ffffff" d="M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm5.955 18.23l-7.39-9.526V18.23H9.176V5.77h1.389l7.39 9.526V5.77h1.389v12.46z"/></svg>`,

  dart: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#0175C2" d="M2.24 11.76L11.76 2.24c.3-.3.8-.3 1.1 0l3.85 3.85-6.85 6.85-4.7-4.7c-.3-.3-.8-.3-1.1 0l-2.02 2.02c-.3.3-.3.8 0 1.1l7.85 7.85c.3.3.8.3 1.1 0l7.85-7.85c.3-.3.3-.8 0-1.1l-2.02-2.02c-.3-.3-.8-.3-1.1 0l-4.7 4.7-6.85-6.85 3.85-3.85c.3-.3.8-.3 1.1 0l9.52 9.52c.3.3.3.8 0 1.1l-9.52 9.52c-.3.3-.8.3-1.1 0L2.24 12.86c-.3-.3-.3-.8 0-1.1z"/></svg>`,

  postgresql: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#336791" d="M21.56 12.63c.27-.47.44-.99.44-1.58 0-2.31-1.89-4.18-4.21-4.18-1.52 0-2.85.81-3.6 2.02C13.44 7.81 12.11 7 10.59 7c-1.92 0-3.52 1.3-3.97 3.06C5.99 9.87 5.25 9.77 4.45 9.77c-2.32 0-4.21 1.87-4.21 4.18 0 1.34.63 2.52 1.63 3.28C1.3 18.23 2.5 19 3.86 19c1.92 0 3.52-1.3 3.97-3.06.63.19 1.37.29 2.17.29 2.32 0 4.21-1.87 4.21-4.18 0-.41-.06-.8-.17-1.17.75.19 1.49.29 2.29.29 1.92 0 3.52-1.3 3.97-3.06.63.19 1.37.29 2.17.29 1.36 0 2.56-.77 2.99-1.77-.32.06-.63.09-.99.09v-1.18z"/></svg>`,
  postgres: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#336791" d="M21.56 12.63c.27-.47.44-.99.44-1.58 0-2.31-1.89-4.18-4.21-4.18-1.52 0-2.85.81-3.6 2.02C13.44 7.81 12.11 7 10.59 7c-1.92 0-3.52 1.3-3.97 3.06C5.99 9.87 5.25 9.77 4.45 9.77c-2.32 0-4.21 1.87-4.21 4.18 0 1.34.63 2.52 1.63 3.28C1.3 18.23 2.5 19 3.86 19c1.92 0 3.52-1.3 3.97-3.06.63.19 1.37.29 2.17.29 2.32 0 4.21-1.87 4.21-4.18 0-.41-.06-.8-.17-1.17.75.19 1.49.29 2.29.29 1.92 0 3.52-1.3 3.97-3.06.63.19 1.37.29 2.17.29 1.36 0 2.56-.77 2.99-1.77-.32.06-.63.09-.99.09v-1.18z"/></svg>`,

  flutter: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#02569B" d="M14.314 0L2.3 12l3.6 3.6 12.015-12.014L14.314 0zm3.599 7.185L9.5 15.6l3.6 3.6 8.4-8.4-3.587-3.63z" /></svg>`,

  html: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#E34F26" d="M1.5 0h21l-1.91 21.563L12 24l-8.59-2.438L1.5 0zm17.063 5.438H5.438L6 11.25h9.813l-.438 4.75-3.375 1-3.375-1-.25-2.5h-2.5l.438 4.75 5.687 1.625 5.688-1.625.687-7.75H6l-.25-2.875h12.813l-.063 2z"/></svg>`,
  html5: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#E34F26" d="M1.5 0h21l-1.91 21.563L12 24l-8.59-2.438L1.5 0zm17.063 5.438H5.438L6 11.25h9.813l-.438 4.75-3.375 1-3.375-1-.25-2.5h-2.5l.438 4.75 5.687 1.625 5.688-1.625.687-7.75H6l-.25-2.875h12.813l-.063 2z"/></svg>`,

  css: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#1572B6" d="M1.5 0h21l-1.91 21.563L12 24l-8.59-2.438L1.5 0zm17.063 5.438H5.438L6 11.25h9.813l-.438 4.75-3.375 1-3.375-1-.25-2.5h-2.5l.438 4.75 5.687 1.625 5.688-1.625.687-7.75H6l-.25-2.875h12.813l-.063 2zm-7.063 5.812V8.375h3.688L15 11.25H11.5z"/></svg>`,
  css3: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#1572B6" d="M1.5 0h21l-1.91 21.563L12 24l-8.59-2.438L1.5 0zm17.063 5.438H5.438L6 11.25h9.813l-.438 4.75-3.375 1-3.375-1-.25-2.5h-2.5l.438 4.75 5.687 1.625 5.688-1.625.687-7.75H6l-.25-2.875h12.813l-.063 2zm-7.063 5.812V8.375h3.688L15 11.25H11.5z"/></svg>`,

  php: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#777BB4" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-4.5 13H6V9h1.5v6zm5 0h-1.5V9H11l2 3V9h1.5v6H13l-2-3v3zm4.5 0H16V9h1.5v6z"/></svg>`,

  supabase: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#3ECF8E" d="M21.36 11.02a.84.84 0 00-.77-.42h-6.27V2.5c0-.62-.7-.98-1.2-.6l-9.84 8.1c-.4.33-.42.92-.05 1.28.18.17.43.26.68.26h6.27V21.5c0 .62.7.98 1.2.6l9.84-8.1c.4-.33.42-.92.05-1.28a.86.86 0 00-.16-.2z"/></svg>`,

  firebase: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#FFCA28" d="M3.89 15.75L12 22l8.11-6.25L12 1.5 3.89 15.75zm8.11-12.35l5.22 10.15H6.78l5.22-10.15z"/></svg>`,

  typescript: `<svg viewBox="0 0 24 24" width="100%" height="100%"><rect width="24" height="24" rx="3" fill="#3178C6"/><path d="M1.5 1.5h21v21h-21z" fill="#3178c6"/><path d="M11.5 17h-2.5v-6.5H6.5V8.5h7.5V10.5h-2.5V17zm7.5-3.5c0 1.2-.5 2.1-1.5 2.6-.8.4-1.8.6-3 .6-1 0-1.8-.2-2.5-.5-.6-.3-1-.8-1.2-1.4l2.1-1.1c.2.4.4.7.7.9.3.2.7.3 1.2.3.4 0 .8-.1 1.1-.3.3-.2.4-.4.4-.8 0-.3-.1-.5-.4-.7-.2-.2-.6-.3-1.2-.5l-.8-.2c-1-.3-1.7-.8-2-1.4-.3-.6-.5-1.3-.5-2.1 0-1.1.4-2 1.2-2.5.8-.5 1.8-.7 3-.7.9 0 1.7.2 2.3.5.6.3.9.7 1.1 1.3l-2 1.1c-.2-.3-.3-.5-.5-.6-.2-.1-.5-.2-.9-.2-.4 0-.7.1-.9.3-.2.2-.3.4-.3.6 0 .3.1.5.3.6.2.1.6.3 1.1.4l.8.2c1.1.3 1.8.8 2.2 1.4.4.6.5 1.3.5 2.1z" fill="#ffffff"/></svg>`,
  ts: `<svg viewBox="0 0 24 24" width="100%" height="100%"><rect width="24" height="24" rx="3" fill="#3178C6"/><path d="M1.5 1.5h21v21h-21z" fill="#3178c6"/><path d="M11.5 17h-2.5v-6.5H6.5V8.5h7.5V10.5h-2.5V17zm7.5-3.5c0 1.2-.5 2.1-1.5 2.6-.8.4-1.8.6-3 .6-1 0-1.8-.2-2.5-.5-.6-.3-1-.8-1.2-1.4l2.1-1.1c.2.4.4.7.7.9.3.2.7.3 1.2.3.4 0 .8-.1 1.1-.3.3-.2.4-.4.4-.8 0-.3-.1-.5-.4-.7-.2-.2-.6-.3-1.2-.5l-.8-.2c-1-.3-1.7-.8-2-1.4-.3-.6-.5-1.3-.5-2.1 0-1.1.4-2 1.2-2.5.8-.5 1.8-.7 3-.7.9 0 1.7.2 2.3.5.6.3.9.7 1.1 1.3l-2 1.1c-.2-.3-.3-.5-.5-.6-.2-.1-.5-.2-.9-.2-.4 0-.7.1-.9.3-.2.2-.3.4-.3.6 0 .3.1.5.3.6.2.1.6.3 1.1.4l.8.2c1.1.3 1.8.8 2.2 1.4.4.6.5 1.3.5 2.1z" fill="#ffffff"/></svg>`,

  docker: `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#2496ED" d="M13.983 11.078h2.119c.102 0 .186-.083.186-.185V8.99c0-.102-.084-.186-.186-.186h-2.119c-.103 0-.186.084-.186.186v1.903c0 .102.083.185.186.185zM11.261 11.078h2.119c.102 0 .186-.083.186-.185V8.99c0-.102-.084-.186-.186-.186h-2.119c-.103 0-.186.084-.186.186v1.903c0 .102.083.185.186.185zM8.539 11.078h2.119c.102 0 .186-.083.186-.185V8.99c0-.102-.084-.186-.186-.186H8.539c-.102 0-.186.084-.186.186v1.903c0 .102.084.185.186.185zM5.817 11.078h2.119c.102 0 .185-.083.185-.185V8.99c0-.102-.083-.186-.185-.186H5.817c-.102 0-.186.084-.186.186v1.903c0 .102.084.185.186.185zM11.261 8.214h2.119c.102 0 .186-.083.186-.185V6.126c0-.102-.084-.186-.186-.186h-2.119c-.103 0-.186.084-.186.186v1.903c0 .102.083.185.186.185zM8.539 8.214h2.119c.102 0 .186-.083.186-.185V6.126c0-.102-.084-.186-.186-.186H8.539c-.102 0-.186.084-.186.186v1.903c0 .102.084.185.186.185zM5.817 8.214h2.119c.102 0 .185-.083.185-.185V6.126c0-.102-.083-.186-.185-.186H5.817c-.102 0-.186.084-.186.186v1.903c0 .102.084.185.186.185zM8.539 5.352h2.119c.102 0 .186-.083.186-.185V3.264c0-.102-.084-.186-.186-.186H8.539c-.102 0-.186.084-.186.186v1.903c0 .102.084.185.186.185zM13.983 8.214h2.119c.102 0 .186-.083.186-.185V6.126c0-.102-.084-.186-.186-.186h-2.119c-.103 0-.186.084-.186.186v1.903c0 .102.083.185.186.185zM23.905 10.973c-.229-.446-.723-.559-1.121-.309-.434.272-.601.764-.32 1.17.202.293.411.58.625.864-.202.052-.404.1-.606.143l-.159.034c-.815.176-1.547.458-2.222.846-1.392-.931-3.21-1.394-5.321-1.394-.658 0-1.298.046-1.921.134V7.525c.789-.25 1.348-.99 1.348-1.859 0-1.082-.876-1.958-1.958-1.958-1.082 0-1.958.876-1.958 1.958 0 .869.559 1.609 1.348 1.859v3.639c-2.483.743-4.148 2.063-4.994 3.957-.421-.059-.838-.088-1.253-.088-.636 0-1.266.067-1.89.202-.68-.69-1.637-1.123-2.697-1.123-2.162 0-3.914 1.752-3.914 3.914 0 2.122 1.688 3.849 3.791 3.911l.307.003h18.39c.307 0 .584-.162.738-.426.155-.264.155-.589 0-.853-.298-.507-.584-1.026-.858-1.554.764-.919 1.311-2.023 1.611-3.284 1.107-.075 2.148-.567 2.859-1.395.421-.49.336-1.233-.186-1.61z"/></svg>`,
}

/**
 * SVGRepo sering set fill="#000" di tag <svg> — itu menutupi seluruh kotak ikon.
 * Hanya hapus fill hitam/putih di root <svg>, biarkan fill di <path> tetap.
 */
export function sanitizeSkillSvg(svg) {
  if (!svg) return svg
  return svg.replace(
    /<svg([^>]*?)\sfill\s*=\s*(?:"#000000"|"#000"|"black"|"#fff"|"#ffffff"|"white")/gi,
    '<svg$1 fill="none"',
  )
}

function resolveSvgSource(name, customSvg) {
  const trimmed = customSvg?.trim()
  if (trimmed && trimmed.includes('<svg') && trimmed.includes('</svg>')) {
    return { svg: trimmed, fromCustom: true }
  }

  if (!name) {
    return { svg: getPlaceholderIcon(), fromCustom: false }
  }

  const cleanName = name.toLowerCase().trim()
  if (techIcons[cleanName]) {
    return { svg: techIcons[cleanName], fromCustom: false }
  }

  for (const [key, value] of Object.entries(techIcons)) {
    if (cleanName.includes(key) || key.includes(cleanName)) {
      return { svg: value, fromCustom: false }
    }
  }

  return { svg: getPlaceholderIcon(), fromCustom: false }
}

/**
 * @returns {{ svg: string, variant: SkillIconVariant }}
 */
export function getSkillIconData(name, customSvg) {
  const { svg: rawSvg, fromCustom } = resolveSvgSource(name, customSvg)
  const svg = sanitizeSkillSvg(rawSvg)
  const variant = getSkillIconVariant(svg, name, {
    allowSkillOverride: !fromCustom,
  })
  return { svg, variant }
}

/** @deprecated Prefer getSkillIconData */
export function getSkillIcon(name, customSvg) {
  return getSkillIconData(name, customSvg).svg
}

function getPlaceholderIcon() {
  return `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`
}
