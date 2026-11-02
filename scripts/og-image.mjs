// Generate public/og-image.png (1200x630) dari papan hero yang asli.
// Pakai: npm i --no-save playwright-core && npm run dev -- --port 5199 --host 127.0.0.1
//        node scripts/og-image.mjs [path-chrome]
import { chromium } from 'playwright-core'

const browser = await chromium.launch({
  executablePath: process.argv[2] || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
})
const context = await browser.newContext({ viewport: { width: 1200, height: 630 }, reducedMotion: 'reduce' })
const page = await context.newPage()
await page.goto('http://127.0.0.1:5199/#/', { waitUntil: 'load' })
await page.addStyleTag({ content: '.navbar{display:none!important}.hero{padding-top:0!important}.hero-board{height:630px!important}' })
await page.waitForSelector('.hero-fallback.is-live', { timeout: 45000 })
await page.waitForTimeout(1000)
await page.screenshot({ path: 'public/og-image.png' })
await browser.close()
