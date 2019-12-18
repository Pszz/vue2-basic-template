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
    // WS 状态(-1:未初始化、0：OPEN、1：OPEN、2：CLOSING、3：CLOSED)
    this.state = -1
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
    this.requestTimeoutMs = 5 * 1000

    // 心跳间隔、心跳发送时间、心跳返回时间
    this.hbIntervalMs = 5000
    this.hbSentMs = 0
    this.hbRecvMs = 0

    // 中断参数
    this.interruptIntervalMs = 200
    this.interruptMs = 0
    this.commonMonErrcb = null
    this.changeState = null
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
      let ctx = this
      if (ws == null) {
        // 还在启动中
        if (ctx.state === WebSocket.CONNECTING) {
          return false
        }
        ctx.initWebSocket(ctx.orgin, ctx.dst).then(_ws => {
          _ws.onmessage = evt => {
            ctx.message(evt)
          }
          _ws.onerror = evt => {
            console.error('WS异常：', evt)
          }
          _ws.onclose = evt => {
            console.error('WS关闭')
          }
          ctx.ws = _ws
        })
        return false
      }
      // 监听状态变化
      if (ws.readyState !== ctx.state) {
        ctx.state = ws.readyState
        if (typeof ctx.changeState === 'function') {
          ctx.changeState(ctx.state)
        }
      }
      switch (ws.readyState) {
        case WebSocket.CONNECTING: // 正在请求中，未完成连接
          break
        case WebSocket.OPEN: // 连接已打开
          // 1. 检查请求超时
          for (let n in ctx.reqMaps) {
            let realval = ctx.reqMaps[n]
            if (realval.now + ctx.requestTimeoutMs < msec) {
              let callbackFunc = realval.callback
              console.log('请求超时:', n)
              typeof callbackFunc === 'function' && callbackFunc({ err: 0 })
              delete ctx.reqMaps[n]
            }
          }
          // 2. 处理写超时
          if (ctx.hbSentMs + ctx.hbIntervalMs < msec) {
            ctx.hbSentMs = msec
            ctx.send(ctx.heartCmd, ctx.heartParams)
          }

          // 3. 处理读超时
          if (ctx.hbRecvMs + ctx.hbIntervalMs * 2.5 < msec) {
            ctx.close()
            break
          }

          // 4. pendding
          ctx.penddingReqs.forEach(v => {
            ctx.request(v.cmd, v.callback, v.params, v.chk)
          })
          ctx.penddingReqs = []

          break
        case WebSocket.CLOSING: // 连接正在关闭
          break
        default:
          // 连接已关闭
          ctx.ws = null
          break
      }
      return ctx
    }
  }
  /**
   * WebSocket 初始化
   * @param { String, Array } url WebSockets 地址||地址集
   * @param { Object } dst 初始化参数
   */
  initWebSocket (url, dst) {
    return new Promise((resolve, reject) => {
      let ctx = this
      let query = [] // 请求参数
      let queue = [] // 请求队列
      // WS 已经启动
      if (this.ws) {
        return resolve(this.ws)
      }
      if (!url || !url.length) {
        return reject(new Error('url is empty'))
      }
      // 参数拼接
      for (let n in dst) {
        query.push(n + '=' + dst[n])
      }
      query = query.length ? '?' + query.join('&') : ''
      // 初始化参数
      ctx.hbRecvMs = Date.now()
      ctx.state = 0

      // 多地址集合
      if (Array.isArray(url)) {
        url.forEach(v => {
          start(v + query)
        })
      } else {
        start(url + query)
      }
      function start (src) {
        let ws = new WebSocket(src)
        queue.push(ws)
        ws.onopen = evt => {
          // 已经有实例启动了,关闭请求
          if (ctx.ws) {
            ws.close()
            return false
          }
          queue.forEach(v => {
            if (ws !== v) {
              v.close()
            }
          })
          ctx.initFunc()
          resolve(ws)
        }
      }
    })
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
   * 状态变更回调函数
   * @param { Function } cb 回调函数
   */
  setChangeState (cb) {
    this.changeState = cb
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
      if (this.reqMaps[data.chk]) {
        callback = this.reqMaps[data.chk].callback
        delete this.reqMaps[data.chk]
      }
    } else {
      // 再处理推送回调
      callback = this.subMaps[data.cmd]
    }
    typeof callback === 'function' && callback(data)
  }
}
export default wsclient
