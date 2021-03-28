import request from "@/utils/request"

// 获取文章列表
export const getProfile = username => {
  return request.get(`/api/profiles/${username}`)
}

export const follow = username => {
  return request.post(`/api/profiles/${username}/follow`)
}

export const unfollow = username => {
  return request.delete(`/api/profiles/${username}/follow`)
}

