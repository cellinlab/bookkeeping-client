import React, { useEffect, useState, useRef } from 'react'
import { Icon, Pull } from 'zarm'
import dayjs from 'dayjs'

import style from './style.module.less'
import BillItem from '@/components/BillItem'
import PopupType from '@/components/PopupType'
import PopupDate from '@/components/PopupDate'
import { REFRESH_STATE, LOAD_STATE } from '@/utils'
import { billList } from '@/api/bill'

const Home = () => {
  const typeRef = useRef()
  const dateRef = useRef()
  const [currentType, setCurrentType] = useState({})
  const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM'))
  const [totalExpense, setTotalExpense] = useState(0)
  const [totalIncome, setTotalIncome] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [list, setList] = useState([])
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal)
  const [loading, setLoading] = useState(LOAD_STATE.normal)

  useEffect(() => {
    getBillList()
  }, [page, currentType, currentTime])

  const getBillList = async () => {
    const params = {
      page,
      page_size: 5,
      date: currentTime,
      type_id: currentType.id
    }
    const { data } = await billList(params)
    
    if (page == 1) {
      setList(data.list)
    } else {
      setList(list.concat(data.list))
    }
    setTotalExpense(data.totalExpense.toFixed(2))
    setTotalIncome(data.totalIncome.toFixed(2))
    setTotalPage(data.total)

    setLoading(LOAD_STATE.success)
    setRefreshing(REFRESH_STATE.success)
  }

  const refreshData = () => {
    setRefreshing(REFRESH_STATE.loading)
    if (page != 1) {
      setPage(1)
    } else {
      getBillList()
    }
  }

  const loadData = () => {
    if (page < totalPage) {
      setLoading(LOAD_STATE.loading)
      setPage(page + 1)
    }
  }

  const toggle = () => {
    typeRef.current && typeRef.current.show()
  }

  const select = (item) => {
    setRefreshing(REFRESH_STATE.loading)
    setPage(1)
    setCurrentType(item)
  }

  const dateToggle = () => {
    dateRef.current && dateRef.current.show()
  }

  const dateSelect = (item) => {
    setRefreshing(REFRESH_STATE.loading)
    setPage(1)
    setCurrentTime(item)
  }

  return <div className={style.home}>
    <div className={style.header}>
      <div className={style.dataWrap}>
        <span className={style.expense}>总支出：<b>￥ {totalExpense}</b></span>
        <span className={style.income}>总收入：<b>￥ {totalIncome}</b></span>
      </div>
      <div className={style.queryWrap}>
        <div className={style.typeWrap} onClick={toggle}>
          <span className={style.type}>{ currentType.name || '全部类型' } <Icon className={style.arrow} type="arrow-bottom" /></span>
        </div>
        <div className={style.dateWrap} onClick={dateToggle}>
          <span className={style.date}>{ currentTime } <Icon className={style.arrow} type="arrow-bottom" /></span>
        </div>
      </div>
    </div>
    <div className={style.contentWrap}>
      {
        list.length ? <Pull
          animationDuration={200}
          stayTime={400}
          refresh={{
            state: refreshing,
            distance: 200,
            handler: refreshData
          }}
          load={{
            state: loading,
            distance: 200,
            handler: loadData
          }}
          >
            {
              list.map((item, index) => <BillItem bill={item} key={index} />)
            }
          </Pull> : null
      }
    </div>
    <PopupType ref={typeRef} onSelect={select} />
    <PopupDate ref={dateRef} mode="month" onSelect={dateSelect} />
  </div>
}

export default Home
