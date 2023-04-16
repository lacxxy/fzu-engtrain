import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css'
import router from '../router/index.js'
import VueCookies from 'vue3-cookies'
import store from './store'
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(VueCookies)
app.use(store)
app.mount('#app')