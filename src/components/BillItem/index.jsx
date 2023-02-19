import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { Cell } from 'zarm'

import CustomIcon from '../CustomIcon'
import { TypeIconMap } from '@/utils'

import style from './style.module.less'

const BillItem = ({ bill }) => {
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  const navigateTo = useNavigate()

  useEffect(() => {
    const _income = bill.list
      .filter(item => item.pay_type === 2)
      .reduce((curr, item) => {
        curr += Number(item.amount)
        return curr
      }, 0)
    setIncome(_income)

    const _expense = bill.list
      .filter(item => item.pay_type === 1)
      .reduce((curr, item) => {
        curr += Number(item.amount)
        return curr
      }, 0)
    setExpense(_expense)
  }, [bill.list])

  const goToDetail = (item) => {
    navigateTo(`/detail?id=${item.id}`)
  }

  return <div className={style.item}>
    <div className={style.header}>
      <div className={style.date}>{bill.date}</div>
      <div className={style.money}>
        <span>
          <span className={style.billTypeLabel}>支</span>
          <span>￥{ expense.toFixed(2) }</span>
        </span>
        <span>
          <span className={style.billTypeLabel}>收</span>
          <span>￥{ income.toFixed(2) }</span>
        </span>
      </div>
    </div>
    {
      bill && bill.list.map(item => {
        return <Cell
          className={style.bill}
          key={item.id}
          onClick={() => goToDetail(item)}
          title={
            <>
              <CustomIcon
                className={style.itemIcon}
                type={item.type_id ? TypeIconMap[item.type_id].icon : 'icon-qita'}
              />
              <span>{ item.type_name }</span>
            </>
          }
          description={
            <span style={{ color: item.pay_typ == 2 ? 'red' : '#39be77'}}>
              {`${item.pay_type === 1 ? '-' : '+'}${item.amount}`}
            </span>
          }
          help={
            <div>
              {dayjs(item.date).format('HH:mm')} {item.remark ? `| ${item.remark}` : ''}
            </div>
          }
        >
        </Cell>
      })
    }
  </div>
}

BillItem.propTypes = {
  bill: PropTypes.object.isRequired,
}

export default BillItem
