import { post, get } from '@/utils'

export const userSignin = (params) => {
  return post('/api/user/signin', params)
}

export const userLogin = (params) => {
  return post('/api/user/login', params)
}

export const userInfo = () => {
  return get('/api/user/info')
}

export const updateUserInfo = (params) => {
  return post('/api/user/update', params)
}

export const resetPassword = (params) => {
  return post('/api/user/reset', params)
}
