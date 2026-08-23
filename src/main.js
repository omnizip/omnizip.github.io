import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'
import './assets/styles/animations.css'

// Deep-route restore from the 404.html fallback happens in index.html, before
// this module loads (the router reads location at import time).

const app = createApp(App)

app.use(router)
app.mount('#app')
