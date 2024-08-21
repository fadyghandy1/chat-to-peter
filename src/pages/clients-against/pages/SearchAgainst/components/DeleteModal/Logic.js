import { useImperativeHandle, useState } from 'react'
import { useMutation } from 'react-query'
import { useIntl } from 'react-intl'

import { SearchAgainstSlice } from '../../SearchAgainstSlice'
import { deleteOpponent } from '../../../../../../services/OpponentServices'
import UseFlashMessage from '../../../../../../utils/hooks/UseFlashMessage'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

function Logic({ ref, searchRef }) {
  const intl = useIntl()
  const [showDialog, setShowDialog] = useState(false)
  const [selectedAgainstId, setSelectedAgainstId] = useState()
  const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(false)
  const { addFlashMessage } = UseFlashMessage()

  useImperativeHandle(
    ref,
    () => {
      return {
        open: (againstId) => {
          setSelectedAgainstId(againstId)
          setShowDialog(true)
        },
      }
    },
    []
  )

  const DeleteAgainstMutation = useMutation((credentials) => deleteOpponent(credentials), {
    onSuccess: (response) => {
      addFlashMessage({ type: 'success', message: intl.formatMessage({ id: 'DELETE.SUCCESSFULLY.CONFIRMATION' }, { fieldname: intl.formatMessage({ id: 'OPPONENT' }) }) })

      if (searchRef.current) searchRef.current.submitForm()
    },
    onSettled: () => {
      setConfirmButtonDisabled(false)
      setShowDialog(false)
      setSelectedAgainstId()
    },
  })
  const onSubmit = async () => {
    try {
      setConfirmButtonDisabled(true)
      await DeleteAgainstMutation.mutateAsync(selectedAgainstId)
    } catch (error) {
      console.log(error)
    }
  }
  return { onSubmit, showDialog, setShowDialog, confirmButtonDisabled, selectedAgainstId, intl }
}
export default Logic
