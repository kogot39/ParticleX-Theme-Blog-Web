import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  // devServer: {
  //   host: 'localhost',
  //   port: 8080,
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:8080', // 后端接口的地址
  //       secure: false,// 是否验证SSL证书
  //       changeOrigin: true, // 是否允许跨域
  //       pathRewrite: {
  //         '/^/api': '' // 将请求地址中的`/api`替换为空字符串
  //       }
  //     }
  //   }
  // },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1500, // 调整包的大小
    rollupOptions: {
      output: {
        // 最小化拆分包
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
        // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        entryFileNames: 'assets/js/[name].[hash].js', // 用于命名代码拆分时创建的共享块的输出命名
        chunkFileNames: 'assets/js/[name].[hash].js', // 用于输出静态资源的命名，[ext]表示文件扩展名
        assetFileNames: 'assets/[ext]/[name].[hash].[ext]'
      }
    }
  },
})


