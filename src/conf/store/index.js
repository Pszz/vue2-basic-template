/**
 * Desc: Vuex 配置表
 * Author: Pi
 * 参考用法：https://github.com/Pszz/Vuex-Convert
 */
import Vue from 'vue'
import Vuex from 'vuex'
import VuexConvert from 'vuex-convert/main.js?t=222333'
import settings from './modules/settings'
import tagsView from './modules/tagsView'
import app from './modules/app'
import user from './modules/user'
const STORE = new VuexConvert({
  // 公共模块 - 不可修改[固定]
  public: {},
  // 自定义模块
  modules: {
    app,
    user,
    settings,
    tagsView
  }
})
Vue.use(Vuex)
let VuexStore = new Vuex.Store(STORE)
STORE.vm = VuexStore._vm
export default VuexStore
