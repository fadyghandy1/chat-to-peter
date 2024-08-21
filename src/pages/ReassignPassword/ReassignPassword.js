import { Box, Card, CardContent } from '@mui/material'
import { initialState, validationSchema } from './constants'
import { Field, Form, Formik } from 'formik'
import Logo from '../../assets/images/Dubai_logo-1-1-1_ab6ffcbb-fc57-438d-ae7b-4bfd451275a1_300x300.webp'
import AppButton from '../../components/common/AppButton/AppButton.styles'
import Logic from './logic'
import AppField from '../../components/common/AppField/AppField'
import { StyledField } from './ReassignPassword.styles'

const ReassignPassword = ({ className }) => {
  const { changePasswordMutation, handleFormSubmit } = Logic()
  const { isLoading } = changePasswordMutation
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
                    <StyledField name="oldPassword" placeholder="Old Password" type="password" />
                    {/* <Field as={TextField} fullWidth name="username" label="Username" variant="outlined" error={!!props.errors.username} helperText={props.errors.username} /> */}
                  </Box>
                  <Box mb={2}>
                    <StyledField name="password" placeholder="New Password" type="password" />
                    {/* <Field as={TextField} fullWidth name="username" label="Username" variant="outlined" error={!!props.errors.username} helperText={props.errors.username} /> */}
                  </Box>

                  <Box mb={2}>
                    <StyledField name="confirmPassword" placeholder="Confirm Password" type="password" />
                    {/* <Field as={TextField} fullWidth name="password" label="Password" variant="outlined" error={!!props.errors.password} helperText={props.errors.password} type="password" /> */}
                  </Box>

                  <Box mb={3}>
                    {/* {data.errorMessage && <span className="form-error"> {data.errorMessage}</span>} */}

                    <AppButton className="loginButton" fullWidth variant="contained" color="secondary" type="submit" disabled={isLoading}>
                      {isLoading ? 'Loading...' : 'Reset Password'}
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
        <h1 className="s-text">Legal Advice When You Need It Most</h1>
        <h3 className="s-history">Defending Your Rights In The United Arab Emirates Since 1985</h3>
      </div>
    </div>
  )
}

export default ReassignPassword
