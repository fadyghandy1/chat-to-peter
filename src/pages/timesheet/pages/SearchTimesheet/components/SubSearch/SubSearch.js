import { Grid, Paper } from '@mui/material'
import { Form, Formik } from 'formik'
import AppField from '../../../../../../components/common/AppField/AppField'
import { useIntl } from 'react-intl'
import AppButton from '../../../../../../components/common/AppButton/AppButton'
import Logic from './Logic'
import AppDatePicker from '../../../../../../components/common/AppDatePicker/AppDatePicker'
// import FormikAutocomplete from '../../../../../../components/common/FormikAutocomplete/FormikAutocomplete'
import React from 'react'
const SubSearch = React.forwardRef(({ searchTimesheetMutation }, ref) => {
  const intl = useIntl()
  const { isLoading } = searchTimesheetMutation
  const { onSubmit, initialValues } = Logic({ searchTimesheetMutation })
  return (
    <>
      <Paper sx={{ padding: '20px', marginBottom: 5 }}>
        <Formik initialValues={initialValues} onSubmit={onSubmit} innerRef={ref}>
          {({ errors }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <AppField name="caseFileNumber" label={intl.formatMessage({ id: 'SEARCHTIMESHEET.CASEFILENUMBER' })} helperText={errors.caseFileNumber} type="text" />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <AppField name="caseNumber" label={intl.formatMessage({ id: 'SEARCHTIMESHEET.CASENUMBER' })} helperText={errors.caseNumber} type="text" />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <AppField name="staffName" label={intl.formatMessage({ id: 'SEARCHTIMESHEET.STAFFNAME' })} helperText={errors.staffName} type="text" />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <AppField component={AppDatePicker} label={intl.formatMessage({ id: 'SEARCHTIMESHEET.DATESTARTWORK' })} name="wanted" helperText={errors.wanted} />
                </Grid>
                <Grid display="flex" justifyContent={'flex-end'} item xs={12}>
                  <AppButton disabled={isLoading} type="submit">
                    {intl.formatMessage({ id: 'SEARCHTIMESHEET.SEARCH' })}
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
