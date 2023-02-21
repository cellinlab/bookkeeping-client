import React from 'react'
import { Cell, Input, Button, Toast } from 'zarm'
import { createForm } from 'rc-form'
import md5 from 'md5'

import Header from '@/components/Header'
import { resetPassword } from '@/api/user'

import style from './style.module.less'

const Account = (props) => {
  const { getFieldProps, getFieldError } = props.form

  const submit = () => {
    props.form.validateFields(async (error, value) => {
      if (!error) {
        if (!value.oldpass) {
          Toast.show('请输入旧密码')
          return
        }
        if (value.newpass !== value.newpass2) {
          Toast.show('两次密码输入不一致')
          return
        }
        const params = {
          oldPassword: md5(value.oldpass),
          newPassword: md5(value.newpass)
        }
        const res = await resetPassword(params)
        if (res.code === 200) {
          Toast.show('修改成功')
        } else {
          Toast.show(res.msg)
        }
      } else {
        Toast.show(getFieldError('oldpass') || getFieldError('newpass') || getFieldError('newpass2'))
      }
    })
  }
  return <>
    <Header title="修改密码" />
    <div className={style.account}>
      <div className={style.form}>
        <Cell title="旧密码">
          <Input
            clearable
            type="password"
            placeholder="请输入旧密码"
            {...getFieldProps('oldpass', {
              rules: [{ required: true, message: '请输入旧密码' }]
            })}
          />
        </Cell>
        <Cell title="新密码">
          <Input
            clearable
            type="password"
            placeholder="请输入新密码"
            {...getFieldProps('newpass', {
              rules: [{ required: true, message: '请输入新密码' }]
            })}
          />
        </Cell>
        <Cell title="确认密码">
          <Input
            clearable
            type="password"
            placeholder="请再次输入新密码"
            {...getFieldProps('newpass2', {
              rules: [{ required: true, message: '请再次输入新密码' }]
            })}
          />
        </Cell>
      </div>
      <Button className={style.btn} block theme="primary" onClick={submit}>确认修改</Button>
    </div>
  </>
}

export default createForm()(Account)
