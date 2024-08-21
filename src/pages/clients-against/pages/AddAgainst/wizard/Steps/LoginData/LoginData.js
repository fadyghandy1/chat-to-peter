import { Grid } from '@mui/material'
import { useIntl } from 'react-intl'
import AppField from '../../../../../../../components/common/AppField/AppField'
import { StyledBox } from '../../wizard.styles'

function ClientDetails({ values, setFieldValue, errors }) {
  // const { serviceCenterOptions, selectedBranch, setSelectedBranch, state } = Logic(values)
  // console.log('selectedBranch', selectedBranch)
  const intl = useIntl()

  return (
    <StyledBox p={4}>
      <div className="stepsTitle">{intl.formatMessage({ id: 'ADDOPPONENT.LOGIN_DATA' })}</div>

      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <AppField name="username" label={intl.formatMessage({ id: 'ADDOPPONENT.USERNAME' })} helperText={errors.username} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <AppField name="password" label={intl.formatMessage({ id: 'ADDOPPONENT.PASSWORD' })} helperText={errors.password} type="password" />
        </Grid>
      </Grid>
    </StyledBox>
  )
}

export default ClientDetails
