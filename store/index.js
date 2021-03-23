const cookieparser = process.server ? require('cookieparser') : undefined

// 服务端渲染运行期间都是同一个实例
// 为了防止数据冲突，必须把 state 定义成一个函数，返回数据对象
export const state = () => {
  return {
    user: null
  }
}

export const mutations = {
  setUser (state, data) {
    state.user = data
  }
}

export const actions = {
  // nuxtServerInit 是一个特殊的 action 方法
  // 这个 action 会在服务端渲染期间自动调用
  nuxtServerInit ({ commit }, { req }) {
    let user = null
    // 判断请求头中携带 Cookie
    if (req.headers.cookie) {
      // 使用 cookieparser 将 Cookie 字符串解析成 JavaScript 对象
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
        commit('setUser', user)
      } catch (error) {

      }
    }
  }
}