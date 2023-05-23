import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/rainMaterial': {
        target: 'https://smms.app',
        secure: false,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/rainMaterial/, '')
      }
    }
  },
  plugins: [
    vue({ include: [/\.vue$/] }),
    Components({
      dirs: ['src/components'],
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
