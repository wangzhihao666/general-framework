import { publicRoutes, privateRoutes } from '../../router/index'

export default {
  namespaced: true,
  state: {
    routes: publicRoutes
  },
  mutations: {
    setRoutes(state, newRoutes) {
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    // 筛选路由权限
    filterRoutes({ commit }, menus) {
      // 当用户登录之后加载所有的私有路由 还是加载他拥有的私有表
      // menus 登录之后后台所返回的路由权限数据
      // privateRoutes 自定义的 私有路由表
      const routes = []
      // 过滤出用户所 拥有的 私有路由表
      menus.forEach((name) => {
        const data = privateRoutes.filter((item) => item.name === name)
        routes.push(...data)
      })
      // 添加重定向 404路由
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404' // 重定向:重新指向其它path,会改变网址
      })
      commit('setRoutes', routes)
      return routes
    }
  }
}
