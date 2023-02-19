import React, { forwardRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Popup, DatePicker } from 'zarm'
import dayjs from 'dayjs'

const PopupDate = forwardRef(({ onSelect, mode = 'date' }, ref) => {
  const [show, setShow] = useState(false)
  const [now, setNow] = useState(new Date())

  const selectMonth = (item) => {
    setNow(item)
    setShow(false)
    if (mode == 'month') {
      onSelect(dayjs(item).format('YYYY-MM'))
    } else if (mode == 'date') {
      onSelect(dayjs(item).format('YYYY-MM-DD'))
    }
  }

  if (ref) {
    ref.current = {
      show: () => setShow(true),
      hide: () => setShow(false)
    }
  }

  return <Popup
    visible={show}
    direction="bottom"
    onMaskClick={() => setShow(false)}
    destroy={false}
    mountContainer={() => document.body}
  >
    <div>
      <DatePicker
        visible={show}
        value={now}
        mode={mode}
        onOk={selectMonth}
        onCancel={() => setShow(false)}
      />
    </div>
  </Popup>
})

PopupDate.propTypes = {
  onSelect: PropTypes.func,
  mode: PropTypes.oneOf(['date', 'month'])
}

export default PopupDate
