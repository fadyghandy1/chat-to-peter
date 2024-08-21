import * as Yup from 'yup'
import { without } from '../../../../utils/common'

export const initialValues = {
  clientname: '',
  againstname: '',
  filenumber: '',
  court: null,
  caseType: null,
  fromDate: null,
  toDate: null,
  columnFilter: [],
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
export const validationSchema = (intl) =>
  Yup.object()
    .shape({
      columnFilter: Yup.array()
        .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
        .min(1, intl.formatMessage({ id: 'VALIDATION.ATLEASTONE' }, { fieldname: intl.formatMessage({ id: 'CASEREPORTS.REPORTCOLUMNS' }) })),

      fromDate: Yup.date().nullable(),
      toDate: Yup.date()
        .nullable()
        .min(Yup.ref('fromDate'), intl.formatMessage({ id: 'VALIDATION.ENDDATE' }, { fieldname1: intl.formatMessage({ id: 'CASEREPORTS.TO' }), fieldname2: intl.formatMessage({ id: 'CASEREPORTS.FROM' }) })),

      clientname: Yup.string().nullable(),
      againstname: Yup.string().nullable(),
      filenumber: Yup.string().nullable(),
      court: Yup.object().nullable(),
      caseType: Yup.object().nullable(),
    })
    .atLeastOneRequired(['clientname', 'againstname', 'filenumber', 'court', 'caseType'], intl.formatMessage({ id: 'VALIDATION.ONE_FIELD_REQUIRED' }))
