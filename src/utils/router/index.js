import handler from './handler'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routesConfig from '@conf/routes.js'

Vue.use(VueRouter)

// 路由配置表
let routes = routesConfig.map(nav => {
  return handleRouterConfig(nav)
})

// 定义路由实例
const router = new VueRouter({
  // mode: 'history',
  routes
})

/**
 * 处理路由配置项
 * @param {} conf 配置项
 */
function handleRouterConfig (conf) {
  let path = conf.path
  let name = conf.name
  let meta = conf.meta
  let component = conf.component
  if (typeof component === 'string') {
    component = () => require('@views/' + conf.component)
  }
  let route = { path, name, component, meta }

  if (conf.children && conf.children instanceof Array) {
    route.children = []
    for (let child of conf.children) {
      let childRoute = handleRouterConfig(child)
      if (typeof childRoute !== 'undefined') {
        route.children.push(childRoute)
      }
    }
  }
  return route
}
handler(router)

export default router
