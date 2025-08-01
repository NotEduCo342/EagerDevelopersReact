import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Import the new plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Add the plugin to the array
  ],
  server: {
    host: true,
    port: 5173
  }
})