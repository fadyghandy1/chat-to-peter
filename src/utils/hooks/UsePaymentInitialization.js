import { useEffect, useRef, useState } from 'react'
import { useSeerbitPayment } from 'seerbit-reactjs'

const UsePaymentInitialization = (options, callback, close) => {
  const [seerbitOptions, setSeerbitOptions] = useState({ ...options })
  const initializePayment = useSeerbitPayment(seerbitOptions, callback, close)

  const initializePaymentDynamically = (values) => {
    setSeerbitOptions((prevState) => {
      return { ...prevState, ...values }
    })
  }

  const useEffectSkipFirst = (callbackFn, dependencies) => {
    const firstRenderRef = useRef(true)

    useEffect(() => {
      if (firstRenderRef.current) {
        firstRenderRef.current = false
      } else {
        callbackFn()
      }
    }, [...dependencies])
  }
  useEffectSkipFirst(() => {
    if (seerbitOptions?.tranref) {
      initializePayment()
    }
  }, [seerbitOptions])

  return { initializePaymentDynamically, initializePayment }
}
export default UsePaymentInitialization
