import { Grid, Paper } from '@mui/material'
import { Form, Formik } from 'formik'
import AppField from '../../../../../components/common/AppField/AppField'
import AppButton from '../../../../../components/common/AppButton/AppButton'
import Logic from './Logic'
import FormikAutocomplete from '../../../../../components/common/FormikAutocomplete/FormikAutocomplete'
import React from 'react'

const SubSearch = () => {
  const { onSubmit, initialValues, intl, roles, registerationMutation, validationSchema } = Logic()
  const { isLoading } = registerationMutation
  return (
    <Paper sx={{ padding: '20px', marginBottom: 5 }}>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <AppField className="required" name="userName" label={intl.formatMessage({ id: 'ADDUSER.USERNAME' })} helperText={errors.userName} type="text" />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField className="required" name="password" label={intl.formatMessage({ id: 'ADDUSER.PASSWORD' })} helperText={errors.password} type="text" />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField className="required" name="email" label={intl.formatMessage({ id: 'ADDUSER.EMAIL' })} helperText={errors.email} type="text" />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField className="required" name="phoneNumber" label={intl.formatMessage({ id: 'ADDUSER.PHONE' })} helperText={errors.phoneNumber} type="text" />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField className="required" name="firstName" label={intl.formatMessage({ id: 'ADDUSER.FIRSTNAME' })} helperText={errors.firstName} />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField className="required" name="lastName" label={intl.formatMessage({ id: 'ADDUSER.LASTNAME' })} helperText={errors.lastName} />
              </Grid>
              <Grid className="required" item sm={6} xs={12}>
                <AppField name="rolesName" className="required" label={intl.formatMessage({ id: 'ADDUSER.ROLESNAME' })} component={FormikAutocomplete} options={roles} optionKey="id" idPropName="id" isOptionEqualToValue={(option, value) => option.id == value.id} optionLabel="name" checkboxOption multiple error={touched.rolesName && !!errors.rolesName} helperText={touched.rolesName && errors.rolesName} />
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
  )
}

export default SubSearch
