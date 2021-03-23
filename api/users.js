import request from "@/utils/request"

// 登录
export const login = user => {
  return request.post('/api/users/login', { user })
}

// 注册
export const register = user => {
  return request.post('/api/users', { user })
}
