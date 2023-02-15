import React, { useRef, useEffect, useImperativeHandle } from 'react'

import useCaptcha from 'use-offline-captcha'

const Captcha = React.forwardRef((props, ref) => {
  const captchaRef = useRef()

  const userOpt = {
    type: 'mixed',
    length: 4,
    sensitive: false,
  }

  const { gen, validate } = useCaptcha(captchaRef, userOpt)

  useEffect(() => {
    if (gen) {
      gen()
    }
  }, [gen])

  const handleRefreshCaptcha = () => gen()

  useImperativeHandle(ref, () => ({
    validate,
  }))

  return <div
    ref={captchaRef}
    onClick={handleRefreshCaptcha}
  ></div>
})

export default Captcha
