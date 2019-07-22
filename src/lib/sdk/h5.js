/**
 * @description H5 SDK业务
 * @author Pi 
 * @date 2018-5-15
 */
// 命名空间
const NAMESPACE = 'H5SDK'

// 函数注册映射表{方法名: {组件名: 对应注册函数}}
const registerMaps = {}

// 初始化命名空间
window[NAMESPACE] = {
  eval: (action, data) => {
    let actionFunc = registerMaps[action]
    console.log('<---------------------------------- App推送数据Begin ----------------------------------->')
    console.log('action:' + action + '\n data:' + JSON.stringify(data))
    console.log('<---------------------------------- App推送数据End ----------------------------------->')
    if (actionFunc) {
      actionFunc.forEach(v => {
        typeof v === 'function' && v(data)
      })
    } else {
      console.error('未注册事件:', action)
    }
  }
}
// h5 sdk 导出方法
const sdk = {
  /**
   * 注册事件
   * funcName: 动作函数名, callback 回调数据
   */
  registerFunc (funcName, callback) {
    let registerName = registerMaps[funcName]
    // 检查是否订阅
    if (!registerName) {
      registerName = registerMaps[funcName] = []
    }
    // 添加到订阅队列
    registerName.push(callback)
  }
}
export default sdk