// import axios from 'axios'

// const request = axios.create({
//   baseURL: 'https://conduit.productionready.io'
// })

// // 请求拦截器

// request.interceptors.request.use(function (config) {
//   // 服务端无法在此处访问store，因此无法拿到user中的token
//   // 转而使用plugin实现
//   config.headers.Authorization = `Token ${token}`
// }, function (error) {
//   reutrn Promise.reject(error)
// })

// 响应拦截器

export { axios as default } from '@/plugins/request'