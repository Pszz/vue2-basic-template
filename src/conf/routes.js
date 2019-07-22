/**
 * Desc: Router 配置表
 * Author: Pi
 */
export default [
  {
    path: '/',
    name: 'index',
    component: 'home/index.vue',
    label: '首页',
    lazy: true
  },
  {
    'path': 'error',
    name: 'error',
    component: 'default/error',
    label: '通用错误页面',
    meta: {
      title: '通用错误页面'
    }
  },
  {
    'path': '403',
    name: 'nofound',
    component: 'default/403',
    label: '没有权限访问当前页面',
    meta: {
      title: '没有权限访问当前页面'
    }
  },
  {
    'path': '*',
    name: 'all',
    component: 'default/404',
    label: '资源未找到',
    'comments': '这项配置一定要放到最后面',
    meta: {
      title: '资源未找到'
    }
  }
]
