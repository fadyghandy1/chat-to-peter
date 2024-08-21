import { Grid, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useIntl } from 'react-intl'
import AppField from '../../../../../../components/common/AppField/AppField'
import Logic from './logic'
import { StyledBox } from '../../../../../../assets/styles/components.styles'

function LoginData({ values, setFieldValue, errors }) {
  debugger
  const { handleClickShowPassword, handleMouseDownPassword, showPassword } = Logic(values)
  const intl = useIntl()
  return (
    <StyledBox p={4}>
      <div className="stepsTitle">{intl.formatMessage({ id: 'ADDCLIENT.LOGIN_DATA' })}</div>

      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <AppField name="credentialUserName" autoComplete="off" label={intl.formatMessage({ id: 'ADDCLIENT.USERNAME' })} helperText={errors.credentialUserName} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <AppField
            name="credentialPassword"
            label={intl.formatMessage({ id: 'ADDCLIENT.PASSWORD' })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            autoComplete="new-password"
            helperText={errors.credentialPassword}
            type={showPassword ? 'text' : 'password'}
          />
        </Grid>
      </Grid>
    </StyledBox>
  )
}

export default LoginData
