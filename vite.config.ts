import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('MagicBento')) return 'magic-bento'
          if (!id.includes('node_modules')) return undefined
          if (id.includes('react-dom') || id.includes('/react/')) return 'vendor-react'
          if (id.includes('motion') || id.includes('framer-motion')) return 'vendor-motion'
          if (id.includes('/gsap/')) return 'vendor-gsap'
          if (id.includes('/ogl/')) return 'vendor-ogl'
          if (id.includes('/three/')) return 'vendor-three'
          return undefined
        },
      },
    },
  },
})
