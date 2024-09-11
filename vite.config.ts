import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@pages': resolve(__dirname, 'src', 'pages'),
      '@components': resolve(__dirname, 'src', 'components'),
      '@stores': resolve(__dirname, 'src', 'stores'),
      '@utils': resolve(__dirname, 'src', 'utils'),
      '@routers': resolve(__dirname, 'src', 'routers'),
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "sass:math"; '
      }
    }
  },

  server: {
    proxy: {
      '/api': {
        target: 'https://express-2j9u-121668-6-1318434452.sh.run.tcloudbase.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [react()]
})
