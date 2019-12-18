import store from '@store'
export default function (router) {
  router.beforeEach((to, from, next) => {
    try {
      window.scrollTo(0, 0)
      beforeRouteEnter(to, from, next, router)
    } catch (e) {
      console.error(e)
    }
  })
}

// 是否已经加载
// let isLoad = true

// 过滤的路由name - 可以无权限访问的页面
let filters = ['login', 'error', '500', '404']

// 过滤的路由map
let filterMap = new Map()
filters.forEach(item => {
  filterMap.set(item, true)
})

/**
 * 路由跳转之前
 */
function beforeRouteEnter (to, from, next, router) {
  // 适应第三方应用跳转到某个路由
  if (typeof to.query.redirect !== 'undefined') {
    let redirect = decodeURIComponent(to.query.redirect)
    next(redirect)
    return
  }
  // 检查跳转是否具有权限
  if (isFilter(to.name)) {
    next()
  } else {
    doNext(next, to)
  }
}

/**
 * 执行跳转
 * @param {*} next
 */
function doNext (next, to) {
  // 权限控制
  if (!getSess()) {
    next({ name: 'login' })
    return
  }
  next()
}

/**
 * 跳转到某个页面
 */
function redirect (name, next, to) {
  if (typeof to.query.redirect === 'undefined') {
    to.query.redirect = encodeURIComponent(to.path)
  }
  next({ name: name, query: to.query })
}

/**
 * 获取用户Sess
 */
function getSess () {
  return store.getters['user/getLogind'] || false
}
/**
 * 是否在过滤范围内
 */
function isFilter (name) {
  return filterMap.get(name)
}
