import request from "@/utils/request"

// 获取文章列表
export const getArticles = params => {
  return request.get('/api/articles', { params })
}


// 获取关注文章列表
export const getFeedArticles = params => {
  return request.get('/api/articles/feed', { params })
}

// 添加点赞
export const favorite = slug => {
  return request.post(`/api/articles/${slug}/favorite`)
}

// 删除点赞
export const unfavorite = slug => {
  return request.delete(`/api/articles/${slug}/favorite`)
}

// 获取文章详情
export const getArticle = slug => {
  return request.get(`/api/articles/${slug}`)
}

// 获取文章评论列表
export const getComments = slug => {
  return request.get(`/api/articles/${slug}/comments`)
}

// 添加文章评论
export const addComments = ({ slug, comment }) => {
  return request.post(`/api/articles/${slug}/comments`, { comment })
}

// 创建文章
export const createArticle = ({ article }) => {
  return request.post(`/api/articles`, { article })
}

// 更新文章
export const updateArticle = ({ slug, article }) => {
  return request.put(`/api/articles/${slug}`, { article })
}

// 删除文章
export const deleteArticle = slug => {
  return request.delete(`/api/articles/${slug}`)
}


