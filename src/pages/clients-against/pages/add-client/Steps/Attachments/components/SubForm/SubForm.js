import { Formik, Form } from 'formik'
import FormikAutocomplete from '../../../../../../../../components/common/FormikAutocomplete/FormikAutocomplete'
import AppField from '../../../../../../../../components/common/AppField/AppField'
import { Grid } from '@mui/material'
import AppDatePicker from '../../../../../../../../components/common/AppDatePicker/AppDatePicker'
import FileUpload from '../../../../../../../../components/common/FileUpload/FileUpload.styles'
import AppButton from '../../../../../../../../components/common/AppButton/AppButton'
import dayjs from 'dayjs'
import Logic from './Logic'
import { modes } from '../../../../../../../../components/common/wizard'
// import
const SubForm = ({ setAttachments, row, mode, resetEditableRow }) => {
  const { initialValues, onSubmit, attachmentTypes, validationSchema, intl, isEnglish } = Logic(row, setAttachments)

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} enableReinitialize>
      {({ errors, touched, setFieldValue, values, resetForm, dirty }) => (
        <Form style={{ marginBottom: 20 }}>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <AppField
                name="attachmentType"
                // className="required"
                label={intl.formatMessage({ id: 'ADDFILE.ATTACHMENTTYPE' })}
                component={FormikAutocomplete}
                options={attachmentTypes}
                optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'}
                optionKey="id"
                idPropName="id"
                helperText={errors.attachmentType}
              />
            </Grid>

            <Grid item lg={6} md={6} sm={6} xs={12}>
              <AppField label={intl.formatMessage({ id: 'ADDFILE.ATTACHMENTNAME' })} name="attachmentName" error={touched.attachmentName && !!errors.attachmentName} helperText={touched.attachmentName && errors.attachmentName} />
            </Grid>

            <Grid item lg={6} md={6} sm={6} xs={12}>
              <AppField component={AppDatePicker} label={intl.formatMessage({ id: 'ADDFILE.ISSUEDDATE' })} name="issuedDate" value={dayjs(values.issuedDate)} />
            </Grid>

            <Grid item lg={6} md={6} sm={6} xs={12}>
              <AppField component={AppDatePicker} label={intl.formatMessage({ id: 'ADDFILE.EXPIRYDATE' })} name="expiryDate" value={dayjs(values.expiryDate)} />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <AppField
                name="attachment"
                // disabled={mode === modes.PREVIEW}
                component={FileUpload}
                setFieldValue={setFieldValue}
                showScanBtn={false}
                showCameraBtn={true}
                title={intl.formatMessage({ id: 'ADDFILE.ATTACHMENT' })}
                helperText={touched.attachment && errors.attachment}
                errorMessage={errors.attachment ? errors.attachment : undefined}
                disabled={mode === modes.EDIT && row?.documentId}
                uploadBtnTitle={intl.formatMessage({ id: 'FILEUPLOAD.UPLOAD' })}
                cameraBtnTitle={intl.formatMessage({ id: 'FILEUPLOAD.CAMERA' })}
                // setFile={(file) => setFieldValue('ownerIdAttach', file)}
              />
            </Grid>
            <Grid display="flex" justifyContent={'flex-end'} item sm={12} xs={12}>
              <AppButton type="reset" onClick={resetEditableRow} style={{ margin: '0px 10px' }}>
                {intl.formatMessage({ id: 'ADDFILE.reset' })}
              </AppButton>

              <AppButton type="submit">{intl.formatMessage({ id: 'ADDFILE.SAVE' })}</AppButton>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default SubForm
