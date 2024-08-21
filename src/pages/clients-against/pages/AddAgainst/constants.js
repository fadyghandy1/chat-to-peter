import * as Yup from 'yup'
import { Download, Delete, Edit, Visibility } from '@mui/icons-material'
import dayjs from 'dayjs'

export const initialValues = {
  nameAr: '',
  nameEn: '',
  gender: null,
  mobile: '',
  telephone: '',
  email: '',
  passport: '',
  postCode: '',
  nationality: null,
  city: null,
  fax: '',
  street: '',
  apartment: '',
  buildingNu: '',
  reference: '',
  clientType: null,
  address: '',
  attachments: [],
  lawyers: [],
}

export const opponentDetailsValidateSchema = (intl) =>
  Yup.object().shape({
    nameAr: Yup.string()
      .trim(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
      .strict(true)
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
      .matches(/^[\u0600-\u06FF0-9 ]+$/, intl.formatMessage({ id: 'VALIDATION.ARABICCHAR' }))

      .test({
        name: 'conditional-error',
        message: intl.formatMessage({ id: 'Validation.NAME.EXIST' }),
        test: function (value) {
          const { existNameAr } = this.parent
          if (existNameAr) {
            return false
          }
          return true // Return true if validation passes
        },
      }),
    nameEn: Yup.string()
      .trim(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
      .strict(true)
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
      .matches(/^[a-zA-Z0-9\s]+$/, intl.formatMessage({ id: 'VALIDATION.ENGLISHCHAR' }))
      .test({
        name: 'conditional-error',
        message: intl.formatMessage({ id: 'Validation.NAME.EXIST' }),
        test: function (value) {
          const { existNameEn } = this.parent
          if (existNameEn) {
            return false
          }
          return true // Return true if validation passes
        },
      }),
    mobile: Yup.string()
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

    telephone: Yup.string()
      .notRequired()
      .nullable()
      .transform((value) => (!!value ? value : null))
      .matches(/^[+-]?\d+$/, intl.formatMessage({ id: 'VALIDATION.PHONE' }, { fieldname: intl.formatMessage({ id: 'ADDOPPONENT.TELEPHONE' }) }))
      .min(12, intl.formatMessage({ id: 'VALIDATION.PHONELENGTH' }, { fieldname: intl.formatMessage({ id: 'ADDOPPONENT.TELEPHONE' }), length: 12 })),

    email: Yup.string().email(intl.formatMessage({ id: 'VALIDATION.EMAILFORMAT' })),
    address: Yup.string().required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    passport: Yup.string()
      .notRequired()
      .nullable()
      .transform((value) => (!!value ? value : null))
      .matches(/^[a-zA-Z0-9]+$/, intl.formatMessage({ id: 'VALIDATION.LETTERSNUMBER' })),

    fax: Yup.string()
      .notRequired()
      .nullable()
      .transform((value) => (!!value ? value : null))
      .matches(/^[+-]?\d+$/, intl.formatMessage({ id: 'VALIDATION.PHONE' }, { fieldname: intl.formatMessage({ id: 'ADDOPPONENT.FAX' }) }))
      .min(12, intl.formatMessage({ id: 'VALIDATION.PHONELENGTH' }, { fieldname: intl.formatMessage({ id: 'ADDOPPONENT.FAX' }), length: 12 })),
    // street: '',
    apartment: Yup.string()
      .notRequired()
      .nullable()
      .transform((value) => (!!value ? value : null))
      .matches(/^\d+$/, intl.formatMessage({ id: 'VALIDATION.NUMBER' }))
      .max(15, intl.formatMessage({ id: 'VALIDATION.MAXLENGTH' }, { fieldname: intl.formatMessage({ id: 'ADDOPPONENT.APARTMENT' }), length: 15 })),
    buildingNu: Yup.string()
      .notRequired()
      .nullable()
      .transform((value) => (!!value ? value : null))
      .matches(/^[a-zA-Z0-9]+$/, intl.formatMessage({ id: 'VALIDATION.LETTERSNUMBER' }))
      .max(10, intl.formatMessage({ id: 'VALIDATION.MAXLENGTH' }, { fieldname: intl.formatMessage({ id: 'ADDOPPONENT.BUILDINGNUM' }), length: 15 })),
    localIdentificationNumber: Yup.string()
      .nullable()
      .notRequired()
      .test('is-mask-complete', intl.formatMessage({ id: 'VALIDATION.FILLINPUT' }, { fieldname: intl.formatMessage({ id: 'ADDCLIENT.LOCALNUMBER' }) }), function (value) {
        if (value && value.length < 18) return false
        return true
      }),
  })

export const attachmentsTableColumns = (actions, intl) => [
  {
    id: 'attachmentType',
    label: intl.formatMessage({ id: 'ADDFILE.ATTACHMENTTYPE' }),
    align: 'center',
    renderColumn: (row) => {
      return <div style={{ display: 'flex', justifyContent: 'center' }}>{intl.locale === 'en' ? row.attachmentType?.descriptionEn : row.attachmentType?.descriptionAr}</div>
    },
  },
  {
    id: 'attachmentIssuedDate',
    label: intl.formatMessage({ id: 'ADDFILE.ISSUEDDATE' }),
    align: 'center',
    renderColumn: (row) => <div>{row.attachmentIssuedDate && dayjs(row.attachmentIssuedDate).format('DD/MM/YYYY')}</div>,
  },
  {
    id: 'attachmentEndDate',
    label: intl.formatMessage({ id: 'ADDFILE.EXPIRYDATE' }),
    align: 'center',
    renderColumn: (row) => <div>{row.attachmentEndDate && dayjs(row.attachmentEndDate).format('DD/MM/YYYY')}</div>,
  },
  { id: 'attachmentName', label: intl.formatMessage({ id: 'ADDFILE.ATTACHMENTNAME' }), align: 'center', renderColumn: 'attachmentName' },
  {
    id: 'actions',
    label: intl.formatMessage({ id: 'SEARCHCLIENT.ACTIONS' }),
    align: 'center',
    renderColumn: (row, index) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div onClick={() => actions.deleteSelectedDocument(row, index)} style={{ color: 'red' }}>
          <Delete />
        </div>
        <div onClick={() => actions.editSelectedDocument(row, index)}>
          <Edit />
        </div>
        <div onClick={() => actions.downloadSelectedDocument(row, index)}>
          <Download />
        </div>
        <div onClick={() => actions.viewSelectedDocument(row, index)}>
          <Visibility />
        </div>
      </div>
    ),
  },
]

export const lawyersTableColumns = (actions, intl) => [
  { id: 'lawyerName', label: intl.formatMessage({ id: 'ADDOPPONENT.NAME' }), align: 'center', renderColumn: 'name' },
  { id: 'lawyerMobile', label: intl.formatMessage({ id: 'ADDOPPONENT.MOBILE' }), align: 'center', renderColumn: 'mobileNumber' },
  { id: 'lawyerPhone', label: intl.formatMessage({ id: 'ADDOPPONENT.PHONE' }), align: 'center', renderColumn: 'phoneNumber' },
  { id: 'lawyerEmail', label: intl.formatMessage({ id: 'ADDOPPONENT.EMAIL' }), align: 'center', renderColumn: 'email' },
  {
    id: 'actions',
    label: intl.formatMessage({ id: 'SEARCHCLIENT.ACTIONS' }),
    align: 'center',
    renderColumn: (row, index) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div onClick={() => actions.deleteSelectedLawyer(row, index)} style={{ color: 'red' }}>
          <Delete />
        </div>
        <div onClick={() => actions.editSelectedLawyer(row, index)}>
          <Edit />
        </div>
      </div>
    ),
  },
]
