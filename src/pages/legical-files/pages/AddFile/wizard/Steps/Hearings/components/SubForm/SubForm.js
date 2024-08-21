import { Formik, Form } from 'formik'
import FormikAutocomplete from '../../../../../../../../../components/common/FormikAutocomplete/FormikAutocomplete'
import AppField from '../../../../../../../../../components/common/AppField/AppField'
import { Grid } from '@mui/material'
import AppButton from '../../../../../../../../../components/common/AppButton/AppButton'
import Logic from './Logic'
import AppDatePicker from '../../../../../../../../../components/common/AppDatePicker/AppDatePicker'
import dayjs from 'dayjs'
import MaskedField from '../../../../../../../../../components/common/MaskedField/MaskedField'
import CollapsiblePanel from '../../../../../../../../../components/common/CollapsiblePanel/CollapsiblePanel.styles'
import { forwardRef, useImperativeHandle } from 'react'

const SubForm = forwardRef(({ row, refetch, hearingId, handleEditSuccess, resetEditableRow }, ref) => {
  const { initialValues, onSubmit, validationSchema, hearingTypes, casesNumbers, pleadingLawyers, cosultants, formRef, administrativeTaxpayers, secretaryList, expand, setExpand, isEnglish, intl } = Logic(row, refetch, hearingId, handleEditSuccess, ref)

  console.log(casesNumbers)
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} innerRef={formRef} validationSchema={validationSchema} enableReinitialize>
      {({ setFieldValue, values, errors, touched }) => (
        <Form style={{ marginBottom: 20 }}>
          <CollapsiblePanel sx={{ marginBottom: 20, marginTop: 5 }} title={intl.formatMessage({ id: 'ADDANDEDIT.HEERING' })} expanded={expand} onClick={() => setExpand((prevState) => !prevState)}>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <AppField
                  label={intl.formatMessage({ id: 'ADDFILE.CASENUMBER' })}
                  disabled={!!hearingId}
                  className="required"
                  name="caseNumber"
                  component={FormikAutocomplete}
                  options={casesNumbers}
                  optionKey="id"
                  idPropName="id"
                  isOptionEqualToValue={(option, value) => option.id == value.id}
                  optionLabel="caseNumber"
                  setChangeEvent={(value) => {
                    setFieldValue('directorate', value && value.caseDirectorate ? value.caseDirectorate?.descriptionEn : '')
                  }}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <AppField label={intl.formatMessage({ id: 'ADDFILE.DIRECTORATE' })} name="directorate" disabled={true} />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <AppField
                  name="hearingType"
                  // className="required"
                  disabled={false}
                  label={intl.formatMessage({ id: 'ADDFILE.HEARINGTYPE' })}
                  component={FormikAutocomplete}
                  options={hearingTypes}
                  optionKey="id"
                  idPropName="id"
                  isOptionEqualToValue={(option, value) => option.id == value.id}
                  optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <AppField component={AppDatePicker} label={intl.formatMessage({ id: 'ADDFILE.CURRENTHEARINGDATE' })} name="currentDate" value={dayjs(values.currentDate)} />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <AppField component={AppDatePicker} label={intl.formatMessage({ id: 'ADDFILE.NEXTHEARINGDATE' })} name="nextDate" value={dayjs(values.nextDate)} />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <AppField name="cosultants" className="required" disabled={false} label={intl.formatMessage({ id: 'ADDFILE.CONSULTANT' })} component={FormikAutocomplete} options={cosultants} optionKey="id" isOptionEqualToValue={(option, value) => option.id == value.id} optionLabel={isEnglish ? 'nameInEnglish' : 'nameInArabic'} checkboxOption multiple error={touched.cosultants && !!errors.cosultants} helperText={touched.cosultants && errors.cosultants} />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <AppField name="pleadingLawyers" className="required" disabled={false} label={intl.formatMessage({ id: 'ADDFILE.PLEADINGLAWER' })} component={FormikAutocomplete} options={pleadingLawyers} optionKey="id" isOptionEqualToValue={(option, value) => option.id == value.id} optionLabel={isEnglish ? 'nameInEnglish' : 'nameInArabic'} checkboxOption multiple error={touched.pleadingLawyers && !!errors.pleadingLawyers} helperText={touched.pleadingLawyers && errors.pleadingLawyers} />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <AppField name="administrativeTaxpayers" className="required" disabled={false} label={intl.formatMessage({ id: 'ADDFILE.ADMINISTRATIVETAXPAYER' })} component={FormikAutocomplete} options={administrativeTaxpayers} optionKey="id" isOptionEqualToValue={(option, value) => option.id == value.id} optionLabel={isEnglish ? 'nameInEnglish' : 'nameInArabic'} checkboxOption multiple error={touched.administrativeTaxpayers && !!errors.administrativeTaxpayers} helperText={touched.administrativeTaxpayers && errors.administrativeTaxpayers} />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <AppField name="secretary" className="required" disabled={false} label={intl.formatMessage({ id: 'ADDFILE.SECRETARY' })} component={FormikAutocomplete} options={secretaryList} optionKey="id" isOptionEqualToValue={(option, value) => option.id == value.id} optionLabel={isEnglish ? 'nameInEnglish' : 'nameInArabic'} checkboxOption multiple error={touched.secretary && !!errors.secretary} helperText={touched.secretary && errors.secretary} />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <AppField
                  component={MaskedField}
                  name="hallNo"
                  className="required"
                  label={intl.formatMessage({ id: 'ADDFILE.HALLNO' })}
                  autoComplete="off"
                  error={touched.hallNo && !!errors.hallNo}
                  helperText={touched.hallNo && errors.hallNo}
                  mask={[
                    {
                      mask: Number, // enable number mask
                      scale: 0, // digits after point, 0 for integers
                    },
                  ]}
                  unmask={'typed'}
                  onAccept={(value, mask) => {
                    setFieldValue('hallNo', value)
                  }}
                />
              </Grid>

              <Grid item lg={6} md={6} sm={6} xs={12}>
                <AppField
                  component={MaskedField}
                  name="currentDecisionEn"
                  label={intl.formatMessage({ id: 'ADDFILE.CURRENTDECISION_EN' })}
                  rows={3}
                  multiline
                  // unmask={'typed'}
                  onChange={(e) => {
                    const inputValue = e.target.value

                    // Check if the entered value contains Arabic letters
                    const hasEnglish = /^[a-zA-Z0-9\s]+$/.test(inputValue)

                    // If the entered value contains English letters, revert the input value
                    if (hasEnglish) {
                      setFieldValue('currentDecisionEn', inputValue)
                    }
                  }}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <AppField
                  component={MaskedField}
                  name="currentDecisionAr"
                  label={intl.formatMessage({ id: 'ADDFILE.CURRENTDECISION_AR' })}
                  rows={3}
                  multiline
                  // unmask={'typed'}
                  onChange={(e) => {
                    const inputValue = e.target.value

                    // Check if the entered value contains Arabic letters
                    const hasArabic = /[\u0600-\u06FF]/.test(inputValue)

                    // If the entered value contains Arabic letters, revert the input value
                    if (hasArabic) {
                      setFieldValue('currentDecisionAr', inputValue)
                    }
                  }}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <AppField name="notes" label={intl.formatMessage({ id: 'ADDFILE.NOTES' })} rows={3} multiline />
              </Grid>

              <Grid display="flex" justifyContent={'flex-end'} item sm={12} xs={12}>
                <AppButton type="reset" onClick={resetEditableRow} style={{ margin: '0px 10px' }}>
                  {intl.formatMessage({ id: 'ADDFILE.reset' })}
                </AppButton>

                <AppButton type="submit"> {intl.formatMessage({ id: 'ADDFILE.SAVE' })}</AppButton>
              </Grid>
            </Grid>
          </CollapsiblePanel>
        </Form>
      )}
    </Formik>
  )
})

export default SubForm
