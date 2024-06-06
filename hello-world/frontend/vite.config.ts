import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // The following line comes from https://stackoverflow.com/questions/64677212/how-to-configure-proxy-in-vite
  // and (theoretically) instructs Vite to pass on urls starting with '/api' to the backend server
  // this only works in development, for production something else may be required:
  // https://vsupalov.com/combine-frontend-and-backend-development-servers/
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3500',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
