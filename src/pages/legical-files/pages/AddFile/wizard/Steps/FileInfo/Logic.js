import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useIntl } from 'react-intl'
import { useFormikContext } from 'formik'
import dayjs from 'dayjs'
import * as Yup from 'yup'
import { createCaseFIle } from '../../../../../../../services/FilesServices'
import { getFileType, getFileCategory, getAllOfficesBranches, getAllFilesStatuses, getListOfAgainsts, getListOfClients } from '../../../../../../../services/LookupsServices'
import UseFlashMessage from '../../../../../../../utils/hooks/UseFlashMessage'
import useDebouncedFetch from '../../../../../../../utils/hooks/UseDebouncedFetch'

function Logic() {
  const intl = useIntl()
  const locale = intl.locale
  const isEnglish = locale === 'en'
  const [clientInputValue, setClientInputValue] = useState('')
  const debouncedClientValue = useDebouncedFetch(clientInputValue, 500)
  const [againstInputValue, setAgainstInputValue] = useState('')
  const debouncedAgainstValue = useDebouncedFetch(againstInputValue, 500)
  const { addFlashMessage } = UseFlashMessage()
  const formik = useFormikContext()

  const initialValues = {
    clients: formik.values?.clients,
    againsts: formik.values?.againsts,
    fileNumber: formik.values?.fileNumber,
    fileType: formik.values?.fileType,
    fileCategory: formik.values?.fileCategory,
    officeBranch: formik.values?.officeBranch,
    clientFileNumber: formik.values?.clientFileNumber,
    year: formik.values?.year,
    receiveFileDate: formik.values?.receiveFileDate,
    claimValue: formik.values?.claimValue,
    fileStatus: formik.values?.fileStatus,
    caseSummeryAr: formik.values?.caseSummeryAr,
    caseSummeryEn: formik.values?.caseSummeryEn,
    caseMasterId: 1,
  }

  const fetchClients = async (value) => {
    const response = await getListOfClients(value)
    return response.data.models
  }

  const fetchAgainsts = async (value) => {
    const response = await getListOfAgainsts(value)
    return response.data.models
  }

  const { data: clients = [], refetch: refetchClient } = useQuery(['clients', debouncedClientValue], () => fetchClients(debouncedClientValue), {
    enabled: !!debouncedClientValue, // Only fetch when debouncedValue is not empty
  })
  const { data: againsts = [], refetch: refetchAgainst } = useQuery(['againsts', debouncedAgainstValue], () => fetchAgainsts(debouncedAgainstValue), {
    enabled: !!debouncedAgainstValue, // Only fetch when debouncedValue is not empty
    // refetchOnMount: 'always',
  })
  useEffect(() => {
    refetchClient()
    refetchAgainst()
  }, [])

  const { data: fileTypes = [] } = useQuery(`fileTypes`, async () => {
    return await getFileType().then((res) => {
      return res.data.data.models
    })
  })

  // const { data: fileCategories = [] } = useQuery(`fileCategories`, async () => {
  //   return await getFileCategory().then((res) => {
  //     return res.data.data.models
  //   })
  // })

  const { data: getOfficesBranches = [] } = useQuery(`getAllOfficesBranches`, async () => {
    return await getAllOfficesBranches().then((res) => {
      return res.data.models
    })
  })

  const { data: getFilesStatuses = [] } = useQuery(`getFilesStatuses`, async () => {
    return await getAllFilesStatuses().then((res) => {
      return res.data.models
    })
  })

  const validationSchema = Yup.object().shape({
    fileNumber: Yup.string()
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    fileType: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    clients: Yup.array()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
      .min(1, intl.formatMessage({ id: 'VALIDATION.ATLEASTONE' }, { fieldname: intl.formatMessage({ id: 'ADDFILE.CLIENTS' }) })),
    againsts: Yup.array()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
      .min(1, intl.formatMessage({ id: 'VALIDATION.ATLEASTONE' }, { fieldname: intl.formatMessage({ id: 'ADDFILE.AGAINSTS' }) })),
    // fileCategory: Yup.object()
    //   .nullable()
    //   .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    officeBranch: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    year: Yup.string()
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    receiveFileDate: Yup.string()
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    claimValue: Yup.string()
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
      .transform((value) => (!!value ? value : null))
      .matches(/^\d+(?:\.\d+)?$/, intl.formatMessage({ id: 'VALIDATION.DECIMALNUMBER' })),
    fileStatus: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    // clientFileNumber: Yup.string()
    //   .nullable()
    //   .notRequired()
    // .transform((value) => (!!value ? value : null)),
    // .matches(/^\d+$/, intl.formatMessage({ id: 'VALIDATION.NUMBER' })),
    caseSummeryAr: Yup.string()
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    caseSummeryEn: Yup.string()
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
  })
  const createCaseFileMutation = useMutation(
    (payload) => {
      const { clients, againsts, ...rest } = payload
      debugger
      return createCaseFIle(rest)
    },
    {
      onSuccess: (response, payload) => {
        debugger
        formik.setValues({
          ...formik.values,
          fileNumber: payload.caseFileNumber,
          clients: payload.clients,
          againsts: payload.againsts,
          fileType: payload.fileTypeId,
          // fileCategory: payload.fileCategoryId,
          officeBranch: payload.officeBranchId,
          clientFileNumber: payload.clientFileNumber,
          year: dayjs(new Date(payload.year, 0, 1)),
          receiveFileDate: dayjs(new Date(payload.receiveFileDate)),
          claimValue: payload.claimValue,
          fileStatus: payload.fileStatusId,
          caseSummeryAr: payload.caseSubjectAr,
          caseSummeryEn: payload.caseSubjectEN,
          fileId: response.data.model.id,
        })
        addFlashMessage({ type: 'success', message: intl.formatMessage({ id: 'ADD.SUCCESSFULLY.CONFIRMATION' }, { fieldname: intl.formatMessage({ id: 'ADDFILE.FILE' }) }) })
      },
    }
  )

  const onFileInfoSubmit = async (values) => {
    const selectedClientIds = values.clients.map((client) => {
      return {
        id: client.id,
      }
    })
    const selectedAgainstIds = values.againsts.map((against) => {
      return {
        id: against.id,
      }
    })

    try {
      const payload = {
        caseFileNumber: values.fileNumber,
        fileTypeId: values.fileType?.id ?? null,
        // fileCategoryId: values.fileCategory?.id ?? null,
        officeBranchId: values.officeBranch?.id ?? null,
        clientFileNumber: values.clientFileNumber,
        year: values.year ? new Date(values.year).getFullYear() : 0,
        receiveFileDate: values.receiveFileDate,
        claimValue: values.claimValue === '' ? 0 : values.claimValue,
        fileStatusId: values.fileStatus?.id ?? null,
        caseSubjectAr: values.caseSummeryAr,
        caseSubjectEN: values.caseSummeryEn,
        clientIds: selectedClientIds,
        againstIds: selectedAgainstIds,
        clients: values.clients,
        againsts: values.againsts,
      }
      await createCaseFileMutation.mutateAsync(payload)
    } catch (error) {
      console.log(error)
    }
  }

  return { initialValues, fileTypes, getOfficesBranches, getFilesStatuses, onFileInfoSubmit, validationSchema, createCaseFileMutation, clients, setClientInputValue, setAgainstInputValue, againsts, isEnglish, intl }
}

export default Logic
