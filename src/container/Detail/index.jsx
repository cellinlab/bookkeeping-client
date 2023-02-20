import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import qs from 'query-string'
import dayjs from 'dayjs'
import cx from 'classnames'

import Header from '@/components/Header'
import CustomIcon from '@/components/CustomIcon'
import PopupAddBill from '@/components/PopupAddBill'
import { billDetail, deleteBill } from '@/api/bill'
import { TypeIconMap } from '@/utils'

import style from './style.module.less'
import { Modal } from 'zarm'

const Detail = () => {
  const location = useLocation()
  const { id } = qs.parse(location.search)

  const [detail, setDetail] = useState({})
  const editRef = useRef()

  const navigateTo = useNavigate()

  useEffect(() => {
    getDetail()
  }, [])

  const getDetail = async () => {
    const params = { id }
    const { data } = await billDetail(params)
    setDetail(data)
  }

  const handleDeleteBill = () => {
    Modal.confirm({
      title: '删除',
      content: '确定删除该账单吗？',
      onOk: async () => {
        const params = { id }
        await deleteBill(params)
        navigateTo(-1)
      }
    })
  }

  return <div className={style.detailWrap}>
    <Header title='账单详情' />
    <div className={style.detail}>
      <div className={style.type}>
        <span
          className={cx({
            [style.expense]: detail.pay_type === 1,
            [style.income]: detail.pay_type === 2
          })}
        >
          <CustomIcon
            className={style.iconfont}
            type={detail.type_id ? TypeIconMap[detail.type_id].icon : TypeIconMap[14].icon} />
        </span>
        <span>{detail.type_name || ''}</span>
      </div>
      {
        detail.pay_type === 1
          ? <div className={cx(style.amount, style.expense)}>-{detail.amount}</div>
          : <div className={cx(style.amount, style.income)}>+{detail.amount}</div>
      }
      <div className={style.info}>
        <div className={style.date}>
          <span>记录时间</span>
          <span>{dayjs(detail.date).format('YYYY-MM-DD HH:mm')}</span>
        </div>
        <div className={style.remark}>
          <span>备注</span>
          <span>{ detail.remark || '-'}</span>
        </div>
      </div>
      <div className={style.operation}>
        <span onClick={handleDeleteBill}><CustomIcon type="icon-shanchu" />删除</span>
        <span
          onClick={() => editRef.current && editRef.current.show()}
        ><CustomIcon type="icon-jizhang" />编辑</span>
      </div>
    </div>
    <PopupAddBill ref={editRef} detail={detail} onReload={getDetail} />
  </div>
}

export default Detail
