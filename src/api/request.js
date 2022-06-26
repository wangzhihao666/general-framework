import axios from 'axios'
import md5 from 'md5'
import { ElMessage } from 'element-plus'
const instance = axios.create({
  baseURL: 'https://imooc-admin.lgdsunday.club/prod-api'
})

// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    const { icode, time } = getTestCode()
    config.headers.icode = icode
    config.headers.codeType = time
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    console.log(res)
    if (res.data.success === true) {
      ElMessage.success('登陆成功')
      localStorage.setItem('token', JSON.stringify(res.data.data.token))
    } else if (res.data.success === false) {
      ElMessage.error('用户名或密码错误')
    } else {
      ElMessage('接口请求失败')
    }
    return res
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 实现code
function getTestCode() {
  const now = parseInt(Date.now() / 1000)
  const code = now + 'LGD_Sunday-1991'
  return {
    icode: md5(code),
    time: now
  }
}
export default instance
