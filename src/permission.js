/**
 *
 * 登录 token
 *  进入到登录  跳转到登录之前的页面
 *  进入到登录以后页面  可以进入
 *
 * 未登录
 *  没有token
 *    进入的是登录 进入
 *    进入的不是登录页 跳转到登录页
 *
 */
// import router from './router/index'
// import store from './store/index'
import router from './router'
// import store from './store'
import { getItem } from './utils/storage'

// 定义一个用户未登录情况下可以访问的白名单
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  // 获取token
  const token = getItem('token')
  console.log(token)
  if (token) {
    if (to.path === whiteList) {
      next(from.path)
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(whiteList)
    }
  }
})
