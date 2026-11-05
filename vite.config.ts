import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

// After the build, copy dist/index.html -> dist/404.html so GitHub Pages
// serves the SPA for any deep link (e.g. /tools/gdd-calculator) that is
// pasted or refreshed. React Router then renders the correct page.
function spaFallback404() {
  return {
    name: 'spa-fallback-404',
    closeBundle() {
      const dist = resolve(process.cwd(), 'dist')
      const index = resolve(dist, 'index.html')
      const notFound = resolve(dist, '404.html')
      if (existsSync(index)) {
        copyFileSync(index, notFound)
        // eslint-disable-next-line no-console
        console.log('[spa-fallback-404] wrote dist/404.html')
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), spaFallback404()],
  base: '/',
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },
  server: {
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: true,
  }
})
