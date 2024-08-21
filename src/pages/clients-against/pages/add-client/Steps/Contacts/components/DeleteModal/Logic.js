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
    let undeletedAttachments = values?.contacts?.filter((el, _index) => el.localId !== row.localId)
    debugger
    if (editableRow && row.localId && row.localId === editableRow.localId) resetEditableRow()
    if (row.id) {
      undeletedAttachments = values.contacts.map((ele, _index) => {
        if (ele.id === row.id) {
          return { ...ele, isDeleted: true }
        }
        return ele
      })
    }
    setFieldValue('contacts', undeletedAttachments)
    setShowDialog(false)
  }
  return { onSubmit, showDialog, setShowDialog, row, intl }
}

export default Logic
