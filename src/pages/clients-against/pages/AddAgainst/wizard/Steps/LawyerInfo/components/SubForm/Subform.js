import { Box, Grid } from '@mui/material'
import { useIntl } from 'react-intl'
import { Form, Formik } from 'formik'
import AppField from '../../../../../../../../../components/common/AppField/AppField'
import Logic from './Logic'
import AppButton from '../../../../../../../../../components/common/AppButton/AppButton'

const SubForm = ({ setLawyers, row, resetEditableRow }) => {
  const { lawyerInputsInitials, onLawyerSubmit, validationSchema } = Logic(setLawyers, row)
  const intl = useIntl()

  return (
    <Formik enableReinitialize initialValues={lawyerInputsInitials} validationSchema={validationSchema} onSubmit={onLawyerSubmit}>
      {({ errors, touched, setFieldValue, values }) => {
        return (
          <Form style={{ marginBottom: 20 }}>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <AppField name="name" label={intl.formatMessage({ id: 'ADDOPPONENT.NAME' })} helperText={errors.name} type="text" />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField name="mobileNumber" label={intl.formatMessage({ id: 'ADDOPPONENT.MOBILE' })} helperText={errors.mobileNumber} type="text" />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField name="phoneNumber" label={intl.formatMessage({ id: 'ADDOPPONENT.PHONE' })} helperText={errors.phoneNumber} type="text" />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField name="email" label={intl.formatMessage({ id: 'ADDOPPONENT.EMAIL' })} helperText={errors.email} type="text" />
              </Grid>
              {/* <Grid item sm={6} xs={12}>
                <AppField name="lawyerUserName" label={intl.formatMessage({ id: 'ADDOPPONENT.USERNAME' })} helperText={errors.lawyerUserName} />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField name="lawyerPassword" label={intl.formatMessage({ id: 'ADDOPPONENT.PASSWORD' })} helperText={errors.lawyerPassword} />
              </Grid> */}
              <Grid display="flex" justifyContent={'flex-end'} item sm={12} xs={12}>
                <AppButton type="reset" onClick={resetEditableRow} style={{ margin: '0px 10px' }}>
                  {intl.formatMessage({ id: 'ADDFILE.reset' })}
                </AppButton>
                <AppButton type="submit"> {intl.formatMessage({ id: 'ADDFILE.SAVE' })}</AppButton>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default SubForm
