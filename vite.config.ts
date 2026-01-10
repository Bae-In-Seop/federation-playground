import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  base: '/federation-playground/',
  plugins: [
    react(),
    federation({
      name: 'playground',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
  },
  preview: {
    port: 5001,
    strictPort: true,
  },
  server: {
    port: 5001,
    strictPort: true,
  },
})
