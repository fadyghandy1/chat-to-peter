import { Formik, Form } from 'formik'
import { forwardRef, useState } from 'react'
import FormikAutocomplete from '../../../../../../../../../components/common/FormikAutocomplete/FormikAutocomplete'
import AppField from '../../../../../../../../../components/common/AppField/AppField'
import { Grid } from '@mui/material'
import AppButton from '../../../../../../../../../components/common/AppButton/AppButton'
import Logic from './Logic'
import AppDatePicker from '../../../../../../../../../components/common/AppDatePicker/AppDatePicker'
import dayjs from 'dayjs'
import MaskedField from '../../../../../../../../../components/common/MaskedField/MaskedField'
import CollapsiblePanel from '../../../../../../../../../components/common/CollapsiblePanel/CollapsiblePanel.styles'
const SubForm = forwardRef(({ row, refetch, stageId, handleEditSuccess, editabledRow, resetEditableRow, clientValues }, ref) => {
  const { initialValues, onSubmit, clients, listOfLawyers, againsts, legalConsaultants, setClientInputValue, setAgainstInputValue, listOfAdmins, listOfSecretaries, directorates, caseStages, caseTypes, expertOffices, experts, courts, caseStatuses, clientCharacteristic, againstCharacteristic, submitCaseFileMutaion, formRef, validationSchema, expand, setExpand, isEnglish, intl } = Logic({ row, refetch, stageId, handleEditSuccess, editabledRow, ref })
  const { isLoading } = submitCaseFileMutaion
  console.log(row, 'fdddd')
  // Logic(row,refetch,stageId)
  console.log(clientValues.clients, 'fd clients')
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} innerRef={formRef} validationSchema={validationSchema} enableReinitialize>
      {({ errors, touched, setFieldValue, values, resetForm, dirty }) => (
        <Form style={{ marginBottom: 20 }}>
          <CollapsiblePanel sx={{ marginTop: 3 }} title={intl.formatMessage({ id: 'ADDANDEDIT.STAGES' })} expanded={expand} onClick={() => setExpand((prevState) => !prevState)}>
            <Grid container spacing={2}>
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
              <Grid item md={4} sm={6} xs={12}>
                <AppField name="cosultants" label={intl.formatMessage({ id: 'ADDFILE.CONSULTANT' })} component={FormikAutocomplete} options={legalConsaultants} optionKey="id" idPropName="id" isOptionEqualToValue={(option, value) => option.id == value.id} optionLabel={isEnglish ? 'nameInEnglish' : 'nameInArabic'} checkboxOption multiple error={touched.cosultants && !!errors.cosultants} helperText={touched.cosultants && errors.cosultants} />
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <AppField name="pleadingLawyers" label={intl.formatMessage({ id: 'ADDFILE.PLEADINGLAWER' })} component={FormikAutocomplete} options={listOfLawyers} optionKey="id" idPropName="id" isOptionEqualToValue={(option, value) => option.id == value.id} optionLabel={isEnglish ? 'nameInEnglish' : 'nameInArabic'} checkboxOption multiple error={touched.pleadingLawyers && !!errors.pleadingLawyers} helperText={touched.pleadingLawyers && errors.pleadingLawyers} className="required" />
              </Grid>
              {/* <Grid item md={4} sm={6} xs={12}>
                <AppField name="administrativeTaxpayers" label={intl.formatMessage({ id: 'ADDFILE.ADMINISTRATIVETAXPAYER' })} component={FormikAutocomplete} options={listOfAdmins} optionKey="id" idPropName="id" isOptionEqualToValue={(option, value) => option.id == value.id} optionLabel={isEnglish ? 'nameInEnglish' : 'nameInArabic'} checkboxOption multiple error={touched.administrativeTaxpayers && !!errors.administrativeTaxpayers} helperText={touched.administrativeTaxpayers && errors.administrativeTaxpayers} />
              </Grid> */}
              {/* <Grid item md={4} sm={6} xs={12}>
                <AppField name="secretary" label={intl.formatMessage({ id: 'ADDFILE.SECRETARY' })} component={FormikAutocomplete} options={listOfSecretaries} optionKey="id" idPropName="id" isOptionEqualToValue={(option, value) => option.id == value.id} optionLabel={isEnglish ? 'nameInEnglish' : 'nameInArabic'} checkboxOption multiple error={touched.secretary && !!errors.secretary} helperText={touched.secretary && errors.secretary} />
              </Grid> */}
              <Grid item md={4} sm={6} xs={12}>
                <AppField name="caseStage" className="required" label={intl.formatMessage({ id: 'ADDFILE.CASESTAGE' })} component={FormikAutocomplete} options={caseStages} optionKey="id" idPropName="id" isOptionEqualToValue={(option, value) => option.id == value.id} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} error={touched.caseStage && !!errors.caseStage} helperText={touched.caseStage && errors.caseStage} />
              </Grid>

              <Grid item md={4} sm={6} xs={12}>
                <AppField className="required" label={intl.formatMessage({ id: 'ADDFILE.CASENUMBER' })} name="caseNumber" autoComplete="off" error={touched.caseNumber && !!errors.caseNumber} helperText={touched.caseNumber && errors.caseNumber} />
              </Grid>
              <Grid item md={4} sm={6} xs={12}>
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
              <Grid item md={4} sm={6} xs={12}>
                <AppField label={intl.formatMessage({ id: 'ADDFILE.DIRECTORATE' })} name="directorate" className="required" component={FormikAutocomplete} options={directorates} optionKey="id" idPropName="id" isOptionEqualToValue={(option, value) => option.id == value.id} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} />
              </Grid>
              <Grid item md={4} sm={6} xs={12}>
                <AppField
                  name="caseType"
                  // className="required"
                  label={intl.formatMessage({ id: 'ADDFILE.CASETYPE' })}
                  component={FormikAutocomplete}
                  options={caseTypes}
                  optionKey="id"
                  idPropName="id"
                  isOptionEqualToValue={(option, value) => option.id == value.id}
                  optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={12}>
                <AppField
                  name="caseStatus"
                  // className="required"
                  label={intl.formatMessage({ id: 'ADDFILE.CASESTATUS' })}
                  component={FormikAutocomplete}
                  options={caseStatuses}
                  optionKey="id"
                  idPropName="id"
                  isOptionEqualToValue={(option, value) => option.id == value.id}
                  optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'}
                />
              </Grid>

              <Grid item md={4} sm={6} xs={12}>
                <AppField label={intl.formatMessage({ id: 'ADDFILE.CLIENTCAPACITY' })} name="clientCapacity" className="required" component={FormikAutocomplete} options={clientCharacteristic} optionKey="id" idPropName="id" isOptionEqualToValue={(option, value) => option.id == value.id} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} />
              </Grid>
              <Grid item md={4} sm={6} xs={12}>
                <AppField label={intl.formatMessage({ id: 'ADDFILE.AGAINSTCAPACITY' })} name="opponentCapacity" component={FormikAutocomplete} options={againstCharacteristic} optionKey="id" idPropName="id" isOptionEqualToValue={(option, value) => option.id == value.id} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} />
              </Grid>
              <Grid item md={4} sm={6} xs={12}>
                {/* <AppField
                  label={intl.formatMessage({ id: 'ADDFILE.COURTFEES' })}
                  name="courtFees"
                  onChange={(e) => {
                    const inputValue = e.target.value

                    // Check if the entered value contains Arabic letters
                    const hasNum = /^\d+$/.test(inputValue)

                    // If the entered value contains English letters, revert the input value
                    if (hasNum) {
                      setFieldValue('courtFees', inputValue)
                    }
                  }}
                /> */}
                <AppField label={intl.formatMessage({ id: 'ADDFILE.COURTFEES' })} name="courtFees" autoComplete="off" error={touched.courtFees && !!errors.courtFees} helperText={touched.courtFees && errors.courtFees} className="required" />
              </Grid>
              <Grid item md={4} sm={6} xs={12}>
                <AppField component={AppDatePicker} label={intl.formatMessage({ id: 'ADDFILE.CASEDATE' })} name="caseDate" value={dayjs(values.caseDate)} />
              </Grid>
              <Grid item md={4} sm={6} xs={12}>
                <AppField
                  name="expertOffice"
                  // className="required"
                  label={intl.formatMessage({ id: 'ADDFILE.EXPERTOFFICE' })}
                  component={FormikAutocomplete}
                  options={expertOffices}
                  optionKey="id"
                  idPropName="id"
                  isOptionEqualToValue={(option, value) => option.id == value.id}
                  optionLabel={isEnglish ? 'nameInEnglish' : 'nameInArabic'}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={12}>
                <AppField
                  name="expert"
                  // className="required"
                  label={intl.formatMessage({ id: 'ADDFILE.EXPERT' })}
                  component={FormikAutocomplete}
                  options={experts}
                  optionKey="id"
                  idPropName="id"
                  isOptionEqualToValue={(option, value) => option.id == value.id}
                  optionLabel="name"
                />
              </Grid>

              <Grid item md={4} sm={6} xs={12}>
                <AppField
                  name="caseSummeryAr"
                  label={intl.formatMessage({ id: 'ADDFILE.CASESUMMERY_AR' })}
                  rows={3}
                  multiline
                  onChange={(e) => {
                    const inputValue = e.target.value

                    // Check if the entered value contains Arabic letters
                    const hasArabic = /[\u0600-\u06FF]/.test(inputValue)

                    // If the entered value contains Arabic letters, revert the input value
                    if (hasArabic) {
                      setFieldValue('caseSummeryAr', inputValue)
                    }
                  }}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={12}>
                <AppField
                  name="caseSummeryEn"
                  label={intl.formatMessage({ id: 'ADDFILE.CASESUMMERY_EN' })}
                  rows={3}
                  multiline
                  // unmask={'typed'}
                  onChange={(e) => {
                    const inputValue = e.target.value

                    // Check if the entered value contains Arabic letters
                    const hasEnglish = /^[a-zA-Z0-9\s]+$/.test(inputValue)

                    // If the entered value contains English letters, revert the input value
                    if (hasEnglish) {
                      setFieldValue('caseSummeryEn', inputValue)
                    }
                  }}
                />
              </Grid>

              <Grid display="flex" justifyContent={'flex-end'} item sm={12} xs={12}>
                <AppButton type="reset" onClick={resetEditableRow} style={{ margin: '0px 10px' }}>
                  {intl.formatMessage({ id: 'ADDFILE.reset' })}
                </AppButton>

                <AppButton disabled={isLoading} type="submit">
                  {intl.formatMessage({ id: 'ADDFILE.SAVE' })}
                </AppButton>
              </Grid>
            </Grid>
          </CollapsiblePanel>
        </Form>
      )}
    </Formik>
  )
})
export default SubForm
