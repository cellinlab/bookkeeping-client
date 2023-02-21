import { post } from '@/utils'

export const typeList = () => {
  return post('/api/type/list')
}
