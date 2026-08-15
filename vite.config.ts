import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Timestamp of the current build, used to show a "last updated" date on the site.
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
})
