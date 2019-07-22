import Vue from 'vue'
import { DateUtils, StringUtils } from '../libs/utils'

let filters = {
  /**
   * 数字千位符
   * 1000 -> 1,000
   * @param {*} value
   */
  thousands (value) {
    return (value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  },
  /**
   * 转换成8位小数
   * @param { Number } v
   */
  bit8 (v) {
    if (isNaN(v)) {
      return 0
    }
    return parseFloat((Number(v) / 1e8).toFixed(8))
  },
  /**
   * 转换字符串中间内容为***
   * @param { String } value
   */
  asterisk (value) {
    var reg = /^(.{3}).+(.{6})$/g
    if (!value) return value
    return value.replace(reg, '$1***$2')
  },
  // 转小写
  toLower (val) {
    return typeof val === 'string' ? val.toLocaleLowerCase() : val
  },
  // 转大写
  toUpper (val) {
    return typeof val === 'string' ? val.toUpperCase() : val
  },
  /**
   * 日期格式化
   */
  date (value) {
    if (!StringUtils.isEmpty(value)) {
      return DateUtils.dateFormat2(value, false)
    }
    return ''
  },
  /**
   * 日期时间格式化
   */
  datetime (value) {
    if (!StringUtils.isEmpty(value)) {
      return DateUtils.dateFormat2(value, true)
    }
    return ''
  }
}
Vue.prototype.$filter = filters
// 注册为全局的filter
for (let i in filters) {
  Vue.filter(i, filters[i])
}

export default filters
