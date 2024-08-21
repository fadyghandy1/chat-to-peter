import { useQuery } from 'react-query'
import { useIntl } from 'react-intl'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import { QUERY_KEY } from '../../../../../../utils/constants/static'
import { getNationality } from '../../../../../../services/LookupsServices'
import { without } from '../../../../../../utils/common'
import { getFileType, getAllOfficesBranches, getAllFilesStatuses, getAllCourts } from '../../../../../../services/LookupsServices'

function Logic({ searchFileMutation }) {
  const intl = useIntl()
  const locale = intl.locale
  const isEnglish = locale === 'en'

  const initialValues = {
    fileNumber: '',
    caseNumber: '',
    caseSummeryAr: '',
    caseSummeryEn: '',
    year: null,
    fileType: null,
    // fileCategory: null,
    officeBranch: null,
    fileStatus: null,
    client: '',
    against: '',
    court: null,
  }

  Yup.addMethod(Yup.object, 'atLeastOneRequired', function atLeastOneRequired(list, message) {
    return this.shape(
      list.reduce((acc, field) => {
        return {
          ...acc,
          [field]: this.fields[field].when(without(list, field), {
            is: (...values) => !values.some((item) => item),
            then: () => this.fields[field].required(message),
          }),
        }
      }, {}),
      list.reduce((acc, item, idx, all) => [...acc, ...all.slice(idx + 1).map((i) => [item, i])], [])
    )
  })

  const searchFileSchema = () =>
    Yup.object()
      .shape({
        fileNumber: Yup.string()
          .nullable()
          .trim(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
        caseNumber: Yup.string().trim(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
        client: Yup.string().trim(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
        against: Yup.string().trim(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
        caseSummeryAr: Yup.string()
          .nullable()
          .trim(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
        caseSummeryEn: Yup.string()
          .nullable()
          .trim(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
        year: Yup.string().nullable(),
        fileType: Yup.object().nullable(),
        // fileCategory: Yup.object().nullable(),
        officeBranch: Yup.object().nullable(),
        fileStatus: Yup.object().nullable(),
        court: Yup.object().nullable(),
        // .strict(true),
      })
      .atLeastOneRequired(['fileNumber', 'caseNumber', 'caseSummeryAr', 'caseSummeryEn', 'year', 'fileType', 'officeBranch', 'fileStatus', 'client', 'against', 'court'], intl.formatMessage({ id: 'VALIDATION.ONE_FIELD_REQUIRED' }))

  const onSubmit = async (values) => {
    debugger
    try {
      await searchFileMutation.mutateAsync({
        caseFileNumber: values.fileNumber?.trim() || null,
        caseNumber: values.caseNumber?.trim() || null,
        clientName: values.client?.trim() || null,
        againstName: values.against?.trim() || null,
        caseSubjectAr: values.caseSummeryAr?.trim() || null,
        caseSubjectEN: values.caseSummeryEn?.trim() || null,
        year: values.year ? new Date(values.year).getFullYear() : null,
        fileStatus: values.fileStatus?.id || null,
        fileType: values.fileType?.id || null,
        officeBranch: values.officeBranch?.id || null,
        // fileCategory: values.fileCategory?.id || null,
        court: values.court?.id || null,
      })
    } catch (error) {
      console.log(error)
    }
  }
  const { data: getFilesStatuses = [] } = useQuery(`getFilesStatuses`, async () => {
    return await getAllFilesStatuses().then((res) => {
      return res.data.models
    })
  })
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
  const { data: courts = [] } = useQuery(`courts`, async () => {
    return await getAllCourts().then((res) => {
      return res.data.models
    })
  })

  const { data: getOfficesBranches = [] } = useQuery(`getAllOfficesBranches`, async () => {
    return await getAllOfficesBranches().then((res) => {
      return res.data.models
    })
  })

  return { onSubmit, initialValues, fileTypes, courts, getOfficesBranches, getFilesStatuses, searchFileSchema, isEnglish, intl }
}

export default Logic
