import React, { useCallback, useMemo, useState, useRef } from 'react'
import { DataTypeProvider } from '@devexpress/dx-react-grid'
import { Edit, Delete, Download, Visibility } from '@mui/icons-material'
import { attachmentsTableColumns } from '../../../constants'
import { useIntl } from 'react-intl'
import UseFlashMessage from '../../../../../../../utils/hooks/UseFlashMessage'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { QUERY_KEY } from '../../../../../../../utils/constants/static'
import { deleteDocument, getAllCaseDocuments, getCaseDocument } from '../../../../../../../services/StageServices'
import { handleBase64ToPreview } from '../../../../../../../utils/common'

function Logic(values) {
  const intl = useIntl()
  const previewModalRef = useRef()
  const [deletedRow, setDeletedRow] = useState()
  const [showDialog, setShowDialog] = useState(false)
  const [documentId, setDocumentId] = useState('')
  const [caseNumberID, setCaseNumberID] = useState()
  const [previewLoading, setPreviewLoading] = useState(false)
  const { addFlashMessage } = UseFlashMessage()
  const queryClient = useQueryClient()

  const { data: caseDocuments = [], refetch } = useQuery(QUERY_KEY['ADDFILE-DOCUMENTs'], async () => {
    return await getAllCaseDocuments({ caseMasterId: values.fileId }).then((res) => {
      return res.data.models.map((doc) => {
        return {
          ...doc,
          attachmentType: doc.attachmentType.descriptionEn,
          attachmentTypeId: doc.attachmentType.id,
        }
      })
    })
  })

  const fetchEditableDocument = async ({ queryKey }) => {
    const [_key, params] = queryKey

    return await getCaseDocument(params).then((res) => {
      return res.data.model
    })
  }

  const { data } = useQuery([QUERY_KEY['ADDFILE-EDITDOCUMENT'], documentId], fetchEditableDocument, {
    enabled: !!documentId, // This query will not run until `documentId` is truthy
  })

  const editSelectedDocument = async (row, id) => {
    debugger
    setDocumentId(row?.id)
    setCaseNumberID(row?.caseDetailsId)
  }

  const resetEditableRow = () => {
    debugger
    // console.log('resetEditableRow', ' attachment logic')
    // setEditableRow({ row: null, index: null })

    queryClient.setQueryData(QUERY_KEY['ADDFILE-EDITDOCUMENT'], null)
    setDocumentId()
    setCaseNumberID()
  }

  const deleteDocumentMutaion = useMutation((payload) => deleteDocument(payload), {
    onSuccess: (res) => {
      addFlashMessage({ type: 'success', message: intl.formatMessage({ id: 'DELETE.SUCCESSFULLY.CONFIRMATION' }, { fieldname: intl.formatMessage({ id: 'ADDFILE.ATTACHMENT' }) }) })

      resetEditableRow()
      refetch()
      setShowDialog(false)
    },
    onSettled: () => {
      setShowDialog(false)
      setDeletedRow()
    },
  })

  const handleEditSuccess = useCallback(() => {
    setDocumentId()
    setCaseNumberID()
    refetch()
  }, [])

  const handleDelete = async () => {
    try {
      await deleteDocumentMutaion.mutateAsync(deletedRow.id)
    } catch (e) {
      console.log(e)
    }
  }

  const deleteSelectedDocument = (row, index) => {
    setDeletedRow(row)
    setShowDialog(true)
  }

  // const actions = {
  //   deleteSelectedDocument: deleteSelectedDocument,
  //   editSelectedDocument: editSelectedDocument,
  // }
  const downloadSelectedDocument = async (row) => {
    addFlashMessage({ type: 'info', message: intl.formatMessage({ id: 'DOWNLOAD.SUCCESSFULLY' }) })

    await getCaseDocument(row?.id).then((res) => {
      const url = handleBase64ToPreview({ extension: res.data.model?.extension, base64: res.data.model?.fileContent })
      debugger
      if (url) {
        var a = document.createElement('a')
        a.href = url
        a.setAttribute('download', `attachment-${Date.now()}${res.data.model?.extension}`)
        a.click()
      }
      debugger
    })
  }
  const viewSelectedDocument = async (row) => {
    setPreviewLoading(true)
    await getCaseDocument(row?.id)
      .then((res) => {
        debugger
        console.log(res)
        if (previewModalRef.current) previewModalRef.current.open(res.data.model)
      })
      .finally(() => setPreviewLoading(false))
  }
  const TableActions = () => {
    const ActionsFormatter = useCallback(({ row }) => {
      return (
        <>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div onClick={() => deleteSelectedDocument(row)} style={{ color: 'red' }}>
              <Delete />
            </div>
            <div onClick={() => editSelectedDocument(row)}>
              <Edit />
            </div>
            <div onClick={() => downloadSelectedDocument(row)}>
              <Download />
            </div>
            <div onClick={() => viewSelectedDocument(row)}>
              <Visibility />
            </div>
          </div>
        </>
      )
    }, [])

    return ActionsFormatter
  }
  const actions = React.memo((props) => <DataTypeProvider formatterComponent={TableActions()} {...props} />)
  let columns = useMemo(() => attachmentsTableColumns(intl), [])
  return { columns, intl, caseDocuments, previewLoading, refetch, data, documentId, handleEditSuccess, showDialog, setShowDialog, handleDelete, actions, setCaseNumberID, caseNumberID, resetEditableRow, previewModalRef }
}

export default Logic
