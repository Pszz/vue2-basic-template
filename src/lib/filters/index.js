import Vue from 'vue'
import Store from 'store'
import { DateUtils, StringUtils } from '../utils'

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
   * ETH 单位
   */
  eth (val = 0) {
    let config = Store.getters['getClientConfig']
    let step = config ? config.invest.step : 1
    val = val - val % step
    return ((val - 0) / 1e9).toFixed(3)
  },
  /**
   * BTC 单位
   */
  btc (val = 0) {
    return ((val - 0) / 1e8).toFixed(4)
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
