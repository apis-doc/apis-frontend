import axios from 'axios'

const http = axios.create({
  baseURL: '/apis',
  timeout: 1000
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  // console.log('response interceptors error: ', http.url, error.data)
  return Promise.reject(error)
})

export default http
