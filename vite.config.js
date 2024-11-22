// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import vitePluginRequire from "vite-plugin-require";
export default defineConfig({
  plugins: [vue(),vitePluginRequire(),],
  // 静态资源的根路径
  base: '/',
  // 构建输出目录
  build: {
    outDir: 'dist'
  },
  // 代理配置
  server: {
    port: 3001,
    open: true,
    proxy: {
      '/api': {
        target: 'http://192.168.1.200:9091/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/_ui': {
        target: 'http://192.168.1.200:9091/_ui',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/_ui/, ''),
      },
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.bcmap', '.mjs', '.ftl'],
    alias: {
      '@': '/src',
      '~@': path.resolve(__dirname, 'src'),
    }
  }
});