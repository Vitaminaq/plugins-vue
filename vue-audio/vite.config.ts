import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require('path');

export default defineConfig({
  plugins: [vue({
    style: {
      filename: 'vue-audio'
    }
  })],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'vue-audio',
      formats: ['cjs' ,'es', 'umd']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        exports: 'named',
        assetFileNames: ({ name }) => {
          console.log(name);
          return name;
        }
      }
    }
  }
})
