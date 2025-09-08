import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/translation/', // 仓库名，注意斜杠
  plugins: [vue()],
})
