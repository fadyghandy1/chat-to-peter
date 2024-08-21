import { useQuery } from 'react-query'
import { useIntl } from 'react-intl'
import * as Yup from 'yup'
import { getBranch, getNationality } from '../../../../../../services/LookupsServices'
import { QUERY_KEY } from '../../../../../../utils/constants/static'
import { without } from '../../../../../../utils/common'

function Logic({ searchClientMutation }) {
  const intl = useIntl()
  const locale = intl.locale
  const isEnglish = locale === 'en'

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

  const { data: branches = [] } = useQuery(QUERY_KEY['SEARCH-CLIENT-BRANCHES'], async () => {
    return await getBranch().then((res) => {
      return res.data.data.models
    })
  })

  const { data: nationalities = [] } = useQuery(QUERY_KEY['SEARCH-CLIENT-NATIONALITIES'], async () => {
    return await getNationality().then((res) => {
      return res.data.data.models
    })
  })

  const searchClientSchema = () =>
    Yup.object()
      .shape({
        name: Yup.string().trim(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
        // .strict(true),
        phoneNumber: Yup.string().trim(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
        // .strict(true),
        mobileNumber: Yup.string().trim(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
        // .strict(true),
        nationality: Yup.object().nullable().notRequired(),
        // .strict(true),
        branch: Yup.object().nullable().notRequired(),
        // .strict(true),
        localIdentificationNumber: Yup.string().trim(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
        // .strict(true),
        passportNumber: Yup.string().trim(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
        // .strict(true),
        email: Yup.string().trim(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
        // .strict(true),
      })
      .atLeastOneRequired(['name', 'phoneNumber', 'mobileNumber', 'nationality', 'branch', 'localIdentificationNumber', 'passportNumber', 'email'], intl.formatMessage({ id: 'VALIDATION.ONE_FIELD_REQUIRED' }))

  const onSubmit = async (values) => {
    try {
      const response = await searchClientMutation.mutateAsync({
        name: values.name?.trim() === '' ? null : values.name,
        clientName: values.clientName?.trim() === '' ? null : values.clientName,
        phoneNumber: values.phoneNumber?.trim() === '' ? null : values.phoneNumber,
        mobileNumber: values.mobileNumber?.trim() === '' ? null : values.mobileNumber,
        nationalityId: values.nationality?.id,
        branchId: values.branch?.id,
        localIdentificationNumber: values.localIdentificationNumber?.trim() === '' ? null : values.localIdentificationNumber,
        passportNumber: values.passportNumber?.trim() === '' ? null : values.passportNumber,
        email: values.email?.trim() === '' ? null : values.email,
      })
      if (response.status === 200) {
        // resetClinetInfo()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return { onSubmit, branches, nationalities, searchClientSchema, isEnglish, intl }
}

export default Logic
