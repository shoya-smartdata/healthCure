import { defineConfig } from 'vite';

export default defineConfig({
  base: '/', // Ensure base path is correct
  optimizeDeps: {
    include: ["swiper"], // Include any dependencies that require pre-bundling
  },
  build: {
    outDir: 'dist', // Output directory for the build files
  },
});
