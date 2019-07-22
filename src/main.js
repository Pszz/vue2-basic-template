import Vue from 'vue'
import App from './App.vue'
import router from '@config/router.js'
import store from '@config/store'
import '@config/extend.js'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
