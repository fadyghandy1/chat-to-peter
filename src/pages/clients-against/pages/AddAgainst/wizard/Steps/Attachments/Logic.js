import React, { useMemo, useState, useRef } from 'react'
import { attachmentsTableColumns } from '../../../constants'
import { useIntl } from 'react-intl'
import { getFileTypeFromDataURI } from '../../../../../../../utils/common'

function Logic(values, setFieldValue) {
  const [editableRow, setEditableRow] = useState({ row: null, index: null })
  const intl = useIntl()
  const previewModalRef = useRef()
  const [deletedRow, setDeletedRow] = useState()
  const [showDialog, setShowDialog] = useState(false)
  const editSelectedDocument = (row, index) => {
    setEditableRow({ row, index })
  }

  const resetEditableRow = () => {
    // console.log('resetEditableRow', ' attachment logic')
    setEditableRow({ row: null, index: null })
  }

  const handleDelete = () => {
    if (deletedRow) {
      if (editableRow && deletedRow.id && deletedRow.id === editableRow.row.id) resetEditableRow()
      let undeletedAttachments = values.attachments.filter((el, _index) => el.id !== deletedRow.id)
      if (deletedRow.documentId) {
        undeletedAttachments = values.attachments.map((ele, _index) => {
          if (ele.documentId === deletedRow.documentId) {
            return { ...ele, document: { ...ele.document, isDeleted: true } }
          }
          return ele
        })
      }

      setFieldValue('attachments', undeletedAttachments)
      setShowDialog(false)
    }
  }
  const deleteSelectedDocument = (row, index) => {
    setDeletedRow(row)
    setShowDialog(true)
  }

  const downloadSelectedDocument = (row, index) => {
    if (row.attachment) {
      var a = document.createElement('a')
      a.href = row.attachment
      const extension = getFileTypeFromDataURI(row.attachment)
      if (extension) {
        a.setAttribute('download', `attachment-${Date.now()}${extension}`)
        a.click()
      }
    }
  }

  const viewSelectedDocument = (row) => {
    if (previewModalRef.current) previewModalRef.current.open(row)
  }

  const actions = {
    deleteSelectedDocument: deleteSelectedDocument,
    editSelectedDocument: editSelectedDocument,
    downloadSelectedDocument: downloadSelectedDocument,
    viewSelectedDocument: viewSelectedDocument,
  }
  let columns = useMemo(() => attachmentsTableColumns(actions, intl), [values.attachments])
  const setAttachments = (attachment) => {
    if (editableRow.row) {
      const attachments = values.attachments.map((el, index) => {
        if ((el.id && el.id == editableRow.row?.id) || (el.documentId && el.documentId == editableRow.row?.documentId)) {
          debugger
          // return { ...attachment, attachmentEndDate: attachment?.attachmentEndDate ? attachment?.attachmentEndDate?.toISOString() : '' }
          return { ...el, ...attachment }
        }

        return el
      })
      debugger
      setFieldValue('attachments', attachments)
      setEditableRow({ row: null, index: null })
    } else {
      debugger
      setFieldValue('attachments', [...values.attachments, { ...attachment, id: (Date.now() + '-' + Math.random()).toString(16).replace(/\./g, '') }])
    }
  }
  return { setAttachments, columns, editableRow, intl, showDialog, setShowDialog, handleDelete, resetEditableRow, previewModalRef }
}

export default Logic
