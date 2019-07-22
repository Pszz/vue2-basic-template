export default {
  extends: function (vm) {
    if (!vm) {
      return false
    }
    // 映射表
    let regMaps = {}
    vm.$children.forEach(v => {
      /**
       * 推送数据
       * @param {String} name 推送名称
       * @param {*} value 推送内容
       */
      v.$on('extend-send', function (name, value) {
        let cb = regMaps[name]
        if (cb) {
          cb.forEach(v => {
            if (typeof v === 'function') {
              v(value)
            }
          })
        }
      })
      
      /**
       * 订阅
       * @param {String} name 订阅名称
       * @param {Function} callback 订阅行为
       */
      v.$on('extend-register', function (name, callback) {
        let cb = regMaps[name]
        if (cb === undefined) {
          cb = []
        }
        cb.push(callback)
        regMaps[name] = cb
      })
    })
  }
}
