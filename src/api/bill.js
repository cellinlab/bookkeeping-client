import { post } from '@/utils'

export const billList = (params) => {
  return post('/bill/list', params)
}

export const addBill = (params) => {
  return post('/bill/add', params)
}

export const updateBill = (params) => {
  return post('/bill/update', params)
}

export const deleteBill = (params) => {
  return post('/bill/delete', params)
}

export const billDetail = (params) => {
  return post('/bill/detail', params)
}
