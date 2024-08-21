import React, { useCallback, useMemo, useRef, useState } from 'react'
import { stagesTableColumns } from '../../../constants'
import { useIntl } from 'react-intl'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { deleteStage, getAllStages, getStage } from '../../../../../../../services/StageServices'
import UseFlashMessage from '../../../../../../../utils/hooks/UseFlashMessage'
import { QUERY_KEY } from '../../../../../../../utils/constants/static'

function Logic(values, setFieldValue) {
  console.log(values, 'fvvvvvvv')
  // const [editableRow, setEditableRow] = useState({ row: null, id: null })
  const [stageId, setStageId] = useState('')
  const [deletedRow, setDeletedRow] = useState()
  const [editabledRow, setEditabledRow] = useState({})
  const [showDialog, setShowDialog] = useState(false)
  // const [expand, setExpand] = useState(false)
  const queryClient = useQueryClient()
  const formRef = useRef()

  const intl = useIntl()
  const { addFlashMessage } = UseFlashMessage()

  const { data: stages = [], refetch } = useQuery(QUERY_KEY['ADDFILE-STAGES'], async () => {
    return await getAllStages({ caseMasterId: values.fileId }).then((res) => {
      res.data.models === null ? setFieldValue('stages', []) : setFieldValue('stages', res.data.models)
      return res.data.models
    })
  })

  const fetchEditableStage = async ({ queryKey }) => {
    const [_key, params] = queryKey
    return await getStage(params).then((res) => {
      setEditabledRow(res.data.model)
      debugger
      return res.data.model
    })
  }

  const resetEditableRow = () => {
    // console.log('resetEditableRow', ' attachment logic')
    queryClient.setQueryData(QUERY_KEY['ADDFILE-EDITABLESTAGE'], null)
    setEditabledRow({})
    setStageId()
  }
  ///////
  const { data = { clientIds: values.clients, againstIds: values.againsts } } = useQuery([QUERY_KEY['ADDFILE-EDITABLESTAGE'], stageId], fetchEditableStage, {
    enabled: !!stageId, // This query will not run until `stageId` is truthy
  })
  const editSelectedDocument = async (row, id) => {
    if (formRef.current) {
      formRef.current?.sendDataToParent(true)
      console.log(formRef.current, 'fgggdtdfsdrstr')
    }
    // setExpand(true)

    debugger
    setStageId(row?.id)
  }
  const deleteStageMutaion = useMutation((payload) => deleteStage(payload), {
    onSuccess: (res) => {
      addFlashMessage({ type: 'success', message: intl.formatMessage({ id: 'DELETE.SUCCESSFULLY.CONFIRMATION' }, { fieldname: intl.formatMessage({ id: 'ADDFILE.STAGE' }) }) })
      resetEditableRow()
      refetch()
      // setStages(response.data.models)
      setShowDialog(false)
    },
    onSettled: () => {
      setShowDialog(false)
      setDeletedRow()
    },
  })
  const handleEditSuccess = useCallback(() => {
    setEditabledRow({})
    setStageId()
    refetch()
  }, [refetch])

  const handleDelete = async () => {
    try {
      await deleteStageMutaion.mutateAsync(deletedRow.id)
    } catch (e) {
      console.log(e)
    }
  }
  const deleteSelectedDocument = (row, index) => {
    setDeletedRow(row)
    setShowDialog(true)
  }
  const actions = {
    deleteSelectedDocument: deleteSelectedDocument,
    editSelectedDocument: editSelectedDocument,
  }
  let columns = useMemo(() => stagesTableColumns(actions, intl), [])

  return { columns, intl, stages, refetch, data, stageId, handleEditSuccess, showDialog, setShowDialog, handleDelete, editabledRow, resetEditableRow, values, formRef }
}

export default Logic
