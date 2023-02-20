import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { NavBar, Icon } from 'zarm'

import style from './style.module.less'

const Header = ({ title }) => {
  const navigateTo = useNavigate()

  return <div className={style.headerWrap}>
    <div className={style.block}>
      <NavBar
        className={style.header}
        title={title}
        left={
          <Icon type="arrow-left" theme='primary' onClick={() => navigateTo(-1)} />
        }
      />
    </div>
  </div>
}

Header.propTypes = {
  title: PropTypes.string
}

export default Header
