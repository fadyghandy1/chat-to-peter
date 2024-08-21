import * as Yup from 'yup'
import { generatePassword, without } from '../../../../../utils/common'

export const initialValues = {
  clientArName: '',
  clientEnName: '',
  branchId: null,
  telephoneNumber: '',
  fax: '',
  mobileNumber: '',
  nationalityId: null,
  postalCode: '',
  cityId: '',
  street: '',
  apartmentNumber: '',
  buildingNumber: '',
  email: '',
  email2: '',
  clientTypeId: null,
  valueOfWorkingHour: '',
  referenceNumber: '',
  localIdentificationNumber: '',
  passportNumber: '',
  address: '',
  credentialUserName: '',
  credentialPassword: generatePassword(),
  attachments: [],
  contacts: [],
  company: null,
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
export const clientDetailsValidateSchema = (intl) =>
  Yup.object()
    .shape({
      clientArName: Yup.string()
        .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
        .matches(/^[\u0600-\u06FF0-9 ]+$/, intl.formatMessage({ id: 'VALIDATION.ARABICCHAR' }))
        .test({
          name: 'conditional-error',
          message: intl.formatMessage({ id: 'Validation.NAME.EXIST' }),
          test: function (value) {
            const { existClientNameAr } = this.parent
            if (existClientNameAr) {
              return false
            }
            return true // Return true if validation passes
          },
        }),
      clientEnName: Yup.string()
        .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
        .matches(/^[a-zA-Z0-9\s]+$/, intl.formatMessage({ id: 'VALIDATION.ENGLISHCHAR' }))
        .test({
          name: 'conditional-error',
          message: intl.formatMessage({ id: 'Validation.NAME.EXIST' }),
          test: function (value) {
            const { existClientNameEn } = this.parent
            if (existClientNameEn) {
              return false
            }
            return true // Return true if validation passes
          },
        }),
      telephoneNumber: Yup.string()
        .nullable()
        .notRequired()
        .transform((value) => (!!value ? value : null))
        .matches(/^[+-]?\d+$/, intl.formatMessage({ id: 'VALIDATION.PHONE' }, { fieldname: intl.formatMessage({ id: 'ADDOPPONENT.TELEPHONE' }) }))
        .min(12, intl.formatMessage({ id: 'VALIDATION.PHONELENGTH' }, { fieldname: intl.formatMessage({ id: 'ADDOPPONENT.TELEPHONE' }), length: 12 })),
      fax: Yup.string()
        .nullable()
        .notRequired()
        .transform((value) => (!!value ? value : null))
        .matches(/^[+-]?\d+$/, intl.formatMessage({ id: 'VALIDATION.PHONE' }, { fieldname: intl.formatMessage({ id: 'ADDCLIENT.FAX' }) }))
        .min(12, intl.formatMessage({ id: 'VALIDATION.PHONELENGTH' }, { fieldname: intl.formatMessage({ id: 'ADDCLIENT.FAX' }), length: 12 })),
      branchId: Yup.mixed().required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
      // .typeError(intl.formatMessage({ id: 'VALIDATION.TYPEMATCH' })),
      mobileNumber: Yup.string()
        .nullable()
        .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
        .transform((value) => (!!value ? value : null))
        .when('mobileNumberIsNotEmpty', {
          is: (value) => value !== null && value !== '',
          then: (schema) =>
            schema
              .test(
                // Custom validation rule for format
                'phone-format',
                intl.formatMessage({ id: 'VALIDATION.MOBILE' }, { fieldname: intl.formatMessage({ id: 'ADDOPPONENT.MOBILE' }) }),
                (value) => (value?.startsWith('+') || value?.startsWith('00')) && /^\d+$/.test(value.substring(2))
              )
              .min(13, intl.formatMessage({ id: 'VALIDATION.PHONELENGTH' }, { fieldname: intl.formatMessage({ id: 'ADDOPPONENT.MOBILE' }), length: 13 })),
        }),
      apartmentNumber: Yup.string()
        .nullable()
        .notRequired()
        .transform((value) => (!!value ? value : null))
        .when('apartmentNumberIsNotEmpty', {
          is: (value) => value !== null && value !== '',
          then: (schema) => schema.matches(/^\d+$/, intl.formatMessage({ id: 'VALIDATION.ONLYNUMBERS' })).max(15, intl.formatMessage({ id: 'VALIDATION.PHONELENGTH' }, { fieldname: intl.formatMessage({ id: 'ADDCLIENT.APARTMENT' }), length: 15 })),
        }),
      buildingNumber: Yup.string()
        .nullable()
        .notRequired()
        .transform((value) => (!!value ? value : null))
        .matches(/^[a-zA-Z0-9]+$/, intl.formatMessage({ id: 'VALIDATION.LETTERSNUMBER' }))
        .max(10, intl.formatMessage({ id: 'VALIDATION.MAXLENGTH' }, { fieldname: intl.formatMessage({ id: 'ADDCLIENT.BUILDINGNUM' }), length: 10 })),
      valueOfWorkingHour: Yup.string()
        .nullable()
        .notRequired()
        .transform((value) => (!!value ? value : null))
        .when('valueOfWorkingHourIsNotEmpty', {
          is: (value) => value !== null && value !== '',
          then: (schema) => schema.matches(/^\d+(?:\.\d+)?$/, intl.formatMessage({ id: 'VALIDATION.DECIMALNUMBER' })),
        }),
      nationalityId: Yup.mixed()
        .nullable()
        .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
      // .typeError(intl.formatMessage({ id: 'VALIDATION.TYPEMATCH' })),
      email: Yup.string()
        .email(intl.formatMessage({ id: 'VALIDATION.EMAILFORMAT' }))
        .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
      email2: Yup.string()
        .nullable()
        .email(intl.formatMessage({ id: 'VALIDATION.EMAILFORMAT' })),
      clientTypeId: Yup.object().required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
      referenceNumber: Yup.string().required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
      // fax: Yup.string()
      //   .nullable()
      //   .matches(/^[0-9]+$/, 'Must be only numbers'),
      localIdentificationNumber: Yup.string()
        .nullable()
        .notRequired()
        .test('is-mask-complete', intl.formatMessage({ id: 'VALIDATION.FILLINPUT' }, { fieldname: intl.formatMessage({ id: 'ADDCLIENT.LOCALNUMBER' }) }), function (value) {
          if (value && value.length < 18) return false
          return true
        }),
      // .transform((value) => (!!value ? value : null))
      // .matches(/^-?\d+$/, intl.formatMessage({ id: 'VALIDATION.NUMBERS_AND_HYPHENS' })),
      passportNumber: Yup.string()
        .nullable()
        .notRequired()
        .transform((value) => (!!value ? value : null))
        .matches(/^[a-zA-Z0-9]+$/, intl.formatMessage({ id: 'VALIDATION.LETTERSNUMBER' })),
      companyName: Yup.string()
        .nullable()
        .notRequired()
        .transform((value) => (!!value ? value : null))
        .matches(/^[a-zA-Z\d\u0600-\u06FF]+$/, intl.formatMessage({ id: 'VALIDATION.LETTERSNUMBER' })),
    })
    .atLeastOneRequired(['localIdentificationNumber', 'passportNumber'], intl.formatMessage({ id: 'VALIDATION.ONE_FIELD_REQUIRED' }))
