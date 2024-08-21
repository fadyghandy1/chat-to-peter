import { Box, Grid } from '@mui/material'
import React, { useRef } from 'react'
import { useIntl } from 'react-intl'
import { Field, Form, Formik } from 'formik'
import AppField from '../../../../../../../components/common/AppField/AppField'
import Logic from './inputLogic'
import AppButton from '../../../../../../../components/common/AppButton/AppButton'

const Inputs = (props) => {
  const { constactInputsInitials, onContactSubmit, isLoading } = Logic(props)
  const intl = useIntl()

  return (
    <Formik enableReinitialize initialValues={constactInputsInitials}  onSubmit={onContactSubmit}>
      {({ errors, touched, setFieldValue, values }) => {
        return (
          <Form>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <AppField name="contactName" label={intl.formatMessage({ id: 'ADDCLIENT.NAME' })} helperText={errors.contactName} />
              </Grid>
              {/* <Grid item sm={6} xs={12}>
                <AppField name="contactJob" label="Job" helperText={errors.contactJob} />
              </Grid> */}
              <Grid item sm={6} xs={12}>
                <AppField name="contactPhone" label={intl.formatMessage({ id: 'ADDCLIENT.PHONE' })} helperText={errors.contactPhone} />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField name="contactEmail" label={intl.formatMessage({ id: 'ADDCLIENT.EMAIL' })} helperText={errors.contactEmail} />
              </Grid>
              {/* <Grid item sm={6} xs={12}>
                <AppField name="contactUserName" label="User Name" helperText={errors.contactUserName} />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField name="contactPassword" label="Password" helperText={errors.contactPassword} />
              </Grid> */}
              <Grid item sm={12} xs={12}>
                <Box display="flex">
                  <AppButton disabled={isLoading} type="submit">
                  {intl.formatMessage({ id: 'ADDFILE.SAVE' })}
                  </AppButton>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default Inputs
