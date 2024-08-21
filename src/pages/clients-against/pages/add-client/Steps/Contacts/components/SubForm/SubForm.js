import { Grid } from '@mui/material'
import React, { useRef } from 'react'
import { Form, Formik } from 'formik'
import AppField from '../../../../../../../../components/common/AppField/AppField'
import Logic from './Logic'
import AppButton from '../../../../../../../../components/common/AppButton/AppButton'
import FormikCheckbox from '../../../../../../../../components/common/FormikCheckbox/FormikCheckbox'

const SubForm = (props) => {
  console.log(props, 'subform')

  const { constactInputsInitials, onContactSubmit, isLoading, validationSchema, intl } = Logic(props)

  return (
    <Formik enableReinitialize initialValues={constactInputsInitials} validationSchema={validationSchema} onSubmit={onContactSubmit}>
      {({ errors, setFieldValue, values }) => {
        return (
          <Form style={{ marginBottom: 20 }}>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <AppField name="contactName" label={intl.formatMessage({ id: 'ADDCLIENT.NAME' })} helperText={errors.contactName} />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField name="contactJob" label={intl.formatMessage({ id: 'ADDCLIENT.JOB' })} helperText={errors.contactJob} />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField name="contactPhone" label={intl.formatMessage({ id: 'ADDCLIENT.PHONE' })} helperText={errors.contactPhone} />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField name="contactMobile" label={intl.formatMessage({ id: 'ADDCLIENT.MOBILE' })} helperText={errors.contactMobile} />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField name="contactEmail" label={intl.formatMessage({ id: 'ADDCLIENT.EMAIL' })} helperText={errors.contactEmail} />
              </Grid>
              <Grid item sm={3} xs={12}>
                <AppField name="hasPowerOfAttorny" label={intl.formatMessage({ id: 'ADDCLIENT.POWEROFATTORNY' })} component={FormikCheckbox} value={values.hasPowerOfAttorny} />
              </Grid>
              <Grid item sm={3} xs={12}>
                <AppField name="allowContact" label={intl.formatMessage({ id: 'ADDCLIENT.ALLOWCONTACT' })} component={FormikCheckbox} value={values.allowContact} />
              </Grid>
              <Grid display="flex" justifyContent={'flex-end'} item sm={12} xs={12}>
                <AppButton type="reset" onClick={props.resetEditableRow} style={{ margin: '0px 10px' }}>
                  {intl.formatMessage({ id: 'ADDFILE.reset' })}
                </AppButton>

                <AppButton disabled={isLoading} type="submit">
                  {intl.formatMessage({ id: 'ADDFILE.SAVE' })}
                </AppButton>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default SubForm
