import React, { useMemo, useState } from 'react'
import { stagesTableColumns } from '../../../constants'
import { useIntl } from 'react-intl'

function Logic(values, setFieldValue) {
  const [editableRow, setEditableRow] = useState({ row: null, index: null })
  const intl = useIntl()

  const editSelectedDocument = (row, index) => {
    setEditableRow({ row, index })
  }
  const deleteSelectedDocument = (row, index) => {
    const undeletedAttachments = values.stages.filter((ele, _index) => _index != index)
    setFieldValue('stages', undeletedAttachments)
  }
  const actions = {
    deleteSelectedDocument: deleteSelectedDocument,
    editSelectedDocument: editSelectedDocument,
  }
  let columns = useMemo(() => stagesTableColumns(actions, intl), [])
  const setStages = (stage) => {
    if (editableRow.index != null) {
      const stages = values.stages.map((el, index) => {
        if (index == editableRow.index) {
          // return { ...attachment, attachmentEndDate: attachment?.attachmentEndDate ? attachment?.attachmentEndDate?.toISOString() : '' }
          return { ...stage }
        }
        return el
      })
      setFieldValue('stages', stages)
      setEditableRow({ row: null, index: null })
    } else {
      setFieldValue('stages', [...values.stages, stage])
    }
  }
  return { setStages, columns, editableRow, intl }
}

export default Logic
