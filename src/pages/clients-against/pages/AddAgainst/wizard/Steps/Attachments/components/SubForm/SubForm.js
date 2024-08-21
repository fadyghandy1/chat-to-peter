import { Formik, Form } from 'formik'
import { useState } from 'react'
import FormikAutocomplete from '../../../../../../../../../components/common/FormikAutocomplete/FormikAutocomplete'
import AppField from '../../../../../../../../../components/common/AppField/AppField'
import { Box, Grid } from '@mui/material'
import AppDatePicker from '../../../../../../../../../components/common/AppDatePicker/AppDatePicker'
import FileUpload from '../../../../../../../../../components/common/FileUpload/FileUpload.styles'
import AppButton from '../../../../../../../../../components/common/AppButton/AppButton'
import dayjs from 'dayjs'
import Logic from './Logic'
import { modes } from '../../../../../../../../../components/common/wizard'
const SubForm = ({ setAttachments, row, mode, resetEditableRow }) => {
  const { initialValues, onSubmit, attachmentTypes, validationSchema, isEnglish, intl } = Logic(row, setAttachments)
  console.log('initialValues', initialValues)
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize validationSchema={validationSchema}>
      {({ errors, touched, setFieldValue, values, resetForm, dirty }) => (
        <Form style={{ marginBottom: 20 }}>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <AppField className="required" disabled={false} name="attachmentType" label={intl.formatMessage({ id: 'ADDFILE.ATTACHMENTTYPE' })} component={FormikAutocomplete} options={attachmentTypes} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} optionKey="id" idPropName="id" isOptionEqualToValue={(option, value) => option.id == value.id} />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <AppField className="required" label={intl.formatMessage({ id: 'ADDFILE.ATTACHMENTNAME' })} name="attachmentName" />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <AppField component={AppDatePicker} label={intl.formatMessage({ id: 'ADDFILE.ISSUEDDATE' })} name="attachmentIssuedDate" value={dayjs(values.attachmentIssuedDate)} />
            </Grid>

            <Grid item lg={6} md={6} sm={6} xs={12}>
              <AppField component={AppDatePicker} label={intl.formatMessage({ id: 'ADDFILE.EXPIRYDATE' })} name="attachmentEndDate" value={dayjs(values.attachmentEndDate)} />
            </Grid>

            <Grid item lg={6} md={6} sm={6} xs={12}>
              <AppField
                name="attachment"
                // disabled={mode === modes.PREVIEW}
                className="required"
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

              <AppButton type="submit"> {intl.formatMessage({ id: 'ADDFILE.SAVE' })}</AppButton>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default SubForm
