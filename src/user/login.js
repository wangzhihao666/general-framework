import http from '../api/request'

/**
 * 登陆接口
 * @param {*} data
 * @returns
 */
const login = (data) => {
  return http({ url: '/sys/login', method: 'POST', data })
}

export default {
  login
}
