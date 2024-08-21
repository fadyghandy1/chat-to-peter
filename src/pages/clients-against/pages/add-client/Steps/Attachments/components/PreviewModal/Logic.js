import { useCallback, useImperativeHandle, useState } from 'react'
import { useIntl } from 'react-intl'
import { getImageTypeFromBase64 } from '../../../../../../../../utils/common'

function Logic({ ref }) {
  const intl = useIntl()
  const [open, setOpen] = useState()
  const [row, setRow] = useState()
  const [isPDF, setIsPDF] = useState(false)

  useImperativeHandle(
    ref,
    () => {
      return {
        open: (row) => {
          debugger
          const result = getImageTypeFromBase64(row.attachment)
          if (result) {
            if (result === 'application/pdf') {
              setIsPDF(true)
            } else {
              setIsPDF(false)
            }
            setRow(row)
            setOpen(true)
          }
        },
      }
    },
    []
  )
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])
  return { open, handleClose, row, isPDF, intl }
}

export default Logic
