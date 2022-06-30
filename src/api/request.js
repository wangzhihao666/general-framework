// import axios from 'axios'
// import md5 from 'md5'
// import { ElMessage } from 'element-plus'
// import loading from './loading'
// import { isCheckTimeout } from '../utils/auth'
// import store from '../store'
// import router from '../router'

// const instance = axios.create({
//   baseURL: process.env.VUE_APP_BASE_API,
//   timeout: 2000
// })

// // 请求拦截器
// instance.interceptors.request.use(
//   (config) => {
//     // 开启loading
//     loading.open()
//     // 调用接口要传的参数
//     const { icode, time } = getTestCode()
//     config.headers.icode = icode
//     config.headers.codeType = time

//     // TODO 将token 通过请求头发送给后端
//     const token = store.getters.token
//     console.log(token)

//     if (token) config.headers.Authorization = 'Bearer' + token

//     if (token) {
//       if (isCheckTimeout()) {
//         store.dispatch('user/logout')
//         router.push('/login')
//       }
//     }

//     return config
//   },

//   (error) => {
//     // 关闭loading
//     loading.close()
//     console.log(error)
//     return Promise.reject(error)
//   }
// )

// // 响应拦截器
// instance.interceptors.response.use(
//   (res) => {
//     loading.close()
//     const { data } = res.data
//     if (res.data.success === true) {
//       ElMessage.success('登陆成功')
//       return data
//     } else if (res.data.success === false) {
//       ElMessage.error('用户名或密码错误')
//     } else {
//       ElMessage('接口请求失败')
//     }

//     // TODO 全局响应处理

//     return res
//   },
//   (err) => {
//     // TODO token过期状态
//     if (err.res && err.res.data && err.res.data.code === 401) {
//       store.dispatch('user/logout')
//       router.push('/login')
//     }

//     return Promise.reject(err)
//   }
// )

// // 统一传参处理
// const request = (options) => {
//   if (options.method.toLowerCase() === 'get') {
//     options.params = options.data || {}
//   }
//   return instance(options)
// }

// // 实现code
// function getTestCode() {
//   const now = parseInt(Date.now() / 1000)
//   const code = now + 'LGD_Sunday-1991'
//   return {
//     icode: md5(code),
//     time: now
//   }
// }
// export default request

// 导入axios
import axios from 'axios'

import store from '../store'

import router from '../router'

import { isCheckTimeout } from '../../src/utils/auth'

import md5 from 'md5'

import loading from './loading'

import { ElMessage } from 'element-plus'

// 创建axios实例对象
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 打开loading加载
    loading.open()

    // 调用接口要传的参数
    const { icode, time } = getTestICode()
    config.headers.icode = icode
    config.headers.codeType = time

    // TODO 将token 通过请求头发送给后台
    const token = store.getters.token
    if (token) config.headers.Authorization = 'Bearer ' + token

    if (token) {
      if (isCheckTimeout()) {
        store.dispatch('user/logout')
        router.push('/login')
      }
    }

    return config
  },
  (error) => {
    // 关闭loading加载
    loading.close()
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 关闭loading加载
    loading.close()

    const { success, data, message } = response.data

    // TODO 全局响应处理
    if (success) {
      return data
    } else {
      _showError(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // 关闭loading加载
    loading.close()

    // TODO token过期状态  401 描述信息  无感知登录 无感知刷新
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch('user/lgout')
      router.push('/login')
    }

    // 单用户登录
    // if (error.response && error.response.data && error.response.data.code === 401) {
    //   store.dispatch('user/lgout')
    //   router.push('/login')
    // }

    // 响应失败进行信息提示
    _showError(error.message)
    return Promise.reject(error)
  }
)

// 响应提示信息
const _showError = (message) => {
  const info = message || '发生未知错误'
  ElMessage.error(info)
}

// 统一了传参处理
const request = (options) => {
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data || {}
  }
  return service(options)
}

// 获取icode、
function getTestICode() {
  const now = parseInt(Date.now() / 1000)
  const code = now + 'LGD_Sunday-1991'
  return {
    icode: md5(code),
    time: now
  }
}

// 导出axios实例对象
export default request
