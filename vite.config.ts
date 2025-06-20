import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/RPG_character/',
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  server: {
    port: 5173,
  },
}); 