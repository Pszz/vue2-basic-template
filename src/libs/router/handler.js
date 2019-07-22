// import store from '@store'
// 是否已经加载
let isLoad = true

// 过滤的路由name - 可以无权限访问的页面
let filters = ['index', 'login', 'all']

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
  // 跳转检查
  doNext(next, to)
}

/**
 * 执行跳转
 * @param {*} next
 */
function doNext (next, to) {
  let hasLogin = checkLogin(next, to)
  // 未登录 && 需要权限
  if (!hasLogin && !isFilter(to.name)) {
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
 * 检查是否登录
 * @returns { Boolean } 是否登录
 */
function checkLogin (next, to) {
  let isLogin = true
  // 权限控制代码
  // if (isLogin) {
  // } else {
  // }
  return isLogin
}
/**
 * 是否在过滤范围内
 */
function isFilter (name) {
  return filterMap.get(name)
}

export default function (router) {
  router.beforeEach((to, from, next) => {
    try {
      beforeRouteEnter(to, from, next, router)
    } catch (e) {
      console.error(e)
    }
  })
  router.afterEach(route => {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 0)
  })
  return router
}
