import { searchTableColumns } from '../../constants'
import { useIntl } from 'react-intl'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useMutation } from 'react-query'
import { shallowEqual, useSelector } from 'react-redux'
import { getTimesheetById } from '../../../../../../services/TimeSheetServices'
import { file } from '../../../AddTimesheet/constants'

function Logic(searchRef) {
  const intl = useIntl()
  const [timesheet, setTimesheet] = useState()
  const [expand, setExpand] = useState(true)
  // const state = queryClient.getQueryState({ queryKey: 'todos' })
  const state = useSelector((state) => {
    const { SearchTimesheetResult } = state.SearchTimesheet
    return { SearchTimesheetResult }
  }, shallowEqual)
  const DeleteModalRef = useRef()

  const getTimesheetMutation = useMutation((taskId) => getTimesheetById(taskId), {
    onSuccess: (response) => {
      const data = response.data.model
      debugger
      setTimesheet(data)
    },
    onError: (err) => {
      setTimesheet()
    },
  })

  const editTimesheet = async (row) => {
    try {
      setExpand(false)
      setTimesheet()
      await getTimesheetMutation.mutateAsync(row.taskId)
    } catch (error) {
      // addFlashMessage({ type: 'error', message: 'eror'})
      console.log(error)
    }
  }
  const deleteTimesheet = (row) => {
    debugger
    if (DeleteModalRef.current) DeleteModalRef.current.open(row.taskId)
  }
  const handleOnUpdated = useCallback(() => {
    setTimesheet()
    if (searchRef.current) searchRef.current.submitForm()
  }, [])

  const actions = {
    deleteTimesheet: deleteTimesheet,
    editTimesheet: editTimesheet,
  }

  let columns = useMemo(() => searchTableColumns(actions, intl), [])
  console.log(timesheet)
  const initialValues = {
    file: timesheet?.caseFileNumber ? file.withFile : file.withoutFile,
    fileNo: timesheet?.caseFileNumber || '',
    caseNo: timesheet?.caseNumberId || null,
    employee: timesheet?.staffId || null,
    dueDate: timesheet?.wanted || null,
    taskType: timesheet?.type?.id || null,
    taskStatus: timesheet?.status?.id || null,
    taskDesc: timesheet?.description || '',
  }

  return { columns, state, DeleteModalRef, expand, setExpand, timesheet, getTimesheetMutation, initialValues, handleOnUpdated }
}

export default Logic
