import { useQuery } from 'react-query'
import * as Yup from 'yup'
import { useIntl } from 'react-intl'
import { getImageType } from '../../../../../../../../services/LookupsServices'
import { getImageTypeFromBase64 } from '../../../../../../../../utils/common'
import { maxFilesSizes, supportedFilesFormat } from '../../../../../../../../utils/constants/config'

function Logic(row, setAttachments) {
  // console.log(row, 'row fadyyyyy')
  const intl = useIntl()
  const locale = intl.locale
  const isEnglish = locale === 'en'
  const initialValues = {
    attachmentType: row?.attachmentType || null,
    // attachmentEndDate: row?.attachmentEndDate || '',
    attachmentName: row?.attachmentName || '',
    attachment: row?.attachment || '',
    issuedDate: row?.issuedDate || '',
    expiryDate: row?.expiryDate || '',
    isDeleted: row?.isDeleted ?? null,
  }
  const validationSchema = Yup.object().shape({
    attachment: Yup.string()
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
      .test('is-filetype', intl.formatMessage({ id: 'VALIDATION.FILETYPE' }), function (value) {
        const extension = getImageTypeFromBase64(value)

        return extension && supportedFilesFormat.includes(extension)
      })
      .test('fileSize', intl.formatMessage({ id: 'VALIDATION.FILESIZE' }) + maxFilesSizes / (1024 * 1024) + ' MB', (value) => (value?.size > 0 ? value.size : value?.replace(/=/g, '').length * 0.75) < maxFilesSizes),

    // attachmentType: Yup.object().nullable().required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    attachmentName: Yup.string()
      .trim(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
      .strict(true)
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    attachmentType: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    issuedDate: Yup.date(),
    expiryDate: Yup.date().test('is-after-issuedDate', intl.formatMessage({ id: 'VALIDATION.ENDDATE' }, { fieldname1: intl.formatMessage({ id: 'ADDFILE.EXPIRYDATE' }), fieldname2: intl.formatMessage({ id: 'ADDFILE.ISSUEDDATE' }) }), function (value) {
      const { issuedDate } = this.parent
      if (!issuedDate) {
        return true
      }
      return value && new Date(value) > new Date(issuedDate)
    }),

    // .min(Yup.ref('issuedDate'),
    //  intl.formatMessage({ id: 'VALIDATION.ENDDATE' },
    //  { fieldname1: intl.formatMessage({ id: 'ADDFILE.EXPIRYDATE' }),
    //   fieldname2: intl.formatMessage({ id: 'ADDFILE.ISSUEDDATE' }) })),
  })

  const onSubmit = (values, { resetForm }) => {
    console.log('attachementValues', values)
    setAttachments(values)
    resetForm()
  }
  const { data: attachmentTypes = [] } = useQuery(`attachmentTypes`, async () => {
    return await getImageType().then((res) => {
      return res.data.data.models
    })
  })
  // const [attachmentTypes, setAttachmentsTypes] = useState([
  //   { title: 'The Shawshank Redemption', year: 1994 },
  //   { title: 'The Godfather', year: 1972 },
  //   { title: 'The Godfather: Part II', year: 1974 },
  //   { title: 'The Dark Knight', year: 2008 },
  //   { title: '12 Angry Men', year: 1957 },
  //   { title: "Schindler's List", year: 1993 },
  //   { title: 'Pulp Fiction', year: 1994 },
  // ])

  return { initialValues, onSubmit, attachmentTypes, validationSchema, intl, isEnglish }
}

export default Logic
