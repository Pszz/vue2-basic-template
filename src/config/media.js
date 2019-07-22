; (function (doc, win) {
  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var recalc = function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return

    var hasPc = clientWidth > 750
    // 设计图大小
    var designSize = hasPc ? 1200 : 750

    // 比例 = 视口宽度 / 设计图大小 * 100
    var size = (clientWidth / designSize) * 100

    // 控制上下限
    size = Math.min(size, 100)
    size = Math.max(size, 50)
    if (hasPc) {
      size = Math.max(size, 60)
    }
    docEl.style.fontSize = size.toFixed(2) + 'px'
  }

  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
