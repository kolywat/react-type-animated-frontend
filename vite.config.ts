import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'localhost',
      '282e-2001-2020-4325-e2ab-ace2-1e74-513f-396b.ngrok-free.app', // вставь свой домен от ngrok
    ],
  },
})
