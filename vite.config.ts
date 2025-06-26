import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Mahlet_Atrsaw_Andargei/',
  server: {
    port: 5173,
    open: true
  },
});
