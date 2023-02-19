import axios from 'axios'
import { Toast } from 'zarm'

const MODE = import.meta.env.MODE

axios.defaults.baseURL = MODE === 'development' ? '/api' : 'http://api.cellinlab.xyz'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['Authorization'] = `${localStorage.getItem('token') || ''}`
axios.defaults.headers['Content-Type'] = 'application/json'

axios.interceptors.response.use(res => {
  if (typeof res.data !== 'object') {
    Toast.show('服务端异常！')
    return Promise.reject(res)
  }
  if (res.data.code !== 200) {
    if (res.data.msg) Toast.show(res.data.msg)
    if (res.data.code === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(res.data)
  }
  return res.data
})

export default axios
