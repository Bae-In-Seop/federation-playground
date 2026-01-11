import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

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
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^19.0.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^19.0.0',
        },
      },
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
