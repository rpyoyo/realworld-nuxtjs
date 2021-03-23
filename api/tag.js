import request from "@/utils/request"

// 获取文章标签列表
export const getTags = params => {
  return request.get('/api/tags', { params })
}

