import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import { TabBar } from 'zarm'

import style from './style.module.less'
import CustomIcon from '../CustomIcon'

const NavBar = ({ showNav }) => {
  const [activeKey, setActiveKey] = useState(useLocation().pathname)
  const navigateTo = useNavigate()

  const handleTabChange = (path) => {
    setActiveKey(path)
    navigateTo(path)
  }

  return (
    <TabBar visible={showNav} activeKey={activeKey} onChange={handleTabChange} className={style.tab}>
      <TabBar.Item
        itemKey="/"
        title="账单"
        icon={<CustomIcon type="icon-bill-fill" />}
      />
      <TabBar.Item
        itemKey="/statistics"
        title="统计"
        icon={<CustomIcon type="icon-tatistics" />}
      />
      <TabBar.Item
        itemKey="/user"
        title="我的"
        icon={<CustomIcon type="icon-user" />}
      />
    </TabBar>
  )
}

NavBar.propTypes = {
  showNav: PropTypes.bool
}

export default NavBar
