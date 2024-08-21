import { useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import UseFlashMessage from '../../../../../../../utils/hooks/UseFlashMessage'
import { lawyersTableColumns } from '../../../constants'

const Logic = (values, setFieldValue) => {
  const [editableRow, setEditableRow] = useState({ row: null, index: null })
  const [deletedRow, setDeletedRow] = useState()
  const [showDialog, setShowDialog] = useState(false)
  const intl = useIntl()
  const { addFlashMessage } = UseFlashMessage()
  // const [initialState, setInitialState] = useState(attachmentsInputsInitials)

  const resetEditableRow = () => {
    // console.log('resetEditableRow', ' attachment logic')
    setEditableRow({ row: null, index: null })
  }

  const handleDelete = () => {
    if (deletedRow) {
      if (editableRow && deletedRow.localId && deletedRow.localId === editableRow.row.localId) resetEditableRow()
      let undeletedLawyers = values.lawyers.filter((el, _index) => el.localId !== deletedRow.localId)
      if (deletedRow.id) {
        undeletedLawyers = values.lawyers.map((ele, _index) => {
          if (ele.id === deletedRow.id) {
            return { ...ele, isDeleted: true }
          }
          return ele
        })
      }

      setFieldValue('lawyers', undeletedLawyers)
      setShowDialog(false)
    }
  }
  const deleteSelectedLawyer = (row, index) => {
    setDeletedRow(row)
    setShowDialog(true)
  }

  const editSelectedLawyer = (row, index) => {
    setEditableRow({ row, index })
  }

  const actions = {
    deleteSelectedLawyer: deleteSelectedLawyer,
    editSelectedLawyer: editSelectedLawyer,
  }

  let columns = useMemo(() => lawyersTableColumns(actions, intl), [values.lawyers])

  const setLawyers = (lawyer) => {
    if (editableRow.row) {
      const lawyers = values.lawyers.map((el, index) => {
        if ((el.id && el.id == editableRow.row?.id) || (el.localId && el.localId == editableRow.row?.localId)) {
          debugger
          // return { ...attachment, attachmentEndDate: attachment?.attachmentEndDate ? attachment?.attachmentEndDate?.toISOString() : '' }
          return { ...el, ...lawyer }
        }

        return el
      })

      setFieldValue('lawyers', lawyers)
      setEditableRow({ row: null, index: null })
    } else {
      setFieldValue('lawyers', [...values.lawyers, { ...lawyer, localId: (Date.now() + '-' + Math.random()).toString(16).replace(/\./g, '') }])
    }
  }
  return { addFlashMessage, columns, setLawyers, editableRow, intl, showDialog, setShowDialog, handleDelete, resetEditableRow }
}
export default Logic
