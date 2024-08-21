import React, { useImperativeHandle, useState } from 'react'
import { useMutation } from 'react-query'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

// import { SearchAgainstSlice } from '../../SearchAgainstSlice'
import { deleteClient } from '../../../../../../services/ClientServices'
import UseFlashMessage from '../../../../../../utils/hooks/UseFlashMessage'
import { SearchClientSlice } from '../../SearchClientSlice'

function Logic({ ref, searchRef }) {
  const intl = useIntl()
  const [showDialog, setShowDialog] = useState(false)
  const [selectedClientID, setSelectedClientID] = useState()
  const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(false)

  const state = useSelector((state) => {
    const { SearchClientResult } = state.SearchClient
    return { SearchClientResult }
  }, shallowEqual)

  const dispatch = useDispatch()
  const { update } = SearchClientSlice.actions
  const { addFlashMessage } = UseFlashMessage()

  useImperativeHandle(
    ref,
    () => {
      return {
        open: (clientID) => {
          setSelectedClientID(clientID)
          setShowDialog(true)
        },
      }
    },
    []
  )

  const DeleteClientMutation = useMutation((credentials) => deleteClient(credentials), {
    onSuccess: (response) => {
      if (searchRef.current) searchRef.current.submitForm()

      addFlashMessage({ type: 'success', message: intl.formatMessage({ id: 'DELETE.SUCCESSFULLY.CONFIRMATION' }, { fieldname: intl.formatMessage({ id: 'CLIENT' }) }) })
    },
    onSettled: () => {
      setConfirmButtonDisabled(false)
      setShowDialog(false)
      setSelectedClientID()
    },
  })
  const onSubmit = async () => {
    try {
      setConfirmButtonDisabled(true)
      await DeleteClientMutation.mutateAsync(selectedClientID)
    } catch (error) {
      console.log(error)
    }
  }
  return { onSubmit, showDialog, setShowDialog, confirmButtonDisabled, selectedClientID, intl }
}

export default Logic
