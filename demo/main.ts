import { createApp } from 'vue'
import { LcComponents } from '@/main'
import App from './App.vue'

const app = createApp(App)
app.use(LcComponents)
app.mount('#app')
