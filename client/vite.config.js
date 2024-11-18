import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["jwt-decode"],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3030', // Ensure it's pointing to your backend (port 3030)
        changeOrigin: true,
        secure: false,  // Set to false for local dev (if needed)
      },
    },
  },
});
