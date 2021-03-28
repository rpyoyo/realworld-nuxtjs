import request from "@/utils/request"

// 登录
export const login = user => {
  return request.post('/api/users/login', { user })
}

// 注册
export const register = user => {
  return request.post('/api/users', { user })
}

// 更新用户
export const updateUser = user => {
  return request.put('/api/user', { user })
}

// 获取用户
export const getUser = user => {
  return request.get('/api/user')
}