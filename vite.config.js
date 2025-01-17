import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver(
        // importStyle:false,
      )],
    }),
  ],
  server:{
    port: 5000,
    host: '47.121.140.11',
    open:true,
    proxy: {
      '/api': {
        // target: 'http://47.121.140.11:5000',
        //实验环境
        // target: 'http://10.100.113.33:8889',
        target:'http://47.121.140.11:8889',
        // target: 'http://47.121.140.11:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },

  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  
})


