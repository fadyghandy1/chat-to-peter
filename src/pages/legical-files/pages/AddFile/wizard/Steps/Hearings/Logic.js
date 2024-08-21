import React, { useCallback, useMemo, useState, useRef } from 'react'
import { hearingsTableColumns } from '../../../constants'
import { useIntl } from 'react-intl'
import { deleteHearing, gethearingByCaseFileNumber, gethearingByHearingId } from '../../../../../../../services/HearingServices'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { QUERY_KEY } from '../../../../../../../utils/constants/static'
import UseFlashMessage from '../../../../../../../utils/hooks/UseFlashMessage'

function Logic(values, setFieldValue) {
  const [hearingId, setHearingId] = useState()
  const [showDialog, setShowDialog] = useState(false)
  const [deletedRow, setDeletedRow] = useState()
  const { addFlashMessage } = UseFlashMessage()
  const formRef = useRef()

  const queryClient = useQueryClient()

  const intl = useIntl()

  const { data: hearings = [], refetch } = useQuery(QUERY_KEY['ADDFILE-HEARINGS'], async () => {
    return await gethearingByCaseFileNumber(values.fileNumber).then((res) => {
      return res.data.models
    })
  })
  const fetchEditablehearing = async ({ queryKey }) => {
    const [_key, params] = queryKey

    return await gethearingByHearingId(params).then((res) => {
      return res.data.model
    })
  }

  const { data } = useQuery([QUERY_KEY['ADDFILE-EDITABLEHEARING'], hearingId], fetchEditablehearing, {
    enabled: !!hearingId, // This query will not run until `hearingId` is truthy
  })
  const deleteHearingMutation = useMutation((payload) => deleteHearing(payload), {
    onSuccess: (response) => {
      addFlashMessage({ type: 'success', message: intl.formatMessage({ id: 'DELETE.SUCCESSFULLY.CONFIRMATION' }, { fieldname: intl.formatMessage({ id: 'ADDFILE.HEARING' }) }) })
      resetEditableRow()
      refetch()
    },
    onSettled: () => {
      setShowDialog(false)
      setDeletedRow()
    },
  })
  const handleEditSuccess = useCallback(() => {
    setHearingId()
    refetch()
  }, [])

  const editSelectedHearing = (row) => {
    setHearingId(row?.id)
    if (formRef.current) {
      formRef.current?.sendDataToParent(true)
      console.log(formRef.current, 'fgggdtdfsdrstr')
    }
  }

  const resetEditableRow = () => {
    // console.log('resetEditableRow', ' attachment logic')
    queryClient.setQueryData(QUERY_KEY['ADDFILE-EDITABLEHEARING'], null)
    setHearingId()
  }

  const deleteSelectedDocument = (row, index) => {
    setDeletedRow(row)
    setShowDialog(true)
  }
  const handleDelete = async () => {
    try {
      await deleteHearingMutation.mutateAsync(deletedRow?.id)
    } catch (e) {
      console.log(e)
    }
  }
  const actions = {
    deleteSelectedDocument: deleteSelectedDocument,
    editSelectedHearing: editSelectedHearing,
  }
  let columns = useMemo(() => hearingsTableColumns(actions, intl), [])

  return { columns, intl, hearings, refetch, data, hearingId, handleEditSuccess, showDialog, setShowDialog, handleDelete, resetEditableRow, formRef }
}

export default Logic
