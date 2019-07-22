// 检测浏览器是否存在touch事件
const isTouch = 'ontouchstart' in document
// 事件兼容性
const eventType = isTouch
  ? {
    start: 'touchstart',
    move: 'touchmove',
    end: 'touchend',
    cancel: 'touchcancel'
  }
  : {
    start: 'mousedown',
    move: 'mousemove',
    end: 'mouseup',
    cancel: 'mousecancel'
  }
export default {
  installed: false,
  install: function (Vue) {
    /**
     *  只允许输入数字
     */
    Vue.directive('inputNumber', {
      bind: function (el, binding, vnode) {
        el.addEventListener('keyup', function (e) {
          let target = el
          if (el.tagName !== 'INPUT') {
            target = e.target
          }
          let num = target.value.replace(/[^0-9.]/g, '')
          // target.value = isNaN(num) ? 0 : parseFloat(num)
          target.value = num
        })
      }
    })

    /**
     * PC && Mobile 点击兼容事件
     */
    Vue.directive('touch', {
      bind: function (el, binding) {
        let evType = eventType[binding.arg]
        if (evType) {
          let args = binding.value[1] || []
          let methods = binding.value[0]
          if (typeof binding.value === 'function') {
            methods = binding.value
          }
          el.addEventListener(eventType[binding.arg], function (ev) {
            args = args.map(v => {
              return v === '$event' ? ev : v
            })
            typeof methods === 'function' && methods(...args)
          })
        } else {
          console.error('not find', binding.arg)
        }
      }
    })

    /**
     * 全局onresize 订阅
     */
    let resizeMaps = null
    Vue.directive('resize', {
      bind: function (el, binding, vnode) {
        if (resizeMaps === null) {
          resizeMaps = {}
          window.addEventListener('resize', function () {
            for (let n in resizeMaps) {
              typeof resizeMaps[n] === 'function' && resizeMaps[n]()
            }
          })
        }
        resizeMaps[vnode.context._uid] = binding.value
      }
    })

    /**
     * 全局onscroll 订阅
     */
    let scrollMaps = null
    Vue.directive('scroll', {
      bind: function (el, binding, vnode) {
        if (scrollMaps === null) {
          scrollMaps = {}
          window.addEventListener('scroll', function (args) {
            for (let n in scrollMaps) {
              typeof scrollMaps[n] === 'function' && scrollMaps[n](args)
            }
          })
        }
        scrollMaps[vnode.context._uid] = binding.value
      }
    })
  }
}
