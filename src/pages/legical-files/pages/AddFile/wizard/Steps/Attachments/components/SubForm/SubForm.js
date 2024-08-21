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
const SubForm = ({ row, refetch, documentId, handleEditSuccess, caseNumberID, resetEditableRow }) => {
  const { initialValues, onSubmit, attachmentTypes, validationSchema, caseStages, formRef, isLoading, isEnglish, intl } = Logic({ row, refetch, documentId, handleEditSuccess, caseNumberID })

  return (
    <Formik initialValues={initialValues} innerRef={formRef} onSubmit={onSubmit} enableReinitialize validationSchema={validationSchema}>
      {({ errors, touched, setFieldValue, values }) => (
        <Form style={{ marginBottom: 20 }}>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <AppField className="required" disabled={false} name="attachmentType" label={intl.formatMessage({ id: 'ADDFILE.ATTACHMENTTYPE' })} component={FormikAutocomplete} options={attachmentTypes} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} getOptionLabel={(option) => (option.descriptionEn ? option.descriptionEn : '')} optionKey="id" idPropName="id" error={touched.attachmentType && !!errors.attachmentType} helperText={touched.attachmentType && errors.attachmentType} />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <AppField className="required" disabled={false} name="caseStage" label={intl.formatMessage({ id: 'ADDFILE.CASENUMBER' })} component={FormikAutocomplete} options={caseStages} optionLabel="caseNumber" getOptionLabel={(option) => (option.caseNumber ? option.caseNumber : '')} optionKey="id" idPropName="id" error={touched.caseStage && !!errors.caseStage} helperText={touched.caseStage && errors.caseStage} />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <AppField className="required" label={intl.formatMessage({ id: 'ADDFILE.ATTACHMENTNAME' })} name="attachmentName" error={touched.attachmentName && !!errors.attachmentName} helperText={touched.attachmentName && errors.attachmentName} />
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
                disabled={row?.id}
                uploadBtnTitle={intl.formatMessage({ id: 'FILEUPLOAD.UPLOAD' })}
                cameraBtnTitle={intl.formatMessage({ id: 'FILEUPLOAD.CAMERA' })}
                // setFile={(file) => setFieldValue('ownerIdAttach', file)}
              />
            </Grid>

            <Grid display="flex" justifyContent={'flex-end'} item sm={12} xs={12}>
              <AppButton type="reset" onClick={resetEditableRow} style={{ margin: '0px 10px' }}>
                {intl.formatMessage({ id: 'ADDFILE.reset' })}
              </AppButton>

              <AppButton type="submit" disabled={isLoading}>
                {intl.formatMessage({ id: 'ADDFILE.SAVE' })}
              </AppButton>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default SubForm
