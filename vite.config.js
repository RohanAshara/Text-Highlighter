import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'

// Copy content script to output directory
function copyContentScript() {
  return {
    name: 'copy-content-script',
    writeBundle() {
      const contentScript = fs.readFileSync('./public/content.js', 'utf-8')
      fs.writeFileSync('./dist/content.js', contentScript)
    }
  }
}

export default defineConfig({
  plugins: [react(), copyContentScript()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  }
})