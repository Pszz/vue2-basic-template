/**
 * Desc: Router 配置表
 * Author: Pi
 */
import Layout from '@components/layout'
const Routers = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@views//default/login'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: { affix: true },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@views/home/index'),
        meta: { title: '首页', icon: 'dashboard', affix: true, noCache: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', component: () => import('@views/default/404'), hidden: true }
]
export default Routers
