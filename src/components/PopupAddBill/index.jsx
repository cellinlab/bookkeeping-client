import React, { forwardRef, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import dayjs from 'dayjs'
import { Popup, Icon, Keyboard, Input, Toast } from 'zarm'

import PopupDate from '../PopupDate'
import CustomIcon from '../CustomIcon'
import style from './style.module.less'

import { typeList } from '@/api/type'
import { addBill } from '@/api/bill'
import { TypeIconMap } from '@/utils'

const PopupAddBill = forwardRef((props, ref) => {
  const dateRef = useRef()
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const [payType, setPayType] = useState('expense')
  const [amount, setAmount] = useState('')
  const [currentType, setCurrentType] = useState({})
  const [expenseTypes, setExpenseTypes] = useState([])
  const [incomeTypes, setIncomeTypes] = useState([])
  const [remark, setRemark] = useState('')
  const [remarkShow, setRemarkShow] = useState(false)

  useEffect(async () => {
    const { data } = await typeList()
    const _expense = data.filter(item => item.pay_type === 1)
    const _income = data.filter(item => item.pay_type === 2)
    setExpenseTypes(_expense)
    setIncomeTypes(_income)
    setCurrentType(_expense[0])
  }, [])

  if (ref) {
    ref.current = {
      show: () => setShow(true),
      hide: () => setShow(false)
    }
  }

  const handleChangeType = (type) => {
    setPayType(type)
  }

  const handleSelectDate = (date) => {
    setDate(date)
  }

  const handleInputAmount = (v) => {
    const value = String(v)
    if (value === 'close') {
      return
    }
    if (value === 'delete') {
      if (amount == '') {
        return
      }
      let _amount = amount.slice(0, amount.length - 1)
      setAmount(_amount)
      return
    }
    if (value === 'ok') {
      handleAddBill()
      return
    }
    if (value === '.' && amount.includes('.')) {
      return
    }
    if (value !== '.' && amount.includes('.') && (amount.split('.')[1].length >= 2))  {
      return
    }
    setAmount(amount + value)
  }

  const handleAddBill = async () => {
    if (!amount) {
      Toast.show('请输入金额')
      return
    }

    const params = {
      amount: Number(Number(amount).toFixed(2)),
      type_id: currentType.id,
      type_name: currentType.name,
      date: dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
      pay_type: currentType.pay_type,
      remark: remark || ''
    }

    const res = await addBill(params)

    setAmount('')
    setPayType('expense')
    setCurrentType(expenseTypes[0])
    setDate(new Date())
    setRemark('')

    Toast.show('添加成功')
    setShow(false)
    if (props.onReload) props.onReload()
  }

  return <Popup
    visible={show}
    direction="bottom"
    onMaskClick={() => setShow(false)}
    destroy={false}
    mountContainer={() => document.body}
  >
    <div className={style.addWrap}>

      <div className={style.header}>
        <span className={style.close} onClick={() => setShow(false)}><Icon type="wrong"/></span>
      </div>
      <div className={style.typeDateSelect}>
        <div className={style.type}>
          <span
            onClick={() => handleChangeType('expense')}
            className={cx({
              [style.active]: payType === 'expense',
              [style.expense]: true
            })}
          >支出</span>
          <span
            onClick={() => handleChangeType('income')}
            className={cx({
              [style.active]: payType === 'income',
              [style.income]: true
            })}
          >收入</span>
        </div>
        <div
          className={style.dateSelect}
          onClick={() => dateRef.current && dateRef.current.show()}
        >
          {dayjs(date).format('MM-DD')}
          <Icon className={style.arrow} type="arrow-bottom"/>
        </div>
      </div>
      <div className={style.amountInput}>
        <span className={style.suffix}>￥</span>
        <span className={cx(style.amount, style.animation)}>{amount}</span>
      </div>
      <div className={style.typeSelect}>
        <div className={style.typeList}>
          {
            (payType === 'expense' ? expenseTypes : incomeTypes).map(item => {
              return <div
                onClick={() => setCurrentType(item)}
                key={item.id}
                className={style.typeItem}
              >
                <span
                  className={cx({
                    [style.iconfontWrap]: true,
                    [style.expense]: payType === 'expense',
                    [style.income]: payType === 'income',
                    [style.active]: currentType.id === item.id
                  })}
                >
                  <CustomIcon className={style.iconfont} type={TypeIconMap[item.id].icon} />
                </span>
                <span>{item.name}</span>
              </div>
            })
          }
        </div>
      </div>
      <div className={style.remark}>
        {
          remarkShow ? <Input
            autoHeight
            showLength
            maxLength={50}
            type='text'
            rows={3}
            value={remark}
            placeholder="请输入备注"
            onChange={(v) => setRemark(v)}
            onBlur={() => setRemarkShow(false)}
          /> : <span onClick={() => setRemarkShow(true)}>{ remark || '添加备注'}</span>
        }
      </div>
      <Keyboard type="price" onKeyClick={(v) => handleInputAmount(v)} />
      <PopupDate ref={dateRef} onSelect={handleSelectDate} />
    </div>
  </Popup>
})

PopupAddBill.propTypes = {
}

export default PopupAddBill