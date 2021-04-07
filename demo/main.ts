import { createApp } from 'vue'
import { LcComponents } from '@/main'
import App from './App.vue'

import '@/index.css'

const app = createApp(App)
app.use(LcComponents)
app.mount('#app')
