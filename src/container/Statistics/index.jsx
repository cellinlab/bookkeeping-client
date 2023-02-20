import React, { useEffect, useRef, useState } from 'react'
import { Icon, Progress } from 'zarm'
import cx from 'classnames'
import dayjs from 'dayjs'

import CustomIcon from '@/components/CustomIcon'
import PopupDate from '@/components/PopupDate'
import { TypeIconMap } from '@/utils'
import { billStatistics } from '@/api/bill'

import style from './style.module.less'

let proportionalChart = null

const Statistics = () => {
  const monthRef = useRef()
  const [currentMonth, setCurrentMonth] = useState(dayjs().format('YYYY-MM'))
  const [totalType, setTotalType] = useState('expense')
  const [totalExpense, setTotalExpense] = useState(0)
  const [totalIncome, setTotalIncome] = useState(0)
  const [expenseData, setExpenseData] = useState([])
  const [incomeData, setIncomeData] = useState([])
  const [pieType, setPieType] = useState('expense')

  useEffect(() => {
    getData()
    return () => {
      proportionalChart && proportionalChart.dispose()
    }
  }, [currentMonth])

  const getData = async () => {
    const params = {
      date: currentMonth,
    }
    const { data } = await billStatistics(params)

    setTotalExpense(data.total_expense)
    setTotalIncome(data.total_income)

    const expense_data = data.total_data
      .filter((item) => item.pay_type == 1)
      .sort((item1, item2) => {
        return item2.amount - item1.amount
      })
    const income_data = data.total_data
      .filter((item) => item.pay_type == 2)
      .sort((item1, item2) => {
        return item2.amount - item1.amount
      })
    
    setExpenseData(expense_data)
    setIncomeData(income_data)

    if (pieType === 'expense') {
      initPieChart(expense_data)
    } else {
      initPieChart(income_data)
    }
  }

  const monthShow = ()  => {
    monthRef.current && monthRef.current.show()
  }

  const selectMoth = (item) => {
    setCurrentMonth(item)
  }

  const changePieType = (type) => {
    setPieType(type)
    if (type === 'expense') {
      initPieChart(expenseData)
    } else {
      initPieChart(incomeData)
    }
  }

  const initPieChart = (data) => {
    if (window.echarts) {
      proportionalChart = echarts.init(document.getElementById('proportionalChart'))
      proportionalChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          data: data.map((item) => item.type_name),
        },
        series: [
          {
            name: '支出',
            type: 'pie',
            radius: '55%',
            data: data.map((item) => {
              return {
                value: Number(item.amount),
                name: item.type_name,
              }
            }),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }

  return <div className={style.statistics}>
    <div className={style.total}>
      <div className={style.date} onClick={monthShow}>
        <span>{currentMonth}</span>
        <Icon className={style.iconDate} type="date" />
      </div>
      <div className={style.title}>共支出</div>
      <div className={style.expense}>￥ {totalExpense}</div>
      <div className={style.income}>共收入 ￥ {totalIncome}</div>
    </div>
    <div className={style.structure}>
      <div className={style.header}>
        <span className={style.title}>收支构成</span>
        <div className={style.tab}>
          <span
            onClick={() => setTotalType('expense')}
            className={cx({
              [style.expense]: true,
              [style.active]: totalType === 'expense'
            })}
          > 支出 </span>
          <span
            onClick={() => setTotalType('income')}
            className={cx({
              [style.income]: true,
              [style.active]: totalType === 'income'
            })}
          > 收入 </span>
        </div>
      </div>
      <div className={style.content}>
        {
          (totalType === 'expense' ? expenseData : incomeData)
            .map((item, index) => {
              return <div key={item.type_id} className={style.itemInfo}>
                <div className={style.left}>
                  <div className={style.type}>
                    <span
                      className={cx({
                        [style.expense]: totalType === 'expense',
                        [style.income]: totalType === 'income'
                      })}
                    >
                      <CustomIcon type={item.type_id ? TypeIconMap[item.type_id].icon : TypeIconMap[14]} />
                    </span>
                    <span className={style.name}>{item.type_name}</span>
                  </div>
                  <div className={style.progress}>￥{Number(item.amount).toFixed(2) || 0}</div>
                </div>
                <div className={style.right}>
                  <div className={style.percent}>
                    <Progress
                      shape='line'
                      percent={
                        Number((Number(item.amount) / Number(totalType == 'expense' ? totalExpense : totalIncome)) * 100).toFixed(2) || 0
                      }
                      theme='primary'
                    />
                  </div>
                </div>
              </div>
            })
        }
      </div>
      <div className={style.chart}>
        <div className={style.header}>
          <span className={style.title}>收支构成</span>
          <div className={style.tab}>
            <span
              onClick={() => changePieType('expense')}
              className={cx({
                [style.expense]: true,
                [style.active]: pieType === 'expense'
              })}
            > 支出 </span>
            <span
              onClick={() => changePieType('income')}
              className={cx({
                [style.income]: true,
                [style.active]: pieType === 'income'
              })}
            > 收入 </span>
          </div>
        </div>
        <div id="proportionalChart"></div>
      </div>
    </div>
    <PopupDate ref={monthRef} mode="month" onSelect={selectMoth} />
  </div>
}

export default Statistics
