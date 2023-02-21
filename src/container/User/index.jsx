import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Cell } from 'zarm'

import { userInfo } from '@/api/user'

import style from './style.module.less'

const User = () => {
  const [user, setUser] = useState({})

  const navigateTo = useNavigate()

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    const { data } = await userInfo()
    setUser(data)
  }
  
  const logout = () => {
    localStorage.removeItem('token')
    navigateTo('/login')
  }
  
  return <div className={style.user}>
    <div className={style.header}>
      <div className={style.userInfo}>
        <span className={style.userName}>昵称：{user.username || '--'}</span>
        <span className={style.slogan}>
        <img style={{ width: 30, height: 30, verticalAlign: '-10px' }} src="//s.yezgea02.com/1615973630132/geqian.png" alt="" />
          <b>{user.slogan || '未设置签名'}</b>
        </span>
      </div>
      <img
        className={style.avatar}
        src={user.avatar}
        alt=""
      />
    </div>
    <div className={style.content}>
      <Cell
        hasArrow
        title="用户信息修改"
        onClick={() => navigateTo('/userinfo')}
        icon={<img style={{ width: 20, verticalAlign: '-7px' }} src="//s.yezgea02.com/1615974766264/gxqm.png" alt="" />}
      />
      <Cell
        hasArrow
        title="重制密码"
        onClick={() => navigateTo('/account')}
        icon={<img style={{ width: 20, verticalAlign: '-7px' }} src="//s.yezgea02.com/1615974766264/zhaq.png" alt="" />}
      />
      <Cell
        hasArrow
        title="关于我们"
        onClick={() => navigateTo('/about')}
        icon={<img style={{ width: 20, verticalAlign: '-7px' }} src="//s.yezgea02.com/1615975178434/lianxi.png" alt="" />}
      />
    </div>
    <Button className={style.logoutBtn} block theme="danger" onClick={logout}>退出登录</Button>
  </div>
}

export default User
