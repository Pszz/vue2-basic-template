/**
    文件：src/utils/wsclient.js
    描述：WebSocket 请求库
    作者：Pi 
*/

class wsclient {
  /**
   *  构造函数
   *  @param args:{orgin: 请求地址, dst: uri参数, hbCmd: 心跳命令}
   */
  constructor (args = {}) {
    // WS 实例
    this.ws = null

    // WS 地址
    this.orgin = args.orgin
    this.dst = args.dst || {}

    // WS 心跳附带参数
    this.heartCmd = args.hbCmd
    this.heartParams = {}

    // WS 请求映射表
    this.reqMaps = {}
    this.count = 0

    // WS 推送 订阅者集合
    this.subMaps = {}
    this.penddingReqs = []

    // WS 初始化请求表
    this.initFunc = () => {}

    // 请求等待超时时间
    this.requestTimeoutMs = 60 * 1000

    // 心跳配置
    this.hbIntervalMs = 5000
    this.hbSentMs = 0
    this.hbRecvMs = 0

    // 中断参数
    this.interruptIntervalMs = 200
    this.interruptMs = 0
    this.commonMonErrcb = null

    /**
     * 检查执行条件
     * @param {*} msec
     */
    this.checkFunc = msec => {
      if (this.interruptMs + this.interruptIntervalMs > msec) {
        return false
      }
      this.interruptMs = msec
      return true
    }
    /**
     * 执行
     * @param {*} msec
     */
    this.doFunc = msec => {
      let ws = this.ws
      let self = this
      if (ws == null) {
        let url =
          (location.protocol === 'https:' ? 'wss://' : 'wss://') +
          this.orgin.replace(/\/$/, '')
        let query = Object.keys(this.dst)
          .map(v => {
            return `${v}=${this.dst[v]}`
          })
          .join('&')
        url = url + (query ? '?' + query : '')
        ws = new WebSocket(url)
        ws.onopen = evt => {
          self.initFunc()
        }
        ws.onmessage = evt => {
          self.message(evt)
        }
        ws.onerror = evt => {
          console.error('WS异常：', evt)
        }
        ws.onclose = evt => {
          console.error('WS关闭')
        }
        self.ws = ws
        self.hbRecvMs = msec
      }

      switch (ws.readyState) {
        case WebSocket.CONNECTING: // 正在请求中，未完成连接
          break
        case WebSocket.OPEN: // 连接已打开
          // 1. 检查请求超时
          Object.keys(this.reqMaps).forEach(v => {
            let realval = this.reqMaps[v]
            if (realval.now + this.requestTimeoutMs < msec) {
              let callback = this.reqMaps[v].callback
              delete this.reqMaps[v]
              // typeof callback === 'function' && callback(null) // 超时也是要回调的，但是传空
            }
          })

          // 2. 处理写超时
          if (this.hbSentMs + this.hbIntervalMs < msec) {
            this.hbSentMs = msec
            this.send(this.heartCmd, this.heartParams)
          }

          // 3. 处理读超时
          if (this.hbRecvMs + this.hbIntervalMs * 2.5 < msec) {
            this.close()
            break
          }

          // 4. pendding
          this.penddingReqs.forEach(v => {
            this.request(v.cmd, v.callback, v.params, v.chk)
          })
          this.penddingReqs = []

          break
        case WebSocket.CLOSING: // 连接正在关闭
          break
        default:
          // 连接已关闭
          this.ws = null
          break
      }
      return this
    }
  }
  /**
   * 添加WS创建时调用函数
   * @param {Function} func 函数
   */
  changeInitFunc (func) {
    if (typeof func === 'function') {
      this.initFunc = func
    }
  }
  /**
   * 请求接口
   * @param {url: 请求地址，callback: 回调函数， params: 请求参数}
   */
  request (cmd, callback, params, chk) {
    let now = chk || Date.now()
    this.count++
    chk = (now * 1000 + (this.count % 1000)).toString()
    if (this.send(cmd, params, chk)) {
      callback && (this.reqMaps[chk] = { callback: callback, now: now })
      return true
    } else {
      this.penddingReqs.push({
        cmd: cmd,
        callback: callback,
        params: params,
        chk: now
      })
    }
    return false
  }
  /**
   * 修改WS Uri参数
   * @param {Object} dst 请求附属参数
   * @param {String} orgin 请求地址
   */
  changeUrl (dst, orgin) {
    if (JSON.stringify(dst) === JSON.stringify(this.dst)) {
      return false
    }
    this.dst = dst
    orgin && (this.orgin = orgin)
    if (orgin) {
      this.close()
    }
  }
  /**
   * 添加错误检测
   * @param { Function } cb 错误回调函数
   */
  setCommonMonErrcb (cb) {
    this.commonMonErrcb = cb
  }
  /**
   * 更改心跳参数
   * @param {*} para
   */
  changeHbPara (para) {
    this.heartParams = para
    this.hbSentMs = 0
  }
  /**
   * 添加订阅者
   * @param { String } cmd 订阅命令
   * @param { Function } callback 回调函数
   */
  changePushCb (cmd, callback) {
    if (typeof cmd === 'string') {
      if (typeof callback !== 'function') {
        delete this.subMaps[cmd]
      } else {
        this.subMaps[cmd] = callback
      }
    }
  }
  // 关闭ws
  close () {
    let ws = this.ws
    if (ws) {
      ws.close()
      this.ws = null
    }
  }
  // send
  send (cmd, params, chk) {
    let ws = this.ws
    if (ws == null || ws.readyState !== WebSocket.OPEN) {
      return false
    }
    ws.send(
      JSON.stringify({
        cmd: cmd,
        chk: chk,
        para: JSON.stringify(params) === '{}' ? undefined : params
      })
    )
    return true
  }
  // 消息回发
  message (evt) {
    let data = JSON.parse(evt.data) || ''
    if (!data) {
      return
    }

    // 先处理心跳
    if (data.cmd === this.heartCmd) {
      this.hbRecvMs = this.interruptMs
      return
    }
    // 回调通用错误检测
    if (data.err && typeof this.commonMonErrcb === 'function') {
      let bret = this.commonMonErrcb(data)
      if (bret) {
        return
      }
    }
    let callback
    if (data.chk) {
      // 再处理回复
      callback = this.reqMaps[data.chk].callback
      delete this.reqMaps[data.chk]
    } else {
      // 再处理推送回调
      callback = this.subMaps[data.cmd]
    }
    typeof callback === 'function' && callback(data)
  }
}
export default wsclient
