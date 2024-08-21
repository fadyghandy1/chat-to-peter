import { useMutation, useQuery } from 'react-query'
import { useIntl } from 'react-intl'
import * as Yup from 'yup'
import { getAllRoles } from '../../../../../services/LookupsServices'
import { registeration } from '../../../../../services/UserServices'
import UseFlashMessage from '../../../../../utils/hooks/UseFlashMessage'

function Logic() {
  const { addFlashMessage } = UseFlashMessage()
  const intl = useIntl()

  const initialValues = {
    userName: '',
    password: '',
    email: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    rolesName: [],
  }

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    password: Yup.string()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
      .min(8)
      .matches(/^(?=.*[A-Z])(?=.*[\W_])(?=.*[a-z])(?=.*[0-9])/, 'Password must contains at least one uppercase letter ,one lowercase letter one special character and one number'),

    email: Yup.string()
      .email(intl.formatMessage({ id: 'VALIDATION.EMAILFORMAT' }))
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    phoneNumber: Yup.string()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
      .transform((value) => (!!value ? value : null))
      .matches(/^[+-]?\d+$/, intl.formatMessage({ id: 'VALIDATION.PHONE' }, { fieldname: intl.formatMessage({ id: 'ADDOPPONENT.TELEPHONE' }) }))
      .min(12, intl.formatMessage({ id: 'VALIDATION.PHONELENGTH' }, { fieldname: intl.formatMessage({ id: 'ADDOPPONENT.TELEPHONE' }), length: 12 })),
    firstName: Yup.string()
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    lastName: Yup.string()
      .nullable()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' })),
    rolesName: Yup.array()
      .required(intl.formatMessage({ id: 'VALIDATION.REQUIRED' }))
      .min(1, intl.formatMessage({ id: 'VALIDATION.ATLEASTONE' }, { fieldname: intl.formatMessage({ id: 'ADDFILE.CLIENTS' }) })),
  })

  const { data: roles = [] } = useQuery(`roles`, async () => {
    return await getAllRoles().then((res) => {
      return res.data.result
    })
  })

  const registerationMutation = useMutation((payload) => registeration(payload), {
    onSuccess: (response, payload) => {
      addFlashMessage({ type: 'success', message: intl.formatMessage({ id: 'ADD.SUCCESSFULLY.CONFIRMATION' }, { fieldname: intl.formatMessage({ id: 'ADDFILE.FILE' }) }) })
    },
  })

  const onSubmit = async (values) => {
    const roles = values.rolesName.map((rol) => {
      return rol.name
    })
    debugger
    try {
      await registerationMutation.mutateAsync({
        userName: values.userName.trim() || null,
        password: values.password.trim() || null,
        email: values.email.trim() || null,
        phoneNumber: values.phoneNumber.trim() || null,
        firstName: values.firstName.trim() || null,
        lastName: values.lastName.trim() || null,
        rolesName: roles || null,
      })
    } catch (error) {
      console.log(error)
    }
  }
  return { onSubmit, initialValues, roles, intl, registerationMutation, validationSchema }
}

export default Logic
