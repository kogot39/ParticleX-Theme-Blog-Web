import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './js/router'


// 导入样式
import './css/main.css'
import './css/animations.css'
import 'element-plus/dist/index.css'

// 导入懒加载指令
import LazyLoad from './js/utils/lazyload'

const app = createApp(App)

app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.use(LazyLoad) // 注册懒加载指令

app.mount("#app")