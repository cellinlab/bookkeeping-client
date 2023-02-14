import React, { useRef, useEffect, useState } from 'react'

import { Cell, Input, Button, Checkbox, Toast } from 'zarm'
import useCaptcha from 'use-offline-captcha'
import md5 from 'md5'
import cx from 'classnames'
import CustomIcon from '@/components/CustomIcon'

import { userSignin, userLogin } from '@/api/user'

import style from './style.module.less'

const Login = () => {
  const captchaRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [captcha, setCaptcha] = useState('')
  const [readed, setReaded] = useState(false)
  const [type, setType] = useState('login')

  const userOpt = {
    type: 'mixed',
    length: 4,
    sensitive: false,
  }

  const { gen, validate } = useCaptcha(captchaRef, userOpt)

  useEffect(() => {
    if (gen) {
      gen()
    }
  }, [gen])

  const handleValidate = () => {
    const isValid = validate(captcha)
    return isValid
  }

  const handleRefreshCaptcha = () => gen()

  const onSubmit = async () => {
    if (!username) {
      Toast.show('请输入账号')
      return
    }
    if (!password) {
      Toast.show('请输入密码')
      return
    }
    if (type == 'signin') {
      // 密码长度在8-16位之间，必须包含数字、字母、特殊字符中的两种
      const reg = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
      if (!reg.test(password)) {
        Toast.show('密码长度在8-16位之间，必须包含数字、字母、特殊字符中的两种')
        return
      }
      if (!captcha) {
        Toast.show('请输入验证码')
        return
      }
      if (!handleValidate()) {
        Toast.show('验证码错误')
        return
      }
      if (!readed) {
        Toast.show('请阅读并同意《赛林岚伯记账应用条款》')
        return
      }
    }

    try {
      const params = {
        username,
        password: md5(password),
      }
      if (type == 'login') {
        const { data } = await userLogin(params)
        localStorage.setItem('token', data.token)
      } else {
        const res = await userSignin(params)
      }
    } catch (e) {
      let msg = e.msg || '注册失败'
      Toast.show(msg)
    }
  }

  return <div className={style.auth}>
    <div className={style.header}></div>
    <div className={style.tab}>
      <span className={cx({ [style.active]: type == 'login'})} onClick={() => setType('login')}>登录</span>
      <span className={cx({ [style.active]: type == 'signin'})} onClick={() => setType('signin')}>注册</span>
    </div>
    <div className={style.form}>
      <Cell icon={<CustomIcon type="icon-zhanghao" />}>
        <Input
          clearable
          type='text'
          placeholder="请输入用户名"
          onChange={(value) => setUsername(value)}
        />
      </Cell>
      <Cell icon={<CustomIcon type="icon-mima" />}>
        <Input
          clearable
          type='password'
          placeholder="请输入密码"
          onChange={(value) => setPassword(value)}
        />
      </Cell>
      {
        type == 'signin' ?
          <Cell icon={<CustomIcon type="icon-yanzhengma" />}>
            <Input
              clearable
              type='text'
              placeholder="请输入验证码"
              onChange={(value) => setCaptcha(value)}
            />
            <div ref={captchaRef} onClick={handleRefreshCaptcha}></div>
          </Cell>
        : null
      }
    </div>
    <div className={style.footer}>
      {
        type == 'signin' ?
          <div className={style.informed}>
            <Checkbox checked={readed} onChange={(checked) => setReaded(checked)} />
            <label className='text-light'>我已阅读并同意<a href="">《赛林岚伯记账应用条款》</a></label>
          </div>
        : null
      }
      <Button block theme="primary" onClick={onSubmit}>{type == 'login' ? '登录' : '注册'}</Button>
    </div>
  </div>
}

export default Login
