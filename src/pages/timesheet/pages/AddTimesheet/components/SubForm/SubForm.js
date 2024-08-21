import { Grid, Paper } from '@mui/material'
import { Form, Formik } from 'formik'
import dayjs from 'dayjs'
import { file } from '../../constants'
import AppField from '../../../../../../components/common/AppField/AppField'
import AppButton from '../../../../../../components/common/AppButton/AppButton'
import Logic from './Logic'
import FormikAutocomplete from '../../../../../../components/common/FormikAutocomplete/FormikAutocomplete'
import FormikRadioGroup from '../../../../../../components/common/FormikRadioGroup/FormikRadioGroup'
import AppDatePicker from '../../../../../../components/common/AppDatePicker/AppDatePicker'
import { modes } from '../../../../../../components/common/wizard'

const SubForm = ({ initialValues, timesheetId, mode = modes.ADD, handleOnUpdated }) => {
  const { intl, onSubmit, employees, taskTypes, taskStatus, isLoading, getAllCasesByFileNumberHandler, caseByFileNum, validationSchema } = Logic({ timesheetId, mode, initialValues, handleOnUpdated })
  const locale = intl.locale
  const isEnglish = locale === 'en'
  return (
    <>
      <Paper sx={{ padding: '20px' }}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ errors, values, touched }) => (
            <Form>
              <Grid container spacing={2}>
                {mode === modes.ADD && (
                  <Grid item xs={12}>
                    <AppField
                      name="file"
                      component={FormikRadioGroup}
                      rowDirection={true}
                      orientation="horizontal"
                      fieldValue="id"
                      fieldLabel="label"
                      sx={{ justifyContent: 'space-around' }}
                      options={[
                        { id: file.withFile, label: intl.formatMessage({ id: 'TIMESHEET_WITHFILE' }) },
                        { id: file.withoutFile, label: intl.formatMessage({ id: 'TIMESHEET_WITHOUTFILE' }) },
                      ]}
                    />
                  </Grid>
                )}
                {values.file === file.withFile ? (
                  <>
                    <Grid item sm={6} xs={12}>
                      <AppField
                        name="fileNo"
                        onBlur={(e) => {
                          if (e.target.value) {
                            getAllCasesByFileNumberHandler(e.target.value)
                          }
                        }}
                        className="required"
                        label={intl.formatMessage({ id: 'TIMESHEET_FILENO' })}
                        helperText={errors.phone}
                        type="text"
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <AppField disabled={false} name="caseNo" label={intl.formatMessage({ id: 'TIMESHEET_CASENO' })} component={FormikAutocomplete} options={caseByFileNum} optionKey="id" idPropName="id" isOptionEqualToValue={(option, value) => option.id == value.id} optionLabel="caseNumber" />
                    </Grid>
                  </>
                ) : null}
                <Grid item sm={6} xs={12}>
                  <AppField disabled={false} name="employee" className="required" label={intl.formatMessage({ id: 'TIMESHEET_EMPLOYEE' })} component={FormikAutocomplete} options={employees} optionKey="id" idPropName="id" isOptionEqualToValue={(option, value) => option.id == value.id} optionLabel="staffName" error={touched.employee && !!errors.employee} helperText={touched.employee && errors.employee} />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <AppField name="dueDate" component={AppDatePicker} label={intl.formatMessage({ id: 'TIMESHEET_DUEDATE' })} value={dayjs(values.dueDate)} />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <AppField disabled={false} name="taskType" className="required" label={intl.formatMessage({ id: 'TIMESHEET_TASKTYPE' })} component={FormikAutocomplete} options={taskTypes} optionKey="id" idPropName="id" isOptionEqualToValue={(option, value) => option.id == value.id} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} error={touched.taskType && !!errors.taskType} helperText={touched.taskType && errors.taskType} />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <AppField disabled={false} name="taskStatus" className="required" label={intl.formatMessage({ id: 'TIMESHEET_TASKSTATUS' })} component={FormikAutocomplete} options={taskStatus} optionKey="id" idPropName="id" isOptionEqualToValue={(option, value) => option.id == value.id} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} helperText={errors.taskStatus} />
                </Grid>
                <Grid item xs={12}>
                  <AppField multiline minRows={3} name="taskDesc" label={intl.formatMessage({ id: 'TIMESHEET_TASKDESC' })} helperText={errors.taskDesc} />
                </Grid>
                <Grid item xs={12}>
                  <AppButton type="submit" disabled={isLoading}>
                    {intl.formatMessage({ id: 'WIZARD.SUBMIT' })}
                  </AppButton>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </>
  )
}

export default SubForm
