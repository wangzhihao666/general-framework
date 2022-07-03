import { createRouter, createWebHashHistory } from 'vue-router'
/**
 *  自定义所有的私有权限路由表
 *  默认只加载公有路由表
 */
import ArticleRanking from './modules/ArticleRanking'
import UserManage from './modules/UserManage'
import RoleList from './modules/RoleList'
import PermissionList from './modules/PermissionList'
import ArticleCreate from './modules/ArticleCreate'

// 一级路由 最外层的路由 /login /user /article /
// 要想拿到所有的子路由 就必须先拿到所有的一级路由的children 所有的子数据在一级的children里面

// 公有路由
export const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/',
    component: () => import('../layout'),
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/profile'),
        meta: {
          title: '个人中心',
          icon: 'personnel'
        }
      },
      {
        path: '/chart',
        name: 'chart',
        component: () => import('../views/chart'),
        meta: {
          title: '数据可视化',
          icon: 'chart'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('../views/error-page/404')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('../views/error-page/401')
      }
    ]
  }
]

// 私有路由表
export const privateRoutes = [
  UserManage,
  RoleList,
  PermissionList,
  ArticleRanking,
  ArticleCreate
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

export default router
