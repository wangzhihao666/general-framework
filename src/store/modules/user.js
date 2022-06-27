import UserApi from '../../user/login'
// import getUserInfo from '../../user/home'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN } from './constant/index'
export default {
  namespaced: true,
  state: () => ({
    // token: '',
    userInfo: {},
    token: getItem(TOKEN) || ''
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
      console.log(state.token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async login({ commit }, payload) {
      const response = await UserApi.login(payload)
      console.log(response)
    }
    // async getUserInfo(context) {
    //   const res = await getUserInfo()
    //   this.commit('user/home', res)
    //   return res
    // }

    // login(context, userInfo) {
    //   getUserInfo.then((data) => {
    //     this.commit('user/setToken', data.data.data.token)
    //     // resolve()
    //   })
    // }
  }
}
