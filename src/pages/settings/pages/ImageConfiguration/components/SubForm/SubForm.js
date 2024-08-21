import { Grid, Paper } from '@mui/material'
import { Form, Formik } from 'formik'
import AppField from '../../../../../../components/common/AppField/AppField'
import AppButton from '../../../../../../components/common/AppButton/AppButton'
import Logic from './Logic'
import FileUpload from '../../../../../../components/common/FileUpload/FileUpload.styles'

const SubForm = ({ initialValues }) => {
  const { intl, onSubmit, validationSchema } = Logic()
  return (
    <>
      <Paper sx={{ padding: '20px' }}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ errors, setFieldValue, touched }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item md={4} sm={12} xs={12}>
                  <AppField title={intl.formatMessage({ id: 'LOGO.IMAGE' })} name="logoImage" component={FileUpload} setFieldValue={setFieldValue} showScanBtn={false} helperText={touched.logoImage && errors.logoImage} errorMessage={errors.logoImage ? errors.logoImage : undefined} uploadBtnTitle={intl.formatMessage({ id: 'FILEUPLOAD.UPLOAD' })} cameraBtnTitle={intl.formatMessage({ id: 'FILEUPLOAD.CAMERA' })} />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <AppField title={intl.formatMessage({ id: 'ICON.IMAGE' })} name="iconImage" supportedFormat={['image/jpg', 'image/jpeg', 'image/gif', 'image/png', 'image/webp']} component={FileUpload} setFieldValue={setFieldValue} showScanBtn={false} helperText={touched.iconImage && errors.iconImage} errorMessage={errors.iconImage ? errors.iconImage : undefined} uploadBtnTitle={intl.formatMessage({ id: 'FILEUPLOAD.UPLOAD' })} cameraBtnTitle={intl.formatMessage({ id: 'FILEUPLOAD.CAMERA' })} />
                </Grid>
              </Grid>
              <Grid display="flex" justifyContent={'flex-end'} item sm={12} xs={12}>
                <AppButton type="submit"> {intl.formatMessage({ id: 'ADDFILE.SAVE' })}</AppButton>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </>
  )
}

export default SubForm
