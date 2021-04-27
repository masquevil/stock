import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const Path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  alias: {
    '@': Path.resolve(__dirname, 'src'),
    '@/': Path.resolve(__dirname, 'src'),
  },
});
