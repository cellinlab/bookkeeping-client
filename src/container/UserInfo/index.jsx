import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FilePicker, Button, Input, Toast } from 'zarm'

import Header from '@/components/Header'
import { userInfo, updateUserInfo } from '@/api/user'
import { imgUrlTrans } from '@/utils'
import { baseUrl } from 'config'

import style from './style.module.less'

const UserInfo = () => {
  const [user, setUser] = useState({})
  const [avatar, setAvatar] = useState('')
  const [slogan, setSlogan] = useState('')

  const token = localStorage.getItem('token')

  const navigateTo = useNavigate()

  useEffect(() => {
    getUserInfo()
  }, [])

  const handleFileChange = (file) => {
    if (file && file.size > 200 * 1024) {
      Toast.show('图片大小不能超过200kb')
      return
    }
    const formData = new FormData()
    formData.append('file', file.file)

    axios({
      method: 'post',
      url: `${baseUrl}/upload`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `${token}`
      }
    }).then((res) => {
      setAvatar(imgUrlTrans(res.data.url))
    })
  }

  const getUserInfo = async () => {
    const { data } = await userInfo()

    setUser(data)
    setAvatar(data.avatar)
    setSlogan(data.slogan)
  }

  const saveUserInfo = async () => {
    const params = {
      slogan,
      avatar
    }
    const { data } = await updateUserInfo(params)

    Toast.show('保存成功')
    navigateTo('/user')
  }
  
  return <>
    <Header title="用户信息" />
    <div className={style.userInfo}>
      <h1>个人资料</h1>
      <div className={style.item}>
        <div className={style.title}>头像</div>
        <div className={style.avatar}>
          <img className={style.avatarImg} src={avatar} alt="" />
          <div className={style.desc}>
            <span>支持 jpg、png、jpeg 格式，大小 200 kb 以内图片</span>
            <FilePicker
              className={style.filePicker}
              onChange={handleFileChange}
              accept="image/*"
              >
              <Button className={style.uploadBtn} size='xs' theme="primary">上传头像</Button>
            </FilePicker>
          </div>
        </div>
      </div>
      <div className={style.item}>
        <div className={style.title}>个性签名</div>
        <div className={style.slogan}>
          <Input
            clearable
            type="text"
            placeholder="请输入个性签名"
            value={slogan}
            onChange={(value) => setSlogan(value)}
          />
        </div>
      </div>
      <Button className={style.saveBtn} block theme="primary" onClick={saveUserInfo}>保存</Button>
    </div>
  </>
}

export default UserInfo
