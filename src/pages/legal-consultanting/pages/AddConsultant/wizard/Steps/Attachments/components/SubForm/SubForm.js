import { Formik, Form } from 'formik'
import { useState } from 'react'
import FormikAutocomplete from '../../../../../../../../../components/common/FormikAutocomplete/FormikAutocomplete'
import { useIntl } from 'react-intl'
import AppField from '../../../../../../../../../components/common/AppField/AppField'
import { Grid } from '@mui/material'
import AppDatePicker from '../../../../../../../../../components/common/AppDatePicker/AppDatePicker'
import FileUpload from '../../../../../../../../../components/common/FileUpload/FileUpload.styles'
import AppButton from '../../../../../../../../../components/common/AppButton/AppButton'
import dayjs from 'dayjs'
import Logic from './Logic'
const SubForm = ({ setAttachments, row }) => {
  const { initialValues, onSubmit, attachmentTypes } = Logic(row, setAttachments)
  const intl = useIntl()

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
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
                optionKey="title"
                idPropName="title"
                isOptionEqualToValue={(option, value) => option.title == value.title}
                optionLabel="title"
              />
            </Grid>

            <Grid item lg={6} md={6} sm={6} xs={12}>
              <AppField component={AppDatePicker} label={intl.formatMessage({ id: 'ADDFILE.ATTACHMENTENDDATE' })} name="attachmentEndDate" value={dayjs(values.attachmentEndDate)} />
            </Grid>

            <Grid item lg={6} md={6} sm={6} xs={12}>
              <AppField label={intl.formatMessage({ id: 'ADDFILE.ATTACHMENTNAME' })} name="attachmentName" />
            </Grid>

            <Grid item lg={6} md={6} sm={6} xs={12}>
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
                // setFile={(file) => setFieldValue('ownerIdAttach', file)}
              />
            </Grid>

            <Grid item lg={6} md={6} sm={6} xs={12}>
              <AppButton type="submit"> {intl.formatMessage({ id: 'ADDFILE.SAVE' })}</AppButton>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default SubForm
