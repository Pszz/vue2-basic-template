import Vue from 'vue'
import Directive from './directive'
import Filters from './filters'
import Es6Promise from 'es6-promise'
import fastclick from 'fastclick'
import './media.js'
// 扩展
Vue.config.productionTip = false

// es6兼容较低版本
Es6Promise.polyfill()
fastclick.attach(document.body)

// 注册指令
Vue.use(Directive)

export default {}
