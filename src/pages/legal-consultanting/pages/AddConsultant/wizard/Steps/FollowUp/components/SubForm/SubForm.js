import { Formik, Form } from 'formik'
import FormikAutocomplete from '../../../../../../../../../components/common/FormikAutocomplete/FormikAutocomplete'
import { useIntl } from 'react-intl'
import AppField from '../../../../../../../../../components/common/AppField/AppField'
import { Grid } from '@mui/material'
import AppButton from '../../../../../../../../../components/common/AppButton/AppButton'
import Logic from './Logic'
import AppDatePicker from '../../../../../../../../../components/common/AppDatePicker/AppDatePicker'
import dayjs from 'dayjs'
const SubForm = ({ setStages, row }) => {
  const { initialValues, onSubmit, consultants } = Logic(row, setStages)
  const intl = useIntl()

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
      {({ errors, touched, setFieldValue, values, resetForm, dirty }) => (
        <Form style={{ marginBottom: 20 }}>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <AppField component={AppDatePicker} label={intl.formatMessage({ id: 'DATE' })} name="date" value={dayjs(values.date)} />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <AppField
                name="consultant"
                // className="required"
                label={intl.formatMessage({ id: 'ADDCONSULT.CONSULTANT' })}
                component={FormikAutocomplete}
                options={consultants}
                optionKey="title"
                idPropName="title"
                isOptionEqualToValue={(option, value) => option.title == value.title}
                optionLabel="title"
              />
            </Grid>

            <Grid item lg={6} md={6} sm={6} xs={12}>
              <AppField name="followUpDetails" label={intl.formatMessage({ id: 'ADDCONSULT.FOLLOWUP_DETAILS' })} rows={3} multiline />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <AppField name="action" label={intl.formatMessage({ id: 'ADDCONSULT.ACTIONS' })} rows={3} multiline />
            </Grid>

            <Grid item sm={12} xs={12}>
              <AppButton type="submit"> {intl.formatMessage({ id: 'ADDFILE.SAVE' })}</AppButton>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default SubForm
