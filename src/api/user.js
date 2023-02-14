import { post } from '@/utils'

export const userSignin = (params) => {
  return post('/user/signin', params)
}

export const userLogin = (params) => {
  return post('/user/login', params)
}
