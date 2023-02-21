import React from 'react'

import Header from '@/components/Header'

import style from './style.module.less'

const About = () => {
  return <>
    <Header title="关于我们" />
    <div className={style.about}>
      <div className={style.title}>赛林岚伯记账应用</div>
      <div className={style.content}>赛林岚伯记账应用是一款专门为个人用户设计的记账应用，可以帮助用户记录每一笔收入和支出，方便用户查看自己的收支情况，帮助用户控制自己的支出。</div>
      <div className={style.desc}>
        <p>
          <span>前端：</span>
          <span>React + React-Router + Axios + Zarm</span>
          <span>
            <a
              className={style.link}
              href="https://github.com/cellinlab/bookkeeping-client"
              target="_blank"
              rel="noreferrer"> 源码</a>
          </span>
        </p>
        <p>
          <span>后端：</span>
          <span>Node + Egg.js + Mysql</span>
          <span>
            <a
              className={style.link}
              href="https://github.com/cellinlab/bookkeeping-server"
              target="_blank"
              rel="noreferrer"> 源码</a>
          </span>
        </p>
      </div>
    </div>
  </>
}

export default About
