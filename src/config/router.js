import Router from '@libs/router'

const PATH = [
  {
    path: '/',
    name: 'index',
    component: 'home/index.vue'
  },
  {
    path: '*',
    name: 'all',
    component: 'default/404',
    label: '资源未找到',
    lazy: true,
    comments: '这项配置一定要放到最后面',
    meta: {
      title: '资源未找到'
    }
  }
]
export default Router(PATH)
