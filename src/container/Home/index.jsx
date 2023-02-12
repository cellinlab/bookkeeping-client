import React from 'react'
import { Button } from 'zarm'

import style from './style.module.less'

export default function Home() {
  return (
    <div className={style.home}>
      <h1>Home</h1>
      <Button theme="primary">按钮</Button>
    </div>
  )
}
