import { useQuery } from 'react-query'
import { useIntl } from 'react-intl'
import * as Yup from 'yup'
import { QUERY_KEY } from '../../../../../../utils/constants/static'
import { getNationality } from '../../../../../../services/LookupsServices'
import { without } from '../../../../../../utils/common'

function Logic({ searchOpponentMutation }) {
  const intl = useIntl()
  const locale = intl.locale
  const isEnglish = locale === 'en'
  const { data: nationalities = [] } = useQuery(QUERY_KEY.nationalities, async () => {
    return await getNationality().then((res) => {
      return res.data.data.models
    })
  })
  const initialValues = {
    name: '',
    phone: '',
    mobile: '',
    nationality: null,
    localIdentificationNumber: '',
    passportNumber: '',
    email: '',
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

  const searchOpponentSchema = () =>
    Yup.object()
      .shape({
        name: Yup.string().trim(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
        // .strict(true),
        phone: Yup.string().trim(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
        // .strict(true),
        mobile: Yup.string().trim(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
        // .strict(true),
        nationality: Yup.object().nullable().notRequired(),
        // .strict(true),
        localIdentificationNumber: Yup.string().trim(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
        // .strict(true),
        passportNumber: Yup.string().trim(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
        // .strict(true),
        email: Yup.string().trim(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
        // .strict(true),
      })
      .atLeastOneRequired(['name', 'phone', 'mobile', 'nationality', 'localIdentificationNumber', 'passportNumber', 'email'], intl.formatMessage({ id: 'VALIDATION.ONE_FIELD_REQUIRED' }))

  const onSubmit = async (values) => {
    debugger
    try {
      await searchOpponentMutation.mutateAsync({
        name: values.name.trim() || null,
        mobileNumber: values.mobile.trim() || null,
        phoneNumber: values.phone.trim() || null,
        email: values.email.trim() || null,
        passportId: values.passportNumber.trim() || null,
        localIdentificationNumber: values.localIdentificationNumber.trim() || null,
        nationalityId: values.nationality?.id || null,
      })
    } catch (error) {
      console.log(error)
    }
  }
  return { onSubmit, initialValues, nationalities, searchOpponentSchema, isEnglish, intl }
}

export default Logic
