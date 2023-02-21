import { post } from '@/utils'

export const billList = (params) => {
  return post('/api/bill/list', params)
}

export const addBill = (params) => {
  return post('/api/bill/add', params)
}

export const updateBill = (params) => {
  return post('/api/bill/update', params)
}

export const deleteBill = (params) => {
  return post('/api/bill/delete', params)
}

export const billDetail = (params) => {
  return post('/api/bill/detail', params)
}

export const billStatistics = (params) => {
  return post('/api/bill/statistics', params)
}
