import Debug from './debug'

// 导出组件
export default {
  install: function (Vue) {
    Vue.component(Debug.name, Debug)
  }
}