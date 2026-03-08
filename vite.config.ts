import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: '/ale-ui/',
  plugins: [vue()],
  resolve: {
    alias: {
      'ale-ui': resolve(__dirname, './packages'),
      '@ale-ui/button': resolve(__dirname, './packages/button'),
      '@': resolve(__dirname, './src')
    }
  }
});
