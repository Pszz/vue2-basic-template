export default {
  // 计算时间差
  getDatePoor (start, end) {
    end = end || new Date()
    let startTime = new Date(start).getTime()
    let endTime = new Date(end).getTime()
    if (startTime > endTime) {
      let curTime = new Date().getTime()
      return curTime - startTime
    }
    return endTime - startTime
  },
  /**
   * 秒转天时分秒
   * @param { Number } second 秒整数
   * @param { Boolean } suffix 是否需要后缀
   */
  secondToDate (second, suffix) {
    if (!second) {
      return ''
    }
    second = parseInt(second)
    let s = 0
    let m = 0
    let h = 0
    let d = 0
    s = second % 60
    m = parseInt(second / 60)
    if (m >= 60) {
      h = parseInt(m / 60)
      m = m % 60
    }
    if (h >= 24) {
      d = parseInt(h / 24)
    }
    h = h % 24
    if (suffix) {
      return [
        this.fixzero(d, 2),
        this.fixzero(h, 2),
        this.fixzero(m, 2),
        this.fixzero(s, 2)
      ]
    } else {
      if (d !== 0) {
        return d + '天' + h + '时' + m + '分' + s + '秒'
      }
      if (h !== 0) {
        return h + '时' + m + '分' + s + '秒'
      }
      if (m !== 0) {
        return m + '分' + s + '秒'
      }
      return s + '秒'
    }
  },
  /**
   * 日期格式化
   */
  dateFormat (date = new Date(), fmt = 'yyyy-MM-dd hh:mm:ss') {
    date = typeof date === 'number' ? new Date(date) : date
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return fmt
  },
  /**
   * 添加减少年  返回新的日期对象
   */
  addYear (date, year = 0) {
    if (Math.abs(year) === 0) {
      return date
    }
    return new Date(
      date.getFullYear() + year,
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  },

  /**
   * 添加减少月  返回新的日期对象
   */
  addMonth (date, month = 0) {
    if (Math.abs(month) === 0) {
      return date
    }
    return new Date(
      date.getFullYear(),
      date.getMonth() + month,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  },
  /**
   * 添加减少天数  返回新的日期对象
   */
  addDate (date, days = 0) {
    if (Math.abs(days) === 0) {
      return date
    }
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + days,
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  },
  /**
   * 添加减少小时  返回新的日期对象
   */
  addHour (date, hour = 0) {
    if (Math.abs(hour) === 0) {
      return date
    }
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours() + hour,
      date.getMinutes(),
      date.getSeconds()
    )
  },
  /**
   * 添加减少分钟  返回新的日期对象
   */
  addMinute (date, minute = 0) {
    if (Math.abs(minute) === 0) {
      return date
    }
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes() + minute,
      date.getSeconds()
    )
  },
  /**
   * 添加减少秒钟  返回新的日期对象
   */
  addSecond (date, second = 0) {
    if (Math.abs(second) === 0) {
      return date
    }
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds() + second
    )
  },
  dateFormat2 (d, istime) {
    if (!d) return null
    if (typeof d === 'number') {
      d = new Date(d)
    }
    var year = d.getFullYear()
    var month = this.fixzero(d.getMonth() + 1, 2)
    var date = this.fixzero(d.getDate(), 2)
    var str = year + '-' + month + '-' + date
    if (istime) {
      var hour = this.fixzero(d.getHours(), 2)
      var min = this.fixzero(d.getMinutes(), 2)
      var sec = this.fixzero(d.getSeconds(), 2)
      str += ' ' + hour + ':' + min + ':' + sec
    }
    return str
  },
  /**
   * 时间字符转换时间对象
   * @param {String} str
   */
  strNewDate (str) {
    let arr = str.split(/-| |:/g)
    // 分钟需要 -1
    arr[1] = arr[1] - 1
    return new Date(...arr)
  },
  dateParse (s, istime) {
    var d = new Date()
    var year = s.substring(0, 4)
    var month = s.substring(5, 7) - 1
    var date = s.substring(8, 10)
    d.setFullYear(year, month, date)
    if (istime) {
      var hour = s.substring(11, 13)
      var min = s.substring(14, 16)
      var sec = s.substring(17, 19)
      d.setHours(hour, min, sec, 0)
    }
    return d
  },
  /**
   * 补零
   */
  fixzero (s, size) {
    s = s.toString()
    if (s.length === size) return s
    var dest = ''
    for (var i = 0; i < size - s.length; i++) {
      dest += '0'
    }
    return dest + s
  },
  /**
   * 本地时间转换GMT+8(北京时间)
   * @return 时间戳
   */
  localToGmt8 (time) {
    let gmt = -8
    // 获取时差
    let offset = new Date().getTimezoneOffset() / 60
    return gmt - offset ? time - (gmt - offset) * 1000 * 3600 : time
  },
  /**
   * 北京时间转换当地时间
   * @return 时间戳
   */
  gmt8ToLocal (time) {
    let gmt = -8
    // 获取时差
    let offset = new Date().getTimezoneOffset() / 60
    return offset - gmt ? time - (offset - gmt) * 1000 * 3600 : time
  },
  /**
   * @param { StringDate } date 字符串时间 转本地时间
   */
  gmt8StrDateToLocal (date, fmt) {
    let t = date.replace(/-/g, '/') + ' GMT+0800'
    return this.dateFormat(new Date(t), fmt)
  }
}
