import { post } from '@/utils'

export const billList = (params) => {
  return post('/bill/list', params)
}
