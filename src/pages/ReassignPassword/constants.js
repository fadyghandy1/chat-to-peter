import * as Yup from 'yup'
export const initialState = { oldPassword: '', password: '', confirmPassword: '' }
export const validationSchema = Yup.object({
  oldPassword: Yup.string().required('This is required'),
  password: Yup.string()
    .required('This is required')
    .min(8)
    .matches(/^(?=.*[A-Z])(?=.*[\W_])(?=.*[a-z])(?=.*[0-9])/, 'Password must contains at least one uppercase letter ,one lowercase letter one special character and one number'),

  // .matches(/[A-Z]/, 'Password must contains at least one uppercase letter').matches(/[a-z]/, 'Password must contains at least one lowercase letter').matches(/[0-9]/, 'Password must contains at least one number').matches(/[\W_]/, 'Password must contains at least one special character'),
  confirmPassword: Yup.string()
    .required('This is required')
    .oneOf([Yup.ref('password'), null], 'Confirm password doesnot match with password'),
})
