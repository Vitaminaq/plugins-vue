import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require('path');

export default defineConfig({
  plugins: [vue({
    style: {
      filename: 'vue-virtual-scroller'
    }
  })],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'vue-virtual-scroller',
      formats: ['cjs', 'es', 'umd']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        exports: 'named'
      }
    }
  }
})
