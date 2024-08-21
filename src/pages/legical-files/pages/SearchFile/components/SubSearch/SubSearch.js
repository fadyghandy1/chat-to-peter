import { Grid, Paper } from '@mui/material'
import { Form, Formik } from 'formik'
import StyledAppField from '../../../../../../components/common/AppField/AppField.styles'
import AppDatePicker from '../../../../../../components/common/AppDatePicker/AppDatePicker'

import AppField from '../../../../../../components/common/AppField/AppField'
import AppButton from '../../../../../../components/common/AppButton/AppButton'
import Logic from './Logic'
import FormikAutocomplete from '../../../../../../components/common/FormikAutocomplete/FormikAutocomplete'
import React from 'react'
import MaskedField from '../../../../../../components/common/MaskedField/MaskedField'

const SubSearch = React.forwardRef(({ searchFileMutation }, ref) => {
  //   const { isLoading } = searchOpponentMutation
  const { onSubmit, initialValues, fileTypes, getOfficesBranches, getFilesStatuses, searchFileSchema, isEnglish, intl, courts } = Logic({ searchFileMutation })
  return (
    <Paper sx={{ padding: '20px', marginBottom: 5 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={searchFileSchema}
        onSubmit={onSubmit}
        //   innerRef={ref}
      >
        {({ errors, setFieldValue, touched }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <StyledAppField name="fileNumber" label={intl.formatMessage({ id: 'ADDFILE.FILENUMBER' })} />
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <AppField label={intl.formatMessage({ id: 'ADDFILE.CASENUMBER' })} name="caseNumber" autoComplete="off" error={touched.caseNumber && !!errors.caseNumber} helperText={touched.caseNumber && errors.caseNumber} />
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <AppField name="client" label={intl.formatMessage({ id: 'ADDCLIENT.CLIENTNAME' })} helperText={errors.client} type="text" />
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <AppField name="against" label={intl.formatMessage({ id: 'ADDCLIENT.OPENATNAME' })} helperText={errors.against} type="text" />
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <StyledAppField
                  component={MaskedField}
                  name="caseSummeryAr"
                  label={intl.formatMessage({ id: 'ADDFILE.CASESUMMERY_AR' })}
                  mask={/^[\u0600-\u06FF0-9 ]+$/}
                  // unmask={'typed'}
                  onAccept={(value, mask) => {
                    setFieldValue('caseSummeryAr', value)
                  }}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <StyledAppField
                  component={MaskedField}
                  name="caseSummeryEn"
                  label={intl.formatMessage({ id: 'ADDFILE.CASESUMMERY_EN' })}
                  mask={/^[a-zA-Z0-9\s]+$/}
                  // unmask={'typed'}
                  onAccept={(value, mask) => {
                    setFieldValue('caseSummeryEn', value)
                  }}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <AppField
                  name="court"
                  // className="required"
                  label={intl.formatMessage({ id: 'ADDFILE.COURT' })}
                  component={FormikAutocomplete}
                  options={courts}
                  optionKey="id"
                  idPropName="id"
                  isOptionEqualToValue={(option, value) => option.id == value.id}
                  optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <StyledAppField component={AppDatePicker} label={intl.formatMessage({ id: 'ADDFILE.YEAR' })} name="year" views={['year']} format={'YY'} />
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <StyledAppField name="fileStatus" label={intl.formatMessage({ id: 'ADDFILE.FILESTATUS' })} component={FormikAutocomplete} options={getFilesStatuses} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} optionKey="id" idPropName="id" isOptionEqualToValue={(option, value) => option.id == value.id} />
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <StyledAppField name="fileType" label={intl.formatMessage({ id: 'ADDFILE.FILETYPE' })} component={FormikAutocomplete} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} options={fileTypes} optionKey="id" idPropName="id" isOptionEqualToValue={(option, value) => option.id == value.id} />
              </Grid>
              {/* <Grid item lg={4} md={4} sm={6} xs={12}>
                <StyledAppField name="fileCategory" label={intl.formatMessage({ id: 'ADDFILE.FILECATEGORY' })} component={FormikAutocomplete} options={fileCategories} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} optionKey="id" idPropName="id" isOptionEqualToValue={(option, value) => option.id == value.id} />
              </Grid> */}
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <StyledAppField name="officeBranch" label={intl.formatMessage({ id: 'ADDFILE.OFFICEBRANCH' })} component={FormikAutocomplete} options={getOfficesBranches} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} optionKey="id" idPropName="id" isOptionEqualToValue={(option, value) => option.id == value.id} />
              </Grid>

              <Grid display="flex" justifyContent={'flex-end'} item xs={12}>
                <AppButton
                  //  disabled={isLoading}
                  type="submit"
                >
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
