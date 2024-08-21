import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useMutation, useQuery } from 'react-query'
import { addTimeSheetWithoutFile, addTimeSheetWithFile, editTimeSheet } from '../../../../../../services/TimeSheetServices'
import { file } from '../../constants'
import UseFlashMessage from '../../../../../../utils/hooks/UseFlashMessage'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { QUERY_KEY } from '../../../../../../utils/constants/static'
import { getTaskStatus, getTaskType, getStaffData } from '../../../../../../services/LookupsServices'
import { getAllCasesByFileNumber } from '../../../../../../services/StageServices'
import { modes } from '../../../../../../components/common/wizard'

function Logic({ timesheetId, mode, initialValues, handleOnUpdated }) {
  const [caseByFileNum, setCaseByFileNum] = useState([])
  const intl = useIntl()
  const { addFlashMessage } = UseFlashMessage()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const { data: employees = [] } = useQuery(QUERY_KEY['ADDTIMESHEET-EMPLOYEES'], async () => {
    return await getStaffData().then((res) => {
      return res.data.models
    })
  })

  const { data: taskTypes = [] } = useQuery(QUERY_KEY['ADDTIMESHEET-TASKTYPES'], async () => {
    return await getTaskType().then((res) => {
      return res.data.data.models
    })
  })

  const { data: taskStatus = [] } = useQuery(QUERY_KEY['ADDTIMESHEET-TASKSTATUS'], async () => {
    return await getTaskStatus().then((res) => {
      return res.data.data.models
    })
  })

  const getAllCasesByFileNumberMutation = useMutation((payload) => getAllCasesByFileNumber(payload), {
    onSuccess: (response) => {
      setCaseByFileNum(response.data.models)
    },
    onError: () => setCaseByFileNum([]),
  })

  const addTimeSheetWithFileMutation = useMutation((payload) => addTimeSheetWithFile(payload), {
    onSuccess: (response) => {
      navigate('/', { replace: true })
      addFlashMessage({ type: 'success', message: intl.formatMessage({ id: 'ADD.SUCCESSFULLY.CONFIRMATION' }, { fieldname: intl.formatMessage({ id: 'MENU.TIMESHEET' }) }) })
    },

    onSettled: () => {
      setIsLoading(false)
    },
  })

  const addTimeSheetWithoutFileMutation = useMutation((payload) => addTimeSheetWithoutFile(payload), {
    onSuccess: (response) => {
      navigate('/', { replace: true })
      addFlashMessage({ type: 'success', message: intl.formatMessage({ id: 'ADD.SUCCESSFULLY.CONFIRMATION' }, { fieldname: intl.formatMessage({ id: 'MENU.TIMESHEET' }) }) })
    },
    onSettled: () => {
      setIsLoading(false)
    },
  })
  const editTimeSheetMutation = useMutation((payload) => editTimeSheet(payload, timesheetId), {
    onSuccess: (response) => {
      handleOnUpdated()

      addFlashMessage({ type: 'success', message: intl.formatMessage({ id: 'EDIT.SUCCESSFULLY.CONFIRMATION' }, { fieldname: intl.formatMessage({ id: 'MENU.TIMESHEET' }) }) })
    },
    onSettled: () => {
      setIsLoading(false)
    },
  })
  const getAllCasesByFileNumberHandler = async (payload) => {
    try {
      await getAllCasesByFileNumberMutation.mutateAsync(payload)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (initialValues.fileNo) {
      getAllCasesByFileNumberHandler(initialValues.fileNo)
    }
  }, [])
  const handleAddTimesheet = async (values) => {
    let payload = {
      description: values.taskDesc,
      wanted: values.dueDate,
      staffId: values.employee?.id,
      typeId: values.taskType?.id,
      statusId: values.taskStatus?.id,
    }
    if (values.file === file.withFile) {
      payload = {
        task: payload,
        taskCases: {
          caseFileNumber: values.fileNo,
          caseDetailsId: values.caseNo?.id,
        },
      }
      await addTimeSheetWithFileMutation.mutateAsync(payload)
    } else {
      await addTimeSheetWithoutFileMutation.mutateAsync(payload)
    }
  }
  const handleEditTimesheet = async (values) => {
    let payload = {
      description: values.taskDesc,
      wanted: values.dueDate,
      staffId: values.employee?.id,
      typeId: values.taskType?.id,
      statusId: values.taskStatus?.id,
      caseFileNumber: values.fileNo,
      caseDetailsId: values.caseNo?.id,
    }

    await editTimeSheetMutation.mutateAsync(payload)
  }
  const onSubmit = async (values, { resetForm }) => {
    try {
      setIsLoading(true)
      if (mode === modes.ADD) {
        handleAddTimesheet(values)
      } else if (mode === modes.EDIT) {
        handleEditTimesheet(values)
      }
    } catch (error) {
      // addFlashMessage({ type: 'error', message: 'eror'})
      console.log(error)
    }
  }

  const validationSchema = Yup.object().shape({
    fileNo: Yup.string()
      .nullable()
      .when('file', {
        is: (value) => value === file.withFile,
        then: (schema) => schema.required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
      }),
    employee: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    taskType: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    taskStatus: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
  })
  return { intl, employees, taskTypes, taskStatus, getAllCasesByFileNumberHandler, caseByFileNum, onSubmit, validationSchema, isLoading }
}

export default Logic
