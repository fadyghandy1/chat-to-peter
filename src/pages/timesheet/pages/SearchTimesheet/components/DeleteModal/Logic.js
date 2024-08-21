import React, { useImperativeHandle, useState } from 'react'
import { useMutation } from 'react-query'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { deleteTimeSheet } from '../../../../../../services/TimeSheetServices'
import UseFlashMessage from '../../../../../../utils/hooks/UseFlashMessage'
import { SearchTimesheetSlice } from '../../SearchTimesheetSlice'

function Logic({ ref, searchRef }) {
  const intl = useIntl()
  const [showDialog, setShowDialog] = useState(false)
  const [selectedTimesheetID, setSelectedTimesheetID] = useState()
  const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(false)
  const state = useSelector((state) => {
    const { SearchTimesheetResult } = state.SearchTimesheet
    return { SearchTimesheetResult }
  }, shallowEqual)

  const dispatch = useDispatch()
  const { update } = SearchTimesheetSlice.actions
  const { addFlashMessage } = UseFlashMessage()

  useImperativeHandle(
    ref,
    () => {
      return {
        open: (timeID) => {
          setSelectedTimesheetID(timeID)
          setShowDialog(true)
        },
      }
    },
    []
  )

  const DeleteTimeMutation = useMutation((paylood) => deleteTimeSheet(paylood), {
    onSuccess: (response) => {
      // const searchResultWithoutDeleted = state.SearchTimesheetResult.filter((timesheet) => timesheet.taskId !== selectedTimesheetID)

      addFlashMessage({ type: 'success', message: intl.formatMessage({ id: 'DELETE.SUCCESSFULLY.CONFIRMATION' }, { fieldname: intl.formatMessage({ id: 'MENU.TIMESHEET' }) }) })
      if (searchRef.current) searchRef.current.submitForm()
    },
    onSettled: () => {
      setConfirmButtonDisabled(false)
      setShowDialog(false)
      setSelectedTimesheetID()
    },
  })
  const onSubmit = async () => {
    try {
      setConfirmButtonDisabled(true)
      await DeleteTimeMutation.mutateAsync(selectedTimesheetID)
    } catch (error) {
      console.log(error)
    }
  }
  return { onSubmit, showDialog, setShowDialog, confirmButtonDisabled, selectedTimesheetID, intl }
}

export default Logic
