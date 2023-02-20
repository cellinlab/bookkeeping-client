import Home from '@/container/Home'
import Statistics from '@/container/Statistics'
import User from '@/container/User'
import Login from '@/container/Login'
import Detail from '@/container/Detail'

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
  {
    path: '/detail',
    component: Detail,
  },
]

export default routes
