/**
 * Desc: Vuex 配置表
 * Author: Pi
 */
import Vue from 'vue'
import Vuex from 'vuex'
import VuexConvert from 'vuex-convert'
import User from './user'
const STORE = new VuexConvert({
  // 公共模块 - 不可修改[固定]
  public: {
    // 基础数据 [getBase, setBase]
    base: 0
  },
  modules: {
    User
  }
})

Vue.use(Vuex)
export default new Vuex.Store(STORE)
