import { useState } from 'react'
import * as Yup from 'yup'
import { useIntl } from 'react-intl'
import UseFlashMessage from '../../../../../../../../utils/hooks/UseFlashMessage'
import { without } from '../../../../../../../../utils/common'

const Logic = ({ setFieldValue, values, editableRow, setContacts }) => {
  // console.log(row, 'row fadyyyyy')
  const [isLoading, setIsLoading] = useState(false)
  const intl = useIntl()
  // const state = useSelector((state) => {
  //   const { contactsValues } = state.addClient
  //   return { contactsValues }
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
  const validationSchema = Yup.object()
    .shape({
      contactName: Yup.string()
        .trim(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
        .strict(true)
        .required('This field is required')
        .matches(/^[a-zA-Z\s\u0600-\u06FF]+$/, 'Only Arabic, English characters, and spaces allowed'),
      contactMobile: Yup.string()
        // .required('This field is required')
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
      contactPhone: Yup.string()
        .notRequired()
        .nullable()
        .transform((value) => (!!value ? value : null))
        .matches(/^[+-]?\d+$/, intl.formatMessage({ id: 'VALIDATION.PHONE' }, { fieldname: intl.formatMessage({ id: 'ADDOPPONENT.TELEPHONE' }) }))
        .min(12, intl.formatMessage({ id: 'VALIDATION.PHONELENGTH' }, { fieldname: intl.formatMessage({ id: 'ADDOPPONENT.TELEPHONE' }), length: 12 })),
      contactEmail: Yup.string()
        .email(intl.formatMessage({ id: 'VALIDATION.EMAILFORMAT' }))
        .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
      // .notRequired()
      // .nullable() // Allows the field to be empty
      // .transform((value) => (!!value ? value : null))
      // .when('isNotEmpty', {
      //   // Apply validation conditionally when not empty
      //   is: (value) => value !== null && value !== '',
      //   then: (schema) => schema.email('Invalid email format'),
      // }),
    })
    .atLeastOneRequired(['contactMobile', 'contactPhone'], intl.formatMessage({ id: 'VALIDATION.ONE_FIELD_REQUIRED' }))

  const constactInputsInitials = {
    id: editableRow?.row?.id || null,
    contactName: editableRow?.row?.contactName || '',
    contactJob: editableRow?.row?.contactJob || '',
    contactPhone: editableRow?.row?.contactPhone || '',
    contactMobile: editableRow?.row?.contactMobile || '',
    contactEmail: editableRow?.row?.contactEmail || '',
    index: editableRow?.index || null,
    hasPowerOfAttorny: editableRow?.row?.hasPowerOfAttorny ?? false,
    allowContact: editableRow?.row?.allowContact ?? false,
  }

  const { addFlashMessage } = UseFlashMessage()

  const onContactSubmit = (values, { resetForm }) => {
    setContacts(values)
    resetForm()
  }

  return { onContactSubmit, addFlashMessage, constactInputsInitials, isLoading, validationSchema, intl }
}

export default Logic
