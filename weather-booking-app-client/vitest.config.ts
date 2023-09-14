/// <reference types="vitest" />

import { defineConfig } from 'vite'
//import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  //plugins: [vue()],
  build: {
    target: 'esnext'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  preview: {
    port: 5173,
    https: true,
  },
  test: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    globals: true,
    //environment: 'happy-dom',
  },
})