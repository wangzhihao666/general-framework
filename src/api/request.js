import axios from 'axios'
import md5 from 'md5'
import { ElMessage } from 'element-plus'
import loading from './loading'
import store from '@/store'
// import { useStore } from 'vuex'
// const store = useStore()

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 2000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 开启loading
    loading.open()
    const { icode, time } = getTestCode()
    config.headers.icode = icode
    config.headers.codeType = time

    // TODO 将token 通过请求头发送给后端
    // 在这个位置需要统一的去注入token
    if (store.getters.token) {
      // 如果token存在 注入token
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }

    return config
  },

  (error) => {
    // 关闭loading
    loading.close()
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    loading.close()
    if (res.data.success === true) {
      ElMessage.success('登陆成功')
    } else if (res.data.success === false) {
      ElMessage.error('用户名或密码错误')
    } else {
      ElMessage('接口请求失败')
    }

    // TODO token过期状态

    // TODO 全局响应处理

    return res
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 统一传参处理
const request = (options) => {
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data || {}
  }
  return instance(options)
}

// 实现code
function getTestCode() {
  const now = parseInt(Date.now() / 1000)
  const code = now + 'LGD_Sunday-1991'
  return {
    icode: md5(code),
    time: now
  }
}
export default request
