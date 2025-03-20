// admin/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Admin chạy trên port 3001 (khác với client)
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Proxy tới backend chung
        changeOrigin: true,
      },
    },
  },
});