import { Grid, Paper } from '@mui/material'
import { Form, Formik } from 'formik'
import AppField from '../../../../../../components/common/AppField/AppField'
import AppButton from '../../../../../../components/common/AppButton/AppButton'
import Logic from './Logic'
import FormikAutocomplete from '../../../../../../components/common/FormikAutocomplete/FormikAutocomplete'
import React from 'react'
import MaskedField from '../../../../../../components/common/MaskedField/MaskedField'

const SubSearch = React.forwardRef(({ searchOpponentMutation }, ref) => {
  const { isLoading } = searchOpponentMutation
  const { onSubmit, initialValues, nationalities, searchOpponentSchema, isEnglish, intl } = Logic({ searchOpponentMutation })
  return (
    <Paper sx={{ padding: '20px', marginBottom: 5 }}>
      <Formik initialValues={initialValues} validationSchema={searchOpponentSchema} onSubmit={onSubmit} innerRef={ref}>
        {({ errors, setFieldValue }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <AppField name="name" label={intl.formatMessage({ id: 'SEARCHCLIENT.NAME' })} helperText={errors.name} type="text" />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField name="phone" label={intl.formatMessage({ id: 'SEARCHCLIENT.PHONE' })} helperText={errors.phone} type="text" />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField name="mobile" label={intl.formatMessage({ id: 'SEARCHCLIENT.MOBILE' })} helperText={errors.mobile} type="text" />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField disabled={false} name="nationality" label={intl.formatMessage({ id: 'ADDOPPONENT.NATIONALITY' })} component={FormikAutocomplete} options={nationalities} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} optionKey="id" idPropName="id" />
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
                <AppButton disabled={isLoading} type="submit">
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

export default SubSearch
