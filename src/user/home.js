import http from '../api/request'

/**
 * 获取用户基本信息
 * @param {*} data
 * @returns
 */
const getUserInfo = (data) => {
  return http({ url: '/sys/profile', method: 'GET', data })
}

export default {
  getUserInfo
}
