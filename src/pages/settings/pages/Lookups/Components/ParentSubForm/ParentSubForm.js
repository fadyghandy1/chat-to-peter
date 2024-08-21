import { Grid, Paper, Box, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import AppField from '../../../../../../components/common/AppField/AppField'
import AppButton from '../../../../../../components/common/AppButton/AppButton'
import Logic from './Logic'
import React from 'react'
import FormikAutocomplete from '../../../../../../components/common/FormikAutocomplete/FormikAutocomplete'
import MaskedField from '../../../../../../components/common/MaskedField/MaskedField'
import { modes } from '../../../../../../components/common/wizard'

const SubSearch = React.forwardRef(({ getMasterLookupsMutation, setLookupData }, ref) => {
  const { onSubmit, InitialValueSearch, lookups, handleOnChangeLookup, addLookupMutation, editLookupMutaion, isEnglish, intl, validationSchema, generateUserName } = Logic({ ref, getMasterLookupsMutation, setLookupData, ref })
  const { isLoading: addLoading } = addLookupMutation
  const { isLoading: edidLoading } = editLookupMutaion
  return (
    <Paper sx={{ padding: '20px', marginBottom: 5 }}>
      <Formik initialValues={InitialValueSearch} onSubmit={onSubmit} innerRef={ref} validationSchema={validationSchema}>
        {({ errors, setFieldValue, values, touched }) => {
          console.log(values, 'ffdfdfdr')
          return (
            <Form>
              <Typography variant="h6" gutterBottom>
                {intl.formatMessage({ id: 'TABLE.LOOKUPS' })}
              </Typography>
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <AppField disabled={false} name="masterCodeId" label={intl.formatMessage({ id: 'MENU.LOOKUPS' })} setChangeEvent={(e) => handleOnChangeLookup(e, setFieldValue)} component={FormikAutocomplete} options={lookups} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} optionKey="id" idPropName="id" />
                </Grid>
                {values.masterCodeId?.id && (
                  <>
                    <Box width="100%" mt={6} mb={6} ml={3}>
                      <Typography variant="h6" gutterBottom>
                        {values.mode === modes.ADD ? intl.formatMessage({ id: 'RECORDS.LOOKUPS' }) : intl.formatMessage({ id: 'EDITRECORDS.LOOKUPS' })}
                      </Typography>

                      {/* Ensure full width and vertical spacing */}
                      <Grid container lg={10} spacing={2} rowSpacing={3} style={{ width: '100%' }}>
                        <Grid item sm={6} xs={12}>
                          <AppField
                            component={MaskedField}
                            name="nameAr"
                            label={intl.formatMessage({ id: 'SEARCHCLIENT.NAME_AR' })}
                            error={touched.nameAr && !!errors.nameAr}
                            helperText={touched.nameAr && errors.nameAr}
                            mask={/^[\u0600-\u06FF0-9 ]+$/}
                            onAccept={(value, mask) => {
                              debugger
                              setFieldValue('nameAr', value)
                            }}
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <AppField
                            component={MaskedField}
                            name="nameEn"
                            label={intl.formatMessage({ id: 'SEARCHCLIENT.NAME_EN' })}
                            error={touched.nameEn && !!errors.nameEn}
                            helperText={touched.nameEn && errors.nameEn}
                            mask={/^[a-zA-Z0-9\s]+$/}
                            onAccept={(value, mask) => {
                              setFieldValue('nameEn', value)
                              setFieldValue('credentialUserName', generateUserName(value?.trim()))
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                    <Grid display="flex" justifyContent={'flex-end'} item xs={12}>
                      <AppButton disabled={addLoading || edidLoading} type="submit">
                        {intl.formatMessage({ id: 'FORM.SUBMIT' })}
                      </AppButton>
                    </Grid>
                  </>
                )}
              </Grid>
            </Form>
          )
        }}
      </Formik>
    </Paper>
  )
})

export default SubSearch
