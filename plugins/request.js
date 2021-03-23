/**
* 基于 axios 封装的请求模块
*/

import Axios from "axios"

export const axios = Axios.create({
  baseURL: 'https://conduit.productionready.io/',
})

// 通过插件机制获取上下文对象(query、params、req、res、app、store...)
export default ({ store }) => {
  // 请求拦截器
  axios.interceptors.request.use(function (config) {
    const { user } = store.state

    if (user && user.token) {
      config.headers.Authorization = `Token ${user.token}`
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })

  // 响应拦截器

}