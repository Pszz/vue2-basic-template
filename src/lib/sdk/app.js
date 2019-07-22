/**
 * @description APP SDK业务
 * @author Pi 
 * @date 2018-5-15
 */

// 命名空间
const NAMESPACE = 'APPSDK'

// 私有方法
const apiFunc = {
  /**
   * @desc  事件延迟[delay.start()  1秒只可调用一次]
   * @returns true拦截||false通行
   */
  delay: {
    // 上次时间戳
    prevTime: 0,
    // 阻拦间隔
    time: 200,
    // true开启 、false关闭
    start: function () {
      let nowTime = Date.now()
      if ((nowTime - this.prevTime) > this.time) {
        this.prevTime = nowTime
        return false
      } else {
        return true
      }
    }
  },
  /**
   * @desc 创建回调函数[在window上面创建一个随机函数]
   * @returns 返回回调函数名称
   * @param callback 回调函数 destroy: 执行成功后是否销毁
   */
  createCallback: function (callback, destroy) {
    // 随机函数
    let randomName = '_CallBack_' + Date.now()
    // console.log('创建函数：', randomName, callback)
    // 存在函数 - 重新创建
    if (window[randomName]) {
      return this.createCallback(callback, destroy)
    }
    window[randomName] = function (res) {
      /* ...拦截代码 */
      console.log('<---------------------------------- 回调数据Begin ---------------------------------->\n ')
      console.log(randomName, '\n data:' + JSON.stringify(res))
      console.log('\n <---------------------------------- 回调数据End ---------------------------------->')
      // 回调
      typeof callback === 'function' && callback(res)
      // 移除随机函数
      destroy && delete window[randomName]
    }
    return randomName
  }
}
// AppSDK 导出方法
class APPSDK {
  constructor () {
    /**
     * 网络
     * @param {*} params 
     */
    this.net = (params = {}) => {
      this.send('net', params)
    }
    /**
     * 视图
     * @param {*} params 
     */
    this.view = (params = {}) => {
      this.send('view', params)
    }
    /**
     * 系统
     * @param {*} params 
     */
    this.system = (params = {}) => {
      this.send('system', params)
    }
    /**
     * 业务
     * @param {*} params 
     */
    this.business = (params = {}) => {
      this.send('business', params)
    }
    /**
     * 生命周期
     * @param {*} params 
     */
    this.lifecycle = (params = {}) => {
      this.send('lifecycle', params, false)
    }
  }
  /**
  * 对指定属性进行扩展
  * @param {需扩展属性} property 
  * @param {扩展名称} name String || Array[String]
  * @param {扩展值} value Function
  */
  extends (property, name, value) {
    if (this[property]) {
      if (typeof name === 'string') {
        this[property][name] = value.bind(this, value)
      } else {
        // 批量添加
        if (Array.isArray(name)) {
          name.forEach(v => {
            this[property][v] = value.bind(this, v)
          })
        }
      }
    }
  }
  /**
 * @description App交互总出口
 * @param {funcName: 需要调用的方法名， params: 传递参数, destroy: 是否销毁函数}
 */
  send (funcName, params, destroy = true) {
    if (!params) {
      console.error('提示：参数不能为空')
      return false
    }
    if (!params.action) {
      console.error('提示：参数缺少action属性')
      return false
    }
    if (!window[NAMESPACE]) {
      console.error('提示：调用' + funcName + '接口时，发现APP未初始化命名空间:' + NAMESPACE)
      return false
    }

    if (!window[NAMESPACE][funcName]) {
      console.error('APP未初始化当前接口:' + funcName)
      return false
    }
    // 转换成字符串函数
    if (typeof params.callback === 'function') {
      params.callback = apiFunc.createCallback(params.callback, destroy)
    }
    // 推送数据给APP
    window[NAMESPACE][funcName](JSON.stringify(params))
    console.log('---->调用完成：' + NAMESPACE + '.' + funcName + ',\n 数据：' + JSON.stringify(params), ' \n ')
    return true
  }
}

const sdk = new APPSDK()
/**
 * 扩展net函数的post和get
 * 用法示例：this.$APPSDK.post(请求地址, 回调函数, {model: 1, query: { ...请求参数 } })
 */
sdk.extends('net', ['post', 'get'], function (type, url, callback, params = {}) {
  this.net({
    action: type,
    url: url,
    callback: callback,
    prefix: {
      model: params.model || 2, // 默认调用公共模块
      token: true
    },
    query: params.query
  })
})
export default sdk