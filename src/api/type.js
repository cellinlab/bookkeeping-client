import { post } from '@/utils'

export const typeList = () => {
  return post('/type/list')
}
