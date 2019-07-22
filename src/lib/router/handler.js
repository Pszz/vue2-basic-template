import store from 'store'
export default function (router) {
  router.beforeEach((to, from, next) => {
    try {
      beforeRouteEnter(to, from, next, router)
    } catch (e) {
      console.error(e)
    }
  })
}

// 是否已经加载
let isLoad = true

// 过滤的路由name - 可以无权限访问的页面
let filters = ['login', 'error', '500', '400', '404', 'index']

// 过滤的路由map
let filterMap = new Map()
filters.forEach(item => {
  filterMap.set(item, true)
})

/**
 * 路由跳转之前
 */
function beforeRouteEnter (to, from, next, router) {
  // 设置页面title
  // document.title = router.app.$lge.get(to.meta.title)
  // 更新头部信息
  // resetHeader(to.meta.header, router.app.$lge.get(to.meta.title))
  // 适应第三方应用跳转到某个路由
  if (typeof (to.query.redirect) !== 'undefined') {
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
  let user = getLoginUser()
  if (user.user !== 'admin') {
    next({ name: 'login' })
    return
  }
  next()
}

/**
 * 跳转到某个页面
 */
function redirect (name, next, to) {
  if (typeof (to.query.redirect) === 'undefined') {
    to.query.redirect = encodeURIComponent(to.path)
  }
  next({ name: name, query: to.query })
}

/**
 * 获取登陆用户
 */
function getLoginUser () {
  // 返回用户信息
  return { user: 'admin' }
}
/**
 * 重置顶部菜单
 */
function resetHeader (header = {}, title = 'Miner') {
  let defHeader = store.state.page.header
  // 只有明确指定false才隐藏，默认显示
  if (header.show !== false) {
    header.show = true
  }
  store.dispatch('page/setHeader', Object.assign(defHeader, {title: title}, header))
}
/**
 * 是否在过滤范围内
 */
function isFilter (name) {
  return filterMap.get(name)
}
