import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'  // ← CORRECT v4 import

export default defineConfig({
  plugins: [
    react(),
    tailwindcss() 
  ],
})
