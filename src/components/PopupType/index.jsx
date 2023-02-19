import React, { forwardRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Popup, Icon } from 'zarm'

import style from './style.module.less'
import { typeList } from '@/api/type'

const PopupType = forwardRef(({ onSelect }, ref) => {
  const [show, setShow] = useState(false)
  const [active, setActive] = useState('all')
  const [expense, setExpense] = useState([])
  const [income, setIncome] = useState([])

  useEffect(() => {
    (async () => {
      const { data } = await typeList()
      setExpense(data.filter(item => item.pay_type === 1))
      setIncome(data.filter(item => item.pay_type === 2))
    })()
  }, [])

  if (ref) {
    ref.current = {
      show: () => {
        console.log('show')
        setShow(true)
      },
      hide: () => {
        setShow(false)
      }
    }
  }

  const handleSelect = (item) => {
    setActive(item.id)
    setShow(false)
    onSelect && onSelect(item)
  }

  return <Popup
    visible={show}
    direction="bottom"
    onMaskClick={() => setShow(false)}
    destroy={() => false}
    mountContainer={() => document.body}
  >
    <div className={style.popupType}>
      <div className={style.header}>
        请选择类型
        <Icon type='wrong' className={style.cross} onClick={() => setShow(false)} />
      </div>
      <div className={style.content}>
        <div
          onClick={() => handleSelect({ id: 'all', name: '全部类型' })}
          className={cx({
            [style.all]: true,
            [style.active]: active === 'all'
          })}
        >全部类型</div>
        <div className={style.title}>支出</div>
        <div className={style.expenseWrap}>
          {
            expense.map((item, index) => {
              return <p
                key={index}
                onClick={() => handleSelect(item)}
                className={cx({
                  [style.active]: active == item.id
                })}
              >{item.name}</p>
            })
          }
        </div>
        <div className={style.title}>收入</div>
        <div className={style.incomeWrap}>
          {
            income.map((item, index) => {
              return <p
                key={index}
                onClick={() => handleSelect(item)}
                className={cx({
                  [style.active]: active == item.id
                })}
              >{item.name}</p>
            })
          }
        </div>
      </div>
    </div>
  </Popup>
})

PopupType.propTypes = {
  onSelect: PropTypes.func
}

export default PopupType
