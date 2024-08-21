import { Grid, Paper } from '@mui/material'
import { Form, Formik } from 'formik'
import AppField from '../../../../../../components/common/AppField/AppField'
import { useIntl } from 'react-intl'
import AppButton from '../../../../../../components/common/AppButton/AppButton'
import Logic from './Logic'
import FormikAutocomplete from '../../../../../../components/common/FormikAutocomplete/FormikAutocomplete'
import React from 'react'
import AppDatePicker from '../../../../../../components/common/AppDatePicker/AppDatePicker'
import dayjs from 'dayjs'
import { initialValues, validationSchema } from '../../constants'

const SubSearch = React.forwardRef(({}, ref) => {
  const intl = useIntl()
  const locale = intl.locale
  const isEnglish = locale === 'en'
  const { onSubmit, courts, caseTypes, columns, formRef, generateReportMutation } = Logic()
  const { isLoading } = generateReportMutation

  return (
    <>
      <Paper sx={{ padding: '20px' }}>
        <Formik initialValues={initialValues} onSubmit={onSubmit} innerRef={formRef} validationSchema={validationSchema(intl)}>
          {({ errors, values }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item md={4} sm={6} xs={12}>
                  <AppField name="clientname" label={intl.formatMessage({ id: 'CASEREPORTS.CLIENTNAME' })} helperText={errors.clientname} type="text" />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <AppField name="againstname" label={intl.formatMessage({ id: 'CASEREPORTS.AGAINSTNAME' })} helperText={errors.againstname} type="text" />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <AppField name="filenumber" label={intl.formatMessage({ id: 'ADDFILE.FILENUMBER' })} helperText={errors.filenumber} type="text" />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <AppField
                    name="court"
                    // className="required"
                    label={intl.formatMessage({ id: 'ADDFILE.COURT' })}
                    component={FormikAutocomplete}
                    options={courts}
                    optionKey="id"
                    idPropName="id"
                    isOptionEqualToValue={(option, value) => option.id == value.id}
                    optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'}
                  />
                </Grid>

                <Grid item md={4} sm={6} xs={12}>
                  <AppField component={AppDatePicker} label={intl.formatMessage({ id: 'CASEREPORTS.FROM' })} name="fromDate" value={dayjs(values.fromDate)} />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <AppField component={AppDatePicker} label={intl.formatMessage({ id: 'CASEREPORTS.TO' })} name="toDate" value={dayjs(values.toDate)} />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <AppField
                    name="caseType"
                    // className="required"
                    label={intl.formatMessage({ id: 'ADDFILE.CASETYPE' })}
                    component={FormikAutocomplete}
                    options={caseTypes}
                    optionKey="id"
                    idPropName="id"
                    isOptionEqualToValue={(option, value) => option.id == value.id}
                    optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'}
                  />
                </Grid>
                <Grid item md={8} sm={6} xs={12}>
                  <AppField name="columnFilter" className="required" disabled={false} label={intl.formatMessage({ id: 'CASEREPORTS.REPORTCOLUMNS' })} component={FormikAutocomplete} options={columns} optionKey="name" isOptionEqualToValue={(option, value) => option.name == value.name} optionLabel={isEnglish ? 'aliasNameEN' : 'aliasNameAR'} checkboxOption multiple />
                </Grid>
                <Grid display="flex" justifyContent={'flex-end'} item xs={12}>
                  <AppButton disabled={isLoading} type="submit">
                    {intl.formatMessage({ id: 'BUTTON.SUBMIT' })}
                  </AppButton>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </>
  )
})

export default SubSearch
