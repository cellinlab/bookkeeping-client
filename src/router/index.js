import Home from '@/container/Home'
import Statistics from '@/container/Statistics'
import User from '@/container/User'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/statistics',
    component: Statistics,
  },
  {
    path: '/user',
    component: User,
  },
]

export default routes
