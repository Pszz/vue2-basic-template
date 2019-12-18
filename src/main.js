import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/scss/index.scss' // global css

import App from './App'
import { httpApi } from '@conf/api'
import store from '@conf/store/index.js'
import router from '@utils/router/index'
// import Directive from '@conf/directive'
// import VueClipboard from 'vue-clipboard2'
import '@/assets/icons' // icon

// set ElementUI lang to EN实例
Vue.use(ElementUI)
// 复制组件
// Vue.use(VueClipboard)
// 注册指令
// Vue.use(Directive)
// 扩展wsapi到Vue this
Vue.prototype.$httpApi = httpApi

Vue.config.productionTip = false

store.vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
