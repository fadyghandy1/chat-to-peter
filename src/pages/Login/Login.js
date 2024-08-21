import { Box, Card, CardContent, Hidden, TextField, Typography } from '@mui/material'
import { initialState, validationSchema } from './constants'
import { Field, Form, Formik } from 'formik'
import Logo from '../../assets/images/Dubai_logo-1-1-1_ab6ffcbb-fc57-438d-ae7b-4bfd451275a1_300x300.webp'
import AppButton from '../../components/common/AppButton/AppButton.styles'
import Logic from './logic'
import { StyledField } from './Login.styles'
import { useIntl } from 'react-intl'
import { Navigate } from 'react-router-dom'

const Login = ({ className }) => {
  const { handleFormSubmit, loginMutation } = Logic()
  const { isLoading } = loginMutation
  const intl = useIntl()
  const token = localStorage.getItem(process.env.REACT_APP_TOKEN)
  if (token) {
    return <Navigate to="/" replace />
  }
  return (
    <div className={className}>
      <div className="loginWrap">
        <Card className="leftSection" square elevation={0}>
          <CardContent className="leftSelection">
            <div style={{ margin: '0 0 32px' }}>
              <img className="logo-icon" style={{ width: '200px' }} src={Logo} alt="logo" />
            </div>

            <Formik enableReinitialize={true} initialValues={initialState} validationSchema={validationSchema} onSubmit={handleFormSubmit}>
              {(props) => (
                <Form>
                  <Box mb={2}>
                    <StyledField name="username" placeholder={intl.formatMessage({ id: 'ADDCLIENT.USERNAME' })} />
                    {/* <Field as={TextField} fullWidth name="username" label="Username" variant="outlined" error={!!props.errors.username} helperText={props.errors.username} /> */}
                  </Box>

                  <Box mb={2}>
                    <StyledField name="password" placeholder={intl.formatMessage({ id: 'ADDCLIENT.PASSWORD' })} type="password" />
                    {/* <Field as={TextField} fullWidth name="password" label="Password" variant="outlined" error={!!props.errors.password} helperText={props.errors.password} type="password" /> */}
                  </Box>

                  <Box mb={3}>
                    {/* {data.errorMessage && <span className="form-error"> {data.errorMessage}</span>} */}

                    <AppButton className="loginButton" fullWidth variant="contained" color="secondary" type="submit" disabled={isLoading} style={{ width: '50%' }}>
                      {isLoading ? intl.formatMessage({ id: 'LOADING' }) : intl.formatMessage({ id: 'LOGIN.LOGIN' })}
                    </AppButton>
                  </Box>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>

        {/* <Hidden only={['xs', 'sm']}>
          <div className="rightSection">
            <div style={{ maxWidth: '450px' }}>
              <Typography variant="h3" className="rightTitle">
                Welcome to TMS
              </Typography>

              <Typography variant="h5" className="rightP">
                This portal is an online gate for all the traffic management services.
              </Typography>
            </div>
          </div>
        </Hidden> */}
      </div>
      <div className="slogan">
        <h1 className="s-text">{intl.formatMessage({ id: 'LOGIN.TEXT' })}</h1>
        <h3 className="s-history">{intl.formatMessage({ id: 'LOGIN.HISTORY' })}</h3>
      </div>
    </div>
  )
}

export default Login
