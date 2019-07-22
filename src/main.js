import Vue from 'vue'
import App from './App'
import store from './conf/store'
import router from './lib/router'
import Es6Promise from 'es6-promise'
// import Interrupt from './lib/interrupt'
import Directive from './lib/directive/index'
import fastclick from './lib/fastclick-ios1.0.3'
import 'filters'
import 'babel-polyfill'
import 'assets/less/index.less' 
// ES6兼容较低版本
Es6Promise.polyfill()
// fastclick
fastclick.attach(document.body)

// 注册指令
Vue.use(Directive)

// 实例化Vue 
var vue = new Vue({
  el: '#main',
  store,
  router,
  render: createElement => {
    return createElement(App)
  }
})
