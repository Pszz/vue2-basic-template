import enUs from 'conf/lge/en-us.json'
// 多语言映射表 - 添加多语言需要在此列表添加，已保证文件有效性
const LgeList = {
  'zh-cn': {
    file: 'zh-cn.json',
    name: '简体中文'
  },
  'en-us': {
    file: 'en-us.json',
    name: '英文'
  }
}
export default {
  useList: Object.keys(LgeList),
  // 使用语言
  useLge: {},
  // 当前已经加载的语言
  currentLang: null,
  // 默认语言 - 英语
  defaultLang: 'en-us',
  // 初始进入函数
  install: function (Vue) {
    // 配置默认语言
    this.init()
    // 扩展WS实例到Vue this
    Vue.prototype.$lge = this
  },
  /**
   * 加载默认语言
   */
  init () {
    return this.setCurrLang(this.getCurrLang())
  },
  /**
   * 根据key提取多语言
   */
  get (keys, args) {
    if (keys) {
      let val = this.useLge
      let keysSplit = keys.split('.')
      while (keysSplit.length) {
        if (val) {
          val = val[keysSplit.shift()]
        } else {
          return ''
        }
      }
      if (!val) {
        console.log('未找到多语言字段:', keys)
      }
      if (val !== undefined) {
        if (args) {
          if (Array.isArray(args)) {
            args.forEach(v => {
              val = val.replace('$n', v)
            })
          } else {
            val = val.replace('$n', args)
          }
        }
        return val
      }
    }
    return ''
  },
  /**
   * 获取当前语言
   * @return 当前使用语言
   */
  getCurrLang () {
    return (
      localStorage.getItem('lang') ||
      navigator.language ||
      navigator.browserLanguage ||
      this.defaultLang
    ).toLowerCase()
  },
  /**
   * 设置当前语言
   * @param {lge: 语言名称}
   */
  setCurrLang (lge) {
    let self = this
    return new Promise(resolve => {
      // 未添加配置文件的语言 - 默认加载中文
      if (!LgeList[lge]) {
        // 加载默认语言
        self.importLge(self.defaultLang)
        resolve()
        return false
      }
      this.importLge(lge)
        .then(val => {
          self.currentLang = lge
          // 加载成功
          self.useLge = val
          // 记录缓存
          localStorage.setItem('lang', lge)
          resolve()
        })
        .catch(() => {
          // 重新加载默认语言
          self.importLge(self.defaultLang)
          resolve()
        })
    })
  },
  /**
   * 加载对应语言
   * @param {lge: 语言名称}
   */
  importLge (lge) {
    return new Promise((resolve, reject) => {
      import('conf/lge/' + lge + '.json')
        .then(lgeJSON => {
          resolve(lgeJSON)
        })
        .catch(error => {
          console.error('未找到该语言', lge)
          reject(error)
        })
    })
  }
}
