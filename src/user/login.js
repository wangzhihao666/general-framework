import http from '../api/request'
import md5 from 'md5'

// 登陆接口
export const login = (model) => {
  model.password = md5(model.password)
  return http.post('/sys/login', model)
}
