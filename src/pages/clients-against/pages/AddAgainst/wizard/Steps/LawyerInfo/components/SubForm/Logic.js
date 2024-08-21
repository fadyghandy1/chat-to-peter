import * as Yup from 'yup'
import UseFlashMessage from '../../../../../../../../../utils/hooks/UseFlashMessage'
import { useIntl } from 'react-intl'

const Logic = (setLawyers, row) => {
  const intl = useIntl()
  const lawyerInputsInitials = {
    name: row?.name || '',
    mobileNumber: row?.mobileNumber || '',
    phoneNumber: row?.phoneNumber || '',
    email: row?.email || '',
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
      .strict(true)
      .nullable(),
    // .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
    mobileNumber: Yup.string()
      .notRequired()
      .nullable()
      .transform((value) => (!!value ? value : null))
      .test(
        // Custom validation rule for format
        'phone-format',
        intl.formatMessage({ id: 'VALIDATION.MOBILE' }, { fieldname: intl.formatMessage({ id: 'ADDOPPONENT.MOBILE' }) }),
        (value) => {
          if (value) {
            return (value?.startsWith('+') || value?.startsWith('00')) && /^\d+$/.test(value.substring(2))
          }
          return true
        }
      )
      .min(13, intl.formatMessage({ id: 'VALIDATION.PHONELENGTH' }, { fieldname: intl.formatMessage({ id: 'ADDOPPONENT.MOBILE' }), length: 13 })),
    phoneNumber: Yup.string()
      .notRequired()
      .nullable()
      .transform((value) => (!!value ? value : null))
      .matches(/^[+-]?\d+$/, intl.formatMessage({ id: 'VALIDATION.PHONE' }, { fieldname: intl.formatMessage({ id: 'ADDOPPONENT.PHONE' }) }))
      .min(12, intl.formatMessage({ id: 'VALIDATION.PHONELENGTH' }, { fieldname: intl.formatMessage({ id: 'ADDOPPONENT.PHONE' }), length: 12 })),
    email: Yup.string().email(intl.formatMessage({ id: 'VALIDATION.EMAILFORMAT' })),
  })
  const { addFlashMessage } = UseFlashMessage()

  const onLawyerSubmit = (values, { resetForm }) => {
    if (!values.name && !values.mobileNumber && !values.email && !values.phoneNumber) {
      addFlashMessage({ type: 'error', message: intl.formatMessage({ id: 'VALIDATION.LAWYERVALIDATION' }) })
    } else {
      setLawyers(values)
      resetForm()
    }
  }
  return { onLawyerSubmit, addFlashMessage, lawyerInputsInitials, validationSchema }
}
export default Logic
