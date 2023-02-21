import axios from './axios'
import { baseUrl } from 'config'

const MODE = import.meta.env.MODE

export const imgUrlTrans = (url) => {
  if (url && url.startsWith('http')) {
    return url
  } else {
    url = `${MODE === 'development' ? baseUrl : 'http://bks.cellinlab.xyz'}${url}`
    return url
  }
}

export const get = axios.get

export const post = axios.post

export const TypeIconMap = {
  2: {
    icon: 'icon-canyin'
  },
  3: {
    icon: 'icon-fushi'
  },
  4: {
    icon: 'icon-jiaotong'
  },
  5: {
    icon: 'icon-riyong'
  },
  6: {
    icon: 'icon-xuexi'
  },
  7: {
    icon: 'icon-yiliao'
  },
  8: {
    icon: 'icon-lvhang'
  },
  9: {
    icon: 'icon-qita'
  },
  10: {
    icon: 'icon-gongzi'
  },
  11: {
    icon: 'icon-jiangjin'
  },
  12: {
    icon: 'icon-licai'
  },
  13: {
    icon: 'icon-tuikuan'
  },
  14: {
    icon: 'icon-qita'
  }
}

export const REFRESH_STATE = {
  normal: 0,
  pull: 1,
  drop: 2,
  loading: 3,
  success: 4,
  failure: 5
}

export const LOAD_STATE = {
  normal: 0,
  abort: 1,
  loading: 2,
  success: 3,
  failure: 4,
  complete: 5
}