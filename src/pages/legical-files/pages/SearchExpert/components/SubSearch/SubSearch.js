import { Grid, Paper } from '@mui/material'
import { Form, Formik } from 'formik'
import AppField from '../../../../../../components/common/AppField/AppField'
import { useIntl } from 'react-intl'
import AppButton from '../../../../../../components/common/AppButton/AppButton'
import Logic from './Logic'

function SubSearch() {
    const intl =useIntl()
    const {onSubmit, initialValues} = Logic()
  return (
    <>
    <Paper sx={{padding: '20px'}}>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ errors, touched, setFieldValue, values, resetForm, dirty }) =>(
            <Form>
                <Grid container spacing={2}>
                    <Grid item sm={6} xs={12}>
                        <AppField name="name_en" label={intl.formatMessage({ id: 'SEARCHCLIENT.NAME_EN' })} helperText={errors.name_en} type="text" />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <AppField name="name_ar" label={intl.formatMessage({ id: 'SEARCHCLIENT.NAME_AR' })} helperText={errors.name_ar} type="text" />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <AppField name="phone" label={intl.formatMessage({ id: 'SEARCHCLIENT.PHONE' })} helperText={errors.phone} type="text" />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <AppField name="mobile" label={intl.formatMessage({ id: 'SEARCHCLIENT.MOBILE' })} helperText={errors.mobile} type="text" />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <AppField name="nationality" label={intl.formatMessage({ id: 'SEARCHCLIENT.NATIONALITY' })} helperText={errors.nationality} type="text" />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <AppField name="branch" label={intl.formatMessage({ id: 'SEARCHCLIENT.BRANCH' })} helperText={errors.branch} type="text" />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <AppButton type="submit">{intl.formatMessage({ id: 'SEARCHCLIENT.SEARCH' })}</AppButton>
                    </Grid>
                </Grid>
            </Form>
            )}
        </Formik>
      </Paper>
      </>

  )
}

export default SubSearch
