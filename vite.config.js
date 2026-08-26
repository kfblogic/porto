import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { portfolioAdminPlugin } from './vite-plugin-portfolio-admin.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), portfolioAdminPlugin()],
  base: './',
})
