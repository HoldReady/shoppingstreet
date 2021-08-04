import { createApp } from 'vue'
// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入toast插件
import toast from './components/common/toast/index'

// 安装使用自己创建的toast插件
// createApp.use(toast)

// 这里是设置成生产环境，关闭开发环境，这样可以让vue的没用警告消失
// Vue.config.productionTip = false;

// 创建一个$bus
// Vue.prototype.$bus = new Vue();

createApp(App).use(store).use(router).use(toast).mount('#app')
