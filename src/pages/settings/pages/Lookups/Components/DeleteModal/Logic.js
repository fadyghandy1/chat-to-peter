import React, { useImperativeHandle, useState } from 'react'
import { useMutation } from 'react-query'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
// import { SearchAgainstSlice } from '../../SearchAgainstSlice'
import { deleteLookups } from '../../../../../../services/LookupsServices'
import UseFlashMessage from '../../../../../../utils/hooks/UseFlashMessage'
// import { SearchClientSlice } from '../../SearchClientSlice'
function Logic({ ref, getMasterLookupsMutation }) {
  const intl = useIntl()
  const [showDialog, setShowDialog] = useState(false)
  const [row, setRow] = useState()
  const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(false)

  // const state = useSelector((state) => {
  //   const { SearchClientResult } = state.SearchClient
  //   return { SearchClientResult }
  // }, shallowEqual)

  const dispatch = useDispatch()
  // const { update } = SearchClientSlice.actions
  const { addFlashMessage } = UseFlashMessage()

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

  const DeleteLookupMutation = useMutation((payload) => deleteLookups(payload), {
    onSuccess: async (response) => {
      addFlashMessage({ type: 'success', message: intl.formatMessage({ id: 'DELETE.SUCCESSFULLY.CONFIRMATION' }, { fieldname: intl.formatMessage({ id: 'CLIENT' }) }) })
      await getMasterLookupsMutation.mutateAsync(row.masterCodeId)
    },
    onSettled: () => {
      setConfirmButtonDisabled(false)
      setShowDialog(false)
      setRow()
    },
  })
  const onSubmit = async () => {
    try {
      setConfirmButtonDisabled(true)
      await DeleteLookupMutation.mutateAsync(row.id)
    } catch (error) {
      console.log(error)
    }
  }
  return { onSubmit, showDialog, setShowDialog, confirmButtonDisabled, intl }
}

export default Logic
