import Home from '@/container/Home'
import Statistics from '@/container/Statistics'
import User from '@/container/User'
import Login from '@/container/Login'

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
  {
    path: '/login',
    component: Login,
  },
]

export default routes
