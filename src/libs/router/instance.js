import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
/**
 * 处理路由配置项
 * @param {} conf 配置项
 */
function handleRouterConfig (conf) {
  let path = '/' + conf.path
  let name = conf.name
  let meta = conf.meta
  let hasChildren = Array.isArray(conf.children)
  let component = resolve => {
    if (conf.lazy) {
      return import('../../views/' + conf.component)
    }
    return require(['../../views/' + conf.component], resolve)
  }
  let route = { path, name, component, meta }
  if (conf.children && hasChildren) {
    route.children = []
    for (let child of conf.children) {
      let childRoute = handleRouterConfig(child)
      if (typeof childRoute !== 'undefined') {
        route.children.push(childRoute)
      }
    }
  }
  if (conf.children && !hasChildren) {
    console.warn('Router children 格式必须为数组')
  }
  return route
}

function init (routesConfig) {
  // 路由配置表
  let routes = routesConfig.map(nav => {
    return handleRouterConfig(nav)
  })

  // 路由实例
  return new VueRouter({
    // mode: 'history',
    routes
  })
}

export default init
