import { Grid, Paper } from '@mui/material'
import { Form, Formik } from 'formik'
import AppField from '../../../../../../components/common/AppField/AppField'
import AppButton from '../../../../../../components/common/AppButton/AppButton'
import Logic from './Logic'
import React from 'react'
import { InitialValueSearch } from '../../constants'
import FormikAutocomplete from '../../../../../../components/common/FormikAutocomplete/FormikAutocomplete'
import MaskedField from '../../../../../../components/common/MaskedField/MaskedField'

const SubSearch = React.forwardRef(({ searchClientMutation }, ref) => {
  const { isLoading } = searchClientMutation
  const { onSubmit, branches, nationalities, searchClientSchema, isEnglish, intl } = Logic({ searchClientMutation })
  return (
    <Paper sx={{ padding: '20px', marginBottom: 5 }}>
      <Formik initialValues={InitialValueSearch} validationSchema={searchClientSchema} onSubmit={onSubmit} innerRef={ref}>
        {({ errors, setFieldValue }) => (
          <Form>
            <Grid container spacing={2}>
              {/* <Grid item sm={6} xs={12}>
                  <AppField name="clientEnName" label={intl.formatMessage({ id: 'SEARCHCLIENT.NAME_EN' })} helperText={errors.name_en} type="text" />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <AppField name="clientArName" label={intl.formatMessage({ id: 'SEARCHCLIENT.NAME_AR' })} helperText={errors.name_ar} type="text" />
                </Grid> */}
              <Grid item sm={6} xs={12}>
                <AppField name="name" label={intl.formatMessage({ id: 'SEARCHCLIENT.NAME' })} helperText={errors.name} type="text" />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField name="phoneNumber" label={intl.formatMessage({ id: 'SEARCHCLIENT.PHONE' })} helperText={errors.phoneNumber} type="text" />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField name="mobileNumber" label={intl.formatMessage({ id: 'SEARCHCLIENT.MOBILE' })} helperText={errors.mobileNumber} type="text" />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField disabled={false} name="nationality" label={intl.formatMessage({ id: 'SEARCHCLIENT.NATIONALITY' })} component={FormikAutocomplete} options={nationalities} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} optionKey="id" idPropName="id" />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField disabled={false} name="branch" label={intl.formatMessage({ id: 'SEARCHCLIENT.BRANCH' })} component={FormikAutocomplete} options={branches} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} optionKey="id" idPropName="id" />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField
                  name="localIdentificationNumber"
                  component={MaskedField}
                  label={intl.formatMessage({ id: 'ADDCLIENT.LOCALNUMBER' })}
                  mask="000-0000-0000000-0"
                  // unmask={'typed'}
                  onAccept={(value, mask) => {
                    setFieldValue('localIdentificationNumber', value)
                  }}
                  helperText={errors.localIdentificationNumber}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField name="passportNumber" label={intl.formatMessage({ id: 'ADDCLIENT.PASSPORTNUMBER' })} helperText={errors.passportNumber} />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField name="email" label={intl.formatMessage({ id: 'ADDCLIENT.EMAIL' })} helperText={errors.email} />
              </Grid>
              <Grid display="flex" justifyContent={'flex-end'} item xs={12}>
                <AppButton type="submit" disabled={isLoading}>
                  {intl.formatMessage({ id: 'SEARCHCLIENT.SEARCH' })}
                </AppButton>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  )
})

export default React.memo(SubSearch)
