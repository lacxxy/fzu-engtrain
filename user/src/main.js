import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css'
import router from '../router/index.js'
import VueCookies from 'vue3-cookies'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(VueCookies)
app.mount('#app')