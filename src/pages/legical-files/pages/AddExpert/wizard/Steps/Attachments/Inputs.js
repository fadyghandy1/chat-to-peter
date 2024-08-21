import { Box, Grid } from '@mui/material'
import React, { useRef } from 'react'
import { useIntl } from 'react-intl'
import { Field, Form, Formik } from 'formik'
import dayjs from 'dayjs'
import AppField from '../../../../../../../components/common/AppField/AppField'
import AppDatePicker from '../../../../../../../components/common/AppDatePicker/AppDatePicker'
import FileUpload from '../../../../../../../components/common/FileUpload/FileUpload'
import { attachmentsInputsvalidateSchema } from '../../../constants'
import Logic from './inputLogic'
import AppButton from '../../../../../../../components/common/AppButton/AppButton'

const Inputs = (props) => {
  const { attachmentsInputsInitials, onAddDocumentSubmit, isLoading } = Logic(props)
  const intl = useIntl()

  return (
    <Formik enableReinitialize initialValues={attachmentsInputsInitials} validationSchema={attachmentsInputsvalidateSchema} onSubmit={onAddDocumentSubmit}>
      {({ errors, touched, setFieldValue, values }) => {
        return (
          <Form>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <AppField name="documentType" label={intl.formatMessage({ id: 'ADDCLIENT.ATTACHMENTTYPE' })} helperText={errors.documentType} />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField component={AppDatePicker} label={intl.formatMessage({ id: 'ADDCLIENT.ATTACHMENTENDDATE' })} name="date" value={dayjs(values.date)} />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppField name="documentName" label={intl.formatMessage({ id: 'ADDCLIENT.ATTACHMENTNAME' })} helperText={errors.documentName} />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Field
                  name="document"
                  component={FileUpload}
                  setFieldValue={setFieldValue}
                  showScanBtn={false}
                  showCameraBtn={true}
                  title={intl.formatMessage({ id: 'ADDFILE.ATTACHMENT' })}
                  helperText={touched.document && errors.document}
                  errorMessage={errors.document ? errors.document : undefined}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Box display="flex">
                  <AppButton disabled={isLoading} type="submit">
                  {intl.formatMessage({ id: 'ADDFILE.SAVE' })}
                  </AppButton>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default Inputs
