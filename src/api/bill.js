import { post } from '@/utils'

export const billList = (params) => {
  return post('/bill/list', params)
}

export const addBill = (params) => {
  return post('/bill/add', params)
}
