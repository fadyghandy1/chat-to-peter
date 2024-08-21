import { useMutation, useQuery } from 'react-query'
import { QUERY_KEY } from '../../../../../../utils/constants/static'
import { getAllCaseTypes, getAllCourts } from '../../../../../../services/LookupsServices'
import { generateExcel, getColumnNames } from '../../../../../../services/ReportServices'
import { useRef } from 'react'
import { useIntl } from 'react-intl'
import UseFlashMessage from '../../../../../../utils/hooks/UseFlashMessage'
import printJS from 'print-js'

function Logic() {
  const formRef = useRef()
  const intl = useIntl()
  const { addFlashMessage } = UseFlashMessage()

  const { data: courts = [] } = useQuery(QUERY_KEY['CASEREPORTS-COURT'], async () => {
    return await getAllCourts().then((res) => {
      return res.data.models
    })
  })

  const { data: caseTypes = [] } = useQuery(QUERY_KEY['CASEREPORTS-CASETYPE'], async () => {
    return await getAllCaseTypes().then((res) => {
      return res.data.models
    })
  })
  const { data: columns = [] } = useQuery(QUERY_KEY['CASEREPORTS-COLUMNS'], async () => {
    return await getColumnNames().then((res) => {
      return res.data
    })
  })

  const generateReportMutation = useMutation((payload) => generateExcel(payload), {
    onSuccess: async (response) => {
      debugger
      if (formRef.current) {
        formRef.current.resetForm()
      }

      if (response.data?.model?.fileContent) {
        addFlashMessage({ type: 'success', message: intl.formatMessage({ id: 'GENERATE.SUCCESSFULLY.REPORT' }) })
        var a = document.createElement('a')
        a.href = `data:application/vnd.ms-excel;base64, ${response.data.model.fileContent}`
        const extension = response.data.model?.extension || '.xlsx'
        a.setAttribute('download', `report-${Date.now()}${extension}`)
        a.click()
      } else {
        addFlashMessage({
          type: 'warning',
          message: intl.formatMessage({ id: 'WARNING.NORESULT' }),
        })
      }
    },
  })
  const onSubmit = async (values) => {
    debugger
    try {
      await generateReportMutation.mutateAsync({
        clientName: values.clientname.trim() || null,
        againstName: values.againstname.trim() || null,
        fileNumber: values.filenumber.trim() || null,
        court: values.court?.descriptionEn || null,
        caseStatus: values.caseType?.descriptionEn || null,
        from: values.fromDate,
        to: values.toDate,
        columnFilter: values.columnFilter.map((e) => {
          return { ...e, isChecked: true }
        }),
      })
    } catch (error) {
      console.log(error)
    }
  }

  return { onSubmit, courts, caseTypes, columns, formRef, generateReportMutation }
}

export default Logic
