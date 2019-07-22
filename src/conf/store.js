/**
 * Desc: Vuex 配置表
 * Author: Pi
 */
import Vue from 'vue'
import Vuex from 'vuex'
import VuexConvert from 'vuex-convert'

const STORE = new VuexConvert({
  // 公共模块 - 不可修改[固定]
  public: {
  },
  // 自定义模块
  modules: {}
})

Vue.use(Vuex)
export default new Vuex.Store(STORE)
