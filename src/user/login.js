import http from '../api/request'

/**
 * 登陆接口
 * @param {*} data
 * @returns
 */
const login = (data) => {
  return http({ url: '/sys/login', method: 'POST', data })
}

/**
 * 获取用户基本信息
 * @param {*} data
 * @returns
 */
const getUserInfo = () => {
  return http({ url: '/sys/profile', method: 'GET' })
}

export default {
  login,
  getUserInfo
}
