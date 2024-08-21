import { useImperativeHandle, useState } from 'react'
import { useIntl } from 'react-intl'

function Logic({ ref, values, setFieldValue, resetEditableRow, editableRow }) {
  const intl = useIntl()
  const [showDialog, setShowDialog] = useState(false)
  const [row, setRow] = useState()

  useImperativeHandle(
    ref,
    () => {
      return {
        open: (row) => {
          setRow(row)
          setShowDialog(true)
        },
      }
    },
    []
  )
  const onSubmit = () => {
    console.log(row, editableRow)
    debugger
    let undeletedAttachments = values.attachments.filter((el, _index) => el.id !== row.id)

    if (editableRow && row.id && row.id === editableRow.id) resetEditableRow()
    debugger
    if (row.documentId) {
      undeletedAttachments = values.attachments.map((ele, _index) => {
        if (ele.documentId === row.documentId) {
          return { ...ele, document: { ...ele.document, isDeleted: true } }
        }
        return ele
      })
    }

    setFieldValue('attachments', undeletedAttachments)
    setShowDialog(false)
  }
  return { onSubmit, showDialog, setShowDialog, row, intl }
}

export default Logic
