import React, { useMemo, useState } from 'react'
import { attachmentsTableColumns } from '../../../constants'
import { useIntl } from 'react-intl'

function Logic(values, setFieldValue) {
  const [editableRow, setEditableRow] = useState({ row: null, index: null })
  const intl = useIntl()

  const editSelectedDocument = (row, index) => {
    setEditableRow({ row, index })
  }
  const deleteSelectedDocument = (row, index) => {
    const undeletedAttachments = values.attachments.filter((ele, _index) => _index !== index)

    setFieldValue('attachments', undeletedAttachments)
  }
  const actions = {
    deleteSelectedDocument: deleteSelectedDocument,
    editSelectedDocument: editSelectedDocument,
  }
  let columns = attachmentsTableColumns(actions, intl)
  const setAttachments = (attachment) => {
    if (editableRow.index != null) {
      const attachments = values.attachments.map((el, index) => {
        if (index == editableRow.index) {
          // return { ...attachment, attachmentEndDate: attachment?.attachmentEndDate ? attachment?.attachmentEndDate?.toISOString() : '' }
          return { ...attachment }
        }
        return el
      })
      setFieldValue('attachments', attachments)
      setEditableRow({ row: null, index: null })
    } else {
      setFieldValue('attachments', [...values.attachments, attachment])
    }
  }
  return { setAttachments, columns, editableRow, intl }
}

export default Logic
