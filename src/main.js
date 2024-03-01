import { createApp } from 'vue'
import '@/style.css'
import router from '@/plugins/router'
import App from '@/App.vue'

const app = createApp({});

createApp(App).use(router).mount('#app')

