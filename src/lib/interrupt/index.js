/**
    文件：src/utils/interrupt.js
    描述：中断监测系统
    作者：Vical
*/

class interrupt {
  /**
   *  构造函数
   *  @param {msec: 中断发生间隔，毫秒}  
   */
  constructor (args) {
    window.inter = this
    this.msec = args.msec
    // 中断集合
    this.types = []
    // 中断增量序号
    this.err = 0
    // 中断检测
    this.runTime = this.interval(() => {
      let nowMsec = Date.now()
      for (let obj of this.types) {
        if (typeof (obj.checkFunc) === 'function' || typeof obj.split === 'number') {
          try {
            let bret = false
            if (obj.split) {
              if (obj._lastmsec === undefined) {
                obj._lastmsec = 0
              }
              if (obj._lastmsec + obj.split > nowMsec) {
                bret = false
              } else {
                obj._lastmsec = nowMsec
                bret = true
              }
            } else {
              bret = obj.checkFunc(nowMsec)
            }
            if (bret && typeof (obj.doFunc) === 'function') {
              obj.doFunc(nowMsec)
            }
          } catch (e) {
            console.log(e)
          }
        }
      }
    }, this.msec)
  }

  interval (func, wait) {
    var interv = function () {
      func()
      return setTimeout(interv, wait)
    }
    return setTimeout(interv, wait)
  }

  /**
   * 注册中断
   * @param { Object } type 
   * @returns { Number } errno 中断序列号
   */
  registe (type) {
    console.log('注册函数')
    return this.types.push(type)
  }
  /**
   * 移除指定中断
   */
  remove (type) {
    let errno = this.types.indexOf(type)
    return this.types.splice(errno, 1)
  }
  /**
   * 停止中断系统
   */
  close () {
    clearTimeout(this.runTime)
  }
}
export default interrupt
