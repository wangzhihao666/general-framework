import { createRouter, createWebHashHistory } from 'vue-router'

// 共有路由
const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/profile/home')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

// router.beforeEach((to, from, next) => {
//   // 访问的路径在白名单
//   if (localStorage.getItem('token')) {
//     next()
//   } else {
//     if (to.path === '/login') {
//       next()
//     } else {
//       next('/login')
//     }
//   }
// })

export default router
