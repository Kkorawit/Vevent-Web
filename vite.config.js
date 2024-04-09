import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{
        target: 'https://capstone23.sit.kmutt.ac.th/kw1',
        // target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      },
      '/graphl':{
        target: 'https://capstone23.sit.kmutt.ac.th/kw1',
        changeOrigin:true,
        secure:false
      }
    },
  },
  plugins: [vue()],
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'./src'),
      '~':path.resolve(__dirname,'./services')
    }
  }
})
