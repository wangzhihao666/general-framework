import UserApi from '../../user/login'
import { setItem, getItem, removeItem } from '../../utils/storage'
import { resetRouter } from '../../utils/removeRouter'
export default {
  namespaced: true,
  state: () => ({
    token: getItem('token') || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', token)
      // console.log(state.token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      console.log(userInfo)
    }
  },
  actions: {
    async login({ commit }, payload) {
      try {
        const response = await UserApi.login(payload)
        commit('setToken', response.token)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    async getUserInfo({ commit }) {
      try {
        const response = await UserApi.getUserInfo()
        commit('setUserInfo', response)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    logout({ commit }) {
      resetRouter()
      commit('setToken', '')
      commit('setUserInfo', '')
      removeItem('token')
      removeItem('userInfo')
    }
  }
}
