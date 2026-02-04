import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  },
  resolve: {
    alias: {
      // जर पाथमध्ये अडचण येत असेल तर हे मदत करेल
      '@': '/src',
    },
  },
})