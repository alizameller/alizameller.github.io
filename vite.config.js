// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Use '/' if using a custom domain or alizameller.github.io
             // Use '/your-repo-name/' if it's a sub-project
})
