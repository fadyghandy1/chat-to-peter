import { Alert, Grid } from '@mui/material'
import StyledAppField from '../../../../../../../components/common/AppField/AppField.styles'
import FormikAutocomplete from '../../../../../../../components/common/FormikAutocomplete/FormikAutocomplete'
import Logic from './Logic'
import { StyledBox } from '../../wizard.styles'
import AppDatePicker from '../../../../../../../components/common/AppDatePicker/AppDatePicker'
import { useIntl } from 'react-intl'
import { Form, Formik } from 'formik'
import AppButton from '../../../../../../../components/common/AppButton/AppButton'
import MaskedField from '../../../../../../../components/common/MaskedField/MaskedField'
import AppField from '../../../../../../../components/common/AppField/AppField'

const FileInfo = ({ values: formikWizardValues, errors: formikWizardErrors }) => {
  const { initialValues, fileTypes, getOfficesBranches, getFilesStatuses, onFileInfoSubmit, validationSchema, createCaseFileMutation, clients, setClientInputValue, setAgainstInputValue, againsts, isEnglish, intl } = Logic()
  const { isLoading } = createCaseFileMutation
  return (
    <>
      {formikWizardErrors.fileId && <Alert severity="error">{formikWizardErrors.fileId}</Alert>}
      <StyledBox p={4}>
        <div className="stepsTitle">{intl.formatMessage({ id: 'ADDFILE.FILEINFO' })}</div>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onFileInfoSubmit}>
          {({ setFieldValue, touched, errors }) => {
            console.log(initialValues)
            return (
              <Form style={{ marginBottom: 20 }}>
                <Grid container spacing={2}>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <StyledAppField disabled={!!formikWizardValues.fileId} className="required" name="fileNumber" label={intl.formatMessage({ id: 'ADDFILE.FILENUMBER' })} />
                  </Grid>

                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <AppField
                      // disableFilter
                      textFieldProps={{
                        // onChange: (e) => setClientInputValue(e.target.value),
                        onBlur: () => setClientInputValue(''),
                      }}
                      blurOnSelect="touch"
                      onInputChange={(event, newInputValue) => {
                        setClientInputValue(newInputValue)
                      }}
                      disabled={!!formikWizardValues.fileId}
                      name="clients"
                      className="required"
                      label={intl.formatMessage({ id: 'ADDFILE.CLIENTS' })}
                      component={FormikAutocomplete}
                      options={clients}
                      optionKey="id"
                      idPropName="id"
                      isOptionEqualToValue={(option, value) => option.id == value.id}
                      optionLabel={isEnglish ? 'nameInEnglish' : 'nameInArabic'}
                      checkboxOption
                      multiple
                      error={touched.clients && !!errors.clients}
                      helperText={touched.clients && errors.clients}
                    />
                  </Grid>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <AppField
                      // disableFilter
                      textFieldProps={{
                        // onChange: (e) => setClientInputValue(e.target.value),
                        onBlur: () => setAgainstInputValue(''),
                      }}
                      blurOnSelect="touch"
                      onInputChange={(event, newInputValue) => {
                        setAgainstInputValue(newInputValue)
                      }}
                      disabled={!!formikWizardValues.fileId}
                      name="againsts"
                      className="required"
                      label={intl.formatMessage({ id: 'ADDFILE.AGAINSTS' })}
                      component={FormikAutocomplete}
                      options={againsts}
                      optionKey="id"
                      idPropName="id"
                      isOptionEqualToValue={(option, value) => option.id == value.id}
                      optionLabel={isEnglish ? 'nameInEnglish' : 'nameInArabic'}
                      checkboxOption
                      multiple
                      error={touched.againsts && !!errors.againsts}
                      helperText={touched.againsts && errors.againsts}
                    />
                  </Grid>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <StyledAppField disabled={!!formikWizardValues.fileId} className="required" name="fileType" label={intl.formatMessage({ id: 'ADDFILE.FILETYPE' })} component={FormikAutocomplete} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} options={fileTypes} optionKey="id" idPropName="id" isOptionEqualToValue={(option, value) => option.id == value.id} />
                  </Grid>
                  {/* <Grid item lg={4} md={4} sm={6} xs={12}>
                    <StyledAppField disabled={!!formikWizardValues.fileId} className="required" name="fileCategory" label={intl.formatMessage({ id: 'ADDFILE.FILECATEGORY' })} component={FormikAutocomplete} options={fileCategories} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} optionKey="id" idPropName="id" isOptionEqualToValue={(option, value) => option.id == value.id} />
                  </Grid> */}
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <StyledAppField disabled={!!formikWizardValues.fileId} className="required" name="officeBranch" label={intl.formatMessage({ id: 'ADDFILE.OFFICEBRANCH' })} component={FormikAutocomplete} options={getOfficesBranches} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} optionKey="id" idPropName="id" isOptionEqualToValue={(option, value) => option.id == value.id} />
                  </Grid>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <StyledAppField
                      // component={MaskedField}
                      disabled={!!formikWizardValues.fileId}
                      name="clientFileNumber"
                      label={intl.formatMessage({ id: 'ADDFILE.CLIENTFILENUMBER' })}
                      // mask={[
                      //   {
                      //     mask: Number, // enable number mask
                      //     scale: 0, // digits after point, 0 for integers
                      //   },
                      // ]}
                      // unmask={'typed'}
                      // onAccept={(value, mask) => {
                      //   setFieldValue('clientFileNumber', value)
                      // }}
                    />
                  </Grid>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <StyledAppField disabled={!!formikWizardValues.fileId} className="required" component={AppDatePicker} label={intl.formatMessage({ id: 'ADDFILE.YEAR' })} name="year" views={['year']} format={'YY'} />
                  </Grid>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <StyledAppField disabled={!!formikWizardValues.fileId} className="required" component={AppDatePicker} label={intl.formatMessage({ id: 'ADDFILE.RECEIVEFILEDATE' })} name="receiveFileDate" />
                  </Grid>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <StyledAppField
                      component={MaskedField}
                      disabled={!!formikWizardValues.fileId}
                      name="claimValue"
                      className="required"
                      label={intl.formatMessage({ id: 'ADDFILE.CLAIMVALUE' })}
                      mask={[
                        {
                          mask: Number, // enable number mask
                          scale: 2, // digits after point, 0 for integers
                          thousandsSeparator: '', // any single char
                          padFractionalZeros: false, // if true, then pads zeros at end to the length of scale
                          normalizeZeros: true, // appends or removes zeros at ends
                          radix: ',', // fractional delimiter
                          mapToRadix: ['.'], // symbols to process as radix}
                        },
                      ]}
                      unmask={'typed'}
                      onAccept={(value, mask) => {
                        setFieldValue('claimValue', value)
                      }}
                    />
                  </Grid>

                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <StyledAppField disabled={!!formikWizardValues.fileId} className="required" name="fileStatus" label={intl.formatMessage({ id: 'ADDFILE.FILESTATUS' })} component={FormikAutocomplete} options={getFilesStatuses} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} optionKey="id" idPropName="id" isOptionEqualToValue={(option, value) => option.id == value.id} />
                  </Grid>

                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    {/* <StyledAppField 
                    disabled={!!formikWizardValues.fileId} name="caseSummeryAr" 
                    label={intl.formatMessage({ id: 'ADDFILE.CASESUMMERY_AR' })} multiline rows={3} height="auto" /> */}
                    <StyledAppField
                      component={MaskedField}
                      disabled={!!formikWizardValues.fileId}
                      name="caseSummeryAr"
                      className="required"
                      label={intl.formatMessage({ id: 'ADDFILE.CASESUMMERY_AR' })}
                      multiline
                      rows={3}
                      height="auto"
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
                      disabled={!!formikWizardValues.fileId}
                      name="caseSummeryEn"
                      className="required"
                      label={intl.formatMessage({ id: 'ADDFILE.CASESUMMERY_EN' })}
                      multiline
                      rows={3}
                      height="auto"
                      mask={/^[a-zA-Z0-9\s]+$/}
                      // unmask={'typed'}
                      onAccept={(value, mask) => {
                        setFieldValue('caseSummeryEn', value)
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid display="flex" justifyContent={'flex-end'} item sm={12} xs={12} sx={{ marginTop: '16px' }}>
                  <AppButton type="submit" disabled={isLoading || !!formikWizardValues.fileId}>
                    {intl.formatMessage({ id: 'ADDFILE.SAVE' })}
                  </AppButton>
                </Grid>
              </Form>
            )
          }}
        </Formik>
      </StyledBox>
    </>
  )
}

export default FileInfo
