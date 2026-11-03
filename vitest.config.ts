import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue2'
export default defineConfig({
  test: {
    // ...
  },
  plugins:[vue()]
})