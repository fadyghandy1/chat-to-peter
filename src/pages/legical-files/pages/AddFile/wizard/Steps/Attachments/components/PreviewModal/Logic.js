import { useCallback, useImperativeHandle, useState } from 'react'
import { useIntl } from 'react-intl'
import { getImageTypeFromBase64, handleBase64ToPreview } from '../../../../../../../../../utils/common'

function Logic({ ref }) {
  const intl = useIntl()
  const [row, setRow] = useState()
  const [open, setOpen] = useState()
  const [isPDF, setIsPDF] = useState(false)

  useImperativeHandle(
    ref,
    () => {
      return {
        open: (row) => {
          const fullURL = handleBase64ToPreview({ base64: row.fileContent, extension: row.extension })
          const fileType = getImageTypeFromBase64(fullURL)
          debugger
          if (fileType) {
            if (fileType === 'application/pdf') {
              setIsPDF(true)
            } else {
              setIsPDF(false)
            }
            setRow(fullURL)
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

  return { row, isPDF, open, handleClose, intl }
}

export default Logic
